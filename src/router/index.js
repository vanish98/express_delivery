import Vue from 'vue'
import Router from 'vue-router'

//异步路由
import {loginRegister ,login ,register ,forgotPassword ,
  appHeader ,appHome ,aboutUs ,customerService ,suggest } from './publicRouter'

import {userPage ,userInformation ,addInformation ,
  currentOrder ,joinUs ,newOrder ,historyOrder ,myMessage } from './userRouter'

import {wokerPage ,wokerAccount ,wokerReceivedOrder ,
  wokerHistoryOrder ,allUserOrderList } from './wokerRouter'

import {adminLogin ,adminPage ,findPeople ,allUser ,allWoker ,findOneOrder ,allNotReceiveOrder ,
  allReceivedOrder ,allHistoryOrder ,sendMessage ,joinUsApply ,joinUsHistoryApply ,suggestList} from './adminRouter'


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
        }, 
        {
          path:'joinUs',
          component:joinUs
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
      path: '/adminLogin',
      component:adminLogin  
    },
    {
      path: '/admin',
      component:adminPage,
      children:[
        {
          path:'/',
          redirect:'allUser'  
        },
        {
          path:'allUser',
          component:allUser  
        },
        {
          path:'allWoker',
          component:allWoker   
        },
        {
          path:'findPeople',
          component:findPeople  
        },
        {
          path:'findOneOrder',
          component:findOneOrder  
        },
        {
          path:'allNotReceiveOrder',
          component:allNotReceiveOrder  
        },
        {
          path:'allReceivedOrder',
          component:allReceivedOrder  
        },
        {
          path:'allHistoryOrder',
          component:allHistoryOrder  
        },
        {
          path:'sendMessage',
          component:sendMessage  
        },
        {
          path:'joinUsApply',
          component:joinUsApply  
        },
        {
          path:'joinUsHistoryApply',
          component:joinUsHistoryApply  
        },
        {
          path:'suggestList',
          component:suggestList  
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
