<template>
    <div class="suggest">  
        <topTitle
        @cahngeShow='sugcontshow=!sugcontshow'></topTitle> 
        <sugBody 
        @blur="textareaValue=$event"
        :sugcontshow='sugcontshow'
        :contShow='contShow'></sugBody>
        <appFooter></appFooter>
    </div>
      
</template>

<script>
import topTitle from './sugTopTitle'
import sugBody from './sugBody'
import appFooter from '../appFooter'
export default {
    data(){
        return{
            textareaValue:'',
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
