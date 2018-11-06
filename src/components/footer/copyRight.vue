<template>
    <div class="copyRight">
        <h5 class="owner">
            所有方 : <em>波哥无敌工作室</em> |
             <el-tooltip class="item" effect="dark" 
             content="营业执照" placement="top">
                 <a href="javascript:void(0)">营业执照</a>
             </el-tooltip>         
        </h5>    
        <p>
            <a href="http://www.miibeian.gov.cn" target="_black">赣ICP备18011821号-1 </a>
            | 江西行政管理 
            Copyright @2016-{{new Date().getFullYear()}}
            校园闪电侠 All Rights Reserved
        </p>       
    </div>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
.copyRight{
    position: relative;
    width: 100%;
    background-color:darken(#fff,3%);
    padding-bottom: 1.2rem;
    p{
        color: #666;
        font-size: 0.7rem;
        a{
            color: #666;
            &:hover{
                color: #000;
                text-decoration: underline;
            }
        }
    }
}
.owner{
    display: block;
    margin-bottom: 0.6rem;
    a{
        color: #000;
        &:hover{
            color: red;
        }
    }    
}
</style>
