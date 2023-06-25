<template>
  <v-btn
    :variant="variant ? variant : 'flat'"
    :class="`c-button ${classProp}`"
    @click="onClick"
    :color="color"
    :density="density ? density : 'default'"
    :disabled="disabled ? disabled : false"
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
    classProp: String,
    color: String,
    density: String,
    disabled: Boolean
  },
}
</script>

<style lang="scss" scoped>
  .v-btn--variant-tonal{
    color: black !important
  }
</style>