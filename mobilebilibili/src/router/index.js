import Vue from 'vue'
import Router from 'vue-router'
import register from '@/views/register.vue'
import login from '@/views/login.vue'
import userinfo from '@/views/userinfo.vue'
import edit from '@/views/Edit.vue'
import home from '@/views/Home.vue'
import article from '@/views/Article.vue'
import VueRouter from 'vue-router'


// Vue.use(Router)
// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'register',
//       component: register
//     },
//     {
//       path: '/login',
//       name: 'login',
//       component: Login
//     }
//   ]
// })


Vue.use(VueRouter)
const routes = [
  {
    path:'/',
    component:home,
    meta:{
      keepalive:true
    }
  },
  {
    path:'/register',
    component:register
  },
  {
    path:'/login',
    component:login
  },
  {
    path:'/userinfo',
    component:userinfo,
    meta:{
      istoken:true
    }
  },
  {
    path:'/edit',
    component:edit,
    meta:{
      istoken:true
    }
  },
  {
    path:'/article/:id',
    component:article,
  }
]
let router = new VueRouter({
  mode: 'history',
  routes
})

// 每次路由跳转之前拦截
router.beforeEach((to,from,next)=>{
  // console.log("to",to);
  // console.log("from",from);
  if(!localStorage.getItem('token')&&!localStorage.getItem('id')&&to.meta.istoken){
    router.push('/login')
    Vue.prototype.$msg.fail('请重新登录')
    return
  }
  next() // 跳转
})

export default router