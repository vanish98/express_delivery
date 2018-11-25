<template>
    <div class="allUserOrderList">
        <person-title>当前位置 :: 接单大厅 >> <em>订单列表</em></person-title>
        <div class="allUserOrderList-cont">
                <wokerOrderList
                v-loading="loading"
                :userOrder='notReceiveOrder'
                :rightOptBtn='rightOptBtn'
                :titleList='titleList'
                @receiveOrder='handleReceiveOrder'>
                </wokerOrderList>
        </div>
    </div>
</template>

<script>
import wokerOrderList from './wokerOrderList'
import {gotoNewOrder} from './../../../assets/js/gotoNewOrder'
export default {
    data(){
        return {
            loading:true,
            acceptOrderList: [{
                    orderId:'51820181108',
                    createTime: '2018-11-20 13:50',
                    goodsTpye:'生活用品',
                    goodsSize:'一般',
                    Price:3.00,
                    goodsNumber:2,
                    company:['圆通','韵达'],
                    goodsCode: ['123456','654214'],
                    orderState: '已接单',//状态有 待接单 已接单 已完成
                    isCompleted:false,
                    createOrderPeople:'胡建文',
                    createOrderPeoplePhone:'15278789455',
                    remarks:'送我楼下'
                }, 
                {
                    orderId:'51920181114',
                    createTime: '2018-11-11 18:30',
                    goodsTpye:'家具',
                    goodsSize:'小',
                    Price:1.00,
                    goodsNumber:2,
                    company:['申通'],
                    goodsCode: ['167556','168545'],
                    orderState: '待接单',
                    isCompleted:false,
                    courierPeople:'',
                    courierPhone:'',
                    remarks:'辛苦啦'
                }, 
                {
                    orderId:'51920181123',
                    createTime: '2018-11-23 15:44',
                    goodsTpye:'数码3c',
                    goodsSize:'大',
                    Price:1.88,
                    goodsNumber:1,
                    company:['申通'],
                    goodsCode: ['167556'],
                    orderState: '待接单',
                    isCompleted:false,
                    courierPeople:'',
                    courierPhone:'',
                    remarks:'非常感谢'
                }, 
                {
                    orderId:'51920181109',
                    createTime: '2018-11-09 22:24',
                    goodsTpye:'衣服',
                    goodsSize:'较小',
                    Price:2.50,
                    goodsNumber:1,
                    company:['申通'],
                    goodsCode: ['167556'],
                    orderState: '待接单',
                    isCompleted:false,
                    courierPeople:'',
                    courierPhone:'',
                    remarks:'大中午午休不要打电话'
                }, 
                {
                    orderId:'51220181121',
                    createTime: '2018-11-08 12:10',
                    goodsTpye:'零食',
                    goodsSize:'较大',
                    Price:2.00,
                    goodsNumber:2,
                    company:['韵达','圆通'],
                    goodsCode: ['127856','676743'],
                    orderState: '待接单',
                    isCompleted:false,
                    courierPeople:'',
                    courierPhone:'',
                    remarks:''
            }],
            rightOptBtn:'notReceiveBtn',// 'receiveOrderBtn'  // 'historyBtn'    
            titleList:[
                {id:1,columnTitle:'发布时间',prop:'createTime',sortable:true},
                {id:2,columnTitle:'订单价格(元)',prop:'Price',sortable:true},
                {id:3,columnTitle:'类型',prop:'goodsTpye',sortable:false},
                {id:4,columnTitle:'数量',prop:'goodsNumber',sortable:true}

            ]
        }
    },
    components:{
        wokerOrderList
    },
    mounted() {
        setTimeout(()=>this.loading=false,600);
    },
    computed:{
        notReceiveOrder(){
            return this.acceptOrderList.filter(it=>it.orderState=='待接单');
        }
    },
    methods:{
        handleReceiveOrder(data){
            // 如果已接单接不可以取消
            this.$confirm('接收订单后不可取消, 是否接单?', 
                '接收订单', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '接单成功!'
                });
                gotoNewOrder.$emit('goNewOrder','wokerReceivedOrder',2);
                this.$router.push({ path: 'wokerReceivedOrder' });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消操作'
                 });          
            });      
        }
    }
}
</script>

<style>

</style>
