<template>
<el-carousel indicator-position="outside" class="news-banner">
    <el-carousel-item v-for="item in bannerImg" :key="item.id">
      <img :src="item.imgSrc" alt="轮播图">
    </el-carousel-item>
</el-carousel>
</template>

<script>
export default {
    props:{
        bannerImg:Array
    }
}
</script>

<style  lang='scss'>
@import '../../../node_modules/compass-mixins/lib/compass/functions';
.el-carousel{
    background-color: #cff;
    img{
        position: absolute;
        left: 0;
        bottom: 0;
        max-width: 1920px;
        height: auto;
        
    }
}
.news-banner .el-carousel__container{
    height: 600px;
}
  .el-carousel__indicators--outside{
      position: absolute;
      bottom: 0;
      margin-left: -95px;
  }
  .el-carousel__arrow{
      background-color: rgba(31,45,61,.41);
  }
  .el-carousel__indicators--outside button{
     background-color: adjust-lightness(#409EFF,-10%);
      height: 4px;
      opacity: 0.3;
  }

</style>
