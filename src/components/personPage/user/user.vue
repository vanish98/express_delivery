<template>
    <div class="person-user">
        <div class="person-user-body">
            <leftMenu
            :leftMenuData='leftMenuData'>
            </leftMenu>
            <div class="pserson-router-cont">
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
                        {route:'addInformation',listTitle:'完善个人信息'}
                    ]
                },
                {
                    index:"2",
                    icon:'el-icon-menu',
                    title:'我的订单',
                    menuItem:[
                        {route:'currentOrder',listTitle:'当前订单'},
                        {route:'newOrder',listTitle:'发布订单'},
                        {route:'historyOrder',listTitle:'历史订单'}
                    ]
                },
                {
                    index:"3",
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
.person-user{
    position: relative;
    width: 100%;
    background-color: #f7f7f7;
}
.person-user-body{
    position: relative;
    display: flex;
    width: 80%;
    margin: 0 auto; 
}
.pserson-router-cont{
    width: 100%;
    min-height: 680px;
    background-color: #fff;
    border: 1px solid rgb(228, 225, 225);
}
@media only screen and (max-width:1200px){
    .person-user-body{
        width: 90%;
    }
}
</style>
