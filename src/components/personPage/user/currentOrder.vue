<template>
    <div class="currentOrder">
        <person-title>我的订单 >> <em>当前订单</em></person-title>
        <div class="currentOrder-cont">
            <el-table
            :data="userOrder"
            style="width: 100%">
                <el-table-column type="expand" >
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="快递类型 :" >
                                <span>{{ props.row.goodsTpye }}</span>
                            </el-form-item>
                            <el-form-item label="快递大小 :" >
                                <span>{{ props.row.goodsSize }}</span>
                            </el-form-item>
                            <el-form-item label="订单价格 :" >
                                <span>{{ props.row.Price }} 元</span>
                            </el-form-item>
                            <el-form-item label="快递数量 :" >
                                <span>{{ props.row.goodsNumber }} 个</span>
                            </el-form-item>
                            <el-form-item label="快递公司 :" >
                                <span v-for="it in props.row.company"
                                :key='it'>{{it}}</span>
                            </el-form-item>
                            <el-form-item label="取货码 :" >
                                <span v-for="it in props.row.goodsCode"
                                :key='it'>{{it}}</span>
                            </el-form-item>
                            <el-form-item label="接单人员 :" >
                                <span>{{ props.row.courierPeople }}</span>
                            </el-form-item>
                            <el-form-item label="接单人电话 :" >
                                <span>{{ props.row.courierPhone }}</span>
                            </el-form-item>
                            <el-form-item  label="备注 :" >
                                <span>{{ props.row.remarks }}</span>
                            </el-form-item>
                            
                        </el-form>
                    </template>  
                </el-table-column>
                <el-table-column
                label="下单时间" 
                prop="createTime">
                </el-table-column>
                <el-table-column
                label="订单价格(元)" 
                prop="Price">
                </el-table-column>
                <el-table-column
                label="订单状态" 
                prop="orderState">
                </el-table-column>
                <el-table-column label="交易操作" >
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        class="btn-cancel"
                        type='danger'
                        @click="handleCancel(scope.$index, scope.row)"
                        >取消订单</el-button>
                        <el-button
                        size="mini"
                        class="btn-success"
                        @click="handleSuccess(scope.$index, scope.row)"
                        >确认送达</el-button>
                    </template>
                </el-table-column>               
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            userOrder: [{
                createTime: '2018-11-20 13:50',
                goodsTpye:'零食',
                goodsSize:'一般',
                Price:3.00,
                goodsNumber:2,
                company:['圆通','韵达'],
                goodsCode: ['123456','654214'],
                orderState: '已接单',
                courierPeople:'陈醉',
                courierPhone:'15279778477',
                remarks:'送我楼下'
            }, 
            {
                createTime: '2018-11-11 18:30',
                goodsTpye:'家具',
                goodsSize:'小',
                Price:1.00,
                goodsNumber:1,
                company:['申通'],
                goodsCode: ['167556'],
                orderState: '待接单',
                courierPeople:'',
                courierPhone:'',
                remarks:'大中午午休不要打电话'
            }, 
            {
                createTime: '2018-11-08 12:10',
                goodsTpye:'零食',
                goodsSize:'较大',
                Price:2.00,
                goodsNumber:1,
                company:['韵达'],
                goodsCode: ['167756'],
                orderState: '待接单',
                courierPeople:'',
                courierPhone:'',
                remarks:''
            }]
        }
    },
    methods:{
        handleCancel(index,data){
            // 如果已接单接不可以取消
            console.log(index,data);      
        },
        handleSuccess(index,data){
            console.log(index,data);    
        }
    }
}
</script>

<style lang='scss'>
.currentOrder-cont{
    // 交易操作
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
    .el-button+.el-button{
        margin-left: 0;
    }
    // 展开详情后文本 的span
    .el-form-item__content span{
        margin-right: 0.5rem;
    }
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
}
</style>
