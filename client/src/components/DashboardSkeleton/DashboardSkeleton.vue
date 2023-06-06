<template>
  <div class="h-100 d-flex flex-column">
    <c-navbar/>
    <div class="dashboard-container d-flex flex-row">
      <c-side-bar/>
      <div class="w-100 h-100 dashboard__content-container d-flex flex-column">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import CNavbar from '../Navbar/CNavbar.vue'
import CSideBar from '../Sidebar/CSideBar.vue'

export default {
  name: "DashboardSkeleton",
  components: { CNavbar, CSideBar },
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
}
.v-breadcrumbs{
  color: black !important;
  padding: 0;
}
</style>