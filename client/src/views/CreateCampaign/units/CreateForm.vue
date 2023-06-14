<template>
  <div>
      <v-form ref="form" class="mb-4">
        <c-text-form
          :value="formData.campaignName"
          :label="'Campaign Name'"
          :required="true"
          @update="update"
          :placeholder="'Anniversary Campaign'"
          :stateName="'campaignName'"
          :rules="[rules.required, rules.textLength]"
          :counter="true"
        />
        <div class="mb-2 d-flex flex-row">
          <div class="w-75">
            <c-text-form
              :value="formData.slug"
              :label="'Custom slug'"
              :required="false"
              @update="update"
              :placeholder="`${slugifyName}-${slugifyCampaign}`"
              :stateName="'slug'"
              :counter="true"
            />
          </div>
          <label class="text-subtitle-2 ml-4 w-25">{{ formSlug }}</label>
        </div>
        <c-text-form
          :value="formData.description"
          :label="'Description'"
          :required="false"
          @update="update"
          :placeholder="`Take 10% off on any purchase on our anniversary!`"
          :stateName="'description'"
          :rules="[rules.required]"
          :counter="true"
        />
        <div class="mb-2">
          <label class="text-subtitle-1" @update="changeDate">End Date</label>
        </div>
        <div class="w-50 mb-4">
          <VueDatePicker
            v-model="formData.endDate"
            :enable-time-picker="false"
            :min-date="today"
            :start-time="{
              hours: 0, 
              minutes: 0, 
              seconds: 0
            }"
            :model-value="formData.endDate"
            @update:model-value="onChangeDate"
          />
          <span class="text-caption text-red" v-if="showDateError">Please input campaign end date</span>
        </div>
        <!-- // ISAACTIVE Status -->
        <div class="">
          <label class="text-subtitle-1">Campaign Status</label>
        </div>
        <div class="ml-4 w-25">
          <v-switch :model-value="formData.isActive" color="success" @click="onSwitch">
            <template v-slot:label>
              <span class="input__label ml-5">{{getActivation}}</span>
            </template>
          </v-switch>
        </div> 
        <!-- //TNC -->
        <div class="mb-2">
          <label class="text-subtitle-1">Terms and Condition</label>
        </div>
        <c-wysiwyg @getHtml="getHtml"/>
        <div>
          <span class="text-caption text-red" v-if="showTncError">Please input the terms and condition</span>
        </div>
    </v-form>
    <c-button v-if="!isLoading" :text="'Submit'" @click="onSubmitForm" />
    <v-progress-circular indeterminate color="info" v-else/>
  </div>

</template>

<script>
import { slugify } from '@/utils/lib.js'
import CWysiwyg from '../../../components/Wysiwyg/CWysiwyg.vue'
import CTextForm from '../../../components/Forms/CTextForm.vue'
import CButton from '@/components/Buttons/CButton.vue'

import apiCampaign from '@/api/campaign.js'

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'


export default {
  components: { CTextForm, CWysiwyg, CButton, VueDatePicker },
  name: 'CreateCampaignForm',
  props:{
    merch: {
      type: Object,
      required: true
    }
  },
  data(){
    return {
      formData:{
        campaignName: '',
        logo: '',
        endDate: '',
        slug: '',
        description: '',
        tnc: '',
        isActive: true,
      },
      today: new Date(),
      rules: {
        required: value => !!value || 'Field is required',
        textLength : value => value.length < 40 || 'Maximum 40 character'
      },
      tncValid: false,
      showDateError: false,
      showTncError: false,
      isLoading: false
    }
  },
  created(){
    if(this.$store.getters.isPayloadEmpty){
      this.$store.dispatch('getPayload')
    }
  },
  computed: {
    slugifyName(){
      return slugify(this.merch.name)
    },
    slugifyCampaign(){
      return this.formData.campaignName === '' ? 'anniversary-campaign' : this.formData.campaignName
    },
    getActivation(){
      return this.formData.isActive ? 'Active' : 'Inactive'
    },
    userData(){
      return this.$store.state.userPayload
    },
    formSlug(){
      return slugify(this.formData.slug)
    }
  },
  methods: {
    update(param){
      const {stateName, value} = param;
      if(stateName === 'campaignName' || stateName === 'slug'){
        if(value.length < 40){
          this.formData[stateName] = value
        }
      }else{
        this.formData[stateName] = value
      }
    },
    onSwitch(){
      this.formData.isActive = !this.formData.isActive;
    },
    getHtml(content){
      if(this.showDateError){
        this.showDateError = false
      }
      this.formData.tnc = content

    },
    onChangeDate(){
      if(this.showDateError){
        this.showDateError = false
      }
    },
    onSubmitForm(){
      let flag = false
      if(!this.formData.endDate){
        this.showDateError = true
        flag = true
      }else if (this.formData.endDate){
        this.showDateError = false
      }
      if(!this.formData.tnc){
        this.showTncError = true
        flag = true
      }else if (this.formData.tnc){
        this.showTncError = false
      }
      this.$refs.form.validate().then(({valid})=>{
        if(valid && !flag){
          this.isLoading = true
          if(this.formData.slug.length == 0){
            this.formData.slug = `${this.slugifyName}-${this.slugifyCampaign}`
          }
          let payload = {
            query: {
              merchantId: this.merch._id
            },
            body: this.formData
          }
          apiCampaign.create(payload).then(({data})=>{
            this.isLoading = false
            this.$router.push(`/campaigns/${data._id}`)
          })
          .catch(err=>{
            this.isLoading = false
            console.log(err)
          })
        }
      })

    }
  }
}
</script>

<style lang="scss" scoped>
  input {
    color: black !important;
  }
  label {
    color: black;
  }
  .v-messages{
    color: black;
  }
  // .v-file-input{
  //   .v-input{
  //     &__control{
  //       .v-field{
  //         .v-field__field{
  //           .v-field__input{
  //             color: black !important
  //             }
  //           }
  //       }
  //     }
  //   }

  // }

</style>