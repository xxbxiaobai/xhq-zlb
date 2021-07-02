import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import common from './modules/common'
import getters from './getters'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    user,
    common,
  },
  getters,
  state: {
    userInfo: {
      id: "",
      realName: "",
      sex: "",
      url: "",
      userName: ""
    },
    flag: '',
    userLoginMsg:{
      
    },
    placeInfo:{}, //场馆预订信息
  },
  mutations: {
    modifyRealName(state, info) {
      state.userInfo.realName = info
    },
    modifyUserName(state, info) {
      state.userInfo.userName = info
    },
    modifySex(state, info) {
      state.userInfo.sex = info
    },
  }
})

export default store
