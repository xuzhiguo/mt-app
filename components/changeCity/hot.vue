<template>
  <div class="m-hcity">
    <dl>
      <dt>热门城市：</dt>
      <dd v-for="(item,idx) in list" @click="setCity(item)" :key="idx">{{item | nameFt}}</dd>
    </dl>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  },
  methods: {
    setCity({province, name}) {
      if(name === '市辖区') {
        this.$store.commit('geo/setPosition', {province, city: province})
      } else {
        this.$store.commit('geo/setPosition', {province, city: name})
      }
      this.$router.push('/')
    }
  },
  async created() {
    let _this = this
    let {status, data} = await _this.$axios.get('/geo/hot')

    if(status === 200) {
      this.list = data
    }
  },
  filters: {
    nameFt(data) {
      if(data.name === '市辖区') {
        return data.province.replace('市', '')
      } else {
        return data.name.replace('市', '')
      }
    }
  }
}
</script>

<style lang="scss">
  @import '@/assets/css/changecity/hot.scss'
</style>
