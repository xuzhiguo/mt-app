import Router from 'koa-router'
import Order from '../dbs/models/order'
import Cart from '../dbs/models/cart'
import md5 from 'crypto-js/md5'

const router = new Router({
  prefix: '/order'
})

// 创建订单接口
router.post('/create', async (ctx) => {
  let {id, count, price} = ctx.request.body

  let time = Date()
  let orderId = md5(Math.random() * 1000 + time).toString()

  if(!ctx.isAuthenticated()) {
    // 没登录
    ctx.body = {
      code: -1,
      msg: '请先登录'
    }
  } else {
    let cartInfo = await Cart.findOne({cartNo: id})
    if(!cartInfo) {
      ctx.body = {
        code: -1,
        msg: '没找到该订单'
      }
      return
    }

    let order = new Order({
      id: orderId,
      user: ctx.session.passport.user,
      total: count * price,
      images: cartInfo.detail[0].imgs,
      name: cartInfo.detail[0].name,
      count,
      time,
      status: 0
    })

    try {
      let result = await order.save()
      if(result) {
        // 移除待付款记录
        await cartInfo.remove()

        ctx.body = {
          code: 0,
          id: orderId
        }
      } else {
        ctx.body = {
          code: -1,
          msg: '失败'
        }
      }
    } catch (error) {
      ctx.body = {
        code: -1,
        msg: error
      }      
    }
  }
})

// 获取订单
router.post('/getOrder', async (ctx) => {
  if(!ctx.isAuthenticated()) {
    // 没登录
    ctx.body = {
      code: -1,
      list: [],
      msg: '请先登录'
    }
  } else {
    try {
      let result = await Order.find()
      if(result) {
        ctx.body = {
          code: 0,
          list: result
        }
      } else {
        ctx.body = {
          code: -1,
          list: []
        }
      }
    } catch (error) {
      ctx.body = {
        code: -1,
        list: []
      }
    }
  }
})


export default router