<template>
  <section class="m-istyle">
    <dl>
      <dt>有格调</dt>
      <dd v-for="(item, idx) in menuList" :class="{active:kind=== item.kind}"
        @mouseover="over(item.kind, item.keyword)" :key="idx">{{item.name}}</dd>
    </dl>
    <ul class="ibody">
      <li
        v-for="item in cur"
        :key="item.title">
        <el-card
          :body-style="{ padding: '0px' }"
          shadow="never">
          <img
            :src="item.img"
            class="image">
          <ul class="cbody">
            <li class="title">{{ item.title }}</li>
            <li class="pos"><span>{{ item.pos }}</span></li>
            <li class="price" v-if="item.price>0">￥<em>{{ item.price }}</em><span>/起</span></li>
            <li class="price" v-else>暂无价格</li>
          </ul>
        </el-card>
      </li>
      <div v-show="cur.length == 0" style="text-align:center;width:100%">
        暂无相关推荐
      </div>
    </ul>
  </section>
</template>
<script>
export default {
  data: () => {
    return {
      kind: 'all',
      menuList: [
        {name: '全部', kind: 'all', keyword: '景点'},
        {name: '约会聚餐', kind: 'part', keyword: '美食'},
        {name: '丽人SPA', kind: 'spa', keyword: '丽人'},
        {name: '电影演出', kind: 'movie', keyword: '电影'},
        {name: '品质出游', kind: 'travel', keyword: '旅游'}
      ],
      list: {
        all: [],
        part: [],
        spa: [],
        movie: [],
        travel: []
      }
    }
  },
  computed: {
    cur: function () {
      return this.list[this.kind]
    }
  },
  async mounted(){
    let _this = this;
    let {status, data: {count, pois}} = await _this.$axios.get('/search/resultsByKeywords', {
      params: {
        city: _this.$store.state.geo.position.city,
        keyword: '景点'
      }
    })

    if(status === 200  && typeof count === 'number' && count > 0) {
      //过滤没图的，构建对应数据结构
      this.list.all = pois.filter((item) => item.photos.length).slice(0,6).map((item) => {
        return {
          title: item.name,
          img: item.photos[0].url,
          pos: item.type.split(';')[0],
          price: typeof item.biz_ext.cost === 'string'?item.biz_ext.cost:0
        }
      })
    }
  },
  methods: {
    over: async function(kind, keyword) {
      let _this = this
      this.kind = kind

      if(this.list[kind].length > 0) {
        return
      }

      let {status, data: {count, pois}} = await _this.$axios.get('/search/resultsByKeywords', {
        params: {
          city: _this.$store.state.geo.position.city,
          keyword
        }
      })

      if(status === 200  && typeof count === 'number' && count > 0) {
        //过滤没图的，构建对应数据结构
        this.list[kind] = pois.filter((item) => item.photos.length).slice(0,6).map((item) => {
          return {
            title: item.name,
            img: item.photos[0].url,
            pos: item.type.split(';')[0],
            price: typeof item.biz_ext.cost === 'string'?item.biz_ext.cost:0
          }
        })
      }
    }
  },

}
</script>
<style lang="scss">
    @import "@/assets/css/index/artistic.scss";
</style>
