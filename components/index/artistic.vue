<template>
  <section class="m-istyle">
    <dl>
      <dt>有格调</dt>
      <dd v-for="(item, idx) in menuList" :class="{active:kind=== item.kind}"
        @mouseover="over(item.keyword)" :key="idx">{{item.name}}</dd>
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
            <li class="price">￥<em>{{ item.price }}</em><span>/起</span></li>
          </ul>
        </el-card>
      </li>
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
    
  },
  methods: {
    over: async (keyword) => {
      let _this = this;
      let {status, data: {count, pois}} = await _this.$axios.get('/search/resultsByKeywords', {
        params: {
          city: _this.$store.state.geo.position.city,
          keyword
        }
      })
      
      if(status === 200  && typeof count === 'number' && count > 0) {
        this.list = pois
      }
    }
  },

}
</script>
<style lang="scss">
    @import "@/assets/css/index/artistic.scss";
</style>
