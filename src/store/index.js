import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 控制登陆弹窗的显示
    loginDialogVisible: false,
    // 控制发布文章抽屉的显示
    publishDrawerVisible: false
  },
  mutations: {
    switchShowLogin(state, status) {
      state.loginDialogVisible = status
    },
    switchPublishDrawerVisible(state, status) {
      this.state.publishDrawerVisible = status
    }
  },
  actions: {},
  modules: {}
})
