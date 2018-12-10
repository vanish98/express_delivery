<template>
    <div class="myStory">
        <!-- 宗旨 -->
        <!-- 我们的团队 -->
        <div class="storyItem" 
        :class="[item.bindClass]"
        v-for='item in myStoryBody'
        :key='item.id'>
            <div class="imgCont">
                <img :src="item.contImg" alt="我们的故事">
            </div>
            <div class="articleCont">
                <h3>{{item.title}}</h3>
                <div class="article-body">
                    <transition name="transX">
                         <p v-if='isCmptShow'>{{item.article}}</p>
                    </transition>
                </div>
            </div>
        </div>   
    </div>
</template>

<script>
export default {
    props:{
        myStoryBody:Array
    },
    data(){
        return{
            isCmptShow:false
        }
    }
}
</script>

<style scoped lang='scss'>
.myStory{
    position: relative;

}
.storyItem {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
}
.Purpose{
    flex-direction: row;
}
.ourTeam{
    flex-direction: row-reverse;
}
.imgCont{
    width: 50%;
    min-width: 50%;
    img{
        display: block;
        width: 100%;
        height: auto;
    }
}
.articleCont{
    width: 50%;
    h3{
        margin:4rem 0 2rem;
        line-height: 2rem;
        font-size: 1.1rem;
        color: #666;
        font-family: '微软雅黑';
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
    .imgCont,
    .articleCont{
        width: 100%;
    }
    .articleCont{
        margin-bottom: 3rem;
    }
    .article-body p{
        width: 80%;
        line-height: 1.5rem;
    }
    .Purpose,
    .ourTeam{
         flex-direction: column-reverse;
    }

}
</style>
