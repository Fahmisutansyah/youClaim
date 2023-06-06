import { createStore } from 'vuex'
import apiUser from '@/api/user.js'
import { isObjectEmpty } from '@/utils/lib.js'

const store = createStore({
  state() {
    return {
      isLoading: false,
      userPayload: {},
      merchPayload: {}
    }
  },
  mutations: {
    setLoadingFalse(state) {
      state.isLoading = false
    },
    setLoadingTrue(state) {
      state.isLoading = true
    },
    setUserPayload(state, data) {
      state.userPayload = data
    },
    clearUserPayload(state) {
      state.userPayload = {}
    },
    setMerchPayload(state, data) {
      state.merchPayload = data
    },
    clearMerchPayload(state) {
      state.merchPayload = {}
    }
  },
  getters: {
    userPayload: (state) => state.userPayload,
    isPayloadEmpty: (state) => {
      return isObjectEmpty(state.userPayload)
    }
  },
  actions: {
    getPayload({ commit }) {
      return new Promise((resolve, reject) => {
        apiUser
          .getPayload()
          .then(({ data }) => {
            commit('setUserPayload', data)
            resolve({ data })
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
})

export default store
