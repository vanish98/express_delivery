<template>
    <div class="home-news">
        <div class="news-title">
             <h3>精彩瞬间</h3>
             <div class="circle"></div>
        </div>
        <div class="news-body">
            <div class="item" 
            v-for='obj in newsSoure' :key=obj.id>
                <div class="out-border"></div>
                <img :src="obj.imgSrc" alt="精彩瞬间">
                <div class="item-body">
                    <h4>{{obj.title}}</h4>
                    <p>{{obj.article}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import newsBanner from './banner'
export default {
    props:{
        newsSoure:Array,
        newsBannerImg:Array
    },
    components:{
        newsBanner
    }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
.home-news{
    position: relative;
    width: 100%;
    margin-bottom: 10rem;
}
.news-title{
    position: relative;  
    margin-bottom: 2rem;  
    h3{
        $lateValue:-3rem;
        overflow: hidden;
        position: relative;
        display: block;
        font-size: 1rem;
        letter-spacing: 0.1rem;
        color: #666;
        z-index: 66;
        &:after,
        &:before{
            content: '';
            display: block;
            position: absolute;
            right: $lateValue;
            top: 50%;            
            width: 50%;
            height: 0.2rem;
            background-color: #FFCCCC;
            background-image: linear-gradient(to right, #97d9e1 0%, #fff 50%);
        }  
        &:before{
            left: $lateValue;
            background-image: linear-gradient(to left, #97d9e1 0%, #fff 50%);
        }
    }
}
.circle{
    $circle-w:6rem;
    $circle-h:3rem;
    position: absolute;
    left: 50%;
    top: 0;
    margin-top: -$circle-h +0.7rem;
    margin-left: -$circle-h;
    @include circle($circle-w,#fff);
    &::after{
        $moveValue:0.5rem;
        content:'';
        display: block;
        position: absolute;
        @include circle($circle-w +$moveValue,#97d9e1);
        margin-left: -$moveValue /2;
        margin-top: -$moveValue /2;
        z-index: -1;
    }
}
.news-body{
    position: relative;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    cursor: pointer;
}
.out-border{
    position: absolute;
    top: 1rem;
    left: -2rem;
    width: 50%;
    height: 1rem;
    background-color: #00f2fe;
    @include rotate(-45deg);
    @include box-shadow(0 0 3px 1px #4facfe);
    z-index: 99;
}
.item{
    position: relative;   
    display: flex;
    overflow: hidden; 
    margin-top: 4rem;
    @include box-shadow(0.5rem 0.5rem 3px  #666);
    img{
        display: block;
         @include transition(.5s);
    }
    &:hover img{
        @include set-opacity(0.5);
        @include scale(1.1);
    }    
}
.item-body{
    $title-h:1.2rem;
    position: absolute;   
    bottom: 0;
    background-color: #fff;
    background-color: rgba(255,255,255,.6);
    height: $title-h;
    @include transition(.5s);
    h4{
        display: block;
        line-height: $title-h;
        margin-bottom: 0.5rem;
        font-size: 1rem;
        color: #333;
        background-color: #c2e9fb;
        @include set-opacity(0.7);
    }
    p{
        width: 90%;
        margin: 0 auto;
        line-height: 1.5rem;
        font-size: 0.7rem;
        text-indent: 1.4rem;
        letter-spacing: 0.1rem;
        text-align:justify; 
        text-justify:inter-ideograph; 
        color: #333;
        &::selection{
            background-color:#93C; 
            color:#FCF;
        } 
    }
}
.item:hover  .item-body{
    height:70%;
}
</style>

