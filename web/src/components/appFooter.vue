<template>
    <div class="app-footer">
        <homeFooter></homeFooter>
        <copyRight></copyRight>
    </div>
</template>

<script>
import homeFooter from './footer/footer'
import copyRight from './footer/copyRight'
export default {
    components:{
        homeFooter,
        copyRight
    }
}
</script>

<style scoped lang='scss'>
.app-footer{
    position: relative;
    width: 100%;
    bottom: 0;
    left: 0;
    background-color:darken(#f7f7f7,1%);
}
</style>
