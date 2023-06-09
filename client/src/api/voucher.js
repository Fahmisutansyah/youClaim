import axios from '@/api'

const routeBase = '/voucher'

const apiVoucher = {
  getVoucher(query) {
    return new Promise((resolve, reject) => {
      if (!query.merchantId) {
        reject({ msg: 'provide merchantId' })
      } else {
        axios
          .get(`${routeBase}/?merchantId=${query.merchantId}`)
          .then(({ data }) => {
            resolve({ data })
          })
          .catch((err) => {
            reject(err)
          })
      }
    })
  },
  getVoucherPagi({ page, campaignId, merchantId }) {
    return new Promise((resolve, reject) => {
      if (!merchantId || !page || !campaignId) {
        reject({ msg: 'please check query' })
      } else {
        const skip = (page - 1) * 8
        axios
          .get(
            `${routeBase}/pagi?merchantId=${merchantId}&campaignId=${campaignId}&skip=${skip}&limit=8`
          )
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

export default apiVoucher
