import Router from 'koa-router'
import axios from './utils/axios'
import config from './config'

let router = new Router({
  prefix: '/categroy'
})
let sign = config.sign

router.get('/crumbs', async (ctx) => {
  let {status, data:{areas, types}} = await axios.get('/categroy/crumbs', {
    params: {
      city: ctx.query.city.replace('市', ''),
      sign
    }
  })

  if(status === 200) {
    ctx.body = {
      areas: areas,
      types: types
    }
  } else {
    ctx.body = {
      areas: [],
      types: []
    }
  }

})


export default router