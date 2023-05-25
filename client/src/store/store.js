import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      isLoading: false,
      userPayload: {}
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
    }
  }
})

export default store
