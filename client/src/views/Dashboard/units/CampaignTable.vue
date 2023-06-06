<template>
  <v-table>
    <thead>
      <tr>
        <th>
          Campaign Name
        </th>
        <th class="text-center">
          Date Created
        </th>
        <th class="text-center">
          End Date
        </th>
        <th class="text-center">
          Generated
        </th>
        <th class="text-center">
          Redeemed
        </th>
        <th class="text-center">
          Status
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data" :key="item.campaignName" class="table-item" @click="onClick(item._id)">
        <td>
          {{ item.campaignName }}
        </td>
        <td class="text-center">
          {{ formatDate(item.createdAt) }}
        </td>
        <td class="text-center">
          {{ formatDate(item.endDate) }}
        </td>
        <td class="text-center">
          {{ item.totalVoucher }}
        </td>
        <td class="text-center">
          {{ item.totalRedeemed }}
        </td>
        <td :class="`text-center font-weight-bold ${item.isActive ? 'text-green-lighten-1': ''}`">
          {{ displayStatus(item.isActive)}}
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
import moment from 'moment'

export default {
  name: "CampaignTable",
  props: {
    data: {type: Array, required: true}
  },
  mounted(){
  },  
  methods: {
    formatDate(date){
      return moment(date).format('LL')
    },
    displayStatus(status){
      return status ? 'Active' : 'Inactive'
    },
    onClick(id){
      this.$router.push({name: 'campaign details', params: {id: id}})
    },
  }
}
</script>

<style lang="scss" scoped>
.table-item:hover{
  scale: 1.01;
  cursor: pointer;
}
.table-item{
  transition: 0.1s;
}
</style>