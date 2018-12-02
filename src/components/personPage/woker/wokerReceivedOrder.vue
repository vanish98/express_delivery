<template>
    <div class="wokerReceivedOrder">
        <person-title>当前位置 :: 我的订单 >> <em>已接订单</em></person-title>
        <div class="wokerReceivedOrder-cont">
            <wokerOrderList
                :userOrder='ReceiveOrder'
                :rightOptBtn='rightOptBtn'
                :titleList='titleList'
                @completedOrder='handleCompletedOrder'>
            </wokerOrderList>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import wokerOrderList from './wokerOrderList'
export default {
    data(){
        return {
            ReceiveOrder:[],
            rightOptBtn:'receiveOrderBtn',// 'receiveOrderBtn'  // 'historyBtn'    
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
        this.getReceivedOrderList();
    },
    methods:{
        getReceivedOrderList(){
            let loading = this.$loading({lock:true,text:'玩命加载中...'});
            axios.get(`/wokers/theReceivedOrder`).then(response=>{
                let res = response.data;
                loading.close();
                if(res.status=='0'){
                    this.ReceiveOrder = res.result;
                }else{
                    console.log(res.msg);    
                }
            }).catch(err=>{
                console.log(err);
                
            });
        },
        handleCompletedOrder(orderData){
            // 如果已接单接不可以取消
            this.$confirm(`是否配送完成? 申请完成订单(此操作会向客户发起完成请求,
            若客户2天内没有确认则系统自动确认`, 
                '完成订单', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'success'
            }).then(() => {
                let loading = this.$loading({lock:true,text:'玩命加载中...'});
                axios.post(`/wokers/completedOrde`,orderData).then(response=>{
                    let res = response.data;
                    loading.close();
                    if(res.status=='0'){
                        this.$message({
                            type: 'success',
                            message: '已向客户发起完成请求!'
                        });
                    }else{
                        this.$message({
                            type: 'error',
                            message:res.msg
                        }); 
                    }
                }).catch(err=>{
                    console.log(err);
                    
                });
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
