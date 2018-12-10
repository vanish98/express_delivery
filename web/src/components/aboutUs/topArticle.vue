<template>
    <div class="topArticle">
        <h2>ABOUT US</h2>
        <span></span>
        <div class="art-body">
            <transition name="transX">
                <p v-if='isCmptShow'>{{topArticle}}</p>
            </transition>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        topArticle:String
    },
    data(){
        return{
            isCmptShow:false
        }
    },
    mounted() {
        this.isCmptShow=true;
    },
}
</script>

<style scoped lang='scss'>
$text-color:#999;
.topArticle{
    position: relative;
    margin:7rem 0 12rem;
    h2{
        font-size: 1.4rem;
        color: rgba(6,7,15,1);
        font-family: '微软雅黑';
        text-align: center;
        margin-bottom: 1.5rem;
    }
    span{
        display: block;
        width: 2rem;
        height: 0.2rem;
        margin: 0 auto;
        background-color: #ccc;
    }
    .art-body{
        margin-top: 3rem;
        p{
            width: 40%;
            line-height: 1.5rem;
            margin: 0 auto;
            letter-spacing: 0.1rem;
            color: $text-color;   
            text-align: justify;
            text-justify: inter-ideograph;
        }
    }
}

@media only screen and (max-width:640px){
    .topArticle{
        margin-bottom: 8rem;
    }
    .topArticle .art-body p[data-v-900eda16]{
        width: 80%;
        line-height: 1.7rem;
    }
}
</style>
