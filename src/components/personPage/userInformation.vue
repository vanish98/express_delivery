<template>
    <div class="userInformation">
        <person-title>个人中心 >> <em>个人信息</em></person-title>
        <div class="information-cont">
            <ul>
                <li class="info-list">
                    <span>姓名 : </span>
                    {{userInformation.userName}}
                </li>
                <li class="info-list">
                    <span>性别 : </span>
                    {{userInformation.gender==1?'男':'女'}}
                </li>
                <li class="info-list">
                    <span>用户等级 : </span>
                    {{userInformation.grade==0?'普通用户':'工作人员'}}
                </li>
                <li class="info-list" v-if="userInformation.grade==1">
                    <span>用户余额 : </span>
                    {{userInformation.balance}}
                </li>
                <li class="info-list">
                    <span>联系电话 : </span>
                    {{userInformation.phoneNum}}
                </li>
                <li class="info-list">
                    <span>联系地址 : </span>
                    {{userInformation.address}}
                </li>
                <li class="info-list">
                    <span>注册时间 : </span>
                    {{userInformation.regDate}}
                </li>
                <li class="info-list">
                    <span>注册账号: </span>
                    {{userInformation.regPhone}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            userInformation:{
                userName:'波哥无敌',
                gender:1, //1男 0女
                grade:0,  //0 普通用户 1工作人员
                balance:0.00,
                phoneNum:15279778477,
                address:'8#518',
                regDate:'2018-11-18',
                regPhone:15279778477
            }
        }
    }
}
</script>

<style scoped lang='scss'>
.information-cont{
    width: 100%;
    padding-top: 3rem;
    cursor: pointer;
    ul{
        width: 100%;
    }
    .info-list{
        display: block;
        padding-left: 6rem;
        min-width: 10rem;
        line-height: 1.5rem;
        text-align: left;
        font-size: 0.8rem;
        color: #3399CC;
        span{
            color: #444;
            letter-spacing: 0.05rem;
        }
    }
}
</style>
