<template>
  <div class="m-crumbs">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>
        <nuxt-link to="/">
          {{ $store.state.geo.position.city.replace('市','') }}美团
        </nuxt-link>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <nuxt-link :to="{path:`/products`,query:{keyword:prevword}}">
          {{ $store.state.geo.position.city.replace('市','') }}{{ type }}
        </nuxt-link>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        {{ $store.state.geo.position.city.replace('市','') }}{{ decodeURIComponent(keyword) }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  props: {
    keyword: {
      type:String,
      default:''
    },
    type: {
      type:String,
      default:''
    }
  },
  computed: {
    prevword() {
      return this.$route.query.prevword
    }
  }
}
</script>