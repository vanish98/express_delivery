<template>
  <div id="app">
    <appHeader></appHeader>
    <router-view/>
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
</style>
