<template>
    <div class="m-menu">
      <dl class="nav">
        <dt>全部分类</dt>
        <dd v-for="(item,idx) in menu" :key="idx">
          <i :class="item.type"></i>
          {{item.name}}
          <span class="arrow"></span>
        </dd>
      </dl>
    </div>
</template>

<script>
export default {
  data() {
    return {
      menu: [{
        type: 'food',
        name: '美食 '
      }, {
        type: 'takeout',
        name: '外卖'
      }]
    }
  },
  components: {

  }
}
</script>

<style lang="scss">
</style>
