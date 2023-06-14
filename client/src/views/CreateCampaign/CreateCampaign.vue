<template>
  <dashboard-skeleton>
    <div class="campaign-create__container pa-4">
      <c-page-header :merchantName="merchPayload.name" :pageName="'CREATE CAMPAIGN'" :path="path"/>
      <create-form v-if="!isObjectEmpty(merchPayload)" :merch="merchPayload"/>
    </div>  
  </dashboard-skeleton>
</template>

<script>
import DashboardSkeleton from '../../components/DashboardSkeleton/DashboardSkeleton.vue'
import CPageHeader from '../../components/PageHeader/CPageHeader.vue'
import { isObjectEmpty } from '@/utils/lib.js'
import apiUser from '@/api/user.js'

import CreateForm from './units/CreateForm.vue'

export default {
  name: 'CreateCampaign',
  components: {
    DashboardSkeleton,
    CPageHeader,
    CreateForm
  },
  data(){
    return {
      path: ["Home", "Dashboard", "Campaigns", "Create"]
    }
  },
  computed: {
    merchPayload(){
      return this.$store.state.merchPayload
    }
  },
  created(){
      this.getMerch()
  },
  methods: {
    async getMerch(){
      if(isObjectEmpty(this.merchPayload)){
        let temp = {}
        temp = await apiUser.getMerchantOwned()
        const {data} = temp;
        this.$store.commit('setMerchPayload', data)
      }
    },
    isObjectEmpty(obj){
      return isObjectEmpty(obj)
    }
  }
}
</script>

<style>

</style>