const state =  ()=> ({
  position: {},
  hisPos: []
})

const mutations = {
  setPosition(state, data) {
    state.position = data

    // 添加到最近访问城市里
    state.hisPos = state.hisPos.filter(item => item.city !== data.city)
    state.hisPos.unshift(data)
  }
}

const actions = {
  setPosition: ({commit}, data) => {
    commit('setPosition', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}