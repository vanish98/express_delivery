<template>
    <el-table
    :data="theUserOrder"
    :border='false'
    class="adminOrderList"
    :default-sort = "{prop: 'createTime', order: 'descending'}"
    style="width: 100%">
    <el-table-column type="expand" >
        <template slot-scope="props">
            <el-form label-position="left" 
            inline class="admin-table-expand">
                <el-form-item label="发布时间 :" >
                    <span>{{ props.row.createTime }}</span>
                </el-form-item>
                <el-form-item label="订单状态 :" >
                    <span>{{ props.row.orderState }}</span>
                </el-form-item>
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
                <el-form-item label="快递公司 :" >
                    <span v-for="it in props.row.company"
                    :key='it'>{{it}}</span>
                </el-form-item>
                <el-form-item label="快递数量 :" >
                    <span>{{ props.row.goodsNumber }} 个</span>
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
                <el-form-item label="收货地址 :" class="address">
                        <span>{{ props.row.address }}</span>
                </el-form-item>
                <template v-if="props.row.orderState!='未接单'">
                    <el-form-item label="接单时间 :" >
                        <span>{{ props.row.receivedDate }}</span>
                    </el-form-item>
                    <el-form-item label="接单人员 :" >
                        <span>{{ props.row.courierPeople }}</span>
                    </el-form-item>
                    <el-form-item label="接单人电话 :" >
                        <span>{{ props.row.courierPhone }}</span>
                    </el-form-item>
                </template>
                <el-form-item label="完成时间 :" v-if="props.row.completedData">
                        <span>{{ props.row.completedData }}</span>
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
    prop='Price'
    :formatter='genderInit'
    label="价格">  
    </el-table-column>
    <el-table-column  align="right">
         <template slot="header" slot-scope="scope">
            <span  style="margin-right:3rem">操作</span>
        </template>
        <template slot-scope="scope"> 
            <template >
                <el-button
                size="mini"
                type='danger'
                class="DeletePerson"
                key='Delete'
                @click="$emit('deleteOrder',scope.row)"
                >删除订单</el-button>
            </template>
        </template>
    </el-table-column>               
</el-table>
</template>

<script>
export default {
    props:{
        userOrder:Array,
        titleList:{
                id: Number ,
                columnTitle: String,
                prop: String,
                sortable:Boolean
        },
        defaultSolt:{ 
            prop: {type:String,defult:'createTime'},
            order:{type:String,defult:'descending'}
        }
        
    },
    data(){
        return{
            tabletitleList:this.titleList,
            search:''
        }
    },
    computed:{
        theUserOrder(){
            return this.userOrder  
        }
    },
    methods:{
        // filterGoodsSize(value, row) {
        //     return row.goodsSize === value;
        // }
        genderInit(row, column, cellValue, index){
            return '¥'+Number.parseFloat(cellValue).toFixed(2)
        }
    }
}
</script>

<style lang='scss'>
.adminOrderList{
    .el-button{
        width: 4.2rem;
        height: 1.5rem;
        line-height: 1.5rem;
        padding: 0;
        span{
            font-size: 0.6rem;
        }
    }
    .DeletePerson{
        margin-right: 2rem;
    }
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
        width: 90px;
        color: #99a9bf;
    }
    .admin-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .el-form-item.address{
        width: 100%;
    }
}
</style>

