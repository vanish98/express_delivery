<template>
    <div class="aboutUs">
        <div class="abt-header">
            <img src="../../../static/img/aboutUs-header-bg.jpg" alt="关于我们背景图片">
        </div>
        <topArticle :topArticle='topArticle'></topArticle>
        <myStory 
        :myStoryBody='myStoryBody'>
        </myStory>
        <advantage
        :advantage='advantage'
        :achievementData='achievementData'></advantage>
        <appFooter></appFooter>        
    </div>
</template>

<script>
import topArticle from './topArticle'
import myStory from './myStory'
import advantage from './advantage'
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
            `,
            myStoryBody:[
                {
                    id:1,contImg:'./static/img/aboutUs-article-pic01.jpg',
                    bindClass:'Purpose',
                    title:'我们的宗旨',
                    article:`公司创意定位 为您提供了众多广告条件，
                    助您快速找准方向运用各种渠道， 量身定制合理的方案.
                    创造有影响力的网站形象与口碑，让我们的创意变得更 
                    具有商业价值，好看+好用+激发消费购买欲望`
                },
                {
                    id:2,contImg:'./static/img/aboutUs-article-pic02.jpg',
                    title:'我们的团队',
                    bindClass:'ourTeam',
                    article:`为客户提供优质的服务，及时快速跟进。
                    好的品牌形象有助于提升企业好的品牌形象 
                    有助于提升企业整体竞争力。使企业形象和产品
                    品牌在消费者脑海中形成一种个性化 的区隔，
                    从而建立起客户的品牌声浪`
                }
            ],
            advantage:{
                title:'平台优势',
                article:`我们为您提供专业设计解决方案通过研究
                    商业模式来定义品牌模式提供优秀的品牌整合解决方案，
                    令品牌长远发展，更具竞争力新成立企业，需要有好的
                    标志，好的品牌形象有助于提升企业。`                               
            },
            achievementData:[
                {title:'成立时间',data:2016},
                {title:'全国站点',data:120},
                {title:'加盟人数',data:6854},
                {title:'成交订单',data:65324}
            ] 

        }
    },
    components:{
        appFooter,
        topArticle,
        myStory,
        advantage
    },
    mounted() {      
        this.$emit('scrollShowComponent',this.$children);
    },
    destroyed(){
        this.$emit('pageDestroyed');
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
