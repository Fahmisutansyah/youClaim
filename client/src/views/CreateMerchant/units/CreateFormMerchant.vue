<template>
  <div>
    <v-form ref="form">
      <c-text-form
        :value="formData.name"
        :label="'Merchant Name'"
        :required="true"
        @update="update"
        :placeholder="'You claim merchant'"
        :stateName="'name'"
        :rules="[rules.required, rules.textLength]"
        :counter="true"
      />
      <c-text-form
        :value="formData.desc"
        :label="'Description'"
        :required="true"
        @update="update"
        :placeholder="'The best all in one plaform for digital marketing!'"
        :stateName="'desc'"
        :rules="[rules.required, rules.descLength]"
        :counter="true"
      />
    </v-form>
    <c-button v-if="!isLoading" :text="'Submit'" @click="onSubmitForm" />
    <v-progress-circular indeterminate color="info" v-else/>
  </div>
</template>

<script>
import CButton from '@/components/Buttons/CButton.vue'
import CTextForm from '@/components/Forms/CTextForm.vue'

import apiMerchant from '@/api/merchant.js'

export default {
  name: 'CreateFormMerchant',
  components: {
    CTextForm,
    CButton
  },
  data(){
    return {
      formData: {
        name: '',
        desc: '',
      },
      rules: {
        required: value => !!value || 'Field is required',
        textLength : value => value.length < 40 || 'Maximum 40 character',
        descLength: value => value.length < 80 || 'Maximum 80 character'
      },
      isLoading: false
    }
  },
  methods: {
    update(param){
      const {stateName, value} = param;
      if(stateName === 'desc' && value.length < 80){
        this.formData[stateName] = value
      }else if(value.length < 40){
        this.formData[stateName] = value
      }

    },
    onSubmitForm(){
      this.isLoading = true
      this.$refs.form.validate().then(({valid})=>{
        if(valid){
          apiMerchant.create(this.formData).then(()=>{
            this.isLoading = false
            this.$router.push('/dashboard')
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

<style>

</style>