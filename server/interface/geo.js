import Router from 'koa-router'
import axios from './utils/axios'
import Province from '../dbs/models/province'
import config from './config'

const sign = config.sign
let router = new Router({
  prefix: '/geo'
})


// 获取当前城市定位信息
router.get('/getPosition', async (ctx) => {
  let {status, data: {province,city,ip}} = await axios.get(`http://cp-tools.cn/geo/getPosition?sign=${sign}`)
  
  if(status === 200) {
    ctx.body = {
      province,
      city,
      ip
    }
  } else {
    ctx.body = {
      province: '广东省',
      city: '广州市',
      ip: ''
    }
  }
})

// 获取所有的省份
router.get('/province', async (ctx) => {
  // 从 mongeDB 中获取数据
  let province = await Province.find()

  ctx.body = {
    province
  }
})

export default router