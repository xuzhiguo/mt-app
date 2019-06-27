import Router from 'koa-router'
import Cart  from '../dbs/models/cart'
import md5 from 'crypto-js/md5'


let router = new Router({
  prefix: '/cart'
})

// 创建订单
router.post('/create', async (ctx) => {
  if(!ctx.isAuthenticated()) {
    // 没登录
    ctx.body = {
      code: -1,
      msg: '请先登录，再创建订单'
    }
  } else {
    let time = Date()
    let cartNo = md5(Math.random()*1000 + time).toString()
    let {params:{id,detail}} = ctx.request.body
    let cart = new Cart({
      id,
      cartNo,
      time,
      user: ctx.session.passport.user,
      detail
    })

    let result = await cart.save()
    if(result) {
      ctx.body = {
        code: 0,
        msg: '',
        id: cartNo
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '创建订单失败'
      }
    }
  }
})

// 获取订单
router.post('/getCart', async (ctx) => {
  let {id} = ctx.request.body

  try {
    let result = await Cart.findOne({cartNo: id})
    ctx.body = {
      code: 0,
      data: result?result.detail: {}
    }
  } catch (error) {
    ctx.body = {
      code: -1,
      msg: '获取订单失败'
    }
  }
})

export default router