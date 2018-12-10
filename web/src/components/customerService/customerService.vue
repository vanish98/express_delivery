<template>
    <div class="customer-service">
        <serverHeader :headerNote='headerNote'></serverHeader>
        <question 
        :questionData='questionData'
        :show='show'></question>
        <serverCall
        :show='show'
        @openMsg='openMsg'></serverCall>
    </div>
</template>

<script>
import serverHeader from './serverHeader'
import question from './question'
import serverCall from './serverCall'
export default {
    data(){
        return{
            questionData:[
                {
                    id:1,topImg:'./static/img/customer-service-question1.png', 
                    h5Title:'时间问题',
                    list:[
                        {
                            quest:'快递长时间未送达?',
                            result:`订单显示已接单, 但是快递长时间未送达 ,
                                    您可以查看订单详细信息, 尝试联系送单员 ,
                                    如果遇到无法解决的问题, 可以联系客服.`
                        },
                        {
                            quest:'订单一直没有人接单?',
                            result:`可能您的订单中显示您的快递太大 ,但是报酬
                                    较少 ,您可以尝试更改订单信息 ,或者重新发布.`
                        },
                        {
                            quest:'超过两天未送达?',
                            result:`如果已接单,但是超过两天未收到快递,
                                    但是订单显示已经签收,这时请联系客服处理.`
                        },
                        {
                            quest:'订单异常？',
                            result:'如果您对订单有任何疑问 ,您都可以联系客服处理.'
                        }
                    ]
                },
                {
                    id:2,topImg:'./static/img/customer-service-question2.png',
                    h5Title:'快递问题',
                    list:[
                        {
                            quest:'快递损坏或丢失?',
                            result:'如果您快递送到手已经损坏 ,请联系客服协商处理'
                        },
                        {
                            quest:'订单一直没有人接单?',
                            result:`可能您的订单中显示您的快递太大 ,但是报酬
                                    较少 ,您可以尝试更改订单信息 ,或者重新发布.`
                        },
                        {
                            quest:'订单已发布但信息错误?',
                            result:`在没有接单的情况您可以自己选择取消订单 ,
                                    如果已经接单您可以联系送单员协助商量处理 ,
                                    或者联系客服.`
                        },
                        {
                            quest:'订单异常？',
                            result:'如果您对订单有任何疑问 ,您都可以联系客服处理.'
                        }
                    ]
                },
                {
                    id:3,topImg:'./static/img/customer-service-question3.png',
                    h5Title:'其他问题',
                    list:[
                        {
                            quest:'如何成为工作人员',
                            result:'在个人中心>>加入我们 可以申请加入'
                        },
                        {
                            quest:'订单异常？',
                            result:'如果您对订单有任何疑问 ,您都可以联系客服处理.'
                        },
                        {
                            quest:'订单时间异常？',
                            result:'如果您对订单有任何疑问 ,您都可以联系客服处理.'
                        },
                        {
                            quest:'订单信息异常？',
                            result:'如果您对订单有任何疑问 ,您都可以联系客服处理.'
                        }
                    ]
                }
            ],
            headerNote:[
                '小手一抖 快递到手!',
                '我听过最动听的话是: 您的快递到了 !',
                '天冷了, 拿快递这种事就交给我们吧 !'
            ],
            show:false
        }
    },
    components:{
        serverCall,
        question,
        serverHeader
    },
    methods:{
        openMsg() {
        this.$message({
            showClose: true,
            duration:2000,
            message: '亲, 抱歉哦, 程序员正在玩命修复中 !',
            type: 'error'
        });
      }
    },
    mounted() {
        this.show=true;
    },
    destroyed(){
        this.$emit('pageDestroyed');
    }
}
</script>

<style lang='scss'>
.customer-service{
    position: relative;
    padding: 2rem 0;
    background-color: rgb(247, 247, 247);
    color: #333;       
}
//立即咨询的提醒
.el-message{
    top:100px;
}
</style>
