<template>
  <div class="m-iselect">
    <span class="name">按省份选择：</span>
    <el-select v-model="pvalue" placeholder="省份" class="province">
      <el-option v-for="item in province" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <el-select v-model="cvalue" :disabled="!city.length" placeholder="城市" class="city">
      <el-option v-for="item in city" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <span class="name">直接搜索：</span>
    <el-autocomplete v-model="input" :fetch-suggestions="querySearchAsync" class="input"
      placeholder="请输入城市中文或拼音" @select="handleSelect">
    </el-autocomplete>
  </div>
</template>

<script>
import _ from 'lodash'
import PinYin from 'js-pinyin'

export default {
  data() {
    return {
      province: [],
      pvalue: '',
      city: [],
      cvalue: '',
      input: '',
      cityList: []
    }
  },
  methods: {
    querySearchAsync: _.debounce(async function(query, done) {
      let _this = this
      
      if(!query) {
        done([])
        return
      }

      // 如果已经获取过全国城市
      if(this.cityList.length > 0) {
        done(this.cityList.filter((item) => {
            return item.value.indexOf(query) > -1 || _this.changePinyin(item.value).indexOf(query.toUpperCase()) > -1
        }))
      } else {
        // 获取全国城市数据
        let {status, data} = await _this.$axios.get('/geo/city')
        
        if(status === 200) {
          data.forEach((item) => {
            item.value.forEach((e) => {
              _this.cityList.push({
                value: e.name === '市辖区'?e.province:e.name,
                province: e.province
              })
            })
          });

          let result = this.cityList.filter((item) => {
              return item.value.indexOf(query) > -1 || _this.changePinyin(item.value).indexOf(query.toUpperCase()) > -1
          })
          done(result)
        } else {
          done([])
        }
      }
    }, 200),
    handleSelect({province, value}) {
      this.$store.commit('geo/setPosition', {province: province, city: value})
      this.$router.push('/')
    },
    changePinyin(key) {
      return PinYin.getFullChars(key).toUpperCase()
    }
  },
  async created() {
    let _this = this
    // 查询所有省份
    let {status, data} = await _this.$axios.get('/geo/province')
    if(status === 200) {
      this.province = data.map((item) => {
        return {
          label: item.value[0],
          value: item.id
        }
      })
    }
  },
  watch: {
    pvalue: async function (newValue) {
      let _this = this
      //省份变化清空城市的值
      this.cvalue = ''

      // 监听省份，变化时重新获取城市
      let {status, data} = await _this.$axios.get(`/geo/province/${newValue}`)

      console.log(data)
      if(status === 200 && data.value) {
        this.city = data.value.map((item) => {
          return {
            label: item.name,
            value: item.id
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">
  @import '@/assets/css/changecity/iselect.scss'
</style>
