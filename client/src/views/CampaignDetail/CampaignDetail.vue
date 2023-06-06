<template>
  <dashboard-skeleton>
    <div>
      asdfasdfasdfsf
    </div>
  </dashboard-skeleton>
</template>

<script>
import DashboardSkeleton from '../../components/DashboardSkeleton/DashboardSkeleton.vue'
import apiCampaign from '@/api/campaign.js'
import apiUser from '@/api/user.js'
import { isObjectEmpty } from '@/utils/lib.js'

export default {
  components: { DashboardSkeleton },
  name: "CampaignDetail",
  data(){
    return {
      campaignData: {}
    }
  },
  mounted(){
    this.$store.commit('setLoadingTrue')
    this.getDetail()
  },
  computed: {
    paramId(){
      return this.$route.params.id
    },
    merchPayload(){
      return this.$store.state.merchPayload
    }
  },
  methods: {
    async getDetail(){
      if(isObjectEmpty(this.merchPayload)){
        let temp = {}
        temp = await apiUser.getMerchantOwned()
        const {data} = temp;
        this.$store.commit('setMerchPayload', data)
      }
      apiCampaign.getOne({merchantId: this.merchPayload._id, id: this.paramId})
      .then(({data})=>{
        this.campaignData = data;
        this.$store.commit('setLoadingFalse')
      })
      .catch((err)=>{
        console.log(err)
        this.$store.commit('setLoadingFalse')
      })
    }
  },
}
</script>

<style>

</style>