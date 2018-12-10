<template>
    <div class="footerProcess">
        <el-progress 
        :title='percentage+"%"'
        :show-text='false'
        :color='lineColor'
        class="percentage-line"
        :percentage="percentage">
        </el-progress>
    </div>
</template>

<script>
export default {
    data(){
        return{
            lineColor:'#00f2fe'
        }
    },
    props:{
        percentage:Number,
        required:true
    }
}
</script>

<style>
.footerProcess{
    position: fixed;
    width: 100%;
    height: 0.2rem;
    bottom: 0;
    left: 0;
    background-color:transparent;
}
/* //进度条背景 */
.el-progress-bar__outer{
    background-color: transparent;
}
</style>
