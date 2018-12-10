<template>
    <div class="allUserOrderList">
        <person-title>当前位置 :: 接单大厅 >> <em>订单列表</em></person-title>
        <div class="allUserOrderList-cont">
                <wokerOrderList
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
import axios from 'axios'
import {gotoNewOrder} from './../../../assets/js/gotoNewOrder'
export default {
    data(){
        return {
            notReceiveOrder:[],
            rightOptBtn:'notReceiveBtn',// 'receiveOrderBtn'  // 'historyBtn'    
            titleList:[
                {id:1,columnTitle:'发布时间',prop:'createTime',sortable:true},
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
        this.getAllUserOrderList();
    },
    methods:{
        getAllUserOrderList(){
            let loading = this.$loading({lock:true,text:'玩命加载中...'});
            axios.get(`/wokers/allUserOrder`).then(response=>{
                let res = response.data;
                loading.close();
                if(res.status=='0'){
                    this.notReceiveOrder = res.result;
                }else{
                    console.log(res.msg);    
                }
            }).catch(err=>{
                console.log(err);
                
            });
        },
        handleReceiveOrder(orderData){
            // 接单后不可以取消
            this.$confirm('接收订单后不可取消, 是否接单?', 
                '接收订单', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let loading = this.$loading({lock:true,text:'玩命加载中...'});
                axios.post(`/wokers/receiveOrder`,orderData).then(response=>{
                    let res = response.data;
                   loading.close();
                    if(res.status=='0'){
                        this.$message({
                            type: 'success',
                            message: '接单成功!'
                        });
                        gotoNewOrder.$emit('goNewOrder','wokerReceivedOrder',2);
                        this.$router.push({ path: 'wokerReceivedOrder' });
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.msg
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
