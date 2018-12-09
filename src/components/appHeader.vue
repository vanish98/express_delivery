<template>
    <div class="header">
        <div class="logo ">
            <a href="javascript:void(0);">
                <img src="../assets/img/logo.png" alt="logo图标">
                <h1>校园闪电侠</h1>
            </a>
        </div>
        <div class="header-menu">
            <router-link :class="{'link-active':currentPage=='home'}" 
            to="/home">主页</router-link>
            <router-link :class="{'link-active':currentPage==gotoPage}" 
            :to="'/'+gotoPage">
                <el-badge is-dot 
                :hidden='!msgLen'
                class="item">个人中心</el-badge>
            </router-link>
            <!-- 加入我们写在关于我们中 -->
            <router-link :class="{'link-active':currentPage=='aboutUs'}"
            to="/aboutUs">关于我们</router-link>
            <router-link :class="{'link-active':currentPage=='customerService'}"
            to="/customerService">我的客服</router-link>
            <router-link :class="{'link-active':currentPage=='suggest'}" 
            to="/suggest">投诉建议</router-link>
        </div>
        <div class="usercont">
            <img src="../assets/img/top-user.png" alt="用户头像">
            <div class="username">
                <em v-if='userName'>{{userName}}</em>
                <em v-else>未登录</em>
            </div>
        </div>
        <div class="login-and-exit">
            <a v-if="!loginState" 
            @click.prevent="handleUserLogin">登录</a>
            <a v-else 
            @click.prevent="logout">退出</a>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default {
    data(){
        return{
            loginState:false
        }
    },
    computed: {
        ...mapState({
            userId:state=>state.user.userInfo.userId,
            grade:state=>state.user.userInfo.grade,
            vuexUserName:state=>state.user.userInfo.userName,
            msgLen:state=>state.user.userInfo.msgLen
        }),
        currentPage(){         
            return this.$route.path.split('/')[1];
        },
        gotoPage(){
            if(this.grade==1){
                return 'wokerPerson'
            }else{
                return 'person'
            }
        },
        userName(){
            if(this.vuexUserName !='' && this.vuexUserName!='undefined'){
                return this.vuexUserName
            }else if(this.userId !='' && this.userId!='undefined'){
                return this.userId
            }else{
                return false
            }
            
        }
    },
    mounted(){
        this.checkLogin();
        this.getMessage();
    },
    methods:{
        handleUserLogin(){
            this.$router.push({path:'/login'});
        },
        getMessage(){
            axios.get('/users/userMessage').then(response=>{
                let res = response.data;
                if(res.status=='0'){
                    let msg = res.result.filter(it=>!it.isRead);
                    this.$store.commit("saveUserInfo",{msgLen:msg.length});
                    if(msg.length){
                        this.$notify({
                            title: '消息提醒',
                            message: `您有新的未读消息,详情请在 个人中心 >> 我的消息-查看`,
                            duration:6000,
                            showClose:true,
                            type: 'success'
                        }); 
                    }
                }else{
                // console.log(res.msg);
                }
            }).catch(err=>{
                console.log(res.msg);
            })
        },
        checkLogin(){
            axios.get("/users/checkLogin").then((response)=>{
                    let res = response.data;
                    if(res.status=="0"){
                        this.loginState=true;
                        this.$store.commit("saveUserInfo",res.result);
                    }else{
                      console.log(res.msg);                      
                    }
            }).catch(err=>{
                console.log(err);
                
            })
        },
        logout(){
             this.handleUserLogin();
             axios.post("/users/logout").then((response)=>{
                    let res = response.data;
                    if(res.status=="0"){
                        this.loginState=false;
                        this.$store.commit("saveUserInfo",{userId:'',userName:''});
                        console.log('退出成功');   
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

<style scoped lang='scss'>
@import "../style/mixin";
$color:#34495e;
a{
    color: $color;
}
.link-active{
    background-color: #eff3f5;
    color: #3498db;
}
$header-height:3rem;
.header{
    position: relative;
    display: flex;
    justify-content:flex-end;
    align-items: center;
    width: 100%;
    background-color: #fff;
    border-bottom: 0.05rem solid rgb(243, 240, 240);
    color: $color;
    // @include transition(.3s);
    cursor: pointer;
    z-index: 9999;
}
.logo{
    flex-grow: 2;
    margin-left: 30px;
    a{
        display: flex;   
        align-items: center;
        width: 100%;
        img{
            display: block;
            max-width: 2.5rem;
            height: auto;
            margin-right: 0.5rem;
         }
         h1{
             color: $color;
             font-size: 1rem;
             letter-spacing: 2px;
         }
    }
    
}
.header-menu{
    display: flex;
    justify-content:center;    
    //width: 60%;
    min-width: 25rem + 2rem;
    a{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 5rem;
        height:$header-height;    
        font-size: 0.8rem; 
        @include transition(.4s);   
        &:hover{
            background-color: #eff3f5;
        }
    }
}
.usercont{
    display: flex;
    align-items: center;
    margin-left: 0.5rem;
    img{
        display: block;
        max-width: 1.5rem;
        margin-right: 5px;
        height: auto;
    }
    .username em{
        color: #777;
        font-family: '微软雅黑';
    }
}

.login-and-exit{    
    margin:0 2rem 0 .5rem;
    a{
        @include set-inline-block;
        line-height: $header-height;
        margin: 0 .5rem;
        font-size: 0.7rem;
        &:hover{
            color: #F56C6C;
        }
    }
}
@media only screen and (max-width:992px){
    .login-and-exit a{
        line-height: 4rem;
    }
    .header-menu a{
        height: 4rem;
        width: 5rem;
    }
}
@media only screen and (max-width:768px){
    .header .logo{
        display: none;
    }
}
</style>
