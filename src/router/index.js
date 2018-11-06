import Vue from 'vue'
import Router from 'vue-router'
import appHome from '../components/home/home'
import aboutUs from '../components/aboutUs/aboutUs'
import customerService from '../components/customerService/customerService'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'home'
    },
    {
      path: '/home',
      name:'appHome',
      component:appHome
    },
    {
      path: '/aboutUs',
      name:'aboutUs',
      component:aboutUs
    },
    {
      path: '/customerService',
      name:'customerService',
      component:customerService 
    }
  ]
})
