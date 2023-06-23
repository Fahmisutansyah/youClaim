import axios from '@/api'

const routeBase = '/users'

const apiUser = {
  create(name, email, password) {
    return new Promise((resolve, reject) => {
      axios
        .post(routeBase, {
          name,
          email,
          password
        })
        .then((user) => {
          resolve(user)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  login(email, password) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${routeBase}/login`, {
          email,
          password
        })
        .then(({ data }) => {
          resolve({ data })
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  logout() {
    return new Promise((resolve, reject) => {
      axios
        .get(`${routeBase}/logout`)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  getPayload() {
    return new Promise((resolve, reject) => {
      axios
        .get(`${routeBase}/pl`, {
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
  getMerchantOwned() {
    return new Promise((resolve, reject) => {
      axios
        .get(`${routeBase}/owned`, {
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
  }
}

export default apiUser
