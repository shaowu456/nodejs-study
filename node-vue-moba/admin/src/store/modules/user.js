import { login } from '@/api/user'
const state = {
  name: '',
  avatar: '',
  introduction: '',
  roles: ['admin'],
  logininfo: '',
  userinfo: {}, // 登录的基本信息
  locationId: '', // 当前选择的仓库Id
  routerName: [],
  captchaCreate: ''
}
const getters = {
  firstLetter: state => {
    return state.userName.substr(0, 1)
  }
}
const mutations = {
  SET_LOGININFO(state, params) {
    state.logininfo = params
  }
}
const actions = {
  login({ commit }, data) {
    return new Promise((resolve, reject) => {
      login(data)
        .then(res => {
          let logininfo = res.data
          commit('SET_LOGININFO', logininfo) // 存储登录信息
          console.log(state)
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export default {
  namespaced: false,
  getters,
  state,
  mutations,
  actions,
  modules: {
    //
  }
}
