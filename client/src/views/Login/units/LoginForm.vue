<template>
    <v-form ref="form">
      <v-container>
        <c-text-form
          v-if="!isLoggingIn"
          :value="form.name"
          :label="'Name'"
          :required="false"
          @update="update"
          :placeholder="'John Doe'"
          :stateName="'name'"
          :rules="[rules.required]"
        />
        <c-text-form
          :value="form.email"
          :label="'Email'"
          :required="false"
          @update="update"
          :placeholder="'johndoe@mail.com'"
          :stateName="'email'"
          :rules="[rules.isRequired, rules.isEmail]"

        />
        <c-text-form
          :value="form.password"
          :label="'Password'"
          :required="false"
          @update="update"
          :placeholder="''"
          :stateName="'password'"
          :hint="isLoggingIn ? '' : 'Password must be at least 6 characters'"
          :rules="[rules.required, rules.passwordLength]"
          :type="'password'"
        />
        <div :class="`container__action d-flex justify-${isLoading ? 'center' : 'space-between'} mt-5`">
          <template v-if="!isLoading">
            <template v-if="isLoggingIn">
              <c-button
                :text="'Login'"
                :onClick="login"
              />
              <c-button
                :text="'Make a new account'"
                :onClick="toggleLogIn"
              />
            </template>
            <template v-if="!isLoggingIn">
              <c-button
                :text="'Already have an account'"
                :onClick="toggleLogIn"
              />
              <c-button
                :text="'Submit'"
                :onClick="submitForm"
              />
            </template>
          </template>
          <pulse-loader :loading="isLoading"/>
        </div>
      </v-container>
    </v-form>
</template>

<script>
import CButton from '../../../components/Buttons/CButton.vue';
import CTextForm from '../../../components/Forms/CTextForm.vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import apiUser from '@/api/user.js'
export default {
  data(){
    return {
      form: {
        email: '',
        password: '',
        name: '',
      },
      rules: {
        required: value => !!value || 'Field is required',
        passwordLength: value => value.length > 5 || 'Must be 6 characters',
        isEmail: () =>{
          // eslint-disable-next-line no-useless-escape
          let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
          
          return regex.test(this.form.email) || 'Invalid email'
        }
      },
      isLoggingIn: true,
    }
  },
  components: {
    CTextForm,
    CButton,
    PulseLoader
  },
  computed: {
    isLoading(){
      return this.$store.state.isLoading
    },
  },
  methods: {
    update(param){
      const {stateName, value} = param;
      this.form[stateName] = value
    },
    toggleLogIn(){
      this.isLoggingIn = !this.isLoggingIn;
    },
    submitForm(){
      this.$refs.form.validate().then(({valid})=>{
        if(valid){
          this.$store.commit('setLoadingTrue');
          const {name, email, password} = this.form
          apiUser.create(name, email, password).then(({data})=>{
            this.$store.commit('setLoadingFalse'); 
            this.$swal({
              icon: 'success',
              title: `Hello, ${data.name}! You have successfully created an account.`,
              text: 'Now you may log in',
            })
            .then(()=>{
              this.isLoggingIn = true
            })
          })
          .catch(err=>{
            this.$swal({
              icon: 'error',
              title: 'Oops...',
              text: 'Check your email and passsword'
            })
            console.log(err)
            this.$store.commit('setLoadingFalse')
          })
        }
      })
    },
    login(){
      this.$refs.form.validate().then(({valid})=>{
        if(valid){
          this.$store.commit('setLoadingTrue');
          const {email, password} = this.form;
          apiUser.login(email, password).then(({data})=>{
            localStorage.setItem("token", data.token);
            setTimeout(()=>{
              this.$store.commit('setLoadingFalse'); 
              this.$router.push('/dashboard')
            }, 1500)
          })
          .catch((err)=>{
            if(err.response.status === 400){
              this.$swal({
                icon: 'error',
                title: 'Oops...',
                text: 'Check your email and passsword'
              })
            }else{
              this.$swal({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong'
              })
            }
            console.log(err)
            this.$store.commit('setLoadingFalse');
          })
        }else{
          this.$store.commit('setLoadingFalse');
        }
      })
    }
  }
}
</script>

<style>

</style>