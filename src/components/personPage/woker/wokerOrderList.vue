<template>
    <el-table
    :data="theUserOrder"
    :border='true'
    class="wokerOrderList"
    :default-sort = "{prop: 'createTime', order: 'descending'}"
    style="width: 100%">
    <div class="emptyTip" slot="empty">
        暂时没有订单 , 赶紧去
        <a href="" @click.prevent="handleGotoNewOrde"
        > 接收订单 </a>吧
    </div>
    <el-table-column type="expand" >
        <template slot-scope="props">
            <el-form label-position="left" 
            inline class="demo-table-expand">
                <el-form-item label="发布时间 :" >
                    <span>{{ props.row.createTime }}</span>
                </el-form-item>
                <el-form-item label="订单状态 :" >
                    <span>{{ props.row.orderState }}</span>
                </el-form-item>
                <template v-if="props.row.orderState!='未接单'">
                    <el-form-item label="订单号 :" >
                        <span>{{ props.row.orderId }}</span>
                    </el-form-item>
                    <el-form-item label="发布人员 :" >
                        <span>{{ props.row.createOrderPeople }}</span>
                    </el-form-item>
                    <el-form-item label="联系电话 :" >
                        <span>{{ props.row.createOrderPeoplePhone }}</span>
                    </el-form-item>
                    <el-form-item label="取货码 :" >
                        <span v-for="it in props.row.goodsCode"
                        :key='it'>{{it}}</span>
                    </el-form-item>
                    <el-form-item label="收货地址 :" >
                        <span>{{ props.row.address }}</span>
                    </el-form-item>
                    <el-form-item label="接单时间 :" >
                        <span>{{ props.row.receivedDate }}</span>
                    </el-form-item>
                </template>
                <el-form-item label="快递公司 :" >
                    <span v-for="it in props.row.company"
                    :key='it'>{{it}}</span>
                </el-form-item>
                <el-form-item label="快递数量 :" >
                    <span>{{ props.row.goodsNumber }} 个</span>
                </el-form-item>
                <el-form-item label="完成时间 :" 
                v-if='props.row.completedData' >
                    <span>{{ props.row.completedData }}</span>
                </el-form-item>
                <el-form-item label="快递类型 :" >
                    <span>{{ props.row.goodsTpye }}</span>
                </el-form-item>
                <el-form-item label="快递大小 :" >
                    <span>{{ props.row.goodsSize }}</span>
                </el-form-item>
                <el-form-item label="订单价格 :" >
                    <span>{{ props.row.Price | priceInit }} 元</span>
                </el-form-item>
                <el-form-item  label="备注 :" >
                    <span>{{ props.row.remarks }}</span>
                </el-form-item>
                
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
      prop="goodsSize"
      label="大小"
      :filters="goodsSizeList"
      :filter-method="filterGoodsSize"
      filter-placement="bottom-end">
    </el-table-column>  
    <el-table-column  align="right">
         <template slot="header" slot-scope="scope">
            <el-input
            v-model.trim="search"
            v-if="rightOptBtnType!='notReceiveBtn'"
            size="mini"
            placeholder="关键词:取货码 |订单号 |类型 |快递公司"/>
            <span v-else style="margin-right:1.2rem">操作</span>
        </template>
        <template slot-scope="scope"> 
            <template v-if="rightOptBtnType == 'notReceiveBtn'"> 
                <el-button
                size="mini"
                class="btn-success"
                key='Success'
                @click="$emit('receiveOrder',scope.row)"
                >接收订单</el-button>
            </template>
            <template v-if="rightOptBtnType == 'receiveOrderBtn'"> 
                <el-button
                size="mini"
                class="btn-success"
                key='Success'
                @click="$emit('completedOrder',scope.row)"
                >完成订单</el-button>
            </template>
            <template v-if="rightOptBtnType == 'historyBtn'">
                <el-button
                size="mini"
                type='danger'
                key='Delete'
                @click="$emit('deleteOrder',scope.row)"
                >删除订单</el-button>
            </template>
        </template>
    </el-table-column>               
</el-table>
</template>

<script>
import {gotoNewOrder} from './../../../assets/js/gotoNewOrder'
export default {
    props:{
        userOrder:Array,
        rightOptBtn:String,
        titleList:{
                id: Number ,
                columnTitle: String,
                prop: String,
                sortable:Boolean
        }
        
    },
    data(){
        return{
            rightOptBtnType:this.rightOptBtn,
            tabletitleList:this.titleList,
            goodsSizeList:[
                {text:'较小',value:'较小'},
                {text:'小',value:'小'},
                {text:'一般',value:'一般'},
                {text:'大',value:'大'},
                {text:'较大',value:'较大'},
                {text:'非常大',value:'非常大'}
            ],
            search:''
        }
    },
    computed:{
        theUserOrder(){
            return this.userOrder.filter(data => !this.search 
                    || data.goodsCode.toString().includes(this.search)
                    || data.goodsTpye.toString().includes(this.search)
                    || data.company.toString().includes(this.search)
                    || data.orderId.toString().includes(this.search)
                    || data.createOrderPeople.toString().includes(this.search)
                    || data.createOrderPeoplePhone.toString().includes(this.search));     
        }
    },
    methods:{
        filterGoodsSize(value, row) {
            return row.goodsSize === value;
        },
        handleGotoNewOrde(){
            gotoNewOrder.$emit('goNewOrder','allUserOrderList',3);
            this.$router.push({ path: 'allUserOrderList' });
        }
    }
}
</script>

<style lang='scss'>
.wokerOrderList{
    td{
        border-right: none;
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
    //大小 这列
    .goodsSize{
        width: 4rem;
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

