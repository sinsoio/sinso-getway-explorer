import VueX from 'vuex'
import Vue from 'vue'
Vue.use(VueX)
const store = new VueX.Store({
  state: {
    odd1: false,
    odd2: false,
  },
  mutations: {
    modifyOdd1: (state, { val }) => {
      state.odd1 = val
    },
    modifyOdd2: (state, { val }) => {
      state.odd2 = val
    },
  },
})
export default store
