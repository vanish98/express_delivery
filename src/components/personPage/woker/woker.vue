<template>
    <div class="person-woker-page">
        <div class="person-woker-body">
            <leftMenu
            :leftMenuData='leftMenuData'></leftMenu>
            <div class="woker-router-cont">
                <transition name='opa-mini'>
                    <router-view></router-view>
                </transition> 
            </div>
        </div>
    </div>
</template>

<script>
import leftMenu from '../leftMenu'
export default {
    components:{
        leftMenu
    },
    data(){
        return{
            leftMenuData:[
                {
                    index:"1",
                    icon:'el-icon-location',
                    title:'个人中心',
                    menuItem:[
                        {route:'userInformation',listTitle:'我的信息'},
                        {route:'wokerAccount',listTitle:'我的钱包'}
                    ]
                },
                {
                    index:"2",
                    icon:'el-icon-menu',
                    title:'我的订单',
                    menuItem:[
                        {route:'wokerReceivedOrder',listTitle:'已接订单'},
                        {route:'wokerHistoryOrder',listTitle:'历史订单'}
                    ]
                },
                {
                    index:"3",
                    icon:'el-icon-tickets',
                    title:'接单大厅',
                    menuItem:[
                        {route:'allUserOrderList',listTitle:'订单列表'}
                    ]
                },
                {
                    index:"4",
                    icon:'el-icon-message',
                    title:'我的消息',
                    menuItem:[
                        {route:'myMessage',listTitle:'消息'}
                    ]
                }
             ]
        }
    }
}
</script>

<style lang='scss'>
.person-woker-page{
    position: relative;
    width: 100%;
    background-color: #f7f7f7;
}
.person-woker-body{
    position: relative;
    display: flex;
    width: 80%;
    margin: 0 auto; 
}
.woker-router-cont{
    width: 100%;
    min-height: 680px;
    background-color: #fff;
    border: 1px solid rgb(228, 225, 225);
}
@media only screen and (max-width:1200px){
    .person-woker-body{
        width: 90%;
    }
}
</style>
