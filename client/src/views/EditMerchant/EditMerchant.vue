<template>
 <dashboard-skeleton>
  <div class="merchant-edit__container pa-4">
    <c-page-header :merchantName="'-'" :pageName="'EDIT MERCHANT'" :path="path"/>
    <edit-form :dataProps="merchantPayload"/>
  </div>
 </dashboard-skeleton>
</template>

<script>
import DashboardSkeleton from '@/components/DashboardSkeleton/DashboardSkeleton.vue'
import CPageHeader from '@/components/PageHeader/CPageHeader.vue'
import EditForm from './units/EditFormMerchant.vue'


export default {
  name: 'EditMerchant',
  components: {
    DashboardSkeleton,
    EditForm,
    CPageHeader
  },
  computed:{
    merchantPayload(){
      return this.$store.state.merchPayload
    }
  },
  data(){
    return {
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
          title: 'Merchants',
          disabled: true,
          href: ''
        },
        {
          title: 'Edit',
          disabled: true,

        }
      ],
    }
  }
}
</script>

<style>

</style>