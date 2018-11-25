<template>
    <div class="wokerAccount">
        <person-title>当前位置 :: 个人中心 >> <em>我的钱包</em></person-title>
        <div class="wokerAccount-cont">
            <div class="wokerAccount-body">
                <!-- 用vuex -->
                <h3>账户余额 : </h3>
                <em>{{balance | priceInit}}</em>
                <div class="CashWithDrawType">
                    <h4>提现方式 : </h4>
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
                <el-button
                plain
                @click="handleCashWithDraw">
                提现
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
            alipayAccount: ''
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
            if(this.balance>0){
                this.$notify({
                title: '成功',
                message: '提现申请成功!',
                type: 'success'
                });
            }else{
                this.$notify({
                title: '失败',
                message: '提现申请失败! 金额要 >0元',
                type: 'error'
                });
            }
        }
    }
}
</script>

<style lang='scss'>
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
    background-color: #f4f9fd;
}
.wokerAccount-body{
    width: 20rem;
    min-height: 15rem;
    margin: 0 auto;
    border: 1px solid #000;
}
</style>
