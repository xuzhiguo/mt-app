<template>
  <div class="page-register">
    <article class="header">
      <header>
        <a href="/" class="site-logo"></a>
        <span class="login">
          <em class="bold">已有美团账号？</em>
          <a href="/login">
            <el-button type="primary" size="small">登录</el-button>
          </a>
        </span>
      </header>
    </article>

    <section>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="昵称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
          <el-button size="mini" @click="sendMsg">发送验证码</el-button>
          <span class="status">{{statusMsg}}</span>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input  v-model="ruleForm.code" maxlength="4"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="ruleForm.pwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="cpwd">
          <el-input v-model="ruleForm.cpwd" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register">同意以下协议并注册</el-button>
          <div class="error">{{error}}</div>
        </el-form-item>
        <el-form-item>
          <a class="f1" href="http://www.meituan.com/about/terms" target="_blank">《美团网用户协议》</a>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import CryptoJs from 'crypto-js'

export default {
  layout: 'blank',
  data() {
    return {
      statusMsg: '',
      error: '',
      ruleForm: {
        name: '',
        code: '',
        email: '',
        pwd: '',
        cpwd: ''
      },
      rules: {
        name: [{
          required: true,
          type: 'string',
          message: '请输入昵称',
          trigger: 'blur'
        }],
        email: [{
          required: true,
          type: 'email',
          message: '请输入邮箱',
          trigger: 'blur'
        }],
        pwd: [{
          required: true,
          message: '请创建密码',
          trigger: 'blur'
        }],
        cpwd: [{
          required: true,
          message: '请确认密码',
          trigger: 'blur'
        }, {
          validator: (rule,value, callback) => {
            if(value == '') {
              callback(new Error('请再次输入密码'))
            } else if(value!==this.ruleForm.pwd) {
              callback(new Error('两次输入密码不一致'))
            } else {
              callback()
            }
          }
        }]
      }
    }
  },
  methods: {
    sendMsg() {
      let _this = this;
      let namePass
      let emailPass
      let form = this.$refs['ruleForm'];

      // 如果还在倒计时
      if(_this.timerid) {
        return false
      }
      
      // element 自带对部分表单字段进行校验的方法，对用户名进行校验
      form.validateField('name', (valid) => {
        namePass = valid
      })
      // 对邮箱进行校验
      form.validateField('email', (valid) => {
        emailPass = valid
      })

      this.statusMsg = ''

      // 如果用户名或邮箱验证没通过，不掉接口
      if(namePass || emailPass) {
        return false
      }

      this.$axios.post('/users/verify', {
        username: encodeURIComponent(this.ruleForm.name),
        email: this.ruleForm.email
      }).then(({status, data}) => {
        if(status === 200 && data && data.code === 0) {
          let count = 60;
          this.statusMsg = `验证码已发送，剩余${count--}秒`
          this.timerid = setInterval(()=> {
            _this.statusMsg = `验证码已发送，剩余${count--}秒`
            if(count === 0) {
              clearInterval(_this.timerid)
              _this.statusMsg = ''
            }
          },1000)
        } else {
          _this.statusMsg = data.msg
        }
      })

    },
    register() {
      let _this = this;
      this.$refs['ruleForm'].validate((valid) => {
        if(valid) {
          let form = _this.ruleForm;
          _this.$axios.post('/users/signup', {
            username: window.encodeURIComponent(form.name),
            password: CryptoJs.MD5(form.pwd).toString(),
            email: form.email,
            code: form.code
          }).then(({status, data}) => {
            if(status === 200) {
              // 注册成功，跳转到登录页
              if(data && data.code === 0) {
                location.href = '/login'
              } else {
                _this.error = data.msg
              }
            } else {
              _this.error = `服务器错误，错误码：${status}`
            }

            // 定时清空错误信息
            setTimeout(() => {
              _this.error = ''
            }, 2000)
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/css/register/index.scss";
</style>
