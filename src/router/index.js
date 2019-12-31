import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import Home from '@/components/Home/home'
import UserList from '@/components/user-list/user-list'
import RoleList from '@/components/role-list/role-list'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [
        {
          name: 'user-list',
          path: '/users',
          component: UserList
        },
        {
          name: 'role-list',
          path: '/role',
          component: RoleList
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    next()
  } else {
    const token = window.localStorage.getItem('admin-token')
    if (!token) {
      next({
        name: 'login'
      })
    } else {
      next()
    }
  }
})
export default router
