<template>
    <div class="aboutUs">
        <div class="abt-header">
            <img src="../../../static/img/aboutUs-header-bg.jpg" alt="关于我们背景图片">
        </div>
        <topArticle :topArticle='topArticle'></topArticle>
        <myStory></myStory>
        <appFooter></appFooter>        
    </div>
</template>

<script>
import topArticle from './topArticle'
import myStory from './myStory'
import appFooter from '../appFooter'
export default {
    data(){
        return{
            topArticle:`
                我们为您提供专业设计解决方案通过研究商业模式来定义
                品牌模式提供优秀的品牌整合解决方案，令品牌长远发展，
                更具竞争力新成立企业，需要有好的标志，好的品牌形象
                有助于提升企业。需要有好的标志，好的品牌形象有助于
                提升企业整体竞争力。
                `
        }
    },
    components:{
        appFooter,
        topArticle,
        myStory
    }
}
</script>

<style scoped lang='scss'>
.aboutUs{
    position: relative;
}
.abt-header{
    position: relative;
    img{
        display: block;
        width: 100%;
        height: auto;
        max-height: 100%;
    }

}
</style>
