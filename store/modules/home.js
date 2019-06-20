const state = () => ({
  menu: [],    // 首页菜单
  hotPlace: []    // 首页热门景点
})

const mutations = {
  setMenu(state, data) {
    state.menu = data
  },
  setHotPlace(state, data) {
    state.hotPlace = data
  }
}

const actions = {
  setMenu: ({commit}, data) => {
    commit('setMenu', data)
  },
  setHotPlace: ({commit}, data) => {
    commit('setHotPlace', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}