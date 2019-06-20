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
      let {status, data: {top}} = await axios.get('http://cp-tools.cn/search/top', {
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

  let {status, data: {result}} = await axios.get('http://cp-tools.cn/search/hotPlace', {
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
})

// 获取首页有格调列表
router.get('/resultsByKeywords', async (ctx) => {
  let {city, keyword} = ctx.query
  let {status, data} = await axios.get('http://cp-tools.cn/search/resultsByKeywords', {
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

export default router