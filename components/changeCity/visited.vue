<template>
  <div class="m-hcity">
    <dl>
      <dt>最近访问：</dt>
      <dd v-for="(item,idx) in list" :key="idx">{{item.city.replace('市','')}}</dd>
    </dl>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
