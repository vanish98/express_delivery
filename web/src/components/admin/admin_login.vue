<template>
    <div class="admin-login-page">
        <div class="admin-login-cont">
            <div class="header-title">
                <h2 class="title">admin</h2>
            </div>
            <div class="form-cont">
                <el-form :model="adminForm" :rules="adminFormRules" 
                ref="adminForm" label-width="3rem"
                @submit.native.prevent
                class="admin-Form">
                    <el-form-item  label="账号" prop="adminId">
                        <el-input v-model="adminForm.adminId"
                        placeholder="管理员账号"></el-input>
                    </el-form-item>
                    <el-form-item  label="密码" prop="adminPassWord">
                        <el-input :type='inputType' 
                        v-model="adminForm.adminPassWord"
                        placeholder="管理员密码"></el-input>
                        <i class="toggle el-icon-view"
                        :class="{'color':adminForm.adminPassWord==''}"
                        @click="changeInputType"></i>
                    </el-form-item>
                </el-form> 
                <el-button type="primary"
                 @click="submitForm('adminForm')">登录</el-button>
                <el-button  @click="resetForm('adminForm')">重置</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from  'axios'
export default {
  data(){
        return{
            inputType:'password',
            adminForm:{
                adminId:'',
                adminPassWord:''
            },
            adminFormRules:{
                adminId:[
                    { required: true, message: '请输入账号', trigger: 'blur' },
                    { pattern:/^1[3-8][0-9]{9}$/ , message:'手机号格式不正确', trigger: 'blur'}
                ],
                adminPassWord:[
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    mounted(){
        window.onkeydown = (e)=>{
            let key = window.event.keyCode;
            if(key==13){
                this.submitForm('adminForm');
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
                 let adminPost = {
                    adminId:this.adminForm.adminId,
                    adminPassWord:this.adminForm.adminPassWord
                };
                axios.post('/admin/login',adminPost).then(response=>{
                    let res = response.data;                  
                    if(res.status=='0'){
                        this.$notify({
                            title: '登录',
                            message: `登录成功`,
                            duration:2000,
                            type: 'success'
                        });
                        this.$router.push({path:'/admin'});
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
.admin-login-page{
    position: fixed;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to bottom, #4facfe 0%, #00f2fe 100%);
    background-color: #cff;
    display: flex;
    justify-content: center;
    align-items: center;
}
.admin-login-cont{
    position: relative;
    width: 25rem;
    height: 20rem;
    background-color: #fff;
    box-shadow: 2rem 2rem 3rem #423f3f; 
    .header-title{
        height: 4rem;
        .title{
            line-height: 4rem;
            font-size: 1.5rem;
            letter-spacing: 0.05rem;
            color: #777;
        }
    }
    .form-cont{
        width: 70%;
        margin: 2rem auto;
        .admin-Form{
            margin-bottom: 3rem;
        }
        .el-form-item{
            margin-bottom: 1.5rem;
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

