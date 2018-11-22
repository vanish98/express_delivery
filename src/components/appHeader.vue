<template>
    <div class="header">
        <div class="logo hidden-sm-and-down">
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
                :hidden='!showMessage'
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
                <em>{{user}}</em>
            </div>
        </div>
        <div class="login-and-exit">
            <a v-if="!login" href="javascript:void(0);">登录</a>
            <a v-else href="javascript:void(0);">退出</a>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            user:'15279778477',
            login:false,
            showMessage:false,
            gotoPage:'wokerPerson'
        }
    },
    computed: {
        currentPage(){         
            return this.$route.path.split('/')[1];
        }
    },
}
</script>

<style scoped lang='scss'>
@import "../style/mixin";
a{
    color: #fff;
}
.link-active{
    background-color: #006bc7;
}
$header-height:3rem;
.header{
    position: relative;
    display: flex;
    justify-content:flex-end;
    align-items: center;
    width: 100%;
    background-color: #409EFF;
    color: #fff;
    @include transition(.4s);
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
            max-width: 3rem;
            height: auto;
            margin-right: 0.5rem;
         }
         h1{
             color: #fff;
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
        @include transition(.3s);   
        &:hover{
            background-color: #0c77d1;
        }
    }
}
.usercont{
    display: flex;
    align-items: center;
    img{
        display: block;
        max-width: 1.5rem;
        margin-right: 5px;
        height: auto;
    }
}
.message{
    margin-left: .5rem;
    a{
        display: block;
        width: 2rem;
        line-height: $header-height;
        em{
            width: 0.5rem;
            height: 0.5rem;
            font-size: 14px;
            @include border-radius(5px);
            background-color: red;
            color: #fff;
        }
    }
}
.login-and-exit{    
    margin:0 1rem 0 .5rem;
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
</style>
