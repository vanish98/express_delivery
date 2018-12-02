import Vue from 'vue'
import Router from 'vue-router'

//异步路由
const loginRegister = resolve => require(['@cts/loginRegister/loginRegister'], resolve),
      login = resolve => require(['@cts/loginRegister/login'], resolve),
      register = resolve => require(['@cts/loginRegister/register'], resolve),
      forgotPassword = resolve => require(['@cts/loginRegister/forgotPassword'], resolve),
      appHeader = resolve => require(['@cts/appHeader'], resolve),
      appHome = resolve => require(['@cts/home/home'], resolve),
      aboutUs = resolve => require(['@cts/aboutUs/aboutUs'], resolve),
      customerService = resolve => require(['@cts/customerService/customerService'], resolve),
      suggest = resolve => require(['@cts/suggest/suggest'], resolve),
      userPage = resolve => require(['@ctsPage/user/user'], resolve),
      userInformation = resolve => require(['@ctsPage/userInformation'], resolve),
      addInformation = resolve => require(['@ctsPage/user/addInformation'], resolve),
      currentOrder = resolve => require(['@ctsPage/user/currentOrder'], resolve),
      newOrder = resolve => require(['@ctsPage/user/newOrder'], resolve),
      historyOrder = resolve => require(['@ctsPage/user/historyOrder'], resolve),
      myMessage = resolve => require(['@ctsPage/myMessage'], resolve),
      wokerPage = resolve => require(['@ctsPage/woker/woker'], resolve),
      wokerAccount = resolve => require(['@ctsPage/woker/wokerAccount'], resolve),
      wokerReceivedOrder = resolve => require(['@ctsPage/woker/wokerReceivedOrder'], resolve),
      wokerHistoryOrder = resolve => require(['@ctsPage/woker/wokerHistoryOrder'], resolve),
      allUserOrderList = resolve => require(['@ctsPage/woker/allUserOrderList'], resolve)



// //同步路由
// import loginRegister from '@cts/loginRegister/loginRegister'
// import login from '@cts/loginRegister/login'
// import register from '@cts/loginRegister/register'
// import forgotPassword from '@cts/loginRegister/forgotPassword'
// import appHeader from '@cts/appHeader'
// import appHome from '@cts/home/home'
// import aboutUs from '@cts/aboutUs/aboutUs'
// import customerService from '@cts/customerService/customerService'
// import suggest from '@cts/suggest/suggest'
// import userPage from '@ctsPage/user/user'
// import userInformation from '@ctsPage/userInformation'
// import addInformation from '@ctsPage/user/addInformation'
// import currentOrder from '@ctsPage/user/currentOrder'
// import newOrder from '@ctsPage/user/newOrder'
// import historyOrder from '@ctsPage/user/historyOrder'
// import myMessage from '@ctsPage/myMessage'
// import wokerPage from '@ctsPage/woker/woker'
// import wokerAccount from '@ctsPage/woker/wokerAccount'  
// import wokerReceivedOrder from '@ctsPage/woker/wokerReceivedOrder' 
// import wokerHistoryOrder from '@ctsPage/woker/wokerHistoryOrder' 
// import allUserOrderList from '@ctsPage/woker/allUserOrderList' 

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
      components:{
        default:appHome,
        header:appHeader
      }
    },
    {
      path: '/login',
      component:loginRegister,
      children:[
          { 
            path:'/',
            component:login
          }
      ]  
    },
    {
      path: '/register',
      component:loginRegister,
      children:[
        { 
          path:'/',
          component:register
        }
      ] 
    },
    {
      path: '/forgotPassword',
      component:loginRegister,
      children:[
        { 
          path:'/',
          component:forgotPassword
        }
      ] 
    },
    {
      path: '/person',
      components:{
        default:userPage,
        header:appHeader
      },
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
      components:{
        default:wokerPage,
        header:appHeader
      },
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
          path:'wokerAccount',
          component:wokerAccount  
        },
        {
          path:'wokerReceivedOrder',
          component:wokerReceivedOrder  
        },
        {
          path:'wokerHistoryOrder',
          component:wokerHistoryOrder  
        },
        {
          path:'allUserOrderList',
          component:allUserOrderList
        },
        {
          path:'myMessage',
          component:myMessage
        }
      ] 
    },
    {
      path: '/aboutUs',
      name:'aboutUs',
      components:{
        default:aboutUs,
        header:appHeader
      }
    },
    {
      path: '/customerService',
      name:'customerService',
      components:{
        default:customerService,
        header:appHeader
      }
    },
    {
      path: '/suggest',
      name:'suggest',
      components:{
        default:suggest,
        header:appHeader
      }
    }
  ]
})
