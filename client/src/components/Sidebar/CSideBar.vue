<template>
  <div class="c-sidebar">
    <div class="nav__buttons d-flex flex-column pt-5">
      <router-link :to="path" class="nav__item w-100" v-for="({name, path}, index) in pageDict" :key="index">
          <p :class="pageName === name ? 'nav__selected': ''">{{ captFirstLetter(name) }}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import { capitalizeFirstLetter } from '@/utils/lib.js'

export default {
  name: "CSidebar",
  components: {
  },
  data(){
    return {
      pageDict: [
        {
          name: 'dashboard', 
          path: '/dashboard'
        }, 
        {
          name: 'campaigns', 
          path: '/dashboard'
        }, 
        {
          name: 'merchant detail', 
          path:"/merchants/detail"
        }
      ],
    }
  },
  computed: {
    pageName (){
      return this.$router.currentRoute._value.name
    },
  },
  methods: {
    captFirstLetter(str){
      return capitalizeFirstLetter(str)
    }
  }
}
</script>

<style lang="scss" scoped>
.c-sidebar{
  min-height: 100%;
  background-color: white;
  width: 15vw;
}
.nav {
  &__item{
    padding-left: 36px;
    padding-top: 8px;
    padding-bottom: 8px;
    margin-top: 2px;
    margin-bottom: 2px;
    display: flex;
    align-items: center;
    height: 35px;
    background-color: white;
    p{
      color: gray;
    }
  }
  &__item:hover{
    filter: brightness(0.95)
  }
  &__selected{
    color: black !important;
  }
}
</style>