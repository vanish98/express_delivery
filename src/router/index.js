import Vue from 'vue'
import Router from 'vue-router'
import appHome from '../components/home/home'
import aboutUs from '../components/aboutUs/aboutUs'
import customerService from '../components/customerService/customerService'
import suggest from '../components/suggest/suggest'
import userPage from '../components/personPage/user/user'
import wokerPage from '../components/personPage/woker/woker'
import userInformation from '../components/personPage/userInformation'
import addInformation from '../components/personPage/user/addInformation'
import currentOrder from '../components/personPage/user/currentOrder'
import newOrder from '../components/personPage/user/newOrder'
import historyOrder from '../components/personPage/user/historyOrder'
import myMessage from '../components/personPage/myMessage'

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
      path: '/person',
      component:userPage,
      children:[
        {
          path:'/',
          redirect:'userInformation'  
        },
        {
          path:'userInformation',
          component:userInformation 
        },
        {
          path:'addInformation',
          component:addInformation 
        },
        {
          path:'currentOrder',
          component:currentOrder
        },
        {
          path:'newOrder',
          component:newOrder
        },
        {
          path:'historyOrder',
          component:historyOrder
        },
        {
          path:'myMessage',
          component:myMessage
        }
      ] 
    },
    {
      path: '/wokerPerson',
      component:wokerPage,
      children:[
        {
          path:'/',
          redirect:'userInformation'  
        },
        {
          path:'userInformation',
          component:userInformation 
        },
      ] 
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
    },
    {
      path: '/suggest',
      name:'suggest',
      component:suggest
    }
  ]
})
