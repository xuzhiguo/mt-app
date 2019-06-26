<template>
  <div class="m-products-list" id="m-products-list">
    <dl>
      <dd v-for="(item,idx) in nav" :key="item.name" :class="[item.name,item.acitve?'s-nav-active':'']" @click="navSelect(idx)">{{ item.txt }}</dd>
    </dl>
    <ul>
      <Item v-for="(item,idx) in copyList[activeIndex]" :key="idx" :meta="item" />
    </ul>
  </div>
</template>

<script>
let oTop      
const iHeight = 170   // 列表项的高度

import Item from './product.vue'
export default {
  components: {
    Item
  },
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      nav: [
        {
          name: 's-default',
          txt: '智能排序',
          acitve: true
        }, {
          name: 's-price',
          txt: '价格最低',
          active: false
        }, {
          name: 's-visit',
          txt: '人气最高',
          active: false
        }, {
          name: 's-comment',
          txt: '评价最高',
          active: false
        }
      ],
      copyList: [],
      oIndex: 0
    }
  },
  async asyncData({ app }) {
    let { data } = await app.$axios.get('searchList')
    return { items: data.list }
  },
  methods: {
    navSelect(idx) {
      this.nav = this.nav.map((item, i) => {
        if(idx === i) {
          item.acitve = true
        } else {
          item.acitve = false
        }

        return item
      })
    },
    handleScroll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop

      // list距离顶部的距离 1个 list项的高度为 170px
      // 当滚动距离到达第一个的高度时，才开始切换
      if(scrollTop > oTop) {
        this.oIndex = Math.ceil((scrollTop - oTop) / iHeight)
        this.$emit('changeIsTop', true)
        
        let list = this.copyList[this.activeIndex][this.oIndex]
        if(list) {
          let point = list.location
          this.$emit('changePoint', point)
        } else {
          // 高度已经大于列表，隐藏地图
          this.$emit('changeIsTop', false)
        }

      } else {
        // 小于则显示第一个的坐标
        this.oIndex = 0
        this.$emit('changeIsTop', false)
        
        let point = this.copyList[this.activeIndex][0].location
        this.$emit('changePoint', point)
      }

    }
  },
  mounted() {
    // 模拟数据返回的价格都是 0，为了看起来好看点，用随机数来填充
    let list = this.list.map((item) => {
      item.price = item.price === 0?parseInt(Math.random()*100):item.price
      return item
    })

    // 默认列表
    this.copyList.push(list)
  
    // 价格最低
    this.copyList.push(copyArr(list).sort((a,b) => a.price - b.price))

    // 人气最高
    this.copyList.push(copyArr(list).sort((a,b) => b.comment - a.comment))

    // 评价最高
    this.copyList.push(copyArr(list).sort((a,b) => b.rate - a.rate))

    // 列表距离顶部的距离 + 头部的高度
    oTop = document.querySelector('#m-products-list').offsetTop + 157

    // 地图相关，监听滚动
    window.addEventListener('scroll', this.handleScroll)
  },
  computed: {
    activeIndex() {
      return this.nav.findIndex(item => item.acitve)
    }
  },
  watch: {
    activeIndex(newVal) {
      let point = this.copyList[newVal][0].location
      this.$emit('changePoint', point)
    }
  }
}

function copyArr(arr) {
  return JSON.parse(JSON.stringify(arr))
}
</script>