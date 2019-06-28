import Router from 'koa-router'
import Redis from 'koa-redis'
import nodeMailer from 'nodemailer'

import User from '../dbs/models/users'
import Passport from './utils/passport'
import Email from '../dbs/config'
import axios from './utils/axios'

let router = new Router({
  prefix: '/users'
})

let Store = new Redis().client

// 注册接口
router.post('/signup', async (ctx) => {
  const {
    username,
    password,
    email,
    code
  } = ctx.request.body;

  // 验证验证码的问题
  if(code) {
    // 从 redis 中取出之前发送的 code , 前缀为 nodemail + username
    const saveCode = await Store.hget(`nodemail:${username}`, 'code')
    // 从 redis 中取出 过期时间
    const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
    console.log('----------------' + saveCode)

    if(code === saveCode) {
      if(new Date().getTime - saveExpire > 0) {
        ctx.body = {
          code: -1,
          msg: '验证码已过期，请重新获取'
        }
        return
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '请填写正确的验证码'
      }
      return
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '请填写验证码'
    }
    return
  }

  // 验证用户名
  let user = await User.find({
    username
  })

  if(user.length > 0) {
    // 用户名已被注册
    ctx.body = {
      code: -1,
      msg: '用户名已被注册'
    }
    return 
  }

  // 以上验证全通过，把用户写入库
  let nuser = await User.create({
    username,
    password,
    email
  })

  // 入库成功，自动登录
  // if(nuser) {
  //   let res = await axios.post('/users/signin', {
  //     username,
  //     password
  //   })
    
  //   console.log(username, res.data)
  //   if(res.data && res.data.code === 0) {
  //     ctx.body = {
  //       code: 0,
  //       msg: '注册成功',
  //       user: res.data.user
  //     }
  //   } else {
  //     ctx.body = {
  //       code: -2,
  //       msg: '注册成功，自动登录失败'
  //     }
  //   }
  // } else {
  //   ctx.body = {
  //     code: -1,
  //     msg: '注册失败'
  //   }
  // }

  console.log(nuser)
  if(nuser) {
    ctx.body = {
      code: 0,
      msg: '注册成功'
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '注册失败'
    }
  }

})

// 登录接口
router.post('/signin', async (ctx, next) => {
  return Passport.authenticate('local', function(err, user, info, status) {
    if(err) {
      ctx.body = {
        code: -1,
        msg: err
      }
    } else {
      if(user) {
        ctx.body = {
          code: 0,
          msg: '登录成功',
          user
        }
        
        return ctx.login(user)
      } else {
        ctx.body = {
          code: 1,
          msg: info
        }
      }
    }
  })(ctx, next)
})

// 验证码接口
router.post('/verify', async (ctx, next) => {
  // 请求参数中的 用户名
  let username = ctx.request.body.username

  // 取过期时间
  const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
  
  // 没超过到期时间，则提示获取过于频繁
  if(saveExpire && new Date().getTime() - saveExpire < 0) {
    ctx.body = {
      code: -1,
      msg: '验证码请求过于频繁，1分钟内1次'
    }

    return false
  }

  // 创建smtp服务
  let transporter = nodeMailer.createTransport({
    host: Email.smtp.host,
    port: 587,
    secure: false,
    auth: {
      user: Email.smtp.user,
      pass: Email.smtp.pass
    }
  })

  let ko = {
    code: Email.smtp.code(),      // 验证码
    expire: Email.smtp.expire(),  // 验证码过期时间
    email: ctx.request.body.email,  // 发送到哪个邮箱
    user: ctx.request.body.username   // 发送的用户名
  }

  let mailOptions = {
    from: `认证邮件 <${Email.smtp.user}>`,
    to: ko.email,
    subject: '高仿美团注册码',
    html: `您的验证码为${ko.code}`
  }

  // 发送邮件
  await transporter.sendMail(mailOptions, (err,info) => {
    if(err) {
      return console.log('邮件发送失败');
    } else {
      // 存到 redis
      Store.hmset(`nodemail:${ko.user}`, 'code', ko.code, 'expire', ko.expire, 'email', ko.email)
    }
  })

  ctx.body = {
    code: 0,
    msg: '验证码已发送，可能会会有延迟，有效期1分钟'
  }
})

// 注销登陆接口
router.get('/exit', async (ctx, next) => {
  await ctx.logout()
  
  // 验证是否成功注销
  if(!ctx.isAuthenticated()) {
    ctx.body = {
      code: 0,
      msg: '注销登陆成功'
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '注销登陆失败'
    }
  }
})

// 获取用户信息
router.get('/getUser', async (ctx) => {
  if(ctx.isAuthenticated()) {
    const {username, email} = ctx.session.passport.user

    ctx.body = {
      user: username,
      email
    }
  } else {
    ctx.body = {
      user: '',
      email: ''
    }
  }
})

export default router


