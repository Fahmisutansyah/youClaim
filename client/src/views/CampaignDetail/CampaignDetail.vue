<template>
  <dashboard-skeleton>
    <div class="campaign__container d-flex flex-column pa-4">
      <c-page-header :merchantName="merchPayload?.name" :pageName="'CAMPAIGN DETAIL'" :path="path"/>
      <div class="campaign__content d-flex flex-row mb-6">
        <div class="campaign__content-left w-50 mr-3">
          <detail-card 
            :campaignData="campaignData" 
            :merchantPayload="merchPayload"
            :totalRedeemed="totalRedeemed"
            :totalVoucher="totalVoucher"
            @setCampaign="setCampaign"
            v-if="!isObjectEmpty(campaignData)"
            />
        </div>
        <div class="campaign__content-right d-flex align-center flex-column pa-4 w-50 ml-3">
          <div class="w-100">
            <p class="font-weight-bold mb-1">QR Preview</p>
          </div>
          <qr-preview :campaignDetail="campaignData"/>
        </div>
      </div>
      <v-tabs
        v-model="tab"
        bg-color="white"
        fixed-tabs
      >
        <v-tab value="one">
          Vouchers
        </v-tab>
        <v-tab value="two">
          Customer
        </v-tab>
      </v-tabs>
      <v-window v-model="tab" v-if="voucherData.length > 0">
        <v-window-item value="one">
          <div class="campaign__voucher-table" v-if="voucherData.length > 0">
            <p class="text-caption ml-1 my-2">Total Voucher: <b>{{totalVoucher}}</b> Total Page: <b>{{pagiLength}}</b></p>
            <div class="voucher__table-container mb-4">
              <voucher-table :vouchers="voucherData"/>
            </div>
            <v-pagination 
              :length="pagiLength" 
              :total-visible="1" 
              v-model="voucherPage" 
              @next="onChangePage" 
              @prev="onChangePage"
              color="black"
            />
          </div>
        </v-window-item>
        <v-window-item value="two">
          <div class="campaign__customer-table">
            <p class="text-caption ml-1 my-2">Total Customer Data: <b>{{totalCustomer}}</b> Total Page: <b>{{pagiCustomerLength}}</b></p>
            <div class="customer-table__container mb-4">
              <customer-table :users="customerData[customerPage-1]"/>
            </div>
            <v-pagination 
              :length="customerData.length" 
              :total-visible="1" 
              v-model="customerPage" 
              color="black"
            />
          </div>
        </v-window-item>
      </v-window>
      <div class="campaign__voucher-table w-100" v-else>
        <p class="text-h6 text-center mb-2">There are no vouchers generated yet!</p>
      </div>

    </div>
  </dashboard-skeleton>
</template>

<script>
import DashboardSkeleton from '../../components/DashboardSkeleton/DashboardSkeleton.vue'
import apiCampaign from '@/api/campaign.js'
import apiUser from '@/api/user.js'
import apiVoucher from '@/api/voucher.js'
import { isObjectEmpty } from '@/utils/lib.js'
import CPageHeader from '../../components/PageHeader/CPageHeader.vue'
import DetailCard from './units/DetailCard.vue'
import VoucherTable from './units/VoucherTable.vue'
import QrPreview from './units/QrPreview.vue'
import CustomerTable from './units/CustomerTable.vue'



export default {
  components: { DashboardSkeleton, CPageHeader, DetailCard, VoucherTable, QrPreview, CustomerTable },
  name: "CampaignDetail",
  data(){
    return {
      campaignData: {},
      voucherData: [],
      customerData: [],
      path: [
        {
          title: 'Home',
          disabled: false,
          href: '/dashboard'
        },
        {
          title: 'Dashboard',
          disabled: false,
          href: '/dashboard'
        },
        {
          title: 'Campaign Detail',
          disabled: true,
        },
      ],
      voucherPage: 1,
      customerPage: 1,
      totalVoucher: 0,
      totalRedeemed: 0,
      totalCustomer: 0,
      tab:null
    }
  },
  mounted(){
    this.$store.commit('setLoadingTrue')
    this.getDetail()
  },
  computed: {
    paramId(){
      return this.$route.params.id
    },
    merchPayload(){
      return this.$store.state.merchPayload
    },
    pagiLength(){
      return Math.ceil(this.totalVoucher / 8)
    },
    pagiCustomerLength(){
      return Math.ceil(this.totalCustomer/8)
    }
  },
  methods: {
    async getDetail(){
      if(isObjectEmpty(this.merchPayload)){
        let temp = {}
        temp = await apiUser.getMerchantOwned()
        const {data} = temp;
        this.$store.commit('setMerchPayload', data)
      }
      apiCampaign.getOne({merchantId: this.merchPayload._id, id: this.paramId})
      .then(({data})=>{
        this.totalVoucher = data.totalVoucher
        this.totalRedeemed = data.totalRedeemed
        this.campaignData = data;
        this.pagiLength = this.campaignData.totalVoucher
        this.getVouchers();
        this.$store.commit('setLoadingFalse')
      })
      .catch((err)=>{
        console.log(err)
        this.$store.commit('setLoadingFalse')
      })
    },
    generateUserData(){
      apiVoucher.getCustomer({merchantId: this.merchPayload._id, 
      campaignId: this.campaignData._id})
      .then(({data})=>{
        this.customerData = data.customers
        this.totalCustomer = data.totalCustomer
      })
      .catch(err=>{
        console.log(err)
      })
 
    },
    getVouchers(){
      apiVoucher.getVoucherPagi({
        merchantId: this.merchPayload._id,
        campaignId: this.campaignData._id,
        page: this.voucherPage
        })
      .then(({data})=>{
        this.voucherData = data;
        this.generateUserData()
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    isObjectEmpty(obj){
      return isObjectEmpty(obj)
    },
    onChangePage(){
      this.getVouchers()
    },
    
    setCampaign(payload){
      this.campaignData = payload
    }
  },
}
</script>

<style lang="scss" scoped>
.voucher{
  &__table-container{
    background-color: white;
    height: 328px;
  }
}
.customer-table{
  &__container{
    background-color: white;
    height: 328px;
  }

}

.campaign{
  &__content-right{
    border-radius: 10px;
    background-color: white;
  }
}

</style>