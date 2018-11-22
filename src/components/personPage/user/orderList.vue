<template>
    <el-table
    :data="theUserOrder"
    style="width: 100%">
        <div class="emptyTip" slot="empty">
            暂时没有订单 , 赶紧去
            <a href="" @click.prevent="handleGotoNewOrde"
            > 发布订单 </a>吧
        </div>
        <el-table-column type="expand" >
        <template slot-scope="props">
            <el-form label-position="left" 
            inline class="demo-table-expand">
                <el-form-item label="快递类型 :" >
                    <span>{{ props.row.goodsTpye }}</span>
                </el-form-item>
                <el-form-item label="快递大小 :" >
                    <span>{{ props.row.goodsSize }}</span>
                </el-form-item>
                <el-form-item label="订单价格 :" >
                    <span>{{ props.row.Price | priceInit }} 元</span>
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
            <template v-if="isnoCompBtn"> 
                <el-button
                size="mini"
                class="btn-cancel"
                type='danger'
                key='Cancel'
                @click="$emit('CancelOrder',scope.row)"
                >取消订单</el-button>
                <el-button
                size="mini"
                class="btn-success"
                key='Success'
                @click="$emit('completedOrder',scope.row)"
                >确认送达</el-button>
                <!-- handleSuccess(scope.$index, scope.row) -->
            </template>
            <template v-else>
                <el-button
                size="mini"
                type='danger'
                key='Delete'
                @click="$emit('DeleteOrder',scope.row)"
                >删除订单</el-button>
            </template>
        </template>
    </el-table-column>               
</el-table>
</template>

<script>
import {gotoNewOrder} from './gotoNewOrder'
export default {
    props:{
        userOrder:Array,
        listType:{
            noCompBtn:Boolean
        }
    },
    data(){
        return{
            theUserOrder:this.userOrder,
            isnoCompBtn:this.listType.noCompBtn
        }
    },
    methods:{
        handleGotoNewOrde(){
            gotoNewOrder.$emit('goNewOrder','newOrder');
            this.$router.push({ path: 'newOrder' });
        }
    }
}
</script>

<style lang='scss'>
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
</style>
