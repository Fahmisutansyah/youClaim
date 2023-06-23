<template>
  <div class="employee__card pa-4">
    <div class="employee__container d-flex flex-column">
      <p class="text-h6 mb-4">Employee List</p>
      <div class="w-100 d-flex flex-row">
        <div class="w-50 d-flex flex-column">
          <p class="text-subtitle-1">Editor</p>
          <v-list
            v-if="editorAssigned"
          >
            <v-list-item 
            :title="editor?.name"
            :subtitle="editor?.email" 
            class="mb-2">
              <template v-slot:append>
                  <v-tooltip location="top">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        icon="mdi-pencil-remove"
                        size="small"
                        class="mr-2"
                        v-bind="props"
                        @click="removeEditor(editor)"
                      />
                    </template>
                    <span>Remove as Editor</span>
                  </v-tooltip>
                  <v-tooltip location="top">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        icon="mdi-account-remove"
                        size="small"
                        class="mr-2"
                        v-bind="props"
                        @click="removeEmployeeEditor(editor)"
                      />
                    </template>
                    <span>Remove as Employee</span>
                  </v-tooltip>
              </template>
            </v-list-item>
          </v-list>
          <p class="text-subtitle-2 mb-2" v-else>You don't have an editor!</p>

  <!-- employees -->
          <p class="text-subtitle-1">Employees</p>
          <v-list class="employee__list">
            <v-list-item 
              v-for="(employee, index) in employeeList"
              :key="index"
              :title="employee.name"
              :subtitle="employee.email"
            >
              <template v-slot:append>
                <div class="d-flex flex-row">
                  <v-tooltip location="left">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        icon="mdi-account-remove"
                        size="small"
                        class="mr-2"
                        v-bind="props"
                        @click="removeEmployee(employee)"
                      />
                    </template>
                    <span>Remove as Employee</span>
                  </v-tooltip>
                  <v-tooltip location="right" v-if="!editorAssigned">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        icon="mdi-file-edit"
                        size="small"
                        v-bind="props"
                        @click="assignEditor(employee)"
                      />
                    </template>
                    <span>Assign as Editor</span>
                  </v-tooltip>
                </div>
              </template>
            </v-list-item>
          </v-list>
        </div>
        <div class="w-50 d-flex flex-column">
          <p class="text-subtitle-1">Requesting User</p>
          <v-list class="employee__request-list">
            <v-list-item 
              v-for="(person, index) in requestList"
              :key="index"
              :title="person.name"
              :subtitle="person.email"
            >
              <template v-slot:append>
                <div class="d-flex flex-row">
                  <v-tooltip location="left">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        icon="mdi-cancel"
                        size="small"
                        class="mr-2"
                        v-bind="props"
                        @click="rejectRequest(person)"
                      />
                    </template>
                    <span>Reject {{ person.name }}</span>
                  </v-tooltip>
                  <v-tooltip location="top">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        icon="mdi-check-bold"
                        size="small"
                        v-bind="props"
                        @click="acceptRequest(person)"
                      />
                    </template>
                    <span>Accept {{ person.name }}</span>
                  </v-tooltip>
                </div>
              </template>
            </v-list-item>
          </v-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isObjectEmpty } from '@/utils/lib.js'
import apiMerchant from '@/api/merchant.js'


export default {
  props: {
    employeeList: {
      type: Array,
      required: true
    },
    requestList: {
      type: Array,
      required: true
    },
    editor: {
      type: Object,
      required: true
    }
  },
  computed: {
    editorAssigned(){
      return !isObjectEmpty(this.editor)
    },
    merchId(){
      return this.$store.state.merchPayload._id
    }
  },
  methods: {
    assignEditor({_id, name}){
      this.$swal({
        icon: 'info',
        title: `Promote ${name}`,
        text: `Are you sure to promote ${name} to Editor?`,
        showCancelButton: true,
        confirmButtonText: `Yes, I'm sure!`
      })
      .then((res)=>{
        if(res.isConfirmed){
          apiMerchant.roleEmployee({merchantId: this.merchId, userId: _id, type: 'editor'})
          .then(()=>{
            this.$emit('onEdit')
            this.$swal({
              icon: 'success',
              title: `New Editor Promoted!`,
              text: `You have promoted ${name} to Editor role.`,
            })
          })
          .catch(err=>{
            console.log(err)
          })
        }
      }) 
    },
    removeEmployee({_id, name}){
      this.$swal({
        icon: 'warning',
        title: `Remove ${name}`,
        text: `Are you sure to remove ${name} as and employee?`,
        showCancelButton: true,
        confirmButtonText: `Yes, I'm sure!`
      })
      .then((res)=>{
        if(res.isConfirmed){
          apiMerchant.roleEmployee({merchantId: this.merchId, userId: _id, type: 'remove'})
          .then(()=>{
            this.$emit('onEdit')
            this.$swal({
              icon: 'success',
              title: `Employee Removed`,
              text: `You have removed ${name} as an employee`,
            })
          })
          .catch(err=>{
            console.log(err)
          })
        }
      })
    },
    removeEmployeeEditor({_id, name}){
       this.$swal({
        icon: 'warning',
        title: `Remove ${name}?`,
        text: `Are you sure to remove ${name} as Editor and Employee?`,
        showCancelButton: true,
        confirmButtonText: `Yes, I'm sure!`
      })
      .then((res)=>{
        if(res.isConfirmed){
          apiMerchant.roleEmployee({merchantId: this.merchId, userId: _id, type: 'depromote-editor'})
          .then(()=>{
            this.$emit('onEdit')
            this.$swal({
              icon: 'success',
              title: `Editor/Employee Removed!`,
              text: `You have removed ${name} from your merchant!`,
            })
          })
          .catch(err=>{
            console.log(err)
          })
        }
      })      
    },
    removeEditor({_id, name}){
      this.$swal({
        icon: 'info',
        title: `Depromote ${name}`,
        text: `Are you sure to depromote ${name} to Employee?`,
        showCancelButton: true,
        confirmButtonText: `Yes, I'm sure!`
      })
      .then((res)=>{
        if(res.isConfirmed){
          apiMerchant.roleEmployee({merchantId: this.merchId, userId: _id, type: 'depromote'})
          .then(()=>{
            this.$emit('onEdit')
            this.$swal({
              icon: 'success',
              title: `Editor Removed!`,
              text: `You have assigned ${name} to Employee role.`,
            })
          })
          .catch(err=>{
            console.log(err)
          })
        }
      }) 
    },
    acceptRequest({_id, name}){
      this.$swal({
        icon: 'info',
        title: `Accept ${name}`,
        text: `Are you sure to accept ${name} as and employee?`,
        showCancelButton: true,
        confirmButtonText: `Yes, I'm sure!`
      }).then((res)=>{
        if(res.isConfirmed){
          apiMerchant.acceptRequest({merchantId: this.merchId, userId: _id, type: 'accept'}).then(()=>{
            this.$emit('onEdit')
            this.$swal({
              icon: 'success',
              title: `New Employee`,
              text: `You have added ${name} as an employee`,
            })
          })
          .catch(err=>{
            console.log(err)
          })
        }
      })
    },
    rejectRequest({_id,name}){
      this.$swal({
        icon: 'warning',
        title: `Reject ${name}`,
        text: `Are you sure to reject ${name}'s request?`,
        showCancelButton: true,
        confirmButtonText: `Yes, I'm sure!`
      })
      .then((res)=>{
        if(res.isConfirmed){
          apiMerchant.acceptRequest({merchantId: this.merchId, userId: _id, type: 'reject'})
          .then(()=>{
            this.$emit('onEdit')
            this.$swal({
              icon: 'info',
              title: `Reject Request`,
              text: `You have rejected ${name} as an employee`,
            })
          })
          .catch(err=>{
            console.log(err)
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.employee{
  &__card{
    background-color: white;
  }
  &__list{
    max-height: 160px;
  }
  &__request-list{
    height: 260px;
  }
}
</style>