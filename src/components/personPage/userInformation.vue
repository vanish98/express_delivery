<template>
    <div class="userInformation">
        <person-title>当前位置 :: 个人中心 >> <em>我的信息</em></person-title>
        <div class="information-cont">
            <ul>
                <li class="info-list">
                    <span>姓名 : </span>
                    {{userInformation.userName}}
                </li>
                <li class="info-list">
                    <span>性别 : </span>
                    {{userInformation.gender==1?'男':'女'}}
                </li>
                <li class="info-list">
                    <span>用户等级 : </span>
                    {{userInformation.grade==0?'普通用户':'工作人员'}}
                </li>
                <li class="info-list" v-if="userInformation.grade==1">
                    <span>用户余额 : </span>
                     ¥{{userInformation.balance | priceInit}}
                </li>
                <li class="info-list">
                    <span>联系电话 : </span>
                    {{userInformation.phoneNum}}
                    <i class="el-icon-setting"
                    @click="dialogFormVisible = true">修改</i>
                </li>
                <li class="info-list">
                    <span>联系地址 : </span>
                    {{userInformation.address}}
                </li>
                <li class="info-list">
                    <span>注册时间 : </span>
                    {{userInformation.regDate}}
                </li>
                <li class="info-list">
                    <span>注册账号: </span>
                    {{userInformation.regPhone}}
                </li>
            </ul>
            <div class="changePhone">
                <el-dialog title="修改联系号码" :visible.sync="dialogFormVisible">
                <el-form :model="formPhone" 
                ref="userphone"
                @submit.native.prevent
                :rules="rules">
                    <el-form-item label="联系电话 :" prop='newPhone'>
                        <el-input v-model="formPhone.newPhone"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" 
                    @click="handleChangePhone('userphone')">确 定</el-button>
                </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            // 请求得到不同用户级别的信息
            // userInformation:{
            //     userName:'波哥无敌',
            //     gender:1, //1男 0女
            //     grade:0,  //0 普通用户 1工作人员
            //     balance:0.00,
            //     phoneNum:15279778477,
            //     address:'南昌大学,8#518',
            //     regDate:'2018-11-18',
            //     regPhone:15279778477
            // },
            userInformation:{
                userName:'波哥无敌',
                gender:1, //1男 0女
                grade:1,  //0 普通用户 1工作人员
                balance:0.00,
                phoneNum:15279778477,
                address:'南昌大学,8#518',
                regDate:'2018-11-18',
                regPhone:15279778477
            },
            dialogFormVisible:false,
            formPhone: {
                newPhone:''
            },
            rules: {
                newPhone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { pattern:/^1[3-8][0-9]{9}$/, message: '手机号码格式不正确', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        handleChangePhone(formName){   
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.dialogFormVisible = false;
                    console.log('修改成功 '+this.formPhone.newPhone);
                    
                    // this.$emit('changePhone',this.formPhone.newPhone);
                    // 通过vuex 或者直接这里掉接口
                } else {
                    return false;
                }
            });
            
        }
    }
}
</script>

<style  lang='scss'>
.information-cont{
    width: 100%;
    padding-top: 3rem;
    cursor: pointer;
    // 修改手机弹框
    .el-dialog{
        width: 20rem;
    }
    ul{
        width: 100%;
    }
    .info-list{
        display: block;
        padding-left: 6rem;
        min-width: 10rem;
        line-height: 1.5rem;
        text-align: left;
        font-size: 0.8rem;
        color: #3399CC;
        span{
            color: #444;
            letter-spacing: 0.05rem;
        }
    }
}
</style>
