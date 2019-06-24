<template>
  <div class="m-hcity">
    <dl>
      <dt>最近访问：</dt>
      <dd v-for="(item,idx) in list" :key="idx" @click="setPosition(item)">{{item.city.replace('市','')}}</dd>
    </dl>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {
    setPosition(item) {
      let city = this.$store.state.geo.position.city
      
      // 如果选中的不是当前城市才进行提交操作
      if(item.city !== city) {
        this.$store.commit('geo/setPosition', item)
      }

      this.$router.push('/')
    }
  },
  computed: {
    list() {
      return this.$store.state.geo.hisPos
    }
  }
}
</script>

<style lang="scss">
  @import '@/assets/css/changecity/hot.scss'
</style>
