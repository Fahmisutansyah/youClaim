<template>
  <div class="h-100 d-flex flex-column">
    <c-navbar/>
    <div class="dashboard-container d-flex flex-row" v-if="isViewReady">
      <c-side-bar/>
      <no-merchant-view v-if="noMerchant" @on-success="onSuccessRequest"/>
      <requesting-view v-else-if="checkEmployment === 'request'"/>
      <div v-else class="dashboard__content pa-4 d-flex align-center w-100">
        <div class="w-100 h-100 dashboard__content-container d-flex flex-column">
          <div class="d-flex flex-row justify-space-between align-end">
            <c-page-header :merchantName="merchPayload?.name" :pageName="'DASHBOARD'" :path="path"/>
            <div class="mb-6">
              <router-link to="/campaigns/new">
                <v-btn variant="flat" color="info">
                  Create New Campaign
                </v-btn>
              </router-link>
            </div>
          </div>
          <div class="dashboard__content-body mb-4">
            <campaign-table :data="this.campaigns"/>
          </div>
          <div class="dashboard__pagination w-100 d-flex align-center justify-center">
            <v-pagination 
              :length="pagiLength" 
              :total-visible="1" 
              v-model="page" 
              @next="onChangePage" 
              @prev="onChangePage"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CNavbar from '../../components/Navbar/CNavbar.vue'
import CSideBar from '../../components/Sidebar/CSideBar.vue'
import apiUser from '@/api/user.js'
import apiCampaign from '@/api/campaign.js'
import { isObjectEmpty } from '@/utils/lib.js'
import CampaignTable from './units/CampaignTable.vue'
import CPageHeader from '../../components/PageHeader/CPageHeader.vue'
import NoMerchantView from './units/NoMerchantView.vue'
import RequestingView from './units/RequestingView.vue'

export default {
  name: 'DashboardView',
  components: {
    CNavbar,
    CSideBar,
    CampaignTable,
    CPageHeader,
    NoMerchantView,
    RequestingView
  },
  data(){
    return {
      path: [
        {
          title: 'Home',
          disabled: false,
          href: 'dashboard'
        },
        {
          title: 'Dashboard',
          disabled: false,
          href: 'dashboard'
        },
        {
          title: 'Campaigns',
          disabled: true,
          href: ''
        }
      ],
      campaigns: [],
      page: 1,
      totalCampaign: 0,
      //limit 8 campaigns
      isViewReady: false
    }
  },
  created(){
  },
  mounted() {
    if(this.$store.getters.isPayloadEmpty){
      this.$store.dispatch('getPayload').then(()=>{
        if(!this.merchPayload || isObjectEmpty(this.merchPayload)){
          this.getMerchPayload()
        }else if(!this.noMerchant){
          this.getCampaigns();
        }
      })
    }else{
      this.getMerchPayload();
    }
  },
  computed: {
    checkEmployment(){
      if(this.$store.state.merchPayload.ownerId === this.userPayload._id){
        return 'owner'
      }else if(this.$store.state.merchPayload.employeeId.includes(this.userPayload._id)){
        return 'employee'
      }else if(this.$store.state.merchPayload.requestId.includes(this.userPayload._id)){
        return 'request'
      }else if(this.$store.state.merchPayload?.editorId === this.userPayload._id){
        return 'editor'
      }
      return false
    },
    noMerchant(){
      return this.$store.state.merchPayload === null ? true : false
    },
    userPayload(){
      return this.$store.state.userPayload
    },
    isLoading(){
      return this.$store.state.isLoading
    },
    merchPayload(){
      return this.$store.state.merchPayload
    },
    pagiLength(){
      return Math.ceil(this.totalCampaign / 8)
    },
  },
  methods: {
    onChangePage(){
      this.campaigns = []
      this.getCampaigns();
    },
    getCampaigns(){
      apiCampaign.getPagination({merchantId: this.merchPayload._id, page: this.page})
        .then(({data})=>{
          if(data.campaigns.length > 0){
            this.campaigns = data.campaigns
            this.totalCampaign = data.allCampaign[0].totalCampaign
          }
          this.$store.commit('setLoadingFalse')
        })
        .catch(err=>{
          console.log(err)
          this.$store.commit('setLoadingFalse')
        })
    },
    getMerchPayload(){
      apiUser.getMerchantOwned().then(({data})=>{
        this.$store.commit('setMerchPayload', data)
        this.isViewReady = true
        if(data){
          if(this.checkEmployment === 'editor' || this.checkEmployment === 'owner'){
            this.getCampaigns()
          }
        }
      })
      .catch(err=>{
        this.$store.commit('setLoadingFalse')
        this.isViewReady = true
        console.log(err)
      })
    },
    onSuccessRequest(){
      this.getMerchPayload()
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  flex: 2;
  background-color: #eeeeee;
}
.dashboard{
  &__content-container{
    // background-color: white;
  }
  &__content-body{
    height: 60vh;
  }
}
.v-breadcrumbs{
  color: black !important;
  padding: 0;
}
.v-pagination{
  color: black !important;
}
</style>