<template>
<div id="app">     
  <vue-scroll>     
    <appHeader></appHeader>                
    <router-view/>   
    </vue-scroll>   
</div>   
</template>

<script>
import appHeader from './components/appHeader'
export default {   
    name: 'App',
    components:{
      appHeader
    }
}
</script>

<style lang='scss'>
@import "../node_modules/compass-mixins/lib/compass/reset";
html{
  font-size: 125%;
  //以20为基准
  
}
body{
  font-size: 14px;
  overflow-x: hidden;
  //background-color: #f7f7f7;
}
a{
  text-decoration: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  height: 100%;
}
// 滚动条
::-webkit-scrollbar-track-piece { //滚动条凹槽的颜色，还可以设置边框属性
background-color:#f5f5f5
}
::-webkit-scrollbar {//滚动条的宽度
width:9px;
}
::-webkit-scrollbar-thumb {//滚动条的设置
background-color: rgb(24, 144, 255);
background-clip:padding-box;
min-height:28px;
border-radius: 9px;
}
::-webkit-scrollbar-thumb:hover {
background-color:lighten(rgb(24, 144, 255),10%);
}
// ::-webkit-scrollbar-button {
// } /* 滑轨两头的监听按钮颜色 */
::-webkit-scrollbar-corner {
		  background-color: black;
}/* 横向滚动条和纵向滚动条相交处尖角的颜色 */
</style>
