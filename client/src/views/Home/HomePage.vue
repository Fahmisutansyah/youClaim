<script>
import CButton from '../../components/Buttons/CButton.vue'
import CNavbar from '../../components/Navbar/CNavbar.vue'


export default {
  data(){
    return {
      form: {
        email: '',
        name: ''
      }
    }
  },
    components:{
      CNavbar,
      CButton,

    },
    methods: {
      update(param){
        const {stateName, value} = param;
        this.form[stateName] = value
      }
    }
}
</script>

<template>
  <div class="container d-flex flex-column">
    <c-navbar/>
    <div class="container__content d-flex flex-row px-16">
      <div class="container__left w-50 d-flex justify-center flex-column">
        <div class="container__text">
          <p class="text-h6 headline-2">
            Centralize Your Digital Campaign
          </p>
          <p class="text-h3 font-weight-bold my-6 headline">
            Grow your audience
          </p>
          <p class="text-subtitle-1 font-weight-light mb-6">
            Your one stop digital marketing analytic tool is here!
          </p>
        </div>
        <div>
        <router-link to="/login">
          <c-button :text="'Get Started'" variant="flat"/>
        </router-link>
        </div>
      </div>
      <div class="container__right w-50 d-flex justify-center">
        <img
          src="../../assets/images/landing-green.svg"
          class="container__image w-100"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container{
  min-height: 100%;
  &__content{
    min-height: 100%;
    height: 100%;
    flex: 2;
  }
  .headline{
    color: #273C5E !important;
  }
  .headline-2 {
    color: #99DEC0 !important;
  }
}
</style>