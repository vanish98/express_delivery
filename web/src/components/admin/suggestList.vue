<template>
    <div class="suggestList-page">
        <person-title>当前位置 :: 投诉建议 >> <em>用户反馈</em></person-title>
        <div class="suggestList-list">
            <el-table
            :data="suggestList"
            style="width: 100%">
            <el-table-column
                prop="submitTime"
                label="提交时间"
                width="180">
            </el-table-column>
            <el-table-column
                prop="userName"
                label="提交人"
                width="180">
            </el-table-column>
            <el-table-column
                prop="phoneNum"
                label="联系方式"
                 width="180">
            </el-table-column>
            <el-table-column
                prop="suggestText"
                label="内容">
            </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            suggestList:[]
        }
    },
    created() {
        this.getSuggestList();
    },
    methods:{
        getSuggestList(){
            let loading = this.$loading({lock:true,text:'玩命加载中...'});
            axios.get(`/admin/suggestList`).then(response=>{
                let res = response.data;
                loading.close();
                if(res.status=='0'){
                    this.suggestList = res.result;
                }else{
                    console.log(res.msg);    
                }
            }).catch(err=>{
                console.log(err);
            });
        }
    }
    
}
</script>

<style>

</style>
