<template>
  <dashboard-skeleton>
    <div class="merchant__container d-flex flex-column pa-4">
      <c-page-header :merchantName="merchPayload?.name" :pageName="'Merchant Detail'" :path="path"/>
      <merchant-detail-card :merchantData="merchPayload"/>
      <div class="d-flex justify-center" v-if="isLoading">
        <v-progress-circular indeterminate color="info"/>
      </div>
      <employee-card
        v-else
        :employeeList="employeeList"
        :requestList="requestList"
        :editor="editor"
        @onEdit="onSuccessEdit"
      />
    </div>
  </dashboard-skeleton>
</template>

<script>
import DashboardSkeleton from '../../components/DashboardSkeleton/DashboardSkeleton.vue'
import CPageHeader from '../../components/PageHeader/CPageHeader.vue'

import MerchantDetailCard from './units/MerchantDetailCard.vue'
import EmployeeCard from './units/EmployeeCard.vue'

import apiMerchant from '@/api/merchant.js'

export default {
  components: {
    DashboardSkeleton,
    CPageHeader,
    MerchantDetailCard,
    EmployeeCard
  },
  data(){
    return {
      isViewReady: false,
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
          title: 'Merchant Detail',
          disabled: true,
        }
      ],
      employeeList: [],
      requestList: [],
      editor: {},
      isLoading: false
    }
  },
  computed: {
    merchPayload(){
      return this.$store.state.merchPayload
    },
  },
  created(){
    if(this.$store.getters.isPayloadEmpty){
      this.$store.dispatch('getPayload')
    }
    if(this.$store.getters.isMerchantEmpty){
      this.$store.dispatch('getMerchantPayload').then(()=>{
        this.getEmployeeList()
      })
    }else{
      this.getEmployeeList()
    }
  },
  methods: {
    getEmployeeList(){
      this.isLoading = true;
      this.employeeList = [];
      this.requestList = [];
      this.editor = {};
      apiMerchant.getEmployeeList({merchantId: this.merchPayload._id}).then(({data})=>{
        const {employees, requests} = data;
        this.employeeList = employees
        this.requestList = requests
        if(data?.editor){
          this.editor = data?.editor
        }
        this.isLoading = false;
      })
      .catch(err=>{
        this.isLoading = false;
        console.log(err)
      })
    },
    onSuccessEdit(){
      this.getEmployeeList()
    }
  }
}
</script>

<style>

</style>