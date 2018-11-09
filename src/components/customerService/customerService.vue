<template>
    <div class="customer-service">
        <serverHeader :headerNote='headerNote'></serverHeader>
        <question 
        :questionData='questionData'
        :show='show'></question>
        <serverCall @openMsg='openMsg'></serverCall>
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
                    h5Title:'催单问题',
                    list:[
                        {
                            quest:'订单超时了怎么办?',
                            result:'投诉1'
                        },
                        {
                            quest:'订单一直没有骑手接单怎么办?',
                            result:'投诉2'
                        },
                        {
                            quest:'如何催单1?',
                            result:'投诉3'
                        },
                        {
                            quest:'如何催单2？',
                            result:'投诉4'
                        }
                    ]
                },
                {
                    id:2,topImg:'./static/img/customer-service-question2.png',
                    h5Title:'退单问题',
                    list:[
                        {
                            quest:'订单超时了怎么办?11',
                            result:'投诉11'
                        },
                        {
                            quest:'订单一直没有骑手接单怎么办?11',
                            result:'投诉22'
                        },
                        {
                            quest:'如何催单1?',
                            result:'投诉33'
                        },
                        {
                            quest:'如何催单2？',
                            result:'投诉44'
                        }
                    ]
                },
                {
                    id:3,topImg:'./static/img/customer-service-question3.png',
                    h5Title:'活动问题',
                    list:[
                        {
                            quest:'订单超时了怎么办?22',
                            result:'投诉66'
                        },
                        {
                            quest:'订单一直没有骑手接单怎么办?22',
                            result:'投诉77'
                        },
                        {
                            quest:'如何催单1?',
                            result:'投诉88'
                        },
                        {
                            quest:'如何催单2？',
                            result:'投诉99'
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

<style scoped lang='scss'>
.customer-service{
    position: relative;
    padding: 2rem 0;
    background-color: rgb(247, 247, 247);
    color: #333;       
}
</style>
