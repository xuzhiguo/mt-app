<template>
  <el-row class="page-product">
    <el-col :span="19"></el-col>
    <el-col :span="5"></el-col>
    <crumbs />
  </el-row>
</template>

<script>
import Crumbs from '../components/products/crumbs'
import Categroy from '../components/products/categroy'
import List from '../components/products/list'
import Iselect from '../components/products/iselect'

export default {
  components: {
    Crumbs,
    Categroy,
    List,
    Iselect
  },
  async asyncData(ctx) {
    
  },
}
</script>

<style lang="scss">
  @import '@/assets/css/products/index.scss'
</style>
