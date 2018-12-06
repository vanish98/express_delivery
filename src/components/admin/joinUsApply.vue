<template>
    <div class="joinUsApply-page">
        <person-title>当前位置 :: 加入我们 >> <em>申请列表</em></person-title>
        <div class="allWoker-page-cont">
            <joinUsApply
            :titleList='titleList'
            :userList='applyList'
            :showBalance='false'
            :isApply='true'
            @agreeApply='handleAgreeApply'
            @DisagreeApply='handleDisagreeApply'></joinUsApply>
        </div>
    </div>
</template>

<script>
import joinUsApply from './allPerson/personList'
import axios from 'axios'
export default {    
    components:{
         joinUsApply
    },
    data(){
        return{
             titleList:[
                {id:1,columnTitle:'注册时间',prop:'regDate',sortable:true},
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
                    console.log(res.msg);    
                }
            }).catch(err=>{
                console.log(err);
                
            })
        },
        handleAgreeApply(data){
            console.log(data);
            
        },
        handleDisagreeApply(data){
            console.log(data);
            
        }
    }
}
</script>

<style>

</style>
