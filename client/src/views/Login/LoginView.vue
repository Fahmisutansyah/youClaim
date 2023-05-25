<template>
  <v-container class="container d-flex flex-column">
    <c-navbar/>
    <div class="container__login d-flex justify-center align-center">
      <div class="w-50">
        <div class="d-flex justify-center align-center mb-7">
          <img
            src="../../assets/images/youclaim-logo-final.png"
            class="container__logo-form"
          />
        </div>
        <login-form/>
      </div>
    </div>
  </v-container>
</template>

<script>
import CNavbar from '../../components/Navbar/CNavbar.vue'
import LoginForm from './units/LoginForm.vue'

export default {
  name: "LoginView",
  components: {
    LoginForm,
    CNavbar
  }
}
</script>

<style lang="scss" scoped>
.container{
  min-height: 100%;
  &__login{
    flex:2;
    min-height: 100%;
  }
  &__logo-form{
    height: 80px;
    width: 80px;
  }
}
</style>