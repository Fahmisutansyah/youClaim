<template>
  <v-text-field 
    :value="value"
    @input="$emit('update', {value: $event.target.value, stateName, event: $event.target})"
    :label="label ? label : ''"
    :placeholder="placeholder ? placeholder : ''"
    :rules="rules"
    :hint="hint"
    variant="outlined"
    class="mb-3"
    :type="type"
    :counter="counter"
    :active="active"
  />
</template>

<script>
export default {
  name: "CTextForm",
  props: { 
    required: Boolean,
    counter: {
      type: Boolean,
      default: false,
    },
    value: {type: String, required: true},
    label: String,
    placeholder: String,
    rules: Function,
    stateName: {type: String, required: true},
    hint: String,
    type: {
      type: String,
      default: "input"
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {

    }
  },
  emits: ['update']
}
</script>

<style lang="scss">
  input {
    color: black !important;
  }
  label {
    color: black;
  }
  .v-messages{
    color: black;
  }
</style>

