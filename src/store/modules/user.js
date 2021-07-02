import {getStore, setStore} from '@/util/store'
const user = {
  state: {
    login: getStore({
      name: 'login'
    }) || '',
    userMsg:getStore({
      name: 'userMsg'
    }) || '',
    userPhone:getStore({
      name: 'userPhone'
    }) || '',
    userInformation:getStore({
      name: 'userInformation'
    }) || ''
  },
  actions: {
    
  },
  mutations: {
    SET_LOGIN: (state, login) => {
      state.login = login
      setStore({
        name: 'login',
        content: state.login,
        type: 'session'
      })
    },
    SET_USERMSG: (state, userMsg) => {
      state.userMsg = userMsg
      setStore({
        name: 'userMsg',
        content: state.userMsg,
        type: 'session'
      })
    },
    SET_USEPHONE: (state, userPhone) => {
      state.userPhone = userPhone
      setStore({
        name: 'userPhone',
        content: state.userPhone,
        type: 'session'
      })
    },
    SET_USERINFORMATION: (state, userInformation) => {
      state.userInformation = userInformation
      setStore({
        name: 'userInformation',
        content: state.userInformation,
        type: 'session'
      })
    }
  }
}
export default user
