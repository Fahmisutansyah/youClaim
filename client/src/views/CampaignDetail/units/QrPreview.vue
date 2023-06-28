<template>
  <div class="preview__container d-flex flex-column">
    <div class="preview__qr d-flex flex-column align-center mb-4">
      <qrcode-vue :value="'WCSoJeT'" :size="'200'"/>
    </div>
    <div class="preview__content d-flex flex-column align-center">
      <p class="text-h5">WCSoJeT</p>
      <span class="text-subtitle-2 mb-4">Valid until <b>{{validity}}</b></span>
      <p class="text-h5">{{campaignDetail.campaignName}}</p>
      <span class="text-body-2 text-center mb-4">{{campaignDetail.description}}</span>
      <p>Terms and Condition</p>
      <div class="preview__tnc mb-2">
        <div v-html="campaignDetail.tnc" class="px-4"></div>
      </div>
    </div>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
import moment from 'moment'

export default {
  components: {
    QrcodeVue
  },
  props: {
    campaignDetail:{
      type: Object,
      required: true
    },
  },
  computed: {
    validity(){
      return moment(this.campaignDetail.endDate).format('l')
    }
  }
}
</script>

<style lang="scss" scoped>
.preview{
  &__container{
    max-width: 33vw;
    max-height: 61vh;
    overflow: scroll;
  }
}
</style>