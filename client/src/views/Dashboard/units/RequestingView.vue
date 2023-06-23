<template>
  <div class="dashboard__content pa-4 d-flex align-center justify-center w-100">
    <div class="w-50 d-flex flex-column align-center">
      <p class="text-h5 font-weight-thin mb-6">
        You are requesting to {{merchPayload.name}}
      </p>
      <p class="text-h6 ">
        There's is not much you can do.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    merchPayload(){
      return this.$store.state.merchPayload
    },
  }
}
</script>

<style>

</style>