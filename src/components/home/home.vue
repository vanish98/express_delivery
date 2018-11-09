<template>
<div class="appHome">
    <homeBanner 
    :bannerImg='bannerImg'
    :height='600'></homeBanner>
    <weCanDo></weCanDo>
    <homeNews :newsSoure='newsSoure'></homeNews>
    <appFooter></appFooter>
</div>
</template>

<script>
import homeBanner from './banner'
import weCanDo from './weCanDo'
import homeNews from './news'
import appFooter from '../appFooter'
export default {
    data(){
        return{
            bannerImg:[ 
                {id:1,imgSrc:'./static/img/banner1.jpg'},
                {id:2,imgSrc:'./static/img/banner2.jpg'},
                {id:3,imgSrc:'./static/img/banner3.jpg'},
                {id:4,imgSrc:'./static/img/banner4.jpg'},
                {id:5,imgSrc:'./static/img/banner5.jpg'}
            ],
            newsSoure:[
                {id:1,title:'校园资讯',imgSrc:'./static/img/home-news-pic1.jpg',
                article:`刺猬在天冷时彼此靠拢取暖，但是保持一定距离，以免互相刺伤。
                        要去保持亲密的重要方法，乃是要保持适当的距离。测验一个人的智力是否是属于上乘，
                        只要看脑子里能否是能同时容纳两种相反的思想，而无碍于其处世行事。`
                },
                {id:2,title:'最新科技',imgSrc:'./static/img/home-news-pic2.jpg',
                article:`可是不知道何时起，仿佛自己更加喜欢熟悉的味道，可能觉得那更加踏实吧，
                        熟悉的味道总是让我们少了很多担心，多了一份踏实很多时候，
                        可能是害怕太多的顾虑，所有干脆放弃，也许在将来的某一刻，
                        我会后悔我现在的选择，但是我却从来的没有忘记我当初的决心。`
                },
                {id:3,title:'公司资讯',imgSrc:'./static/img/home-news-pic3.jpg',
                article:`当我还住在她丢掉的那首歌里，怀抱所有音符；当我仍在她丢掉的那本书里面，
                封面封底夹着我所有的白昼与黑夜的时候，阿谷，这个如山间清风，
                拂面朗月的彝族姑娘已经给我发了好多信息。或许，伤悲的基调定性。`
                },
                {id:4,title:'娱乐八卦',imgSrc:'./static/img/home-news-pic2.jpg',
                article:`当我还住在她丢掉的那首歌里，怀抱所有音符；当我仍在她丢掉的那本书里面，
                封面封底夹着我所有的白昼与黑夜的时候，阿谷，这个如山间清风，
                拂面朗月的彝族姑娘已经给我发了好多信息。或许，伤悲的基调定性。`
                }
            ]
        }
    },
    components:{
        homeBanner,
        weCanDo,
        homeNews,
        appFooter
    },
    destroyed(){
        this.$emit('pageDestroyed');
    }
}
</script>

<style>
.appHome{
    position: relative;
}
</style>
