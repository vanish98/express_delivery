<template>
    <div class="right-forgotPassword-body">
        <div class="header-title">
            <h2 class="title">forgot</h2>
        </div>
        <div class="form-cont">
            <el-form :model="forgotForm" :rules="forgotFormRules" 
            ref="forgotForm" label-width="5rem"
            @submit.native.prevent
            class="user-forgotForm">
                <el-form-item  label="账号" prop="userId">
                    <el-input v-model="forgotForm.userId"
                    placeholder="请输入注册手机号"></el-input>
                </el-form-item>
                <el-form-item label="密保问题" prop="passwordQuestion">
                    <el-select v-model="forgotForm.passwordQuestion" placeholder="您设置的密保问题">
                    <el-option 
                    v-for='item in questionList'
                    :key='item'
                    :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  label="密保答案" prop="questionAnswer">
                    <el-input v-model="forgotForm.questionAnswer"
                    placeholder="您设置的密保答案"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('forgotForm')">找回</el-button>
                    <el-button @click="resetForm('forgotForm')">重置</el-button>
                </el-form-item>
            </el-form> 
        </div>
        <div class="footer">
            <router-link class="link footer-left" to="/login">登录</router-link>
            <router-link class="link footer-right" to="/register">注册</router-link>
        </div>
    </div>
</template>

<script>
import axios from  'axios'
export default {
  data(){
        return{
            questionList:[
                '最喜欢的食物',
                '最敬爱的人',
                '小学班主任老师',
                '最喜欢的电影'
            ],
            forgotForm:{
                userId:'',
                passwordQuestion:'',
                questionAnswer:''
            },
            forgotFormRules:{
                userId:[
                    { required: true, message: '请输入账号', trigger: 'blur' },
                    { pattern:/^1[3-8][0-9]{9}$/ , message:'手机号格式不正确', trigger: 'blur'}
                ],
                passwordQuestion:[
                    { required: true, message: '请选择密保问题', trigger: 'change' }
                ],
                questionAnswer:[
                    { required: true, message: '请选择密保答案', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                 let userPost = {
                    userId:this.forgotForm.userId,
                    passwordQuestion:this.forgotForm.passwordQuestion,
                    questionAnswer:this.forgotForm.questionAnswer
                };
                axios.post('/users/forgotPassWord',userPost).then(response=>{
                    let res = response.data;                  
                    if(res.status=='0'){
                        this.$notify({
                            title: '找回成功',
                            message: `您的密码为${res.result.passWord}`,
                            duration:0,
                            type: 'success'
                        });
                        this.$router.push({path:'/login'});
                    }else{
                        this.$notify({
                            title: '登录失败',
                            message:res.msg,
                            duration:2000,
                            type: 'error' 
                        });
                    }
                }).catch(err=>{
                    console.log(err);               
                })
            } else {
                console.log('error submit!!');
                return false;
            }
        });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
 
}
</script>

<style lang='scss'>
.right-forgotPassword-body{
    position: relative;
    width: 100%;
    height: 100%;
    .header-title{
        height: 4rem;
        .title{
            line-height: 4rem;
            font-size: 1rem;
            letter-spacing: 0.05rem;
            color: #555;
        }
    }
    .form-cont{
        width: 90%;
        margin-top: 1rem;
        .el-form-item{
            margin-bottom: 1.1rem;
        }
        // 密保问题
        .el-select{
            width: 100%;
        }
        // 登录按钮
        .el-button--primary{
            margin-right: 0.5rem;
        }
    }
}

</style>

