<template>
    <div class="findOneOrder-page">
        <person-title>当前位置 :: 所有订单 >> <em>查找订单</em></person-title>
        <div class="findOrder-search">
            <el-form :inline="true" :model="findOrderForm" class="admin-findOrder">
                <el-form-item label="查询条件">
                    <el-select v-model="findOrderForm.condition" placeholder="选择查询条件">
                    <el-option label="订单号" value="订单号"></el-option>
                    <el-option label="普通用户id" value="普通用户id"></el-option>
                    <el-option label="工作人员id" value="工作人员id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="请输入">
                    <el-input v-model="findOrderForm.answers" placeholder="查询条件"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchOrder">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="findOneOrder-cont">
            <adminOrderList
                :userOrder='findOrderList'
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
                    {id:3,columnTitle:'订单状态',prop:'orderState',sortable:false}
                ],
                findOrderForm: {
                    condition: '',
                    answers: ''
                },
                findOrderList:[]
            }
        },
        methods:{
            searchTest(){  
                let testVal = this.findOrderForm.answers;
                switch(this.findOrderForm.condition){
                    case "订单号" :
                        return /^\d{16}$/.test(testVal)
                    case "普通用户id" :
                    case "工作人员id" :
                        return /^1[3-8][0-9]{9}$/.test(testVal)
                    default : return false
                }
            },
            searchOrder(){
                let flag = this.searchTest();
                if(flag){
                    let loading = this.$loading({lock:true,text:'玩命加载中...'});
                    axios.post(`/admin/searchOrder`,this.findOrderForm).then(response=>{
                        let res = response.data;
                        loading.close();
                        if(res.status=='0'){
                            this.findOrderList = res.result;
                        }else{
                            this.$message({
                                type: 'error',
                                message: res.msg,
                                showClose:true
                            });  
                        }
                    }).catch(err=>{
                        console.log(err);
                        loading.close();
                    });
                }else{
                    this.$message({
                        type: 'error',
                        message: '条件格式不正确!',
                        showClose:true
                    });
                }
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
.findOrder-search{
    padding-top: 1rem;
}
.findOneOrder-cont{
    border-top: 1px solid #ccc;
}
</style>


