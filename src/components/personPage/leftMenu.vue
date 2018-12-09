<template>
<div class="personLeftMenu">
    <div class="menu-btn" @click="isCollapse=!isCollapse">
        <div class="on" v-if="isCollapse">
             <i class="el-icon-menu"></i>
        </div>
        <div class="off" v-else>
            <i class="el-icon-close"></i>
        </div>
    </div>
    <el-menu 
    :default-active="defaultActive" 
    class="el-menu-vertical-demo"
    :router='true'
    ref="leftMenu"
    unique-opened
    menu-trigger='click'
    :collapse="isCollapse">
        <el-submenu 
        v-for="item in menuData"
        :key='item.index'
        :index='item.index'>
             <template slot="title">
                <i :class="item.icon"></i>
                <span slot="title">{{item.title}}</span>
            </template>
            <el-badge  slot="title" :value="msgLen" :max="9"
                v-if="item.title=='我的消息'"
                :hidden='!msgLen'
                class="message-badeg"></el-badge>
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
import { mapState } from 'vuex'
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
    watch:{
        isCollapse(newVal){
            this.$emit('isCollapse',newVal);
        }
    },
    computed:{
        ...mapState({
            msgLen:state=>state.user.userInfo.msgLen
        })
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
            try {
                this.$refs.leftMenu.activeIndex = index;
                if(num && !this.isCollapse){
                    this.$refs.leftMenu.open(num);
                }
            } catch (error) { }
            //console.log( this.$refs.leftMenu.activeIndex);
        });
        gotoNewOrder.$on('readMessage',()=>{
          this.$store.commit("saveUserInfo",{msgLen:this.msgLen-1});            
        });
    }
  }
</script>

<style lang='scss'>
.personLeftMenu{
    position: relative;
    text-align: right;
    height: 100%;
    border-left: 0.05rem solid rgb(236, 236, 236);
    border-bottom: 0.05rem solid rgb(236, 236, 236);
    z-index: 99;
    .menu-btn{
        position: absolute;
        right: -1.5rem;
        top: 0;
        width: 1.5rem;
        height: 1.5rem;
        line-height: 1.5rem;
        text-align: center;
        font-size: 0.8rem;
        color: #409EFF;
        z-index: 99;
    }
    .message-badeg{
        position: absolute;
        top: -0.6rem; 
        right: 1.5rem;
    }
    /* 菜单 */
    .el-menu-vertical-demo,
    .el-menu{
        background-color: transparent;
        text-align: center;
        border-right: none;
    }
    .el-submenu__title,
    .el-submenu__title i{
        color: #888;
    }
    // 展开后的子菜单
    .el-menu-item{
        background-color: #f6f6f6;
        color: #777;
        border-bottom: 0.05rem solid rgb(238, 236, 236);
        &:hover{
        background-color: #ecf5ff;
        }
    }
    .el-menu-item.is-active{
        color: #0096ff;
    }
    // 一级菜单
    .el-submenu__title{
        border-bottom: 0.05rem solid rgb(236, 236, 236);
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
@media only screen and (max-width:992px){
    .personLeftMenu{
        .message-badeg{
            right: 1rem;
            top: -0.8rem;
        }
    }
}
</style>