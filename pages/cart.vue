<template>
  <div class="page-cart">
    <el-row>
      <el-col v-if="cart.length" class="m-cart">
        <list :cartData="cart" />
        <p>
          应付金额：<em class="money">￥{{total}}</em>
        </p>
        <div class="post">
          <el-button type="primary" @click="submit">提交订单</el-button>
        </div>
      </el-col>
      <el-col v-else class="empty">购物车为空</el-col>
    </el-row>
  </div>
</template>

<script>
import List from '../components/cart/list'
import { async } from 'q';

export default {
  components: {
    List
  },
  computed: {
    total() {
      let total = 0

      this.cart.forEach((item) => {
        total += item.price * item.count
      })
      return total
    }
  },
  methods: {
    submit: async function () {
      let _this = this
      let {status, data: {code, id}} = await _this.$axios.post('/order/create', {
        count: _this.cart[0].count,
        price: _this.cart[0].price,
        id: _this.cartNo
      })

      if(status === 200 && code === 0) {
        this.$alert(`恭喜您已成功下单，订单号：${this.cartNo}`, '下单成功', {
          confirmButtonText: '确定',
          callback: action => {
            _this.$router.push('/order')
          }
        })
      } else {
        this.$alert(`服务器有点累，请稍后重试`, '下单失败', {
          confirmButtonText: '确定'
        })
      }
    }
  },
  async asyncData(ctx) {
    let {id} = ctx.query
    let {status, data:{code, data}} = await ctx.$axios.post('/cart/getCart', { id })

    if(status === 200 && code === 0) {
      return {
        cart: data.map((item) => {
          item.count = 1
          return item
        }),
        cartNo: id
      }
    } else {
      return {
        cart: [],
        cartNo: id
      }
    }
  }
}
</script>

<style lang="scss">
  @import '@/assets/css/cart/index.scss'
</style>
