<template>
    <div class="myMessage">
        <person-title>我的消息 >> <em>消息</em></person-title>
        <div class="myMessage-cont">
            <el-collapse v-model="activeName" accordion>
            <el-collapse-item 
            v-for='item in userMessage'
            :key='item.id'
            :title="item.title"
            :name="item.id">
                <template slot="title">
                  <i class="el-icon-message"></i>
                  {{item.title}}
                </template>
                <p class="msg-body">{{item.msg}}</p>
            </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            activeName: '',
            userMessage:[
                {
                    id:1,
                    title:'欢迎新用户',
                    msg:'欢迎使用校园闪电侠'
                },
                {
                    id:2,
                    title:'恭喜成为会员',
                    msg:'恭喜你成为会员,您享有1000个优惠特权哦!'
                },
                {
                    id:3,
                    title:'用户反馈信息',
                    msg:`您的反馈信息我们已经收到,
                    很感谢您的建议!对于您说的问题我们将进行解决`
                }
            ]
            
        }
    }
}
</script>

<style lang='scss'>
.myMessage-cont{
    text-align: left;
    // 展开的框框 ,下划线
    .el-collapse-item__header.is-active{
        border-bottom-color: #ebeef5;
    }
    // 标题框
    .el-collapse-item__header{
        font-size: 0.8rem;
        padding-left: 2rem;
        color: rgb(85, 192, 211);
    }
    // 内容框
    .el-collapse-item__content{
        padding-left: 2rem;
        padding-top: 0.5rem;
    }
    .msg-body{
        letter-spacing: 0.1rem;
        color: #666;
    }   
}
</style>
