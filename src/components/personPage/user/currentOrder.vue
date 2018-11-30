<template>
    <div class="currentOrder">
        <person-title>当前位置 :: 我的订单 >> <em>当前订单</em></person-title>
        <div class="currentOrder-cont">
                <userOrderList 
                v-loading="loading"
                :userOrder='noCompOrder'
                :listType='listType'
                :titleList='titleList'
                @CancelOrder='handleCancel'
                @completedOrder='handleCompleted'>
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
            loading:true,
            noCompOrder:[],
            listType:{
                noCompBtn:true
            },
            titleList:[
                {id:1,columnTitle:'发布时间',prop:'createTime',sortable:true},
                {id:2,columnTitle:'订单价格(元)',prop:'Price',sortable:true},
                {id:3,columnTitle:'订单状态',prop:'orderState',sortable:false}
            ]
        }
    },
    components:{
        userOrderList
    },
    mounted() {
        setTimeout(()=>this.loading=false,600);
        this.getUserOrder();
    },
    methods:{
        getUserOrder(){
            axios.get('/users/userCurrentOrder').then(response=>{
                let res = response.data;
                if(res.status=='0'){
                    this.noCompOrder = res.result;
                }else{
                    console.log(res.msg);    
                }
            }).catch(err=>{
                console.log(err);
                
            })
        },
        handleCancel(data){
            // 如果已接单接不可以取消
            this.$confirm('此操作将取消订单, 是否继续?', 
                '取消订单', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'error'
            }).then(() => {
                axios.get(`/users/cancelCurrentOrder?orderId=${data.orderId}`).then(response=>{
                    let res = response.data;
                    if(res.status=='0'){
                        this.$message({
                            type: 'success',
                            message: '取消成功!'
                        });
                        this.getUserOrder();
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
        },
        handleCompleted(data){
            // 完成订单
            this.$confirm(`是否确认送达,完成订单?`, 
                '支付订单', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'success'
            }).then(() => {
                axios.get(`/users/completedCurrentOrder?orderId=${data.orderId}`).then(response=>{
                    let res = response.data;
                    if(res.status=='0'){
                        this.$message({
                            type: 'success',
                            message: '收货成功!'
                        });
                        this.getUserOrder();
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

<style lang='scss'>
// .currentOrder-cont{
    
// }
</style>
