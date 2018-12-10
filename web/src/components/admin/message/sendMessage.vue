<template>
    <div class="sendMessage-page">
        <person-title>当前位置 :: 消息系统 >> <em>发送消息</em></person-title>
        <div class="sendMessage-page-cont">
            <el-form  ref="sendMessageForm"
            :model="sendMessageForm" class="admin-sendMessage">
                <el-form-item label="发送类型 :">
                    <el-radio-group v-model="sendMessageForm.msgWho">
                    <el-radio label="all" >群发</el-radio>
                    <el-radio label="one" >单发</el-radio>
                    </el-radio-group>
                </el-form-item>
                <template  v-if="sendMessageForm.msgWho=='one'">
                    <el-form-item label="对象级别 :">
                        <el-radio-group v-model="sendMessageForm.msgOneGrade">
                        <el-radio :label="0" >普通用户</el-radio>
                        <el-radio :label="1" >工作人员</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="单发对象 :" >
                        <el-input v-model="sendMessageForm.userId"
                        placeholder="请输入收消息人账号"></el-input>
                    </el-form-item>
                </template>
                <template v-else>
                <el-form-item label="单发对象 :" >
                    <el-checkbox-group 
                        v-model="sendMessageForm.msgAllList"
                        :min="1"
                        :max="2">
                        <el-checkbox :label="0">普通用户</el-checkbox>
                        <el-checkbox :label="1">工作人员</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                </template>
                <el-form-item label="标题 :" >
                    <el-input v-model="sendMessageForm.msgTitle"
                    placeholder="消息标题"></el-input>
                </el-form-item>
                <el-form-item label="消息 : ">
                    <el-input type="textarea" :rows="4"
                    placeholder="请输入内容..." 
                    v-model="sendMessageForm.remarks">
                    </el-input>
                </el-form-item>  
                <el-form-item>
                    <el-button type="primary" @click="handleSendMessage">发送消息</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import axios from  'axios'
export default {
    data(){
        return{ 
            sendMessageForm:{
                msgWho:'all',
                userId:'',
                msgTitle:'',
                remarks:'',
                msgOneGrade:0,
                msgAllList:[0]
            }
        }
    },
    methods:{
        messageFormTest(){
            let msgData = this.sendMessageForm;
            if(msgData.remarks=='' && msgData.msgTitle==''){
                return false
            }else{
                if(msgData.msgWho=='all'){
                    return true
                }else if(msgData.msgWho=='one' && /^1[3-8][0-9]{9}$/.test(msgData.userId)){
                    return true
                }else{
                    return false
                }
            }
            
        },
        handleSendMessage(){
            let flag = this.messageFormTest();
            if(flag){
                let loading = this.$loading({lock:true,text:'玩命加载中...'});
                axios.post(`/admin/sendMessage`,this.sendMessageForm).then(response=>{
                    let res = response.data;
                    loading.close();
                    if(res.status=='0'){
                        this.$message({
                            type: 'success',
                            message: '发送成功!',
                            showClose:true
                        });
                    }else{   
                        this.$message({
                            type: 'error',
                            message: res.msg,
                            showClose:true
                        });
                    }
                }).catch(err=>{
                    console.log(err);
                    loading.close();
                })
            }else{
                this.$message({
                    type: 'error',
                    message: '条件格式不正确!',
                    showClose:true
                });
            }
        }
    }
}
</script>

<style>
.sendMessage-page-cont{
    width: 60%;
    margin: 0 auto;
}
</style>
