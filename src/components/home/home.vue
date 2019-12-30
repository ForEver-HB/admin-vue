<template>
  <el-container class="container">
  <el-header class="header">
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <img src="http://img3.redocn.com/tupian/20180412/jinseguangmangxiantiaotuxingzimuzuhelogoheisebeijingzhanshi_9334315.jpg" alt="">
        </div>
        </el-col>
      <!-- <el-col :span="5">
        <div class="grid-content bg-purple-light company_name">
          福润商城专卖
        </div>
      </el-col> -->
      <el-col :offset="16" :span="4">
        <div class="grid-content bg-purple">
          <a href="#">退出</a>
        </div>
      </el-col>
    </el-row>
  </el-header>
  <el-container class="container">
    <el-aside class="aside" width="200px">Aside</el-aside>
    <el-main class="main">Main</el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  // 作废的测试文件
  // beforeCreate () {
  //   const token = window.localStorage.getItem('admin-token')
  //   if (!token) {
  //     console.log('用户没有登录')
  //     this.$router.push({
  //       name: 'login'
  //     })
  //   }
  // },
  data () {
    return {}
  }
}
</script>

<style>
  .container {
    height: 100%;
  }
  .header {
    line-height: 60px;
    background-color: #000;
    border-bottom: 1px solid gold;
  }
  .bg-purple img{
    height: 59px;
    width: auto
  }
  .company_name {
    font-size: 22px;
    font-weight: bold;
    color: #fff;
    font-family: '楷书';
  }
  .aside {
    background-color: #D3DCe6;
  }
  .main {
    background-color: #E9EEF3;
    height: 100%;
  }
</style>
