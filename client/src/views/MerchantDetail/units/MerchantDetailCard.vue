<template>
  <div class="merch-detail__card pa-4 mb-5">
    <div classs="merch-detail__item d-flex flex-column mb-2">
        <p class="merch-detail__label text-subtitle-1 font-weight-thin mb-1">
          Name
        </p>
        <p class="merch-detail__name text-h4 mb-4">
          {{ merchantData?.name }}
        </p>
    </div>
    <div classs="merch-detail__item d-flex flex-column">
      <p class="merch-detail__label text-subtitle-1 font-weight-thin mb-1">
        Description
      </p>
      <p class="merch-detail__desc text-subtitle-2">
        {{ merchantData?.desc }}
      </p>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    merchantData: {
      type: Object,
      required: true
    }
  },
}
</script>

<style lang="scss" scoped>
.merch-detail{
  &__card{
    background-color: white;
  }
}
</style>