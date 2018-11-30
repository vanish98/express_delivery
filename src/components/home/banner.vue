<template>
<div class="banner"
@mouseover="stopAutoPlay"
@mouseout="goAutoPlay">
    <swiper :options="swiperOption" 
    ref="mySwiper"
    >
      <!-- slides -->
      <swiper-slide class="swiper-slide" 
      v-for="item in bannerImg" :key="item.id">
        <div class="item-img">
          <img :src="item.imgSrc" 
          alt="" width="100%" height="100%">
        </div>
      </swiper-slide>
     <div class="swiper-pagination" slot="pagination"></div>
     <div class="swiper-button-prev btn-hidden" slot="button-prev"></div>
    <div class="swiper-button-next btn-hidden" slot="button-next"></div>
    </swiper>   
</div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    props:{
        bannerImg:Array
    },
    data(){
        return{          
            swiperOption:{
                effect : 'cube',
                autoplay:{
                    delay:3000,
                    stopOnLastSlide: false,
                    disableOnInteraction: false  
                },
                speed: 500,//切换速度
                watchOverflow: true, //当没有足够的slide切换时，例如只有1个slide（非loop），swiper会失效且隐藏导航等。默认不开启这个功能。
                loop: true,//开启循环模式
                slidesPerView: 1,
                preventClicksPropagation: true,//阻止click冒泡。拖动Swiper时阻止click事件。
                simulateTouch: true,//鼠标模拟手机触摸。默认为true，Swiper接受鼠标点击、拖动。
                observer: true,//修改swiper自己或子元素时，自动初始化swiper
                observeParents: true,//修改swiper的父元素时，自动初始化swiper
                pagination: {
                    el: '.swiper-pagination',
                    clickable :true,
                    bulletClass : 'my-bullet',
                    bulletActiveClass: 'my-bullet-active',
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }
            }
        }
    },
    components: {
        swiper,
        swiperSlide
    },
    computed:{
        swiper() {
             return this.$refs.mySwiper.swiper
        }
    },
    methods:{
        stopAutoPlay(){
            try {
                this.$refs.mySwiper.swiper.autoplay.stop();
            } catch (error) { }
        },
        goAutoPlay(){
            try {
                this.$refs.mySwiper.swiper.autoplay.start();
            } catch (error) { }
        }
    },
    destroyed() {
        this.swiperOption={};
    },
}
</script>

<style  lang='scss'>
@import "../../style/mixin";
.banner{
    position: relative;
    width: 100%;
    max-height: 30rem;
    &:hover .btn-hidden{
        @include set-opacity(1);
    }
}
.btn-hidden{
    @include set-opacity(0);
    @include transition(0.5s);
}
.item-img{
    position: relative;
    overflow: hidden;
    width: 100%;
    max-height: 30rem;
    img{
        display: block;
        bottom: 0;
    }
}
.my-bullet{
    display: inline-block;
    width: 0.7rem;
    height: 0.7rem; 
    margin: 0 0.4rem;
    border-radius: 100%;
    background: #000;
    opacity: 0.2;
}
.my-bullet-active{
    opacity: 1;
    background: #007aff;
}

.swiper-button-prev,
.swiper-button-next{
    width: 1.3rem;
    height: 2.2rem;
    background-size: contain;
    background-repeat: no-repeat;
}
</style>
