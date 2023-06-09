<template>
  <div class="dashboard__content-container__header mb-4">
    <p class="text-h4 font-weight-light mb-3">{{ merchantName }}</p>
    <p class="text-h5">{{ pageName }}</p>
    <div class="dashboard__breadcrumbs my-2">
      <v-breadcrumbs :items="path"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CPageHeader',
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
  }
}
</script>

<style lang="scss" scoped>
  .v-breadcrumbs{
    color: black !important;
    padding: 0;
  }
</style>