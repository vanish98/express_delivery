<template>
    <div class="person-user">
        <div class="person-user-body">
            <div class="user-left-menu">
                <leftMenu
                :leftMenuData='leftMenuData'
                @isCollapse='handleIsCollapse'>
                </leftMenu>
            </div>
            <div class="pserson-router-cont" 
            :class="{'isCollapse-w':isCollapse}">
                <transition name='opa-mini'>
                    <router-view></router-view>
                </transition> 
            </div>
        </div>
        <appFooter></appFooter>
    </div>
</template>

<script>
import leftMenu from '../leftMenu'
import appFooter from '../../appFooter'
import axios from 'axios'
export default {
    components:{
        leftMenu,
        appFooter
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
                    icon:'el-icon-tickets',
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
                },
                {
                    index:"4",
                    icon:'el-icon-edit-outline',
                    title:'加入我们',
                    menuItem:[
                        {route:'joinUs',listTitle:'申请'}
                    ]
                }
             ],
             isCollapse:false
        }
    },
    methods:{
        checkLogin(){
            let loading = this.$loading({lock:true,text:'正在加载...'});
            axios.get("/users/checkLogin").then((response)=>{
                    let res = response.data;
                    loading.close();
                    if(res.status=="0"){

                    }else{
                        this.$message({
                            message: '当前未登录!',
                            type: 'error',
                            showClose:true
                        });
                        this.$router.push({ path: '/login' });                      
                    }
            }).catch(err=>{
                console.log(err);
            })
        },
        handleIsCollapse(newVal){
            this.isCollapse = newVal;
        }
    },
    created() {
        this.checkLogin();
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
    margin: 0 auto 5rem; 
}
.user-left-menu{
    background-color: #fff;
}
.pserson-router-cont{
    width: 100%;
    width:  calc(100% - 10.1rem);
    min-height: 35rem;
    background-color: #fff;
    border: 1px solid rgb(228, 225, 225);
    border-top: none;
    transition: all .5s;
    background-color: darken(#f4f9fd, 0%) ;
}
.isCollapse-w{
    width:  calc(100% - 3.3rem);
}
@media only screen and (max-width:1200px){
    .person-user-body{
        width: 90%;
    }
}
@media only screen and (max-width:992px){
    .person-user-body{
        width: 100%;
    }
}
</style>
