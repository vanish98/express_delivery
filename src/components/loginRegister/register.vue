<template>
    <div class="right-register-body">
        <div class="header-title">
            <h2 class="title">register</h2>
        </div>
        <div class="form-cont">
            <el-form :model="registerForm" :rules="registerRules" 
            ref="registerForm" label-width="5rem"
            @submit.native.prevent
            class="user-registerForm">
                <el-form-item  label="账号" prop="userId">
                    <el-input v-model="registerForm.userId"
                    placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="passWord">
                    <el-input :type='inputType' 
                    v-model="registerForm.passWord"
                    placeholder="请输入密码"></el-input>
                    <i class="toggle el-icon-view"
                    :class="{'color':registerForm.passWord==''}"
                    @click="changeInputType"></i>
                </el-form-item>
                <el-form-item label="确认密码" prop="agPassword">
                    <el-input :type='inputType' 
                    v-model="registerForm.agPassword"
                    placeholder="请再次输入密码"></el-input>
                    <i class="toggle el-icon-view"
                    :class="{'color':registerForm.agPassword==''}"
                    @click="changeInputType"></i>
                </el-form-item>
                <el-form-item label="密保问题" prop="passwordQuestion">
                    <el-select v-model="registerForm.passwordQuestion" placeholder="用于找回密码">
                    <el-option 
                    v-for='item in questionList'
                    :key='item'
                    :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  label="密保答案" prop="questionAnswer">
                    <el-input v-model="registerForm.questionAnswer"
                    placeholder="请输入密保答案"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                    plain 
                    @click="submitForm('registerForm')">注册</el-button>
                    <el-button @click="resetForm('registerForm')">重置</el-button>
                </el-form-item>
            </el-form> 
        </div>
        <div class="footer">
            <router-link class="link footer-left" to="/login">登录</router-link>
            <router-link class="link footer-right" to="/forgotPassword">忘记密码?</router-link>
        </div>
    </div>
</template>

<script>
import  axios from 'axios'
export default {
  data(){
        let againPassword =(rule, value, callback) => {
            if (value!=this.$data.registerForm.passWord) {
                  callback(new Error('两次密码不一样 !'));
            }else{
                 callback();
            }
        };
        let regexpPhoneNumber=(rule, value, callback) => {
            if(!/^1[3-8][0-9]{9}$/.test(value)){
                callback(new Error('手机号码格式不正确!'));
            }else{
                axios.get(`/users/userExistence?userId=${value}`).then(response=>{
                    let res = response.data;
                    if(res.status=='1'){
                        callback(new Error('此账号已存在!'));
                    }else{
                        callback();
                    }  
                }).catch(err=>{
                    console.log(err);
                });
            }
        };
        return{
            inputType:'password', 
            questionList:[
                '最喜欢的食物',
                '最敬爱的人',
                '小学班主任老师',
                '最喜欢的电影'
            ],  
            registerForm:{
                userId:'',
                passWord:'',
                agPassword:'',
                passwordQuestion:'',
                questionAnswer:''
            },
            registerRules:{
                userId:[
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { validator: regexpPhoneNumber , trigger: 'blur'}
                ],
                passWord:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                     { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' },
                    {  message: '请输入密码', trigger: 'blur' }
                ],
                agPassword:[
                    { required: true, message: '请再次输入密码', trigger: 'blur' },
                     { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' },
                    { validator: againPassword , trigger: 'change'},
                    { validator: againPassword , trigger: 'blur'}
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
        changeInputType(){
            this.inputType=(this.inputType=='password')?'text':'password';
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                axios.post('/users/register',{
                    userId:this.registerForm.userId,
                    passWord:this.registerForm.passWord,
                    passwordQuestion:this.registerForm.passwordQuestion,
                    questionAnswer:this.registerForm.questionAnswer
                }).then(response=>{
                    let res = response.data;
                    if(res.status=='0'){
                        this.$notify({
                            title: '注册成功',
                            message: '恭喜你! 注册成功!',
                            duration:2000,
                            type: 'success'
                        });
                        this.$router.push({path:'/login'});
                    }else{
                        this.$notify({
                            title: '注册失败',
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
.right-register-body{
    position: relative;
    width: 100%;
    height: 100%;
    .header-title{
        height: 4rem;
        .title{
            line-height: 4rem;
            font-size: 1.1rem;
            letter-spacing: 0.05rem;
            color: #555;
        }
    }
    .form-cont{
        width: 90%;
        .el-form-item{
            margin-bottom: 1.1rem;
        }
        // 密保问题
        .el-select{
            width: 100%;
        }
        .toggle.el-icon-view{
            position: absolute;
            width: 1.5rem;
            height: 1.5rem;
            line-height: 1.5rem;
            top: 50%;
            transform: translate(0,-50%);
            right: 0.2rem;
        }
        .toggle.color{
             color: #ccc;
        }
        // 登录按钮
        .el-button--primary{
            margin-right: 0.5rem;
        }
    }
}

</style>


