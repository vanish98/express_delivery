<template>
    <div class="userLogin">
        <div class="user-login-cont">
            <div class="left-log-cont">
                <div class="log-body">
                    <h2 class="log-title">校园闪电侠</h2>
                    <span class="log-en">Campus Courier</span>
                </div>
                <div class="footTip">
                    <span class="f-tip">
                        一一一 拿快递这种小事就交给我们办 !
                    </span>
                </div>
            </div>
            <div class="the-right-cont">
                <i class="goto-homePage"
                @click="goToHomePage"></i>
                <transition name='transX-fast'
                mode="out-in">
                     <router-view></router-view>     
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods:{
        goToHomePage(){
            this.$router.push({path:'/home'});
            
        }
    }
}
</script>

<style lang='scss'>
.userLogin{
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    background-image: linear-gradient(-225deg, #69EACB 0%, #EACCF8 48%, #6654F1 100%);
}
.user-login-cont{
    display: flex;  
    align-items: center;
    justify-content: center;
    width: 60%;
    min-width: 40rem;
    height: 26rem;
}
.left-log-cont{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 55%;
    height: 100%;
    background-color: rgba(165, 167, 172, 0.2);
    .log-body{
        margin-top: -5rem;
    }
    .log-title{
        font-size: 1.5rem;
        color:#555;
    }
    .log-en{
        font-size: 0.8rem;
        color: #777;
    }
    .footTip{
        position: absolute;
        bottom: 2rem;
        right: 3rem;
        .f-tip{
            color: #777;
            letter-spacing: 0.05rem;
        }
    }
}
.the-right-cont{
    position: relative;
    overflow: hidden;
    width: 45%;
    min-width: 17rem;
    height: 100%;
    background-color: #fff;   
    .right-cont-btn{
        margin-top: 2rem;
        .el-button{
            margin: 0 1rem;
        }
    }
    .goto-homePage{
        position: absolute;
        display: block;
        width: 2.5rem;
        height: 2.5rem;
        background-image: url('../../assets/img/loginPage.png');
        background-repeat: no-repeat;
        background-size:1.6rem 1.6rem;
        background-position: right bottom;
        opacity: .3;
        z-index:99;
    }
    .footer{
        position: absolute;
        display: flex;
        justify-content:space-between;
        width: 100%;
        bottom: 0.8rem;
        .link{
            display: block;
            height: 1rem;
            line-height: 1rem;
            font-size: 0.8rem;
            color: #888;
            &:hover{
                color: rgb(238, 138, 138);
            }
        }
        .footer-left{
            margin-left: 1.5rem;
        }
        .footer-right{
            margin-right: 1.5rem;
        }
    }
}
@media only screen and (max-width:992px){
    .user-login-cont{
        width: 70%;
    }
    .left-log-cont{
        width: 50%;
    }
    .the-right-cont{
        width: 50%;
    }
}
@media only screen and (max-width:768px){
    .user-login-cont{
        width: 100%;
        height: 100%;
    }
    .left-log-cont{
        display: none;
    }
    .the-right-cont{
        width: 80%;
        height: 70%;
        min-height: 40rem;
    }
}
</style>
