<script>
import CButton from '../Buttons/CButton.vue'
import apiUser from '@/api/user.js'

export default {
  components: { CButton },
  name: "CNavbar",
  data(){
    return{
      isLoading: false
    }
  },
  created(){
    if(this.route?.meta.auth){
      if(this.$store.getters.isPayloadEmpty){
        this.$store.dispatch('getPayload')
      }
    }
  },
  computed: {
    userData(){
      return this.$store.state.userPayload
    },
    isLoggedIn(){
      return localStorage.getItem('token')
    }
  },
  methods: {
    logOut(){
      this.isLoading = true
      apiUser.logout().then(()=>{
        localStorage.removeItem('token')
        this.$store.dispatch('logOut')
        this.isLoading = false
        this.$router.push('/')
      })
      .catch(err=>{
        this.isLoading = false
        console.log(err)
      })


    }
  }
}
</script>

<template>
  <div class="nav-container d-flex flex-row justify-space-between py-3 px-16">
    <div class="logo-container w-25 d-flex flex-row align-center">
      <img src="../../assets/images/logo-youclaim.png" class='logo__logo mr-2'/>
      <img src="../../assets/images/logo-text.png" class='logo__text'/>
    </div>
    <div class="action-container w-25 d-flex flex-row justify-end align-center">

      <template v-if="!isLoading">
        <c-button v-if="!isLoggedIn" :text="'Contact us'" :variant="'tonal'"/>
        <div class="d-flex flex-row align-center" v-else>
          <p class="mr-4">Hello, {{userData.name}}</p>
          <c-button :text="'Log Out'" :variant="'tonal'" :onClick="logOut"/>
        </div>
      </template>
      <v-progress-circular indeterminate color="info" v-else/>
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