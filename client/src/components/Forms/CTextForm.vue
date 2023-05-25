<template>
  <v-text-field 
    :value="value"
    @input="$emit('update', {value: $event.target.value, stateName})"
    :label="label ? label : ''"
    :placeholder="placeholder ? placeholder : ''"
    :rules="rules"
    :hint="hint"
    variant="outlined"
    class="mb-3"
    :type="type"
  />
</template>

<script>
export default {
  name: "CTextForm",
  props: { 
    required: Boolean,
    value: {type: String, required: true},
    label: String,
    placeholder: String,
    rules: Function,
    stateName: {type: String, required: true},
    hint: String,
    type: {
      type: String,
      default: "input"
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

