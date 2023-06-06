<template>
  <div class="h-100 d-flex flex-column">
    <c-navbar/>
    <div class="dashboard-container d-flex flex-row">
      <c-side-bar/>
      <div class="dashboard__content pa-4 d-flex align-center w-100">
        <div class="w-100 h-100 dashboard__content-container d-flex flex-column">
          <div class="dashboard__content-container__header mb-4">
            <p class="text-h4 font-weight-light mb-3">{{ merchPayload.name }}</p>
            <p class="text-h5">DASHBOARD</p>
            <div class="dashboard__breadcrumbs my-2">
              <v-breadcrumbs :items="path"/>
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

export default {
  name: 'DashboardView',
  components: {
    CNavbar,
    CSideBar,
    CampaignTable,
  },
  data(){
    return {
      path: ["Home", "Dashboard", "Campaigns"],
      campaigns: [],
      page: 1,
      totalCampaign: 0,
      //limit 8 campaigns
    }
  },
  created(){
    if(this.$store.getters.isPayloadEmpty){
      this.$store.dispatch('getPayload')
    }
  },
  mounted() {
    if(isObjectEmpty(this.merchPayload)){
      this.getMerchPayload()
    }else{
      this.getCampaigns();
    }
  },
  computed: {
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
      this.getCampaigns();
    },
    getCampaigns(){
      apiCampaign.getPagination({merchantId: this.merchPayload._id, page: this.page})
        .then(({data})=>{
          this.campaigns = data.campaigns
          this.totalCampaign = data.allCampaign[0].totalCampaign
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
        this.getCampaigns()
      })
      .catch(err=>{
        this.$store.commit('setLoadingFalse')
        console.log(err)
      })
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