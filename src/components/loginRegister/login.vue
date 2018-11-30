<template>
    <div class="right-login-body">
        <div class="top-header-cont">
            <div class="head-pic">
                <img src="../../assets/img/login-head-pic.jpg" alt="头像框">
            </div>
        </div>
        <div class="form-cont">
            <el-form :model="loginForm" :rules="loginRules" 
            ref="loginForm" label-width="5rem"
            
            class="user-loginForm">
                <el-form-item  label="账号" prop="userId">
                    <el-input v-model="loginForm.userId"
                    placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="passWord">
                    <el-input :type='inputType' 
                    v-model="loginForm.passWord"
                    placeholder="请输入密码"></el-input>
                    <i class="toggle el-icon-view"
                    :class="{'color':loginForm.passWord==''}"
                    @click="changeInputType"></i>
                </el-form-item>
                <el-form-item  label="验证码" class="code" prop="validateCode">
                    <el-input 
                    v-model.trim="loginForm.validateCode"
                    placeholder="请输入验证码"></el-input>
                </el-form-item>
                <div class="rightCode">
                    <div class="rightCode-cont" @click="handlechangeImg">
                        <img :src="codeImg" 
                        class="Code-bg"
                        alt="验证码图片">
                        <span class="randomCode">{{randomCode}}</span>
                    </div>
                </div>
                <el-form-item>
                    <el-button type="primary"
                    @click="submitForm('loginForm')">登录</el-button>
                    <el-button @click="resetForm('loginForm')">重置</el-button>
                </el-form-item>
            </el-form> 
        </div>
        <div class="footer">
            <router-link class="link footer-left" to="/register">注册</router-link>
            <router-link class="link footer-right" to="/forgotPassword">忘记密码?</router-link>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
        let validateCode =(rule, value, callback) => {
            if (this.randomCode!=this.$data.loginForm.validateCode) {
                  callback(new Error('验证码不正确 !'));
            }else{
                 callback();
            }
        };
        return{
            inputType:'password',
            randomCode:'',
            codeImg:'',
            loginForm:{
                userId:'',
                passWord:'',
                validateCode:''
            },
            loginRules:{
                userId:[
                    { required: true, message: '请输入账号', trigger: 'blur' },
                    { pattern:/^1[3-8][0-9]{9}$/ , message:'手机号格式不正确', trigger: 'blur'}
                ],
                passWord:[
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                validateCode:[
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                    { validator: validateCode , trigger: 'blur'},
                    { validator: validateCode , trigger: 'change'}                   
                ]
            },
            validateCodeImg:[
                './static/img/login-Verification-1.png',
                './static/img/login-Verification-2.png',
                './static/img/login-Verification-3.png',
                './static/img/login-Verification-4.png',
            ]
        }
    },
    mounted() {
        this.randomCode=this.randomNum();
        this.codeImg=this.randomCodeimg();
    },
    methods: {
        randomNum(){
            return Math.random().toString(16).slice(-6);
        },
        randomCodeimg(){
            return this.validateCodeImg[Math.floor(Math.random()*4)]
        },
        changeInputType(){
            this.inputType=(this.inputType=='password')?'text':'password';
        },
        handlechangeImg(){
            this.codeImg=this.randomCodeimg();
            this.randomCode=this.randomNum();
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                let userPost = {
                    userId:this.loginForm.userId,
                    passWord:this.loginForm.passWord
                };
                axios.post('/users/login',userPost).then(response=>{
                    let res = response.data;                  
                    if(res.status=='0'){
                        this.$notify({
                            title: '登录成功',
                            message: '恭喜你! 登录成功!',
                            duration:2000,
                            type: 'success'
                        });
                        this.$router.push({path:'/home'});
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
.right-login-body{
    position: relative;
    width: 100%;
    height: 100%;
    .top-header-cont{
        padding-top: 2rem;
        .head-pic{
            overflow: hidden;
            width: 4.5rem;
            height: 4.5rem;
            border-radius: 50%;
            margin: 0 auto;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
    .form-cont{
        width: 90%;
        margin-top: 2rem;
        .el-form-item{
            margin-bottom: 1.1rem;
        }
        .rightCode{
            position: relative;
            overflow: hidden;
            display: flex;
            justify-content: flex-end;
            text-align: right;
            width: 100%;
            margin-top: 0.2rem;
            margin-bottom: 0.5rem;
            cursor: pointer;
        }
        .rightCode-cont{
            position: relative;
            height: 2rem;
            width: 6.5rem;
        }
        .randomCode{
            position: absolute;
            display: block;
            height: 100%;
            line-height: 1.5rem;
            right: 0;
            top: 50%;
            font-size: 1.1rem;  
            letter-spacing: 0.1rem;
            color: #555; 
            transform:translate(-30%,-50%) rotate(random()*15deg);      
            transform-origin:center;
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
