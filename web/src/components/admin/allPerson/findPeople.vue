<template>
    <div class="findPeople-page">
        <person-title>当前位置 :: 所有用户 >> <em>查找用户</em></person-title>
        <div class="findPeople-search">
            <el-form :inline="true" :model="findPeople" class="admin-findPeople">
                <el-form-item label="用户级别 :">
                    <el-radio-group v-model="findPeople.grade">
                    <el-radio :label="0" >普通用户</el-radio>
                    <el-radio :label="1" >工作人员</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="findPeople.userId" placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchPeople">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="findPeople-page-cont">
            <personList
            :titleList='titleList'
            :userList='theUserList'
            :showBalance='Boolean(findPeople.grade)'
            @DeletePerson='handleDeletePerson'></personList>
        </div>
    </div>
</template>

<script>
import personList from './personList'
import axios from 'axios'
export default {
    components:{
        personList
    },
    data(){
        return{
            titleList:[
                {id:1,columnTitle:'注册时间',prop:'regDate',sortable:true},
                {id:2,columnTitle:'名字',prop:'userName',sortable:false},
                {id:3,columnTitle:'账号',prop:'userId',sortable:false}
            ],
            userList:[],
            findPeople:{
                grade:0,
                userId:''
            }
        }
    },
    computed:{
        theUserList(){
            if(this.findPeople.grade==0){
                return this.userList.filter(it=>it.grade==0)
            }else{
                return this.userList.filter(it=>it.grade==1)
            }
        }
    },
    methods:{
        searchPeople(){
            if(/^1[3-8][0-9]{9}$/.test(this.findPeople.userId)){
                let loading = this.$loading({lock:true,text:'玩命加载中...'});
                axios.post(`/admin/findPeople`,this.findPeople).then(response=>{
                    let res = response.data;
                    loading.close();
                    if(res.status=='0'){
                        this.userList = res.result;
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
                    message: '账号格式不正确!',
                    showClose:true
                });
            }
        },
        handleDeletePerson(data){
            // 删除订单
            this.$confirm('此操作将永久删除该用户, 是否继续?', 
                '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'error'
            }).then(() => {
                // axios.get(``).then(response=>{
                //     let res = response.data;
                //     if(res.status=='0'){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                //         this.getHistoryOrder();
                //     }else{
                //         this.$message({
                //             type: 'error',
                //             message:res.msg
                //         });  
                //     }
                // }).catch(err=>{
                //     console.log(err);     
                // });  
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
.findPeople-search{
    padding-top: 1rem;
}
.findPeople-page-cont{
    border-top: 1px solid #ccc;
}
</style>

