import Vue from 'vue'
import Vuex from 'vuex'
import geo from './modules/geo'
import home from './modules/home'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  modules: {
    geo,
    home
  },
  actions: {
    // nuxt 生命周期钩子
    async nuxtServerInit({commit}, {app, store}) {
      {
        // 获取城市定位
        const {status, data: {province, city}} = await app.$axios.get('/geo/getPosition')
      
        if(status === 200) {
          commit('geo/setPosition', {province, city})
        } else {
          commit('geo/setPosition', {province:'', city: ''})
        }
      }

      {
        // 获取菜单
        const {status, data: {menu}} = await app.$axios.get('/home/menu')
  
        if(status === 200) {
          commit('home/setMenu', menu)
        }
      }

      {
        // 获取热门景点推荐
        const {status, data} = await app.$axios.get('/search/hotPlace', {
          params: {
            city: app.store.state.geo.position.city?app.store.state.geo.position.city.replace('市', ''): '广州'
          }
        })
        
        if(status === 200) {
          commit('home/setHotPlace', data)
        }
      }
    }
  }
})

export default store