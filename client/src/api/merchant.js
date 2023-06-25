import axios from '@/api'

const routeBase = '/merchant'

const apiMerchant = {
  create(payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${routeBase}/`, payload, {
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
    })
  },
  search(q) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${routeBase}/search?q=${q}`, {
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
    })
  },
  requestByUser({ merchantId }) {
    return new Promise((resolve, reject) => {
      axios
        .patch(
          `${routeBase}/requestby/id?merchantId=${merchantId}`,
          {},
          {
            headers: {
              token: localStorage.token
            }
          }
        )
        .then(({ data }) => {
          resolve({ data })
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  getEmployeeList({ merchantId }) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${routeBase}/requestlist?merchantId=${merchantId}`, {
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
    })
  },
  acceptRequest({ merchantId, userId, type }) {
    return new Promise((resolve, reject) => {
      axios
        .patch(
          `${routeBase}/request/accept?merchantId=${merchantId}&q=${type}`,
          {
            userRequestId: userId
          },
          {
            headers: {
              token: localStorage.token
            }
          }
        )
        .then(({ data }) => {
          resolve({ data })
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  roleEmployee({ merchantId, userId, type }) {
    return new Promise((resolve, reject) => {
      axios
        .patch(
          `${routeBase}/employee?merchantId=${merchantId}&q=${type}`,
          {
            userId
          },
          {
            headers: {
              token: localStorage.token
            }
          }
        )
        .then(({ data }) => {
          resolve({ data })
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  update({ merchantId, payload }) {
    return new Promise((resolve, reject) => {
      axios
        .patch(
          `${routeBase}?merchantId=${merchantId}`,
          {
            payload
          },
          {
            headers: {
              token: localStorage.token
            }
          }
        )
        .then(({ data }) => {
          resolve({ data })
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  //BIKIN API BUAT UPDATAE EMPLOUYEE
}

export default apiMerchant
