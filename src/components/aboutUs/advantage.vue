<template>
        <div class="advantage">
            <div class="leftpart">
                <h3>{{advantage.title}}</h3>
                <div class="article-body">
                    <transition name="transX">
                         <p v-if='isCmptShow'>{{advantage.article}}</p>
                    </transition>
                </div>                
            </div>
            <div class="rightData">
                <div class="achievement"
                v-for='it in achievementData'
                :key='it.title'>
                    <transition name="moveX">
                         <em v-if='isCmptShow'>{{it.data}}</em>   
                    </transition>
                    <span>{{it.title}}</span>
                </div>
            </div>
        </div>        
</template>

<script>
export default {
    props:{
        advantage:Object,
        achievementData:Array
    },
    data(){
        return{
            isCmptShow:false
        }
    }
}
</script>

<style scoped lang='scss'>
.advantage{
    position: relative;
    margin:5rem 0 10rem;
    display: flex;
}
.leftpart{
    width: 50%;
    margin-bottom: 4rem;
    h3{
        margin:2rem 0 2rem;
        line-height: 2rem;
        font-size: 1.1rem;
        color: #666;
        font-family: '微软雅黑';
    }
}
.rightData{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 50%;
    .achievement{
        display: flex;
        justify-content: center;
        flex-direction: column;
        min-width: 50%;
        em{
            font-size: 1.8rem;
            color: rgba(180,0,0,1);
        }
        span{
            margin-top: 0.5rem;
            font-size: 0.8rem;
            color: #999;
        }
    }
}
.article-body{
    width: 100%;
    p{
        width: 60%;
        margin: 0 auto;
        line-height: 1.3rem;
        letter-spacing: 0.1rem;        
        text-align:justify;
        text-justify: inter-ideograph;
        color: #999;
    }
}

@media only screen and (max-width:640px){
    .article-body p{
        line-height: 1.5rem;
        width: 70%;
    }
}
</style>
