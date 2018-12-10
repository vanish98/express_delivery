<template>
    <div class="admin-main-page">
        <div class="admin-page-header">
            <div class="admin-logo">
                <a class="title" href="javascript:void(0);">
                    <img src="./../../assets/img/logo.png" alt="logo图标">
                    <h1>校园闪电侠后台管理系统</h1>
                </a>
            </div>
            <div class="admincont">
                <img src="./../../assets/img/top-user.png" alt="用户头像">
                <div class="username">
                    <em>{{adminName}}</em>
                </div>
                 <a class="logout" @click.prevent="handleLogout">退出</a>
            </div>
        </div>
        <div class="admin-page-body"> 
            <div class="admin-page-leftMenu">
                <leftMenu :leftMenuData='leftMenuData'></leftMenu>
            </div>
            <div class="admin-p-right-cont">
                <transition name='opa-mini'>
                    <router-view></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import leftMenu from './adminLeftMenu'
import axios from 'axios'
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
                        {route:'joinUsApply',listTitle:'申请列表'},
                        {route:'joinUsHistoryApply',listTitle:'历史申请'}
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
             ],
             adminName:'张洪波'
        }
    },
    created() {
        this.checkLogin();
    },
    methods:{
        checkLogin(){
            axios.get("/admin/checkLogin").then((response)=>{
                    let res = response.data;
                    if(res.status=="0"){
                        this.adminName=res.result;
                    }else{
                        this.$message({
                            message: '当前未登录!',
                            type: 'error',
                            showClose:true
                        });
                      this.$router.push({path:'/adminLogin'});                    
                    }
            }).catch(err=>{
                console.log(err);
                
            })
        },
        handleLogout(){
             this.$router.push({path:'/adminLogin'});
             axios.post("/admin/logout").then((response)=>{
                    let res = response.data;
                    if(res.status=="0"){
                        //console.log('退出成功');   
                    }else{
                      console.log(res.msg);                      
                    }
            }).catch(err=>{
                console.log(err);
                
            })
        }
    }
}
</script>

<style  scoped lang='scss'>
$color:#34495e;
.admin-main-page{
    position: relative;
    width: 100%;
}
.admin-page-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 3rem;
    line-height: 3rem;
    background-color: #fff;
    border-bottom: 1px solid #f3f0f0;
    cursor: pointer;
}
.admin-logo{
    display: flex;
    height: 100%;
    margin-left: 1rem;
    .title{
        display: flex;
        align-items: center;
        h1{
            color: $color;
            font-size: 1rem;
            letter-spacing: 2px;
        }
    }
    img{
        width: 2.5rem;
        height: 2.5rem;
    }
}
.admincont{
    display: flex;
    align-items: center;
    margin-right: 4rem;
    color: $color;
    img{
        display: block;
        max-width: 1.5rem;
        margin-right: 5px;
        height: auto;
    }
    .logout{
        margin-left: 1rem;
        &:hover{
            color: rgb(252, 85, 85);
        }
    }
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
}
.admin-p-right-cont{
    width: 100%;
    width:  calc(100% - 10.1rem);
    min-height: 30rem;
    margin-left: 10.1rem;
}
</style>
