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
    height: 1.50rem;
    line-height: 1.50rem;
    border-bottom: 1px solid rgb(236, 236, 236);
    background-color: #f4f9fd;
    cursor: pointer;
    .p-title{
        text-align: left;
        text-indent: 2rem;
        font-size: 0.7rem;
        color: #b7b7b7;
    }
    em{
        color: #409EFF;
    }
}
</style>
