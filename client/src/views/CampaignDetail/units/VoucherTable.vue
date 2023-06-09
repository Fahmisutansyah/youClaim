<template>
  <div class="voucher__table">
    <v-table density="compact">
      <thead>
        <tr>
          <th class="text-center font-weight-bold text-black">
            Unique Code
          </th>
          <th class="text-center font-weight-bold text-black">
            Date Created
          </th>
          <th class="text-center font-weight-bold text-black">
            Status
          </th>
          <th class="text-center font-weight-bold text-black">
            Redeemed Date
          </th>
          <th class="text-center font-weight-bold text-black">
            Customer Data
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in vouchers" :key="item.uniqueCode">
          <td class="text-center">
            {{item.uniqueCode}}
          </td>
          <td class="text-center">
            {{ formatDate(item.createdAt) }}
          </td>
          <td class="text-center">
            {{ isRedeemed(item.isRedeemed) }}
          </td>
          <td class="text-center">
            {{ item.redeemedDate ? formatDate(item.redeemedDate) : '-' }}
          </td>
          <td class="text-center">
            <v-btn v-if="isCustomerAvailable(item)" size="small" variant="flat" @click="onSeeDetail(item)">See Detail</v-btn>
            <template v-else>-</template>
          </td>
        </tr>
      </tbody>
    </v-table>
    <v-overlay v-model="overlay" class="justify-end">
      <div class="overlay__customer d-flex flex-column pa-5">
        <div class="overlay__header mb-6">
          <p class="font-weight-bold text-h6">Customer Detail</p>
        </div>
        <div class="overlay__detail w-100">
          <div v-for="(value, key) in customerData" :key="key" class="overlay__item d-flex flex-row justify-space-between mb-4">
            <p class="text-subtitle-2">{{`${camelToWords(key)} :`}}</p>
            <p class="text-caption">{{value}}</p>
          </div>

        </div>
      </div>
    </v-overlay>
  </div>
</template>

<script>
import moment from 'moment'
import {camelCaseToWords} from '@/utils/lib.js'
export default {
  name: 'VoucherTable',
  props: {
    vouchers: {
      type: Array,
      required: true
    }
  },
  data(){
    return {
      customerData: {},
      overlay: false,
    }
  },
  computed:{
  },
  methods: {
    formatDate(date){
      return moment(date).format('L')
    },
    isRedeemed(stat){
      return stat ? 'Redeemed' : 'Not Redeemed'
    },
    onSeeDetail(voucher){
      const { customerName, age, customerEmail, domicile, gender, phoneNumber } = voucher;
      const temp = {customerName, age, customerEmail, domicile, gender, phoneNumber};
      for(const field in temp){
        delete this.customerData[field]
        if(!temp[field]){
          continue
        }
        this.customerData[field] = temp[field]
      }
      this.overlay = true
    },
    camelToWords(str){
      return camelCaseToWords(str)
    },
    isCustomerAvailable(voucher){
      const { customerName, age, customerEmail, domicile, gender, phoneNumber } = voucher;
      if(!customerName 
      && !age 
      && !customerEmail 
      && !domicile 
      && !gender 
      && !phoneNumber){
        return false
      }
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
.overlay{
  &__customer{
    width: 40vw;
    height: 100vh;
    background-color: white;
  }
}
</style>