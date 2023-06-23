<template>
 <dashboard-skeleton>
  <div class="merchant-create__container pa-4">
    <c-page-header :merchantName="'-'" :pageName="'CREATE MERCHANT'" :path="path"/>
    <create-form/>
  </div>
 </dashboard-skeleton>
</template>

<script>
import DashboardSkeleton from '../../components/DashboardSkeleton/DashboardSkeleton.vue'
import CPageHeader from '../../components/PageHeader/CPageHeader.vue'
import CreateForm from './units/CreateFormMerchant.vue'


export default {
  name: 'CreateMerchant',
  components: {
    DashboardSkeleton,
    CreateForm,
    CPageHeader
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
          title: 'Create',
          disabled: true,

        }
      ],
    }
  }
}
</script>

<style>

</style>