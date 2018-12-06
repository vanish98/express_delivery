<template>
    <div class="admin-main-page">
        <div class="admin-page-header">
                <h1>管理员界面头部</h1>
        </div>
        <div class="admin-page-body"> 
            <div class="admin-page-leftMenu">
                <leftMenu :leftMenuData='leftMenuData'></leftMenu>
            </div>
            <div class="admin-p-right-cont">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import leftMenu from './adminLeftMenu'
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
                    title:'所有用户',
                    menuItem:[
                        {route:'allUser',listTitle:'普通用户'},
                        {route:'allWoker',listTitle:'工作人员'},
                        {route:'findPeople',listTitle:'查找用户'}
                    ]
                },
                {
                    index:"2",
                    icon:'el-icon-tickets',
                    title:'所有订单',
                    menuItem:[
                        {route:'findOneOrder',listTitle:'查找订单'},
                        {route:'allNotReceiveOrder',listTitle:'未接订单'},
                        {route:'allReceivedOrder',listTitle:'已接订单'},
                        {route:'allHistoryOrder',listTitle:'历史订单'}
                    ]
                },
                {
                    index:"3",
                    icon:'el-icon-message',
                    title:'消息系统',
                    menuItem:[
                        {route:'sendMessage',listTitle:'发送消息'}
                    ]
                },
                {
                    index:"4",
                    icon:'el-icon-edit-outline',
                    title:'加入我们',
                    menuItem:[
                        {route:'joinUsApply',listTitle:'申请列表'}
                    ]
                },
                {
                    index:"5",
                    icon:'el-icon-document',
                    title:'投诉建议',
                    menuItem:[
                        {route:'suggestList',listTitle:'用户反馈'}
                    ]
                }
             ]
        }
    },
}
</script>

<style  scoped lang='scss'>
.admin-main-page{
    position: relative;
    width: 100%;
}
.admin-page-header{
    height: 3rem;
    line-height: 3rem;
    background-color: rgb(173, 221, 240);
}
.admin-page-body{
    position: relative;
    width: 100%;
    box-sizing: border-box;
    display: flex;
}
.admin-page-leftMenu{
    position: fixed;
    height: 100%;
    background-color: #f7f7f7;
}
.admin-p-right-cont{
    width: 100%;
    width:  calc(100% - 10.1rem);
    min-height: 30rem;
    margin-left: 10.1rem;
}
</style>
