<template>
  <div class="page-changeCity">
    <el-row>
      <el-col>
        <iselect /> 
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <hot />
      </el-col>
    </el-row>
    <el-row>
      <el-col></el-col>
    </el-row>
  </div>
</template>

<script>
import Iselect from '../components/changeCity/iselect'
import Hot from '../components/changeCity/hot'

export default {
  data() {
    return {

    }
  },
  components: {
    Iselect,
    Hot
  }
}
</script>

<style>
</style>
