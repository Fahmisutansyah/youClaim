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
          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  getPayload(token) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${routeBase}/pl`, { token })
        .then(({ data }) => {
          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

export default apiUser
