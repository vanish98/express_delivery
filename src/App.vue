<template>
<div id="app">   

    <appHeader
    data='header'
    :class="{hiddenHeader}"></appHeader> 

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
              if(getElementTop(this.shwoCompts[i].$el) < vertical.scrollTop + 500){
                  this.shwoCompts[i].$data.isCmptShow =true;
                   
              }
          }
          
        },
        scrollToTop(){       
           this.$refs['scroll'].scrollTo({ x: 0, y: 0});
        },
        showComponent(target){
            this.shwoCompts=target;
        }   
    },
    mounted() {
      
    }, 
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
  font-size: 14px;
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
.__vuescroll{
  @include transition(.6s);
}
.mgtop{
  @include translateY(-3rem);
}
.header.hiddenHeader[data]{
    @include transition(.8s); 
    @include translateY(-100%);
}
h2::selection,
h3::selection,
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
</style>
