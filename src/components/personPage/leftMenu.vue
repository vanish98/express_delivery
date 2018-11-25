<template>
<div class="personLeftMenu">
    <el-radio-group v-model="isCollapse">
            <el-radio-button v-if="isCollapse" :label="false">展开</el-radio-button>
            <el-radio-button v-else :label="true">收起</el-radio-button>
    </el-radio-group>
    <el-menu 
    :default-active="defaultActive" 
    class="el-menu-vertical-demo"
    @open="handleOpen" 
    @close="handleClose" 
    @select="handleSelect"
    :router='true'
    ref="leftMenu"
    unique-opened
    :collapse="isCollapse">
        <el-submenu 
        v-for="item in menuData"
        :key='item.index'
        :index='item.index'>
             <template slot="title">
                <i :class="item.icon"></i>
                <span slot="title">{{item.title}}</span>
            </template>
            <el-menu-item-group>
                <el-menu-item 
                v-for="it in item.menuItem"
                :key='it.route'
                :index="it.route" >{{it.listTitle}}</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</div>
</template>

<script>
import {gotoNewOrder} from './../../assets/js/gotoNewOrder'
  export default {
    props:{
        leftMenuData:Array
    },
    data() {
      return {
        isCollapse: false,//默认展开
        menuData:this.leftMenuData,
        defaultActive:'userInformation'
      };
    },
    methods: {
      handleOpen(key, keyPath) {
    //    console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleSelect(key, keyPath){
        //  console.log(key,keyPath);
         // this.isCollapse =true;
      }
    },
    mounted() {
        //console.log(this.$route.path.split('/')[2]);
        let RefreshMenu = this.$route.path.split('/')[2];
        this.$refs.leftMenu.activeIndex = RefreshMenu;
        this.defaultActive = RefreshMenu;  
        gotoNewOrder.$on('goNewOrder',(index,num)=>{
            this.$refs.leftMenu.activeIndex = index;
            num && this.$refs.leftMenu.open(num);
            //console.log( this.$refs.leftMenu.activeIndex);
        });
    }
  }
</script>

<style lang='scss'>
.personLeftMenu{
    position: relative;
    text-align: right;
    height: 100%;
    .el-menu-vertical-demo,
    .el-radio-button__inner,
    .el-menu{
        background-color: #f7f7f7;
    }
    /* 展开或者收起按钮 */
    .el-radio-group{
        overflow: hidden;
        max-width: 3.2rem;
    }
    .el-radio-button__inner{
        padding: 0;
        width: 3.2rem;
        height: 1.6rem;
        line-height: 1.6rem;
        text-align: center;
        font-size: 0.7rem;
        border-width: 0.05rem;
    }
    .el-radio-button:first-child:last-child .el-radio-button__inner{
        border-radius: 0;
        border-left: 0.05rem solid #dcdfe6;
    }
    /* 菜单 */
    .el-menu{
        text-align: center;
    }
    /* 菜单收起宽度 */
    .el-menu--collapse{
        width: 3.2rem;
    }
    /* 菜单展开宽度 */
    .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 10rem;
    min-height: 20rem;
    }
}
</style>