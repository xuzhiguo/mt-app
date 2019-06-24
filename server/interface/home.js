import Router from 'koa-router'
import axios from './utils/axios'
import config from './config'

const sign = config.sign

const router = new Router({
  prefix: '/home'
})

router.get('/menu', async (ctx) => {
  try {
    let {status, data: {menu}} = await axios.get(`/geo/menu?sign=${sign}`)
    if(status === 200) {
      ctx.body = {
        menu
      }
    }
  } catch (error) {
    ctx.body = {
      status: 500,
      msg: error
    }
  }
})

export default router