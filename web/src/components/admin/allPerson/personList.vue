<template>
    <el-table
    :data="theUserList"
    :default-sort = "{prop: 'regDate', order: 'descending'}"
    style="width: 100%">
    <el-table-column type="expand" >
        <template slot-scope="props">
            <el-form label-position="left" 
            inline class="adminTable admin-table-expand">
                <el-form-item label="姓名 :" >
                    <span>{{ props.row.userName }}</span>
                </el-form-item>
                <el-form-item label="性别 :" >
                    <span>{{props.row.gender==1?'男':'女'}}</span>
                </el-form-item>
                <el-form-item label="注册账号 :" >
                    <span>{{ props.row.userId }}</span>
                </el-form-item>
                <el-form-item label="联系电话 :" >
                    <span>{{ props.row.phoneNum }}</span>
                </el-form-item>
                <el-form-item label="上次登录 :" >
                    <span>{{ props.row.lastLoginTime }}</span>
                </el-form-item>
                <el-form-item label="注册时间 :" >
                    <span>{{ props.row.regDate }}</span>
                </el-form-item>
                <el-form-item label="密保问题 :" >
                    <span>{{ props.row.passwordQuestion }}</span>
                </el-form-item>
                <el-form-item label="密保答案 :" >
                    <span>{{ props.row.questionAnswer }}</span>
                </el-form-item>
                <el-form-item label="订单总数 :" >
                    <span>{{ props.row.OrderNUm }}</span>
                </el-form-item>
                <el-form-item label="级别 :" >
                    <span>{{props.row.grade==1?'工作人员':'普通用户'}}</span>
                </el-form-item>
                <template v-if="props.row.grade==1">
                    <el-form-item label="余额 :" >
                        <span>{{ props.row.balance | priceInit }}</span>
                    </el-form-item>
                    <el-form-item label="支付宝号 :" >
                        <span v-for="it in props.row.alipayAccountzhiFuBao"
                        :key='it.value'>{{it.value}}</span>
                    </el-form-item>
                    <el-form-item label="银行卡号 :"  class="BankCard">
                        <span v-for="it in props.row.alipayAccountBankCard"
                        :key='it.value'>{{it.value}}</span>
                    </el-form-item>
                </template>
                <el-form-item label="联系地址 :" class="address">
                    <span>{{ props.row.address }}</span>
                </el-form-item>
                <template v-if="isApply || isHistoryApply">
                    <el-form-item label="处理状态 :" >
                        <span>{{ props.row.isHandle ?'已处理' :'未处理' }}</span>
                    </el-form-item>
                    <el-form-item label="申请次数 :" >
                        <span>{{ props.row.applycount}}</span>
                    </el-form-item>
                </template>
                <template v-if="isHistoryApply">
                    <el-form-item label="申请时间 :" >
                        <span>{{ props.row.applyTime }}</span>
                    </el-form-item>
                    <el-form-item label="处理时间 :" > 
                        <span>{{ props.row.handleTime }}</span>
                    </el-form-item>
                    <el-form-item label="处理结果 :" >
                        <span>{{ props.row.isJoinUsOk ?'审核通过' :'拒绝申请' }}</span>
                    </el-form-item>
                </template>
            </el-form>
        </template>  
    </el-table-column>
    <el-table-column
    v-for="item in tabletitleList"
    :key='item.id'
    :sortable='item.sortable'
    :label="item.columnTitle" 
    :prop="item.prop">
    </el-table-column>  
    <el-table-column 
    v-if="showBalance"
    prop='balance'
    :formatter='balanceInit'
    soltable
    label="余额">  
    </el-table-column>
    <el-table-column 
    v-if="!isApply && !isHistoryApply"
    prop='gender'
    :formatter='genderInit'
    label="性别">  
    </el-table-column>
    <template v-if="isApply || isHistoryApply">
        <el-table-column 
        prop='isHandle'
        :formatter='isHandleInit'
        label="处理状态">  
        </el-table-column>
    </template>
    <template v-if="isHistoryApply">
        <el-table-column 
        prop='isJoinUsOk'
        :formatter='isJoinUsOkInit'
        label="处理结果">  
        </el-table-column>
    </template>
    <el-table-column  align="right">
         <template slot="header" slot-scope="scope">
            <span  style="margin-right:3rem">操作</span>
        </template>
        <template slot-scope="scope">
            <template v-if="isApply">
                <el-button
                size="mini"
                type='danger'
                key='agreeApply'
                class="agreeApply-btn"
                @click="$emit('disAgreeApply',scope.row)"
                >拒绝申请</el-button>
                <el-button
                size="mini"
                type='success'
                key='DisagreeApply'
                class="DisagreeApply-btn"
                @click="$emit('agreeApply',scope.row)"
                >审核通过</el-button>
            </template> 
            <template v-else-if="isHistoryApply">
                <el-button
                size="mini"
                type='danger'
                class="DeleteHistoryApply"
                key='Delete'
                @click="$emit('DeleteHistoryApply',scope.row)"
                >删除记录</el-button>
            </template>
            <template v-else>
                <el-button
                size="mini"
                type='danger'
                class="DeletePerson"
                key='Delete'
                @click="$emit('DeletePerson',scope.row)"
                >删除用户</el-button>
            </template>
        </template>
    </el-table-column>               
</el-table>
</template>

<script>
export default {
    props:{
        userList:Array,
        titleList:{
                id: Number ,
                columnTitle: String,
                prop: String,
                sortable:Boolean
        },
        isApply:{type:Boolean,default:false}, //是否是加入我们的申请列表
        isHistoryApply:{type:Boolean,default:false},//是否是加入我们的历史申请
        showBalance:{type:Boolean,default:true}
    },
    data(){
        return{
            tabletitleList:this.titleList
        }
    },
    computed:{
        theUserList(){
            return this.userList
        }
    },
    methods:{
        balanceInit(row, column, cellValue, index){
             return '¥'+Number.parseFloat(cellValue).toFixed(2)
        },
        genderInit(row, column, cellValue, index){
            return cellValue==1?'男':'女'
        },
        isHandleInit(row, column, cellValue, index){
            return cellValue==true?'已处理':'未处理'
        },
        isJoinUsOkInit(row, column, cellValue, index){
            return cellValue==true?'审核通过':'拒绝申请'
        }
    }
}
</script>

<style lang='scss'>
// 右边操作按钮
.admin-page-body .DeletePerson,
.admin-page-body .DeleteHistoryApply{
        margin-right: 2rem;
    }
.agreeApply-btn{
    margin-bottom: 0.2rem;
}
.agreeApply-btn,
.DisagreeApply-btn{
    margin-right: 1rem;
}
.allUser-page,
.allWoker-page,
.joinUsHistoryApply-page,
.joinUsApply-page,
.findPeople-page{
    .el-button{
        width: 4.2rem;
        height: 1.5rem;
        line-height: 1.5rem;
        padding: 0;
        span{
            font-size: 0.6rem;
        }
    }
    .el-message{
        top: 5rem;
    }
    //交易操作
    .btn-cancel{
        margin-right: 0.2rem;
        margin-bottom: 0.3rem;
    }
    .btn-success{
        background-color: #409eff;
        color: #fff;
        &:hover{
            background-color:lighten(#409eff,5%);
        }
    }
    // 当前订单没有数据时候
    .emptyTip a{
        color: rgb(226, 137, 137);
        &:hover{
            color: rgb(214, 29, 29);
        }
    }
    .el-button+.el-button{
        margin-left: 0;
    }
    // 展开详情后文本 的span
    .el-form-item__content span{
        margin-right: 0.5rem;
    }
    .admin-table-expand {
        font-size: 0;
    }
    .admin-table-expand label {
        width: 4.5rem;
        color: #99a9bf;
    }
    .admin-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .el-form-item.BankCard,
    .el-form-item.address{
        width: 100%;
    }
}
.findPeople-page .el-form-item__content button span{
    margin-right: 0;
}
</style>

