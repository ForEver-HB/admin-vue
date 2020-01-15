<template>
  <el-container class='container'>
  <el-header class='header'>
    <el-row>
      <el-col :span='4'>
        <div class='grid-content bg-purple'>
          <img src='http://img3.redocn.com/tupian/20180412/jinseguangmangxiantiaotuxingzimuzuhelogoheisebeijingzhanshi_9334315.jpg' alt=''>
        </div>
        </el-col>
      <!-- <el-col :span='5'>
        <div class='grid-content bg-purple-light company_name'>
          福润商城专卖
        </div>
      </el-col> -->
      <el-col :offset='16' :span='4'>
        <div class='grid-content bg-purple closeToLogin'>
          <a href='#' @click.prevent='Logout'>退出</a>
        </div>
      </el-col>
    </el-row>
  </el-header>
  <el-container class='container'>
    <el-aside class='aside' width='200px'>
      <el-menu
        default-active='2'
        class='el-menu-vertical-demo aside-menu'
        @open='handleOpen'
        @close='handleClose'
        background-color='#545c64'
        text-color='#fff'
        :unique-opened='true'
        :router='true'
        active-text-color='#ffd04b'>
        <el-submenu index='1'>
          <template slot='title'>
            <i class='el-icon-location'></i>
            <span>用户管理</span>
          </template>
          <el-menu-item index='/users'>用户列表</el-menu-item>
        </el-submenu>
      <el-submenu index='2'>
        <template slot='title'>
          <i class='el-icon-location'></i>
          <span>权限管理</span>
        </template>
        <el-menu-item index='/roles'>角色列表</el-menu-item>
        <el-menu-item index='/rights'>权限列表</el-menu-item>
      </el-submenu>
      <el-submenu index='3'>
        <template slot='title'>
          <i class='el-icon-location'></i>
          <span>商品管理</span>
        </template>
        <el-menu-item index='3-1'>商品列表</el-menu-item>
        <el-menu-item index='3-2'>商品分类</el-menu-item>
        <el-menu-item index='3-3'>商品参数</el-menu-item>
      </el-submenu>
      <el-submenu index='4'>
        <template slot='title'>
          <i class='el-icon-location'></i>
          <span>订单管理</span>
        </template>
        <el-menu-item index='4-1'>订单列表</el-menu-item>
      </el-submenu>
      <el-submenu index='5'>
        <template slot='title'>
          <i class='el-icon-location'></i>
          <span>数据报表</span>
        </template>
        <el-menu-item index='5-1'>数据报表列表</el-menu-item>
      </el-submenu>
    </el-menu>
    </el-aside>
    <el-main class='main'>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import { removeUserInfo } from '@/assets/js/auth'
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
  },
  methods: {
    Logout () {
      this.$confirm('确认退出吗?', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // window.localStorage.removeItem('admin-token')
        removeUserInfo()
        this.$router.push({
          name: 'login'
        })
        this.$message({
          type: 'success',
          message: '退出登录成功!'
        })
      })
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style>
.container,.aside,.aside-menu {
  height: 100%;
}
.header {
  line-height: 60px;
  background-color: #000;
  border-bottom: 1px solid gold;
}
.bg-purple img {
  height: 59px;
  width: auto;
}
.company_name {
  font-size: 22px;
  font-weight: bold;
  color: #fff;
  font-family: '楷书';
}
.closeToLogin {
  text-align: center;
}
closeToLogin a {
  list-style: none;
  direction: underline;
  color: #fff;
}
.aside {
  background-color: #d3dce6;
}
.main {
  background-color: #e9eef3;
  height: 100%;
}
</style>
