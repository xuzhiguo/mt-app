<template>
    <div class="search-panel">
      <el-row class="m-header-searchbar">
        <el-col :span="3" class="left">
          <img src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png" alt="" srcset="">
        </el-col>
        <el-col :span="15" class="center">
          <div class="wrapper">
            <el-input placeholder="搜索商家或地点"></el-input>
            <button class="el-button el-button-primary">
              <i class="el-icon-search"></i>
            </button>
            <dl class="hotplace" v-show="false">
              <dt>热门搜索</dt>
              <dd>火锅</dd>
              <dd>火锅</dd>
              <dd>火锅</dd>
              <dd>火锅</dd>
              <dd>火锅</dd>
              <dd>火锅</dd>
              <dd>火锅</dd>
              <dd>火锅</dd>
            </dl>
            <dl class="searchList" v-show="false">
              <dd>火锅</dd>
              <dd>火锅</dd>
              <dd>火锅</dd>
              <dd>火锅</dd>
            </dl>
          </div>
          <p class="suggset">
            <a href="#">故宫博物院</a>
            <a href="#">故宫博物院</a>
            <a href="#">故宫博物院</a>
            <a href="#">故宫博物院</a>
            <a href="#">故宫博物院</a>
          </p>
          <ul class="nav">
            <li><nuxt-link to="/mt" class="takeout">美团外卖</nuxt-link></li>
            <li><nuxt-link to="/mt" class="movie">猫眼电影</nuxt-link></li>
            <li><nuxt-link to="/mt" class="hotel">美团酒店</nuxt-link></li>
            <li><nuxt-link to="/mt" class="apartment">民俗/公寓</nuxt-link></li>
            <li><nuxt-link to="/mt" class="business">商家入驻</nuxt-link></li>
          </ul>
        </el-col>
        <el-col :span="6" class="right">
          <ul class="security">
            <li>
              <i class="refund">
                <p class="txt">随时退</p>
              </i>
            </li>
            <li>
              <i class="single">
                <p class="txt">不满意免单</p>
              </i>
            </li>
            <li>
              <i class="overdue">
                <p class="txt">过期退</p>
              </i>
            </li>
          </ul>
        </el-col>
      </el-row>
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

<style lang="scss">
  @import '@/assets/css/public/header/search.scss';
</style>
