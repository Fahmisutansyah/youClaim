<script>
import CButton from '../Buttons/CButton.vue'
export default {
  components: { CButton },
  name: "CNavbar"
}
</script>

<template>
  <div class="nav-container d-flex flex-row justify-space-between pt-5">
    <div class="logo-container w-25 d-flex flex-row align-center">
      <img src="../../assets/images/logo-youclaim.png" class='logo__logo mr-2'/>
      <img src="../../assets/images/logo-text.png" class='logo__text'/>
    </div>
    <div class="action-container w-25 d-flex flex-row justify-center align-center">
      <c-button :text="'Contact us'" :variant="'tonal'"/>
    </div>
  </div>
</template>

<style lang="scss">

.logo{
  &__logo{
    width: 40px;
    height: 40px;
  }
  &__text{
    width: 50%;
    height: 50%;
  }
}
</style>