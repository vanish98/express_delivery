<template>
    <div class="wokerAccount">
        <person-title>当前位置 :: 个人中心 >> <em>我的钱包</em></person-title>
        <div class="wokerAccount-cont">
            <div class="wokerAccount-body">
                <!-- 用vuex -->
                <h3 class="account">账户余额 : </h3>
                <em class="balance">{{balance | priceInit}}</em>
                <div class="CashWithDrawType">
                    <h4 class="title">提现方式 : </h4>
                    <el-radio v-model="alipayType" label="支付宝">支付宝</el-radio>
                    <el-radio v-model="alipayType" label="银行卡">银行卡</el-radio>
                </div>
                <div class="alipayAccount">
                    <el-select v-model="alipayAccount" placeholder="请选择账号">
                        <el-option
                        v-for="item in alipayAccountType"
                        :key="item.value"
                        :label='item.value | encryption'
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="cashWithDrawNum">
                    <h4 class="title">提现金额 : </h4>
                    <el-input v-model.trim="WithDrawNum"
                    @focus="errorTip=''"
                    @blur='handleInputvValidate'
                    class="money"
                    placeholder="请输入提现金额"></el-input>
                    <span class="errorTip">{{errorTip}}</span>
                </div>
                <el-button
                plain
                @click="handleCashWithDraw">
                确认提现
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            balance:33.00,
            alipayType: '支付宝',
            alipayAccountzhiFuBao: [
                {
                    value: '15279778477'
                }, 
                {
                    value: '15278789455'
                }
            ],
            alipayAccountBankCard:[
                {
                    value: '6217998455122235453'
                }, 
                {
                    value: '6557465436622238475'
                }
            ],
            alipayAccount: '',
            WithDrawNum:'',
            errorTip:''
        }
    },
    computed:{
        alipayAccountType(){
            switch(this.alipayType){
                case '支付宝':
                    return this.alipayAccountzhiFuBao
                case '银行卡':
                    return this.alipayAccountBankCard
            }
        }
    },
    watch:{
        alipayType(){
            this.alipayAccount="";
        }
    },
    filters:{
        encryption(val){
            let value = val.split(''),
                len = value.length;
            for(let i=0;i<len;i++){
                if(i>3 && i<len-4){
                    value[i]="*";
                }
                
            }   
            return value.toString().replace(/,/g,'');
        }
    },
    methods:{
        handleCashWithDraw(){
            if(this.balance>0 && this.errorTip=='' && this.alipayAccount!='' && this.WithDrawNum!=''){
                this.$notify({
                title: '成功',
                message: '提现申请成功!',
                type: 'success'
                });
            }else{
                this.$notify({
                title: '失败',
                message: '不满足条件,提现申请失败!',
                type: 'error'
                });
            }
        },
        handleInputvValidate(){
            if(!this.WithDrawNum){
                 this.errorTip='金额不能为空!'
            }
            else if(!/^[0-9]+(\.[0-9]{1,2})?$/.test(this.WithDrawNum)){
                this.errorTip='金额格式不正确!'
            }
            else if(this.balance<=0){
                this.errorTip='余额不足无法提现!'                
            }
            else if(this.balance< this.WithDrawNum){
                this.errorTip='提现金额大于余额!'                
            }   
            
            
        }
    }
}
</script>

<style lang='scss'>
$text-color:#777;
/* 提现提示 */
 .el-notification{
    top: 4rem !important;
}
.wokerAccount{
    height: 100%;
}
.wokerAccount-cont{
    position: relative;
    height: 100%;
    width: 100%;
    padding-top: 2rem;
    background-color: #f4f9fd;
}
.wokerAccount-body{
    width: 60%;
    min-height: 15rem;
    margin-left: 2rem;
    padding-bottom: 3rem;
    box-shadow: 0 0 0.9rem 0.3rem #ecf2f7;
    background-color: #fff;
    font-size: 0.8rem;
    .account{
        padding: 2rem 0 0 2rem;
        text-align: left;
        color: $text-color;
    }
    .balance{
        display: block;
        height: 4rem;
        line-height: 4rem;
        text-align: center;
        font-size: 1.5rem;
        color: #3c5bba;
    }
    .title{
        text-align: left;
        padding-left: 2rem;
        margin-bottom: 1rem;
        color: $text-color;
    }
    // 提现按钮
    .el-button{
        background-color: rgb(71, 184, 236);
        background-image: linear-gradient(to right, #00c6fb 0%, #005bea 100%);
        color: #fff;
        letter-spacing: 0.1rem;
        &.is-plain:active,
        &:hover{
            background-image: linear-gradient(to right, #4acdf1 0%, #4480e0 100%);
            color: #fff;
        }
        
    }
}
// .CashWithDrawType{
    
// }
.alipayAccount{
    margin: 1rem 0;
}
.cashWithDrawNum{
    margin-bottom: 1.5rem;
    .money{
        width: 11rem;
    }
    .errorTip{
        display: block;
        height: 1rem;
        margin-top: 0.3rem;
        font-size: 0.7rem;
        color: rgb(245, 66, 66);
        letter-spacing: 0.1rem;
    }
}

</style>
