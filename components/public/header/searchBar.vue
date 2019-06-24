<template>
    <div class="search-panel">
      <el-row class="m-header-searchbar">
        <el-col :span="3" class="left">
          <nuxt-link to="/">
            <img src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png" alt="" srcset="">
          </nuxt-link>
        </el-col>
        <el-col :span="15" class="center">
          <div class="wrapper">
            <el-input  v-model="search" placeholder="搜索商家或地点" @input="input"  @focus="isFocus=true" @blur="blur"></el-input>
            <button class="el-button el-button--primary">
              <i class="el-icon-search"></i>
            </button>
            <dl class="hotPlace" v-show="isHotplace">
              <dt>热门搜索</dt>
              <dd v-for="(item,idx) in hotPlace.slice(0,4)" :key="idx">{{item.name}}</dd>
            </dl>
            <dl class="searchList" v-show="isSearchList">
              <dd v-for="(item,idx) in searchList" :key="idx">{{item.name}}</dd>
            </dl>
          </div>
          <p class="suggest">
            <a href="#" v-for="(item,idx) in hotPlace.slice(0,4)" :key="idx">{{item.name}}</a>
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
import _ from 'lodash'
import { async } from 'q';

export default {
  data() {
    return {
      search: '',
      isFocus: false,
      searchList: []
    }
  },
  components: {

  },
  computed: {
    isHotplace() {
      return this.isFocus && !this.search
    },
    isSearchList() {
      return this.isFocus && this.search
    },
    hotPlace() {
      return this.$store.state.home.hotPlace
    }
  },
  methods: {
    blur() {
      let _this = this
      setTimeout(()=> {
        _this.isFocus=false
      },200)
    },
    // debounce（防抖动）函数，延迟300ms执行
    input: _.debounce(async function() {
      let _this = this;
      if(!this.search) {
        // 关键词为空，不查
        return
      }

      let {status, data:{top}} = await _this.$axios.get('/search/pois', {
        params: {
          input: _this.search,
          city: _this.$store.state.geo.position.city.replace('市', '')
        }
      })  

      if(status === 200 && _.isArray(top) && top.length > 0) {
        this.searchList = top
      } else {
        this.searchList = [{name: '暂无相关推荐'}]
      }
    }, 300)
  }
}
</script>

<style lang="scss">
  @import '@/assets/css/public/header/search.scss';
</style>
