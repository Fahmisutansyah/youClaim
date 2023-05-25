<template>
  <v-btn
    :variant="variant ? variant : 'flat'"
    class="c-button"
    @click="onClick"
  >
    {{ text }}
  </v-btn>
</template>

<script>
export default {
  name: "CButton",
  props:{
    text: String,
    variant: String,
    onClick: Function,
  }
}
</script>

<style lang="scss" scoped>
  .c-button {
    // background-color: #5046E4 !important;
  }
  .v-btn--variant-flat{
    // background-color: #4895ef !important;
  }
  .v-btn--variant-tonal{
    color: black !important
  }
</style>