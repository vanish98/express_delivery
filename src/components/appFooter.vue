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

<style scoped>
.app-footer{
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
}
</style>
