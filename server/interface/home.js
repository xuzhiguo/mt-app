import Router from 'koa-router'
import axios from './utils/axios'
import config from './config'

const sign = config.sign

const router = new Router({
  prefix: '/home'
})

router.get('/menu', async (ctx) => {
  let {status, data: {menu}} = await axios.get(`http://cp-tools.cn/geo/menu?sign=${sign}`)
  if(status === 200) {
    ctx.body = {
      menu
    }
  }
})

export default router