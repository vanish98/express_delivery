<template>
<div id="app">   
    <appHeader
    data='header'
    :class="{hiddenHeader}"></appHeader> 
    <vue-scroll 
    ref='scroll'
    :class="{'mgtop':hiddenHeader}"
    @handle-scroll="handleScroll">  
      <transition name='router'>
         <router-view @pageDestroyed='scrollToTop'/>  
      </transition>                  
    </vue-scroll> 
    <lineProcess
    :percentage='percentage'>
    </lineProcess>
</div>   
</template>

<script>
import appHeader from './components/appHeader'
import lineProcess from './components/lineProcess'
export default {  
    data(){
      return{
        hiddenHeader:false,
        percentage:0
      }
    },
    name: 'App',
    components:{
      appHeader,
      lineProcess
    },
    methods:{
        handleScroll(vertical) {
          vertical.process && (this.percentage=Number.parseInt(vertical.process *100));
          if(vertical.directionY=='down'){
                this.hiddenHeader=true
          }else{
                this.hiddenHeader=false
          }
        },
        scrollToTop(){       
           this.$refs['scroll'].scrollTo({ x: 0, y: 0});
        }      
    }   
}
</script>

<style lang='scss'>
@import "../node_modules/compass-mixins/lib/compass/reset";
@import "./style/mixin";
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
</style>
