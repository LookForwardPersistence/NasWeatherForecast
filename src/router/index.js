import Vue from 'vue'
import Router from 'vue-router'

const home = r => require.ensure([], () => r(require('../view/home.vue')), 'home');
Vue.use(Router)

export default  new Router({
  routes:[
    {
      path: '/',
      name: '/home',
      component: home
    }
  ]
})
