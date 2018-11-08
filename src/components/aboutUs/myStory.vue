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
                    <p>{{item.article}}</p>
                </div>
            </div>
        </div>
        <!-- 我们的优势 -->
        <div class="advantage">
            <div class="leftpart">
                <h3>{{advantage.title}}</h3>
                <div class="article-body">
                    <p>{{advantage.article}}</p>
                </div>                
            </div>
            <div class="rightData">
                <div class="achievement"
                v-for='it in achievementData'
                :key='it.title'>
                    <em>{{it.data}}</em>
                    <span>{{it.title}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        myStoryBody:Array,
        advantage:Object,
        achievementData:Array
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
.advantage{
    margin:5rem 0 10rem;
    display: flex;
}
.leftpart{
    @extend .articleCont;
    h3{
        margin-top: 2rem;
    }
    margin-bottom: 4rem;
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
</style>
