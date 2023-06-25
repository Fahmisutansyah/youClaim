import { createStore } from 'vuex'
import apiUser from '@/api/user.js'
import { isObjectEmpty } from '@/utils/lib.js'

const store = createStore({
  state() {
    return {
      isLoading: false,
      userPayload: {},
      merchPayload: null,
      isLoggedIn: false
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
      state.isLoggedIn = true
      state.userPayload = data
    },
    clearUserPayload(state) {
      state.isLoggedIn = false
      state.userPayload = {}
    },
    setMerchPayload(state, data) {
      state.merchPayload = data
    },
    clearMerchPayload(state) {
      state.merchPayload = null
    }
  },
  getters: {
    userPayload: (state) => state.userPayload,
    isPayloadEmpty: (state) => {
      return isObjectEmpty(state.userPayload)
    },
    isMerchantEmpty: (state) => {
      return state.merchPayload == null
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
    },
    getMerchantPayload({ commit }) {
      return new Promise((resolve, reject) => {
        apiUser
          .getMerchantOwned()
          .then(({ data }) => {
            commit('setMerchPayload', data)
            resolve({ data })
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    logOut({ commit }) {
      commit('clearUserPayload')
      commit('clearMerchPayload')
    }
  }
})

export default store
