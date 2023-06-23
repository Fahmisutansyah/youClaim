<template>
  <div class="dashboard__content pa-4 d-flex align-center justify-center w-100">
    <div class="w-50 d-flex flex-column align-center">
      <p class="text-h6 font-weight-thin mb-6">You are not registered to any merchants!</p>
      <div class="no-merchant__action d-flex flex-row justify-space-between w-100">
        <c-button :text="'Register to a Merchant'" :onClick="switchOverlay"/>
        <c-button :text="'Make One!'" :onClick="goToCreate"/>
      </div>
    </div>
    <v-overlay v-model="overlay" class="align-center justify-center">
      <merchant-search @switch-overlay="switchOverlay" @on-success="onSuccess"/>
    </v-overlay>
  </div>
</template>

<script>
import CButton from '../../../components/Buttons/CButton.vue'
import MerchantSearch from './MerchantSearch.vue'

export default {
  components: { CButton, MerchantSearch },
  data(){
    return {
      overlay: false
    }
  },
  methods: {
    goToCreate(){
      this.$router.push('/merchants/new')
    },
    switchOverlay(){
      this.overlay = !this.overlay
    },
    onSuccess(name){
      this.$swal({
        icon: 'success',
        title: `You have successfully requested to ${name}!`,
        text: 'The merchant owner will accept or reject your request',
      })
        .then(()=>{
          this.$emit('onSuccess')
        })

    }
  }

}
</script>

<style>

</style>