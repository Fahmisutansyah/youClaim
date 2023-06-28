<template>
  <div class="customer__table">
    <v-table density="compact">
      <thead>
        <tr>
          <th class="text-center font-weight-bold text-black">
            Customer Name
          </th>
          <th class="text-center font-weight-bold text-black">
            Customer Email
          </th>
          <th class="text-center font-weight-bold text-black">
            Age
          </th>
          <th class="text-center font-weight-bold text-black">
            Gender
          </th>
          <th class="text-center font-weight-bold text-black">
            Address
          </th>
          <th class="text-center font-weight-bold text-black">
            Phone Number
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in users" :key="index">
          <td class="text-center">
            {{item?.customerName ? item?.customerName : '-'}}
          </td>
          <td class="text-center">
            {{item?.customerEmail ? item?.customerEmail : '-'}}
          </td>
          <td class="text-center">
            {{item?.age ? item?.age : '-'}}
          </td>
          <td class="text-center">
            {{item?.gender ? item?.gender : '-'}}
          </td>
          <td class="text-center">
            {{item?.address ? item?.address : '-'}}
          </td>
          <td class="text-center">
            {{item?.phoneNumber ? item?.phoneNumber : '-'}}
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>
export default {
  computed: {
    
  },
  props: {
    users: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>

</style>