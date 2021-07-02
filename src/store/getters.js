const getters = {
  login: state => state.user.login,
  userMsg: state => state.user.userMsg,
  userPhone:state=> state.user.userPhone,
  userInformation:state=> state.user.userInformation
}
export default getters
