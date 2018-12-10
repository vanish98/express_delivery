<template>
    <div class="joinUsApply-page">
        <person-title>当前位置 :: 加入我们 >> <em>申请列表</em></person-title>
        <div class="joinUsApply-page-cont">
            <joinUsApply
            :titleList='titleList'
            :userList='applyList'
            :showBalance='false'
            :isApply='true'
            @agreeApply='handleAgreeApply'
            @disAgreeApply='handleDisAgreeApply'></joinUsApply>
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
                {id:1,columnTitle:'申请时间',prop:'applyTime',sortable:true},
                {id:2,columnTitle:'名字',prop:'userName',sortable:false},
                {id:3,columnTitle:'账号',prop:'userId',sortable:false}
            ],
            applyList:[]
        }
    },
    created() {
        this.getApplyList();
    },
    methods:{
        getApplyList(){
            let loading = this.$loading({lock:true,text:'玩命加载中...'});
            axios.get(`/admin/joinUsApplyList`).then(response=>{
                let res = response.data;
                loading.close();
                if(res.status=='0'){
                    this.applyList = res.result;
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
        handleAgreeApply(data){
           let loading = this.$loading({lock:true,text:'玩命加载中...'});
            axios.post(`/admin/agreeJoinUsApply`,{userId:data.userId}).then(response=>{
                let res = response.data;
                loading.close();
                if(res.status=='0'){
                        this.$message({
                            message: '处理成功! 已通过该申请.',
                            type: 'success',
                            duration:3000,
                            showClose:true
                        });
                        this.getApplyList();
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
        },
        handleDisAgreeApply(data){
            let loading = this.$loading({lock:true,text:'玩命加载中...'});
            axios.post(`/admin/disagreeJoinUsApply`,{userId:data.userId}).then(response=>{
                let res = response.data;
                loading.close();
                if(res.status=='0'){
                        this.$message({
                            message: '处理成功! 已拒绝该申请.',
                            type: 'success',
                            duration:3000,
                            showClose:true
                        });
                        this.getApplyList();
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
