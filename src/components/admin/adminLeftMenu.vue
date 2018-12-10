<template>
<div class="adminLeftMenu">
    <el-menu 
    :default-active="defaultActive" 
    class="el-menu-vertical-demo"
    active-text-color='#409EFF'
    :router='true'
    ref="leftMenu"
    unique-opened>
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
        menuData:this.leftMenuData,
        defaultActive:'allUser'
      };
    },
    methods: {
    //   handleOpen(key, keyPath) {
    //   },
    //   handleClose(key, keyPath) {
    //   },
    //   handleSelect(key, keyPath){
    //   }
    },
    mounted() {
        //console.log(this.$route.path.split('/')[2]);
        let RefreshMenu = this.$route.path.split('/')[2];
        try{
            this.$refs.leftMenu.activeIndex = RefreshMenu;
            this.defaultActive = RefreshMenu;  
        }catch(err){ }
    }
  }
</script>

<style lang='scss'>
.adminLeftMenu{
    position: relative;
    text-align: right;
    height: 100%;
    background-color: #fff;
    border-right: 1px solid rgb(238, 236, 236);
    .el-menu-vertical-demo,
    .el-radio-button__inner,
    .el-menu{
        background-color: transparent;
        border-right: none;
    }
    .el-submenu__title,
    .el-submenu__title i{
        color: #888;
    }
    .el-menu-item{
        background-color: #f6f6f6;
        border-bottom: 1px solid rgb(238, 236, 236);
    }
    .el-menu-item.is-active{
        color: #0096ff;
    }
    // 当前打开的菜单
    .el-submenu.is-active{
        .el-submenu__title{
            background-color: #409eff;
            color: #fff;
        }
        .el-submenu__title i{
            color: #fff;
        }
    }
    .el-submenu__title{
        border-bottom: 1px solid rgb(236, 236, 236);
    }
    .el-submenu__title:hover{
         background-color: #ecf5ff;
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