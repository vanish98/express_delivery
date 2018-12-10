<template>
    <div class="joinUsHistoryApply-page">
        <person-title>当前位置 :: 加入我们 >> <em>申请列表</em></person-title>
        <div class="joinUsHistoryApply-page-cont">
            <joinUsApply
            :titleList='titleList'
            :userList='historyApplyList'
            :showBalance='false'
            :isHistoryApply='true'
            @DeleteHistoryApply='handleDeleteHistoryApply'></joinUsApply>
        </div>
    </div>
</template>

<script>
import joinUsApply from './../allPerson/personList'
import axios from 'axios'
export default {    
    components:{
         joinUsApply
    },
    data(){
        return{
             titleList:[
                {id:1,columnTitle:'处理时间',prop:'handleTime',sortable:true},
                {id:2,columnTitle:'账号',prop:'userId',sortable:false}
            ],
            historyApplyList:[]
        }
    },
    created() {
        this.getHistoryApply();
    },
    methods:{
        getHistoryApply(){
            let loading = this.$loading({lock:true,text:'玩命加载中...'});
            axios.get(`/admin/joinUsHistoryApply`).then(response=>{
                let res = response.data;
                loading.close();
                if(res.status=='0'){
                    this.historyApplyList = res.result;
                }else{
                    this.$message({
                        message: res.msg,
                        type: 'error',
                        duration:2000,
                        showClose:true
                    });    
                }
            }).catch(err=>{
                console.log(err);
                
            })
        },
        handleDeleteHistoryApply(data){
           let loading = this.$loading({lock:true,text:'玩命加载中...'});
            axios.get(`/admin/DeleteHistoryApply?userId=${data.userId}`).then(response=>{
                let res = response.data;
                loading.close();
                if(res.status=='0'){
                        this.$message({
                            message: '删除记录成功!',
                            type: 'success',
                            duration:3000,
                            showClose:true
                        });
                        this.getHistoryApply();
                }else{
                     this.$message({
                        message: res.msg,
                        type: 'error',
                        duration:3000,
                        showClose:true
                    });     
                }
            }).catch(err=>{
                console.log(err);
                
            })
        }
    }
}
</script>

<style>

</style>
