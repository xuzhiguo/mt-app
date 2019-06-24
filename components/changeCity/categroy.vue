<template>
  <div>
    <dl class="m-categroy">
      <dt>按拼音首字母选择：</dt>
      <dd v-for="item in list" :key="item">
        <a :href="`#city-${item}`">{{item}}</a>
      </dd>
    </dl>
    
    <dl class="m-categroy-section" v-for="item in block" :key="item.title">
      <dt :id="`city-${item.title}`">{{item.title}}</dt>
      <dd>
        <span v-for="c in item.list" :key="c.city" @click="setPersition(c)">{{c.city}}</span>
      </dd>
    </dl>
  </div>
</template>

<script>
import PinYin from 'js-pinyin'

export default {
  data() {
    return {
      list: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
      block: []
    }
  },
  async created() {
    let _this = this
    let {status, data} = await _this.$axios.get('/geo/city')

    if(status === 200) {
      let f,  // 首字母
      c,      // 首字母的 charcode
      o = {},  // 映射对象
      blocks = []   //临时数组

      // 按首字母分组
      data.forEach((item) => {
        f = PinYin.getFullChars(item.city).slice(0,1)
        c = f.charCodeAt(0)

        // ASCII 大写字母的范围 65~90
        if(c > 64 && c < 91) {
          if(!o[f]) {
            o[f] = []
          }

          o[f].push(item)
        }
      })

      // 数据结构整理
      blocks = Object.entries(o).map((item) => {
        return {
          title: item[0],
          list: item[1]
        }
      })

      // 排序
      this.block = blocks.sort((a,b)=>a.title.charCodeAt(0)-b.title.charCodeAt(0))
    }
  },
  methods: {
    setPersition(data) {
      this.$store.commit('geo/setPosition', data)
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">
  @import '@/assets/css/changecity/categroy.scss'
</style>
