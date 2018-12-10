<template>
    <div class="addInformation">
        <person-title>当前位置 :: 个人中心 >> <em>完善个人信息</em></person-title>
        <div class="add-infor-cont">
            <el-form :model="ruleForm" 
            :rules="rules" ref="ruleForm" 
            label-position='left'
            @submit.native.prevent
            :status-icon='true'
            label-width="7rem" class="demo-ruleForm">
                <el-form-item label="姓名 : " prop="userName">
                    <el-input 
                    placeholder="为了安全,不可二次修改!"
                    v-model.trim="ruleForm.userName"></el-input>
                </el-form-item> 
                <el-form-item label="性别 : " prop="gender">
                    <el-radio-group v-model.number="ruleForm.gender">
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="0">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="联系电话 : " prop="phoneNum">
                    <el-input v-model="ruleForm.phoneNum"></el-input>
                </el-form-item> 
                <el-form-item label="联系地址 : " prop="address">
                    <el-input
                    placeholder="输入您的联系地址便于配送"
                     v-model="ruleForm.address"></el-input>
                </el-form-item> 
                <el-form-item class="completed-info-btn">
                    <el-button type="primary"
                     @click="submitForm('ruleForm')">修改</el-button>
                    <el-button  @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import {gotoNewOrder} from './../../../assets/js/gotoNewOrder'
import axios from 'axios'
export default {
    data() {
        let regexpPhoneNumber=(rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入联系电话!'));
            }else if(!/^1[3-8][0-9]{9}$/.test(value)){
                callback(new Error('手机号码格式不正确!'));
            }else{
                callback();
            }
        };
      return {
        ruleForm: {
          userName: '',
          phoneNum:'',
          gender:1,
          address:''
        },
        rules: {
          userName: [
            { required: true, message: '请输入名字', trigger: 'blur' },
            { min: 2, max: 6, message: '长度在 3 到 6 个字符', trigger: 'change' },
            { min: 2, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' },
            { pattern:/\D/, message: '不能为纯数字', trigger: 'change' },
            { pattern:/\D/, message: '不能为纯数字', trigger: 'blur' }
          ],
          phoneNum: [
            { required: true, message: '请输入您的联系方式'},
            { validator: regexpPhoneNumber, trigger: 'change'},
            { validator: regexpPhoneNumber, trigger: 'blur'}
          ],
          gender: [
            { required: true, type:'number', message: '请选择性别', trigger: 'change' }
          ],
          address:[
              { required: true, message: '请输入联系地址', trigger: 'blur' }
          ]
        }
      };
    },
    mounted() {
        this.ruleForm.phoneNum = this.$store.state.user.userInfo.userId;
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
               let addInfo = {
                   userName:this.ruleForm.userName,
                   phoneNum:this.ruleForm.phoneNum,
                   gender:this.ruleForm.gender,
                   address:this.ruleForm.address
               }
                axios.post(`/users/addInformation`,addInfo).then(response=>{
                    let res = response.data;
                    if(res.status=='0'){
                         this.$notify({
                            title: '修改成功',
                            message: '恭喜你! 修改成功!',
                            duration:2000,
                            type: 'success'
                        });
                        gotoNewOrder.$emit('goNewOrder','userInformation');
                        this.$router.push({path:'userInformation'});
                    }else{
                        this.$notify({
                            title: '修改失败',
                            message:res.msg,
                            duration:2000,
                            type: 'error'
                        });  
                    }
                }).catch(err=>{
                    console.log(err);
                    
                })
          } else {
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
.add-infor-cont{
    padding-left: 5rem;
    padding-top: 2rem;
    width: 40%;
    min-width: 20rem;
    .el-form-item{
        margin-bottom: 1.5rem;
    }
}
.completed-info-btn{
    margin: 2rem;
}
@media only screen and (max-width:768px){
    .add-infor-cont{
        width: 70%;
    }
}
</style>
