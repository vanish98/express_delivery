<template>
    <div class="allHistoryOrder-page">
        <person-title>当前位置 :: 所有订单 >> <em>历史订单</em></person-title>
        <div class="allHistoryOrder-cont">
            <adminOrderList
                :userOrder='historyOrder'
                :titleList='titleList'
                @deleteOrder='handleDeleteOrder'>
            </adminOrderList>
        </div>
    </div>
</template>

<script>
import adminOrderList from './adminOrderList'
import axios from 'axios'
export default {
        components:{
            adminOrderList
        },
        data(){
            return{
                titleList:[
                    {id:1,columnTitle:'发布时间',prop:'createTime',sortable:true},
                    {id:2,columnTitle:'发布人',prop:'createOrderPeople',sortable:false},
                    {id:3,columnTitle:'接单人',prop:'courierPeople',sortable:false}
                ],
                historyOrder:[]
            }
        },
        created() {
            this.getAllHistoryOrder();
        },
        methods:{
            getAllHistoryOrder(){
                let loading = this.$loading({lock:true,text:'玩命加载中...'});
                axios.get(`/admin/allHistoryOrder`).then(response=>{
                    let res = response.data;
                    loading.close();
                    if(res.status=='0'){
                        this.historyOrder = res.result;
                    }else{
                        console.log(res.msg);    
                    }
                }).catch(err=>{
                    console.log(err);
                    loading.close();
                })
            },
             handleDeleteOrder(orderData){
                // 如果已接单接不可以取消
                this.$confirm(`此订单删除无法恢复! 确认删除订单?`, 
                    '完成订单', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'error'
                }).then(() => {
                    // let loading = this.$loading({lock:true,text:'玩命加载中...'});
                    // axios.post(`/wokers/deleteHistoryOrder`,{orderId:orderData.orderId}).then(response=>{
                    //     let res = response.data;
                    //     loading.close();
                    //     if(res.status=='0'){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                    //         this.gehistoryOrderList();
                    //     }else{
                    //         this.$message({
                    //             type: 'error',
                    //             message: res.msg
                    //         });   
                    //     }
                    // }).catch(err=>{
                    //     loading.close();
                    //     console.log(err);
                    // });
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


