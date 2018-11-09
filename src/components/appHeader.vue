<template>
    <div class="header">
        <div class="logo">
            <a href="http://www.ele.me">
                <img src="../assets/logo.png" alt="logo图标">
                <h1>校园闪电侠</h1>
            </a>
        </div>
        <div class="header-menu">
            <router-link to="home">主页</router-link>
            <router-link to="person">个人中心</router-link>
            <!-- 加入我们写在关于我们中 -->
            <router-link to="aboutUs">关于我们</router-link>
            <router-link to="customerService">我的客服</router-link>
            <router-link to="suggest">投诉建议</router-link>
        </div>
        <div class="usercont">
            <img src="../assets/logo.png" alt="用户头像">
            <span>用户名: <em>{{user}}</em></span>
        </div>
        <div class="message">
            <a href="javascript:void(0);">
                <em>3</em>
                <i class="el-icon-message"></i>
            </a>
        </div>
        <div class="login-and-exit">
            <a href="javascript:void(0);">登录</a>
            <a href="javascript:void(0);">退出</a>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            user:'波哥'
        }
    }
}
</script>

<style scoped lang='scss'>
@import "../style/mixin";
a{
    color: #fff;
}
.router-link-active{
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
        font-size: 16px; 
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
    margin:0 2rem 0 .5rem;
    a{
        @include set-inline-block;
        line-height: $header-height;
        margin: 0 .5rem;
        font-size: 14px;
        &:hover{
            color: #F56C6C;
        }
    }
}
@media only screen and (max-width:1100px) {
    .logo{
        display: none;
    }
}
</style>
