// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import resource from 'vue-resource'
import goods from 'components/goods/goods'
import ratings from 'components/ratings/ratings'
import seller from 'components/sellter/seller'

import 'common/stylus/entry.styl'

Vue.use(VueRouter)
Vue.use(resource)

const routers = [
  {
    path: '/seller',
    component: seller
  },
  {
    path: '/goods',
    component: goods
  },
  {
    path: '/ratings',
    component: ratings
  }
]

const router = new VueRouter({
  routes: routers,
  linkActiveClass: 'active'
})

/* eslint-disable no-unused-vars */
new Vue({
  router,
  render: dvs => dvs(App)
}).$mount('#app')

/* eslint-disable eol-last */
router.push('/goods')