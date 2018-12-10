<template>
    <div class="user-joinUs">
        <person-title>当前位置 :: 加入我们 >> <em>申请</em></person-title>
        <div class="user-joinUs-cont">
            <div class="joinUs-title">
                 <p class="title">你是否想在校园生活中添加一份乐趣,
                    并且同时获得一份收益? 那就加入我们成为工作人员吧!
                </p>
            </div>
            <div class="info-cont">
                <el-form :model="joinUsForm"
                label-position='left'
                @submit.native.prevent
                :status-icon='true'
                label-width="5rem" class="joinUs-Form">
                    <el-form-item label="姓名 : " prop="userName">
                        <el-input disabled
                        placeholder="为了安全,不可二次修改!"
                        v-model.trim="joinUsForm.userName"></el-input>
                    </el-form-item> 
                    <el-form-item label="性别 : " prop="gender">
                        <el-radio-group disabled
                        v-model.number="joinUsForm.gender">
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="0">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="联系电话 : " prop="phoneNum">
                        <el-input disabled
                        v-model="joinUsForm.phoneNum"></el-input>
                    </el-form-item> 
                    <el-form-item label="联系地址 : " prop="address">
                        <el-input disabled
                        placeholder="输入您的联系地址便于配送"
                        v-model="joinUsForm.address"></el-input>
                    </el-form-item> 
                    <el-form-item>
                        <el-button type="primary"
                        round
                        @click="handleJoinUs">申请加入</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            joinUsForm:{}
        }
    },
    created() {
        this.getUserInfo();
    },
    methods:{
        getUserInfo(){
            let loading = this.$loading({lock:true,text:'玩命加载中...'});
            axios.get(`/users/userInformation`).then(response=>{
                let res = response.data;
                loading.close();
                if(res.status=='0'){
                    this.joinUsForm = res.result;
                }else{
                    console.log(res.msg);    
                }
            }).catch(err=>{
                console.log(err);
                
            })
        },
        handleJoinUs(){
            let loading = this.$loading({lock:true,text:'玩命加载中...'});
            axios.post(`/admin/joinUsApply`,{userId:this.joinUsForm.userId}).then(response=>{
                let res = response.data;
                loading.close();
                if(res.status=='0'){
                    this.$message({
                        message: '恭喜你，申请成功! 请注意消息提醒',
                        type: 'success',
                        duration:4000,
                        showClose:true
                    });
                }else{
                    this.$message({
                        message:res.msg,
                        type: 'error',
                        duration:2000,
                        showClose:true
                    });  
                }
            }).catch(err=>{
                console.log(err);
                
            })
        }
    }
            
}
</script>

<style lang='scss'>
.user-joinUs-cont{
    padding-top: 2rem;
    .info-cont{
        padding-top: 2rem;
        width: 40%;
        min-width: 20rem;
        margin: 0 auto;
    }
}
.joinUs-title .title{
    color: #777;
    margin-bottom: 2rem;
}

</style>
