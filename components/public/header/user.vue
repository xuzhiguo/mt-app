<template>
    <div class="m-user">
      <template v-if="user">
        欢迎您，<span class="username">{{ user }}</span>
        <nuxt-lint to="/exit">退出</nuxt-lint>
      </template>
      <template v-else>
        <nuxt-link to="/login" class="login">立即登录</nuxt-link>
        <nuxt-link to="/register" class="register">注册</nuxt-link>
      </template>
    </div>
</template>

<script>
export default {
  data() {
    return {
      user: ''
    }
  },
  components: {

  }
}
</script>

<style lang="scss">
</style>
