<template>
    <div class="goto-top"
    :class="{'show-top':showGoTop}"
    @click="$emit('handleGotoTop')">
        <div class="goto-body" title="返回顶部">
            <h5>top</h5>
        </div>     
    </div>
</template>

<script>
export default {
    props:{
        showGoTop:Boolean
    }
}
</script>

<style scoped lang='scss'>
@import "../style/mixin";
.goto-top{
    position: fixed;
    overflow: hidden;
    right: 2rem;
    bottom: 3rem;
    width: 2rem;
    height: 0;
    border-radius: 0.2rem;    
    cursor: pointer;  
    @include transition(0.5s);
}
.show-top{
    height: 2rem
}
.goto-body{
    display: flex;
    justify-content: center;
    height: 2rem;
    width: 100%;   
    border: 1px solid #73b8ff;
    @include border-box;
    background-color: rgba(115,184,255,.5);
    &:hover{
        background-color: rgba(115,184,255,.7);
    }
    h5{
        display: flex;
        align-items: center;
        font-size: 1rem;
        text-align: center;
        color: #999;
    }
}

@media only screen and (max-width:640px){
    .goto-top{
        width: 3rem;
    }
    .show-top,
    .goto-body{
         height: 3rem;
    }   
}
</style>
