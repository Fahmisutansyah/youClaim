import axios from '@/api'

const routeBase = '/campaign'

const apiCampaign = {
  getPagination({ merchantId, page }) {
    return new Promise((resolve, reject) => {
      if (!merchantId) {
        reject({ msg: 'provide merchantId' })
      } else {
        const skip = (page - 1) * 8
        axios
          .get(`${routeBase}/page?merchantId=${merchantId}&limit=8&skip=${skip}`)
          .then(({ data }) => {
            resolve({ data })
          })
          .catch((err) => {
            reject(err)
          })
      }
    })
  },
  getOne({ merchantId, id }) {
    return new Promise((resolve, reject) => {
      if (!merchantId) {
        reject({ msg: 'provide merchantId' })
      } else {
        axios
          .get(`${routeBase}/one?merchantId=${merchantId}&_id=${id}`)
          .then(({ data }) => {
            resolve({ data })
          })
          .catch((err) => {
            reject(err)
          })
      }
    })
  }
}

export default apiCampaign
