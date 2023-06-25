<template>
  <div class="dashboard__content pa-4 d-flex align-center justify-center w-100">
    <div class="w-50 d-flex flex-column align-center">
      <p class="text-h6 text-center font-weight-thin mb-6">You are registered as an employee in <br> {{merchPayload.name}}</p>
      <c-button :text="'Go to scanner app!'" :onClick="goToScanner"/>
    </div>
  </div>
</template>

<script>
import CButton from '@/components/Buttons/CButton.vue'

export default {
  components: {
    CButton
  },
  computed: {
    merchPayload(){
      return this.$store.state.merchPayload
    }
  },
  methods: {
    goToScanner(){
      window.open('https://www.google.com', '_blank')
    }
  }
}
</script>

<style>

</style>