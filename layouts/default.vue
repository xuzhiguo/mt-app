<template>
  <el-container class="layout-default">
    <el-header class="layout-header" :height="h">
      <my-header />
    </el-header>
    <el-main>
      <nuxt />
    </el-main>
    <el-footer height="100%">
      <my-footer />
    </el-footer>
  </el-container>
</template>
<script>
import MyHeader from '@/components/public/header/index.vue' 
import MyFooter from '@/components/public/footer/index.vue'

export default {
  components: {
    MyHeader,
    MyFooter
  },
  computed: {
    h() {
      let rt = this.$route.name

      return rt==='index'?'197px':'157px';
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/public/layout.scss";
</style>


