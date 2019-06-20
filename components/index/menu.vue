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
    }
  },
  computed: {
    curdetail() {
      return this.menu.filter((item) => item.type === this.kind)[0]
    },
    menu() {
      return this.$store.state.home.menu
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
  },
}
</script>

<style lang="scss">
</style>
