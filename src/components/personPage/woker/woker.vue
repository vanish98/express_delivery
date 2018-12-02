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
                            type: 'error'
                        });
                        this.$router.push({ path: '/login' });                      
                    }
            }).catch(err=>{
                console.log(err);
            })
        }
    },
    created() {
        this.checkLogin();
    },
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
    margin: 0 auto 5rem; 
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
