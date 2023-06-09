<template>
  <dashboard-skeleton>
    <div class="campaign__container d-flex flex-column pa-4">
      <c-page-header :merchantName="merchPayload.name" :pageName="'CAMPAIGN DETAIL'" :path="path"/>
      <div class="campaign__content d-flex flex-row mb-6">
        <div class="campaign__content-left w-50">
          <detail-card 
            :campaignData="campaignData" 
            :merchantPayload="merchPayload"
            :totalRedeemed="totalRedeemed"
            :totalVoucher="totalVoucher"
            @setCampaign="setCampaign"
            v-if="!isObjectEmpty(campaignData)"
            />
        </div>
        <div class="campaign__content-right w-50">

        </div>
      </div>
      <div class="campaign__voucher-table" v-if="voucherData.length > 0">
        <p class="text-subtitle-1 ml-1">Vouchers</p>
        <p class="text-caption ml-1 mb-2">Total Voucher: <b>{{totalVoucher}}</b> Total Page: <b>{{pagiLength}}</b></p>
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

export default {
  components: { DashboardSkeleton, CPageHeader, DetailCard, VoucherTable },
  name: "CampaignDetail",
  data(){
    return {
      campaignData: {},
      voucherData: [],
      path: ["Home", "Dashboard", "Campaigns", "Detail"],
      voucherPage: 1,
      totalVoucher: 0,
      totalRedeemed: 0
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
    getVouchers(){
      apiVoucher.getVoucherPagi({
        merchantId: this.merchPayload._id,
        campaignId: this.campaignData._id,
        page: this.voucherPage
        })
      .then(({data})=>{
        this.voucherData = data;
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
.campaign{
  &__content{
    // height: 200px;
  }
}
.voucher{
  &__table-container{
    background-color: white;
    height: 328px;
  }
}

</style>