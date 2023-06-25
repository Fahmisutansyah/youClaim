<template>
  <div>
    <v-form ref="form">
      <c-text-form
        :value="formData.name"
        :label="'Merchant Name'"
        @update="update"
        :placeholder="'You claim merchant'"
        :stateName="'name'"
        :rules="[rules.nameRequired, rules.textLength]"
        :counter="true"
        :active="true"
      />
      <c-text-form
        :value="formData.desc"
        :label="'Description'"
        @update="update"
        :placeholder="'The best all in one plaform for digital marketing!'"
        :stateName="'desc'"
        :rules="[rules.required, rules.descLength]"
        :counter="true"
        :active="true"
      />
    </v-form>
    <div v-if="!isLoading" class="edit__action d-flex flex-row justify-space-between">
      <c-button :disabled="!this.edited" :text="'Submit'" @click="onSubmitForm" />
      <router-link to='/merchants/detail'>
        <c-button :text="'Cancel'" :color="'warning'" @click="onSubmitForm" />
      </router-link>
    </div>
    <v-progress-circular indeterminate color="info" v-else/>
  </div>
</template>

<script>
import CButton from '@/components/Buttons/CButton.vue'
import CTextForm from '@/components/Forms/CTextForm.vue'

import apiMerchant from '@/api/merchant.js'

export default {
  name: 'EditFormMerchant',
  components: {
    CTextForm,
    CButton
  },
  props: {
    dataProps: {
      type: Object,
      required: true
    }
  },
  data(){
    return {
      formData: {
        name: '',
        desc: '',
      },
      rules: {
        nameRequired: ()=>{
          return !!this.formData.name || 'Field is required'
        },
        required: value => {
          return  !!value || 'Field is required'
        },
        textLength : () => this.formData.name.length < 40 || 'Maximum 40 character',
        descLength: value => value.length < 80 || 'Maximum 80 character'
      },
      isLoading: false,
      edited: false
    }
  },
  computed: {
    merchPayload(){
      return this.$store.state.merchPayload
    }
  },
  created(){
    if(this.$store.getters.isMerchantEmpty){
      this.$store.dispatch('getMerchantPayload').then(()=>{
        this.formData.name = this.merchPayload.name
        this.formData.desc = this.merchPayload.desc
      })
    }else{
      this.formData.name = this.merchPayload.name
      this.formData.desc = this.merchPayload.desc
    }
  },
  methods: {
    update(param){
      const {stateName, value} = param;
      if(stateName === 'desc' && value.length < 80){
        this.formData[stateName] = value
        this.edited = true
      }else if(value.length < 40){
        this.formData[stateName] = value
        this.edited = true
      }
      if(this.merchPayload.name === this.formData.name && 
      this.merchPayload.desc === this.formData.desc){
        this.edited = false
      } 

    },
    onSubmitForm(){
      this.isLoading = true
      this.$refs.form.validate().then(({valid})=>{
        if(valid){
          apiMerchant.update(
            {
              merchantId: this.merchPayload._id, 
              payload: this.formData
            })
            .then(()=>{
              this.$store.commit('clearMerchPayload')
              this.$router.push('/merchants/detail')
              this.isLoading = false
            })
            .catch(err=>{
              console.log(err)
              this.isLoading = false
            })
        }
      })
    }
  }
}
</script>

<style>

</style>