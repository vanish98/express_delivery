<template>
    <div class="myMessage">
        <person-title>我的消息 >> <em>消息</em></person-title>
        <div class="myMessage-cont">
            <el-collapse 
            @change="handleReadMsg"
            v-model="activeName" accordion>
                <el-collapse-item 
                v-for='item in userMessage'
                :key='item.sendTime'
                :class="{'messageIsRead':item.isRead}"
                :title="item.title"
                :name="item.title">
                    <template slot="title">
                    <i class="el-icon-message"></i>
                    {{item.title}}
                    ( {{item.isRead ? '已读' : '未读'}} )
                    </template>
                    <p class="msg-body">
                        {{item.cont}} <br>
                        <span>(发送时间 : {{item.sendTime}})</span>
                    </p>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            activeName: '',
            userMessage:[],
            loading:null 
        }
    },
    mounted() {
        this.getMessage();
        this.loading = this.$loading({lock:true,text:'正在加载...'});
    },
    methods:{
        getMessage(){
            axios.get('/users/userMessage').then(response=>{
                let res = response.data;
                this.loading.close();
                if(res.status=='0'){
                    this.userMessage = res.result;
                }else{
                    this.$message({
                        type: 'error',
                        message:res.msg
                    });  
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        handleReadMsg(data){   
            let flag = this.userMessage.filter(it=>!it.isRead && it.title==data);
            if(data !='' && flag.length){
                axios.get(`/users/readMessage?title=${data}`).then(response=>{
                let res = response.data;
                    if(res.status=='0'){
                        this.getMessage();
                    }else{
                        console.log(res.msg);  
                    }
                }).catch(err=>{
                    console.log(err);
                });
            } 
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
        color: rgb(85, 192, 211); //未读消息标题颜色
    }
    .messageIsRead .el-collapse-item__header{
        color: #999; //已读消息标题颜色
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
