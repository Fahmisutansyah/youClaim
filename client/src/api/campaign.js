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
          .get(`${routeBase}/page?merchantId=${merchantId}&limit=8&skip=${skip}`, {
            headers: {
              token: localStorage.token
            }
          })
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
          .get(`${routeBase}/one?merchantId=${merchantId}&_id=${id}`, {
            headers: {
              token: localStorage.token
            }
          })
          .then(({ data }) => {
            resolve({ data })
          })
          .catch((err) => {
            reject(err)
          })
      }
    })
  },
  update({ query, body }) {
    return new Promise((resolve, reject) => {
      if (!query.merchantId) {
        reject({ msg: 'provide merchantId' })
      } else {
        axios
          .put(`${routeBase}/update?merchantId=${query.merchantId}&id=${query.id}`, body, {
            headers: {
              token: localStorage.token
            }
          })
          .then(({ data }) => {
            resolve({ data })
          })
          .catch((err) => {
            reject(err)
          })
      }
    })
  },
  create({ query, body }) {
    return new Promise((resolve, reject) => {
      if (!query.merchantId) {
        reject({ msg: 'provide merchantId' })
      } else {
        axios
          .post(`${routeBase}/new?merchantId=${query.merchantId}`, body, {
            headers: {
              token: localStorage.token
            }
          })
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
