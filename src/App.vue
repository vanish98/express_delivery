<template>
<div id="app">   

    <router-view 
    :class="{hiddenHeader}"
    name="header">
    </router-view>

    <vue-scroll 
    ref='scroll'
    :class="{'mgtop':hiddenHeader}"
    @handle-scroll="handleScroll">  
        <transition name='router' mode="out-in">
          <router-view 
          @pageDestroyed='scrollToTop'
          @scrollShowComponent='showComponent'/>  
        </transition>                  
    </vue-scroll> 

    <goToTop 
    :showGoTop='showGoTop'
    @handleGotoTop='scrollToTop'></goToTop>

    <lineProcess
    :percentage='percentage'>
    </lineProcess>

</div>   
</template>

<script>
import appHeader from './components/appHeader'
import goToTop from './components/goToTop'
import lineProcess from './components/lineProcess'
import {getElementTop} from './assets/js/scrollValue'
export default {  
    data(){
      return{
        hiddenHeader:false,
        //进度条
        percentage:0,
        showGoTop:false,
        shwoCompts:[]
      }
    },
    name: 'App',
    components:{
      appHeader,
      lineProcess,
      goToTop
    },
    methods:{
        handleScroll(vertical) {
          vertical.process && (this.percentage=Number.parseInt(vertical.process *100));
          if(vertical.directionY=='down'){
                this.hiddenHeader=true; 
                this.showGoTop = true;
          }else{
                this.hiddenHeader=false;
          }
          if(vertical.scrollTop==0){
               this.showGoTop = false;
          }
          for(let i =0; i <this.shwoCompts.length ;i++){
              if(getElementTop(this.shwoCompts[i].$el) < vertical.scrollTop + 450){
                  this.shwoCompts[i].$data.isCmptShow =true;    
              }
              if(vertical.process>=0.8){
                  this.shwoCompts[i].$data.isCmptShow =true;
              }
          }
          
        },
        scrollToTop(){       
           this.$refs['scroll'].scrollTo({ x: 0, y: 0});
           this.percentage = 0;
        },
        showComponent(target){
            this.shwoCompts=target;
        }   
    }
}
</script>

<style lang='scss'>
@import "../node_modules/compass-mixins/lib/compass/reset";
@import "./style/mixin";
@import "./style/transition";
html{
  font-size: 125%;
  //以20为基准 
}
body{
  font-size: 0.7rem;
  overflow: hidden;
  //background-color: #f7f7f7;
}
a{
  text-decoration: none;
}
html,body,#app{
  height: 100%;
}
#app {
  position: relative;
  width: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
//顶部个人中心消息红点
.el-badge__content.is-fixed.is-dot{
    right: 0;
}
//全局消息提示框
.el-message{
  top: 5rem;
}
.__vuescroll{
  @include transition(.3s);
}
.mgtop{
  @include translateY(-3rem);
}
.header.hiddenHeader{
    @include transition(1s); 
    @include translateY(-100%);
}
textarea::selection,
input::selection,
span::selection,
div::selection,
a::selection,
em::selection,
li::selection,
h1::selection,
h2::selection,
h3::selection,
h4::selection,
h5::selection,
p::selection{
    background-color:#93C; 
    color:#FCF;
} 
.router-enter,
.router-leave-to{
  @include set-opacity(0);
}
.router-enter-active,
.router-leave-active{
  @include transition(.3s); 
}
@media only screen and (max-width:1750px){
    html{
      font-size: 114%;
    }
}
@media only screen and (max-width:1550px){
    html{
      font-size: 100.91%;
    }
}
@media only screen and (max-width:1400px){
    html{
      font-size: 91.14%;
    }
}
@media only screen and (max-width:1200px){
    html{
      font-size: 78.12%;
    }
}
@media only screen and (max-width:992px){
    html{
      font-size: 64.58%;
    }
    .mgtop{
      @include translateY(-4.1rem);
    }
}
@media only screen and (max-width:768px){
    html{
      font-size: 50%;
    }
}
@media only screen and (max-width:640px){
    html{
      font-size: 32.55%;
    }
}
@media only screen and (max-width:440px){
    html{
      font-size: 22.92%;
    }
}
</style>
