<template>
    <div class="userInformation">
        <person-title>当前位置 :: 个人中心 >> <em>我的信息</em></person-title>
        <div class="information-cont">
            <ul class="info-body">
                <li class="info-list">
                    <!-- background-image: linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%); -->
                    <el-tag
                    color='#eea2a2'
                    disable-transitions>姓名 : </el-tag>
                    {{userInformation.userName}}
                </li>
                <li class="info-list">
                    <el-tag
                    color='#6f86d6'
                    disable-transitions>性别 : </el-tag>
                    {{userInformation.gender==1?'男':'女'}}
                </li>
                <li class="info-list">
                    <el-tag
                    color='#57c6e1'
                    disable-transitions>用户等级 : </el-tag>
                    {{userInformation.grade==0?'普通用户':'工作人员'}}
                </li>
                <li class="info-list" v-if="userInformation.grade==1">
                    <el-tag
                    color='#b49fda'
                    disable-transitions>用户余额 : </el-tag>
                     <el-tag
                    color='#57c6e1'
                    disable-transitions>
                    ¥{{userInformation.balance | priceInit}}</el-tag>
                </li>
                <li class="info-list">
                    <el-tag
                    color='#7ac5d8'
                    disable-transitions>联系电话 : </el-tag>
                    {{userInformation.phoneNum}}
                    <i class="el-icon-setting"
                    @click="dialogFormVisible = true">修改</i>
                </li>
                <li class="info-list">
                    <el-tag
                    color='#eea2a2'
                    disable-transitions>联系地址 : </el-tag>
                    {{userInformation.address}}
                </li>
                <li class="info-list">
                    <el-tag
                    color='#eea2a2'
                    disable-transitions>上次登录 : </el-tag>
                    {{userInformation.regDate}}
                </li>
                <li class="info-list">
                    <el-tag
                    color='#eea2a2'
                    disable-transitions>注册时间 : </el-tag>
                    {{userInformation.regDate}}
                </li>
                <li class="info-list">
                    <el-tag
                    color='#eea2a2'
                    disable-transitions>注册账号 : </el-tag>
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
                lastLogin:'2018-11-23 16:52',
                regDate:'2018-11-18 15:43',
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
    .info-body{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
    }
    .info-list{
        display: block;
        padding-left: 2rem;
        margin-bottom: 1rem;
        min-width: 10rem;
        width: 50%;
        line-height: 1.5rem;
        text-align: left;
        font-size: 0.8rem;
        color: #3399CC;
        &:nth-child(2n+1){
            width: 35%;
        }
        span{
            color: #fff;
            letter-spacing: 0.05rem;
            font-size: 0.8rem;
        }
    }
}
</style>
