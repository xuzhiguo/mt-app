import Router from 'koa-router'
import axios from './utils/axios'
import Province from '../dbs/models/province'
import City from '../dbs/models/city'
import config from './config'

const sign = config.sign
let router = new Router({
  prefix: '/geo'
})


// 获取当前城市定位信息
router.get('/getPosition', async (ctx) => {
  let {
    status,
    data: {
      province,
      city
    }
  } = await axios.get(`/geo/getPosition?sign=${sign}`)

  if (status === 200) {
    ctx.body = {
      province,
      city
    }
  } else {
    ctx.body = {
      province: '广东省',
      city: '广州市'
    }
  }
})

// 获取所有的省份
router.get('/province', async (ctx) => {
  // 从 mongeDB 中获取数据
  let province = await Province.find()

  ctx.body = province
})

// 获取指定省份的城市
router.get('/province/:id', async (ctx) => {
  let city = await City.find({
    id: ctx.params.id
  })

  ctx.body = city[0]
})

// 获取全国所有城市
router.get('/city', async (ctx) => {
  let city = await City.find()

  let list = []
  city.forEach((item) => {
      item.value.forEach((e) => {
        /**
         * 如果是 省直辖县级行政区划 就算了.........
         * 这个 cities.dat 有点坑爹，居然有这种数据zzzzzz...
         * {province:'河北省',name:'省直辖县级行政区划',id:139000}
         */
        if(e.name !== '省直辖县级行政区划') {
          list.push({
            city: e.name === '市辖区'?e.province:e.name,
            province: e.province
          })
        }
      })
  });

  ctx.body = list
})

// 获取热门城市
router.get('/hot', async (ctx) => {
  let list = [
    '北京市',
    '上海市',
    '广州市',
    '深圳市',
    '天津市',
    '西安市',
    '杭州市',
    '南京市',
    '武汉市',
    '成都市'
  ]

  // 先取出所有的城市
  let city = await City.find()

  let hlist = [];
  // 过滤出热门城市
  city.forEach((item) => {
    hlist = hlist.concat(item.value.filter(k => list.includes(k.name) || list.includes(k.province) ))
  })

  ctx.body = hlist
})

export default router
