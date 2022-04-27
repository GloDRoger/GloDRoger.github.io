import Vue from 'vue'
import Router from 'vue-router'
/* 引入方法使用cookie */
Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}
/*
 * 路由name必须定义 name的第一个字母大写 并且name是和path一样的 路由采用懒加载的方式定义
 * 路由拦截在router.js 具体的拦击规则需要在router.js添加
 */
const rout = [
  {
    path: '/index',
    component: utils.dynamicImportView('index'),
    children: [
      // 有公共头部的子页面
      {
        path: '/home',
        name: 'Home',
        component: utils.dynamicImportView('home'),
      }, // 首页
      {
        path: '/brand',
        name: 'Brand',
        component: utils.dynamicImportView('brand'),
      }, // 品牌
      {
        path: '/reception',
        name: 'Reception',
        component: utils.dynamicImportView('reception'),
      }, // 帮助中心

    ],
  },
  { path: '/', redirect: '/home' },
  { path: '*', redirect: '/error' },
]
const router = new Router({
  // mode: 'history',
  routes: rout,
  // 当切换路由时,将页面滚动到顶部
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
})

export default router
