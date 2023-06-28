<template>
  <div class="detail__card pa-4">
    <div class="detail__header d-flex flex-row">
      <div class="logo-container d-flex justify-center align-center" v-if="campaignData.logo">
        <img :src="campaignData.logo" class="detail__logo"/>
      </div>
      <div class="d-flex flex-column">
        <p class="detail__name text-h6">{{campaignData.campaignName}}</p>
        <p class="detail__desc text-caption">{{campaignData.description}}</p>
      </div>
    </div> 
    <div class="detail__table-items d-flex flex-column mt-5">
      <div class="detail__item d-flex flex-row justify-space-between w-100">
        <p class="font-weight-bold w-50">Date Created :</p>
        <p class="w-50">{{getCreated}}</p>
      </div>
      <div class="detail__item d-flex flex-row justify-space-between w-100">
        <p class="font-weight-bold w-50">End Date :</p>
        <p class="w-50">{{getEnded}}</p>
      </div>
      <div class="detail__item d-flex flex-row justify-space-between w-100">
        <p class="font-weight-bold w-50">Generated :</p>
        <p class="w-50">{{ totalVoucher }}</p>
      </div>
      <div class="detail__item d-flex flex-row justify-space-between w-100">
        <p class="font-weight-bold w-50">Redeemed :</p>
        <p class="w-50">{{ totalRedeemed}}</p>
      </div>
      <div class="detail__item d-flex flex-row justify-space-between w-100">
        <p class="font-weight-bold w-50 pt-5">Activation :</p>
        <v-switch v-if="!overlay" v-model="status" color="success" @click="onSwitch">
          <template v-slot:label>
              <span class="input__label ml-5">{{getActivation}}</span>
          </template>
        </v-switch>
        <v-switch v-if="overlay" :model-value="!status" loading="info">
          <template v-slot:label>
              <span class="input__label ml-5">{{getActivation}}</span>
          </template>
        </v-switch>
      </div>
      <div class="detail__item d-flex flex-row justify-space-between w-100 mb-0">
        <p class="font-weight-bold w-50">Link :</p>
      </div>
      <div class="detail__item d-flex flex-row justify-space-between w-100">
        <p class="text-subtitle-2 w-75 text-info" id="campaign-link">{{getLink}}</p>
        <v-btn icon="mdi-content-copy" size="small" @click="onCopy"></v-btn>
      </div>
    </div> 
    <div class="detail__tnc">
      <p class="text-subtitle-1">Terms and Condition</p>
      <div v-html="this.campaignData.tnc" class="px-4"></div>
    </div>
    <v-overlay v-model="overlay" class="align-center justify-center">
      <div class="overlay__card justify-center align-center d-flex flex-column">
        <p class="mb-5">Are you sure you want to <b>{{getConfirmActive}}</b> this campaign?</p>
        <div class="d-flex flex-row">
          <c-button 
            :text="'No'" 
            :classProp="'mr-3'" 
            :onClick="onCancelSwitch"
          />
          <c-button 
            :text="'Yes'" 
            :classProp="'ml-3'" 
            :color="'success'"
            :onClick="onConfirmSwitch"
          />
        </div>
      </div>
    </v-overlay>
  </div>
</template>

<script>
import moment from 'moment'
import CButton from '../../../components/Buttons/CButton.vue'
import apiCampaign from '@/api/campaign.js'

export default {
  name: 'DetailCard',
  components: {
    CButton
  },
  props: {
    campaignData: {
      type: Object,
      required: true
    },
    merchantPayload:{
      type: Object,
      required: true
    },
    totalVoucher: {
      type: Number,
      required: true,
    },
    totalRedeemed: {
      type: Number,
      required: true,
    }
  },
  data(){
    return {
      status: true,
      overlay: false,
      isLoading: false,
    }
  },
  mounted(){
    this.status = this.campaignData.isActive
  },
  computed:{
    getCreated(){
      return moment(this.campaignData.createdAt).format('LL')
    },
    getEnded(){
      return moment(this.campaignData.endDate).format('LL')
    },
    getLink(){
      return `http://localhost:8081/claim/${this.campaignData.slug}`
    },
    getActivation(){
      return this.status ? "Active" : "Inactive"
    },
    getConfirmActive(){
      return !this.status ? "activate" : "deactivate"
    }
  },
  methods: {
    onSwitch(){
      this.overlay = !this.overlay;
    },
    onConfirmSwitch(){
      this.isLoading = true;
      this.overlay = !this.overlay;
      apiCampaign.update({
        query: {
          merchantId: this.merchantPayload._id,
          id: this.campaignData._id
        },
        body: {
          isActive: !this.campaignData.isActive
        }
      })
      .then(({data})=>{
        this.status = data.isActive
        this.$emit('setCampaign', data)
        this.isLoading = false
      })
      .catch((err)=>{
        this.isLoading = false
        console.log(err)
      })

      this.status = !this.status;
    },
    onCancelSwitch(){
      this.overlay = !this.overlay;
    },
    onCopy(){
      let text = document.getElementById('campaign-link')
      navigator.clipboard.writeText(text.innerHTML).then(()=>{
        alert("Link has been copied to clipboard!")
      })

    }
  },
}
</script>

<style lang="scss" scoped>
.detail{
  &__card{
    background-color: white;
  }
  &__logo{
    width: auto;
    height: 100%;
  }
  &__item{
    margin-bottom: 16px;
  }
  &__header{
    .logo-container{
      width: 15% !important;
      height: 50px;
    }
  }
}
.input__label{
  color: black !important;
}
.overlay{
  &__card{
    background-color: white;
    height: 20vh;
    width: 40vw;
    border-radius: 8px;
  }
}
</style>