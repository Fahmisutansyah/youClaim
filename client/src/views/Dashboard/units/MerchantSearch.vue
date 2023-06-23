<template>
  <div class="overlay__card justify-center align-center d-flex flex-column pa-4">
    <div :class="`overlay__body w-75 d-flex flex-column justify-center ${isLoading ? 'align-center' : ''}`">
      <v-progress-circular v-if="isLoading" indeterminate color="info"/>
      <template v-else>
        <c-text-form
          :value="formData.search"
          :label="'Search Merchant Name'"
          @update="update"
          :placeholder="'YouClaim Coffee'"
          :stateName="'search'"
        />
        <div class="d-flex justify-center" v-if="isSearching">
          <v-progress-circular  indeterminate color="info"/>
        </div>
        <div class="overlay__body-result" v-if="showResult">
          <v-list lines="two">
            <v-list-item
              v-for="item in items"
              :key="item.name"
              :title="item.name"
              :subtitle="item.desc"
              @click="select(item)"
            />
          </v-list>
        </div>
        <!-- <c-button
          :text="'Submit request'"
        /> -->
      </template>
    </div>
  </div>
</template>

<script>
import CTextForm from '@/components/Forms/CTextForm.vue'
// import CButton from '@/components/Buttons/CButton.vue'
import apiMerchant from '@/api/merchant.js'
import { debounce } from '@/utils/lib.js'

export default {
  components: {
    CTextForm,
    // CButton
  },
  data() {
    return {
      formData: {
        search: ''
      },
      showResult: false,
      isSearching: false,
      items: [],
      isLoading: false
    }
  },
  watch: {
    'formData.search': function(...args){
      this.debouncedFetch(...args)
    }
  },
  methods: {
    update(param){
      const {stateName, value} = param;
      this.formData[stateName] = value;
    },
    select(param){
      if(confirm(`Are you sure you want to request to ${param.name}?`) === true){
        this.isLoading = true
        apiMerchant.requestByUser({merchantId: param._id})
          .then(()=>{
            this.isLoading = false
            this.$emit('onSuccess', param.name)
            this.$emit('switchOverlay')
          })
          .catch(err=>{
            this.isLoading = false
            alert('You have already requested to that merchant!')
            console.log(err)
          })
      }

    }
  },
  created(){
    this.debouncedFetch = debounce((newValue, oldValue)=>{
      if(newValue.length === 0){
        this.showResult = false;
        return
      }
      this.isSearching = true;
      this.showResult = false;
      oldValue
      apiMerchant.search(newValue)
        .then(({data})=>{
          this.items = data
          this.isSearching = false;
          this.showResult = true;
        })
        .catch(err=>{
          this.isSearching = false
          console.log(err)
        })
      // call fetch API to get results
    }, 1000);
  },
}
</script>

<style lang="scss" scoped>
.overlay{
  &__card{
    background-color: white;
    border-radius: 8px;
    min-height: 30vh;
    max-height: 50vh;
    width: 40vw;
  }
  &__body-result{
    max-height: 21vh;
    overflow: scroll;
  }
}
</style>