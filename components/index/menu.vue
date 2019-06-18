<template>
    <div class="m-menu">
      <dl class="nav" @mouseleave="mouseleave" >
        <dt>全部分类</dt>
        <dd v-for="(item,idx) in menu" @mouseenter="enter(item.type)">
          <i :class="item.type"></i>
          {{item.name}}
          <span class="arrow"></span>
        </dd>
      </dl>
      <div class="detail" v-if="kind" @mouseenter="sover" @mouseleave="sout">
        <template v-for="(item,idx) in curdetail.child" >
            <div :key="idx">
              <h4>{{item.title}}</h4>
              <span v-for="v in item.child" :key="v">{{v}}</span>
            </div>
        </template>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      kind: '',
      menu: [{
        type: 'food',
        name: '美食',
        child: [{
          title: '美食',
          child: ['代金券', '甜点饮品', '火锅', '自助餐', '小吃快餐']
        }]
      }, {
        type: 'takeout',
        name: '外卖',
        child: [{
          title: '外卖',
          child: ['代金券', '甜点饮品', '火锅', '自助餐', '小吃快餐']
        }, {
          title: '外卖',
          child: ['代金券', '甜点饮品', '火锅', '自助餐', '小吃快餐']
        }]
      }, {
        type: 'hotel',
        name: '酒店',
        child: [{
          title: '酒店',
          child: ['经济型', '舒适/三星', '高档/四星', '豪华/五星']
        }]
      }]
    }
  },
  computed: {
    curdetail() {
      return this.menu.filter((item) => item.type === this.kind)[0]
    }
  },
  methods: {
    mouseleave() {
      let _this = this;
      _this.timer = setTimeout(() => {
        _this.kind = ''
      }, 150);
    },
    enter(type) {
      this.kind = type
    },
    sover() {
      clearTimeout(this.timer)
    },
    sout() {
      this.kind = ''
    }
  }
}
</script>

<style lang="scss">
</style>
