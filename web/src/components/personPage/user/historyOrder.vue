<template>
    <div class="historyOrder">
        <person-title>当前位置 :: 我的订单 >> <em>历史订单</em></person-title>
         <div class="hidtoryOrder-cont">
                <userOrderList 
                :userOrder='CompOrder'
                :listType='listType'
                :titleList='titleList'
                @DeleteOrder='handleDelete'>
                </userOrderList>
         </div>
    </div>
</template>

<script>
import userOrderList from './userOrderList'
import axios from 'axios'
export default {
        data(){
        return {
            CompOrder:[],
            listType:{
                noCompBtn:false
            },
            titleList:[
                {id:1,columnTitle:'完成时间',prop:'completedData',sortable:true},
                {id:2,columnTitle:'订单价格(元)',prop:'Price',sortable:true},
                {id:3,columnTitle:'订单状态',prop:'orderState',sortable:false}
            ]
        }
    },
    components:{
        userOrderList
    },
    mounted() {
        this.getHistoryOrder();
    },
    methods:{
        getHistoryOrder(){
            let loading = this.$loading({lock:true,text:'正在加载...'});
            axios.get('/users/historyOrder').then(response=>{
                let res = response.data;
                loading.close();
                if(res.status=='0'){
                    this.CompOrder = res.result;
                }else{
                    console.log(res.msg);    
                }
            }).catch(err=>{
                console.log(err);
                
            })
        },
        handleDelete(data){
            // 删除订单
            this.$confirm('此操作将永久删除该文件, 是否继续?', 
                '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'error'
            }).then(() => {
                axios.get(`/users/deleteHistoryOrder?orderId=${data.orderId}`).then(response=>{
                    let res = response.data;
                    if(res.status=='0'){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getHistoryOrder();
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
                    message: '已取消删除'
                 });          
            });  
        }
    }
}
</script>

<style>

</style>
