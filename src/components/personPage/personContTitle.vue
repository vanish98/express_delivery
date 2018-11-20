<template>
    <div class="person-cont-title">
       <h2 class="p-title">
           <slot></slot>
       </h2> 
    </div>
</template>

<script>
export default {

}
</script>

<style lang='scss'>
.person-cont-title{
    position: relative;
    height: 1.55rem;
    line-height: 1.55rem;
    border-bottom: 1px solid #ccc;
    cursor: pointer;
    .p-title{
        text-align: left;
        text-indent: 2rem;
        font-size: 0.7rem;
        color: #666;
    }
    em{
        color: #409EFF;
    }
}
</style>
