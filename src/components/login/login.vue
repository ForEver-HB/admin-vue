<template>
<div class='login-wrap'>
  <el-form class="loginForm" label-position="top" ref='form' :model='userForm' label-width='80px'>
    <h2 class="heading">用户登录</h2>
    <el-form-item label='用户名'>
      <el-input v-model='userForm.username'></el-input>
    </el-form-item>
    <el-form-item label='密码'>
      <el-input type='password' v-model='userForm.password'></el-input>
    </el-form-item>
    <el-form-item >
      <el-button type='primary' class='login-btn' @click='login'>立即登录</el-button>
  </el-form-item>
</el-form>
</div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      userForm: {
        username: '',
        password: ''
      },
      input: ''
    }
  },
  methods: {
    async login () {
      // console.log(this.userForm)
      const res = await axios.post(
        'http://localhost:8888/api/private/v1/login',
        this.userForm
      )
      // console.log(res)
      const data = res.data
      if (data.meta.status === 200) {
        window.localStorage.setItem('admin-token', JSON.stringify(data.data))
        this.$router.push({
          name: 'home'
        })
        this.$message({
          type: 'success',
          message: '登录成功!'
        })
      }
    }
  }
}
</script>

<style>
.login-wrap {
  height: 100%;
  background: url(../../assets/69322-106.jpg) no-repeat;
  background-size: 100% 100%;
  background-color: rgba(0,0,0,0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-wrap .loginForm{
  background-color: #fff;
  width: 400px;
  padding: 30px;
  border-radius: 5px;
}
.login-wrap .loginForm .login-btn {
  width: 100%;
}
</style>
