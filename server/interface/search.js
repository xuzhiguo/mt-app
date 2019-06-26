import Router from 'koa-router'
import Pois from '../dbs/models/pois'
import axios from './utils/axios'
import config from './config'

const sign = config.sign

const router = new Router({
  prefix: '/search'
})

// 获取搜索列表
router.get('/pois', async (ctx) => {
    // 通过查 mongoDB 拿数据
    // let result = await Pois.find()

    // ctx.body = {
    //   result
    // }

    // 通过查在线接口拿数据
    try {
      let {status, data: {top}} = await axios.get('/search/top', {
        params: {
          input: ctx.query.input,
          city: ctx.query.city,
          sign
        }
      })
  
      if(status === 200) {
        // 返回前十条
        ctx.body = {
          top: top.slice(0,10)
        }
      } else {
        ctx.body = {
          top: []
        }
      }
    } catch (e) {
      ctx.body = {
        msg: '服务器有点累，请稍后再试~'
      }
    }
})

// 获取热门景点
router.get('/hotPlace', async (ctx) => {
  let city = ctx.query.city

  try {
    let {status, data: {result}} = await axios.get('/search/hotPlace', {
      params: {
        city,
        sign
      }
    })

    if(status === 200) {
      ctx.body = result
    } else {
      ctx.body = []
    }
  } catch (error) {
    ctx.body = {
      status: 500,
      msg: '服务器有点累，请稍后重试~'
    }
  }
})

// 获取首页有格调列表
router.get('/resultsByKeywords', async (ctx) => {
  let {city, keyword} = ctx.query
  let {status, data} = await axios.get('/search/resultsByKeywords', {
    params: {
      city,
      keyword,
      sign
    }
  })

  if(status === 200) {
    ctx.body = data
  } else {
    ctx.body = {}
  }
})

router.get('/products', async (ctx) => {
  let keyword = ctx.query.keyword
  let city = ctx.query.city

  let {status, data:{product, more}} = await axios.get('/search/products', {
    params: {
      keyword,
      city,
      sign
    }
  })

  if(status === 200) {
    more.map((item) => {
      // 把 more 中没图片的数据，赋默认图
      item.photos = item.photos.length === 0? [{url:'http://p0.meituan.net/codeman/ae846a35c5f42565206c3c7b47be3a5310601.png'}]:item.photos
      item.biz_ext.ticket_ordering = item.biz_ext.ticket_ordering?item.biz_ext.ticket_ordering: Math.ceil(Math.random()*100) + 10
      item.biz_ext.cost = typeof item.biz_ext.cost === 'number' && item.biz_ext.cost>0 ?item.biz_ext.cost: Math.ceil(Math.random()*200) + 50
      item.biz_ext.mcost = item.biz_ext.cost + Math.ceil(Math.random()*50)

      return item
    })

    ctx.body = {
      product,
      // 不登录才返回空
      more: ctx.isAuthenticated() ? more : [],
      login: ctx.isAuthenticated()
    }
  } else {
    ctx.body = {
      product: {},
      more: [],
      login: ctx.isAuthenticated()
    }
  }

})

export default router