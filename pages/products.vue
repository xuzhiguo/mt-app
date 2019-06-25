<template>
  <el-row class="page-product">
    <el-col :span="19">
      <crumbs :keyword="keyword" />
      <categroy :types="types" :areas="areas" />
      <list :list="list" :changePoint="changePoint" />
    </el-col>
    <el-col :span="5">
      <cmap v-if="point.length" :width="230" :height="290" :point="point" />
    </el-col>
  </el-row>
</template>

<script>
import Crumbs from '../components/products/crumbs'
import Categroy from '../components/products/categroy'
import List from '../components/products/list'
import Iselect from '../components/products/iselect'
import Cmap from '../components/public/map'

export default {
  components: {
    Crumbs,
    Categroy,
    List,
    Iselect,
    Cmap
  },
  data() {
    return {
      types: [],
      areas: [],
      list: [],
      keyword: '',
      point: []
    }
  },
  async asyncData({query, store, $axios}) {
    let keyword = decodeURIComponent(query.keyword)
    let city = store.state.geo.position.city
    
    let {status, data:{count,pois}} = await $axios.get('/search/resultsByKeywords', {
      params: {
        city,
        keyword
      }
    })

    let {status:status1, data:{areas,types}} = await $axios.get('/categroy/crumbs', {
      params: {
        city
      }
    })

    if(status === 200 && count > 0 && status1 === 200) {
      return {
        list: pois.filter(item => item.photos.length).map((item) => {
          return {
            type: item.type,
            img: item.photos[0].url,
            name: item.name,
            comment: Math.floor(Math.random()*10000),
            rate: Number(item.biz_ext.rating),
            price: Number(item.biz_ext.cost),
            scene: item.tag,
            tel: item.tel,
            status: '可订明日',
            location: item.location,
            module: item.type.split(';')[0]
          }
        }),
        keyword,
        areas: areas.filter(item=>item.type!=='').slice(0,5),
        types: types.filter(item=>item.type!=='').slice(0,5),
        point: (pois.find(item=>item.location).location||'').split(',')
      }
    }

  },
  methods: {
    changePoint(location) {
      this.point = location.split(',')
    }
  }
}
</script>

<style lang="scss">
  @import '@/assets/css/products/index.scss'
</style>
