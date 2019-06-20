<template>
    <div class="m-geo">
      <i class="el-icon-location"></i>
      {{$store.state.geo.position.city}}
      <nuxt-link
        class="changeCity"
        to="/changeCity">切换城市</nuxt-link>
        [广州 深圳 南宁]
    </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  components: {

  }
}
</script>

<style lang="scss" scoped>
</style>
