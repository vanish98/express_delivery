<template>
    <div class="wokerHistoryOrder">
        <person-title>当前位置 :: 我的订单 >> <em>历史订单</em></person-title>
        <div class="wokerHistoryOrder-cont">
            <wokerOrderList
                :userOrder='historyOrder'
                :rightOptBtn='rightOptBtn'
                :titleList='titleList'
                @deleteOrder='handleDeleteOrder'>
            </wokerOrderList>
        </div>
    </div>
</template>

<script>
import wokerOrderList from './wokerOrderList'
import axios from 'axios'
export default {
    data(){
        return {
            historyOrder:[],
            rightOptBtn:'historyBtn',// 'receiveOrderBtn'  // 'historyBtn'    
            titleList:[
                {id:1,columnTitle:'完成时间',prop:'completedData',sortable:true},
                {id:2,columnTitle:'价格(元)',prop:'Price',sortable:true},
                {id:3,columnTitle:'类型',prop:'goodsTpye',sortable:false},
                {id:4,columnTitle:'数量',prop:'goodsNumber',sortable:true}

            ]
        }
    },
    components:{
        wokerOrderList
    },
    mounted() {
        this.gehistoryOrderList();
    },
    methods:{
        gehistoryOrderList(){
            let loading = this.$loading({lock:true,text:'玩命加载中...'});
            axios.get(`/wokers/historyOrder`).then(response=>{
                let res = response.data;
                loading.close();
                if(res.status=='0'){
                    this.historyOrder = res.result;
                }else{
                    console.log(res.msg);    
                }
            }).catch(err=>{
                console.log(err);
                
            });
        },
        handleDeleteOrder(orderData){
            // 如果已接单接不可以取消
            this.$confirm(`此订单删除无法恢复! 确认删除订单?`, 
                '完成订单', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'error'
            }).then(() => {
                let loading = this.$loading({lock:true,text:'玩命加载中...'});
                axios.post(`/wokers/deleteHistoryOrder`,{orderId:orderData.orderId}).then(response=>{
                    let res = response.data;
                    loading.close();
                    if(res.status=='0'){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.gehistoryOrderList();
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.msg
                        });   
                    }
                }).catch(err=>{
                    loading.close();
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
