<template>
    <div class="myMessage">
        <person-title>我的消息 >> <em>消息</em></person-title>
        <div class="myMessage-cont">
            <el-collapse 
            @change="handleReadMsg"
            v-model="activeName" accordion>
                <el-collapse-item 
                v-for='item in userMessage'
                :key='item.title'
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
                        <el-button type="danger" size='mini'
                        @click="handleDeleteMessage(item.title)"
                        icon="el-icon-delete" circle></el-button>
                    </p>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
//借助兄弟通信, 之前是为了跳转菜单,
//这里借助一下 用来更新消息红点数量,名字就懒得改了
import {gotoNewOrder} from './../../assets/js/gotoNewOrder'
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
    },
    methods:{
        getMessage(){
            let loading = this.$loading({lock:true,text:'玩命加载中...'});
            axios.get('/users/userMessage').then(response=>{
                let res = response.data;
                loading.close();
                if(res.status=='0'){
                    this.userMessage = res.result;
                    let notReadMsg= this.userMessage.filter(it=>!it.isRead);
                    if(!notReadMsg.length){
                        this.$store.commit("saveUserInfo",{msgLen:notReadMsg .length});
                    }
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
                        gotoNewOrder.$emit('readMessage');
                    }else{
                        console.log(res.msg);  
                    }
                }).catch(err=>{
                    console.log(err);
                });
            } 
        },
        handleDeleteMessage(title){
             this.$confirm('此操作将永久删除该消息, 是否继续?', 
                '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'error'
            }).then(() => {
                axios.get(`/users/deleteMessage?title=${title}`).then(response=>{
                    let res = response.data;
                    if(res.status=='0'){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getMessage();
                    }else{
                        this.$message({
                            type: 'error',
                            message:res.msg
                        });  
                    }
                }).catch(err=>{
                    console.log(err);     
                });  
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });  
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
        background-color: #e7f2fb;
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
        padding-right: 2rem;
        color: #666;
    }   
}
</style>
