<template>
  <div class="dashboard__content-container__header mb-4">
    <div class="d-flex flex-row align-center">
      <p class="text-h4 font-weight-light mb-3 mr-5" v-if="!isInMerchant">{{ merchantName }}</p>
      <router-link v-if="!isInMerchant" to="/merchants/detail">
        <c-button :text="'View merchant detail'" :density="'compact'"/>
      </router-link>
    </div>
    <p class="text-h5">{{ pageName }}</p>
    <div class="dashboard__breadcrumbs my-2">
      <v-breadcrumbs :items="path"/>
    </div>
  </div>
</template>

<script>
import CButton from '../Buttons/CButton.vue'

export default {
  name: 'CPageHeader',
  components: {
    CButton
  },
  props: {
    pageName: {
      type: String,
      required: true
    },
    merchantName: {
      type: String,
      required: true
    },
    path: {
      type: Array,
    }
  },
  computed: {
    isInMerchant(){
      return this.$route.fullPath.includes("/merchants/")
    }
  },
}
</script>

<style lang="scss" scoped>
  .v-breadcrumbs{
    color: black !important;
    padding: 0;
  }
</style>