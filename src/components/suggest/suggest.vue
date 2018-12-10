<template>
    <div class="suggest">  
        <topTitle
        @cahngeShow='sugcontshow=!sugcontshow'></topTitle> 
        <sugBody 
        :sugcontshow='sugcontshow'
        @handleSubSuggest='handleSubSuggest'
        :contShow='contShow'></sugBody>
        <appFooter></appFooter>
    </div>
      
</template>

<script>
import topTitle from './sugTopTitle'
import sugBody from './sugBody'
import appFooter from '../appFooter'
import axios from 'axios'
export default {
    data(){
        return{
            sugcontshow:false,
            contShow:false
        }
    },
    components:{
        topTitle,
        sugBody,
        appFooter
    },
    mounted() {
        this.contShow=true;
    },
    methods:{
        handleSubSuggest(sugForm){
            let flag = true;
            if(sugForm.userName=='' || !/^([\u4E00-\u9FFF]|\w){2,11}$/.test(sugForm.userName)){
                flag =false;
                this.$message({
                    message: '姓名格式不对!',
                    type: 'error',
                    showClose:true
                });
            }else if(sugForm.phoneNum=='' || !/^1[3-8][0-9]{9}$/.test(sugForm.phoneNum)){
                flag =false;
                this.$message({
                    message: '电话格式不对!',
                    type: 'error',
                    showClose:true
                });
            }else if(sugForm.suggestText==''){
                flag =false;
                this.$message({
                    message: '内容不能为空!',
                    type: 'error',
                    showClose:true
                });
            }
            
            if(flag){
                let loading = this.$loading({lock:true,text:'玩命加载中...'});
                axios.post(`/admin/submitSuggest`,sugForm).then(response=>{
                    let res = response.data;
                    loading.close();
                    if(res.status=='0'){
                        this.$message({
                            message: '感谢您的反馈信息,我们会努力做好!',
                            type: 'success',
                            showClose:true
                        });
                    }else{
                        console.log(res.msg);    
                    }
                }).catch(err=>{
                    console.log(err);
                    
                })
            }
            
        }
    }
}
</script>

<style  scoped lang='scss'>
.suggest{
    position: relative;
    width: 100%;
    background-color: #f7f7f7;
} 

</style>
