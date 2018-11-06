<template>
    <div class="footer">
        <div class="foot-link">
            <ul v-for='it in footList' :key='it.id'>
                <li><h5>{{it.title}}</h5></li>
                <li
                v-for='(list,index) in it.liList' 
                :key='index'>
                <el-tooltip class="item" effect="dark" 
                :content="list" placement="right">
                    <a href="javascript:void(0);">{{list}}</a>
                </el-tooltip>                   
                </li>
            </ul>
        </div>
        <div class="callUs">
            <div class="serviceNumber">
                <span>24小时客服热线 :</span>
                <el-tooltip class="item" effect="dark" 
                content="5201314" placement="top">
                     <a href="javascript:void(0)">5201314</a>
                </el-tooltip>   
            </div>
            <div class="wechat">
                <span>关注我们 :</span>
                <el-popover
                    v-for='it in wechatAQQ'
                    :key='it.id'
                    placement="top-end"
                    :title="it.title"
                    width="200"
                    trigger="hover"
                    content="">
                    <el-button slot="reference">{{it.title}}</el-button>
                    <slot name="content">
                        <img :src='it.img' 
                        width="200" height='200' :alt='it.title'/>
                    </slot>
                </el-popover>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            footList:[
                {id:1,title:'用户帮助',liList:['我的客服','订单查询','投诉建议']},
                {id:2,title:'商务合作',liList:['我要开店','加盟指南','市场合作','开放平台']},
                {id:3,title:'用户帮助',liList:['平台介绍','加入我们','联系我们','规则中心','隐私条款']}
            ],
            wechatAQQ:[
                {id:1,title:'微信',img:'./static/img/wechat.png'},
                {id:2,title:'QQ',img:'./static/img/home-QQ.jpg'}
            ]
        }
    }
}
</script>

<style lang='scss' scoped>
span::selection,
h5::selection,
a::selection{
            background-color:#93C; 
            color:#FCF;
}  
.footer{
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    border-top: 1px solid #ccc;
    padding-top: 2rem;
    padding-bottom: 5rem;
    cursor: pointer;
}
.foot-link{
    position: relative;
    display: flex;
    margin-right: 2.5rem;
    ul{
        padding:0 2.5rem;
        border-right: 1px solid #ccc;
        h5{
            letter-spacing: 0.1rem;
            font-size: 0.8rem;
            color: #333;
            margin-bottom: 0.3rem;
        }
        li{
            display: block;
            line-height: 1.2rem;            
        }
        a{
            color: #666;
            letter-spacing: 1px;
            &:hover{
                color: #333;
            }
        }
    }
}
.callUs{
    position: relative;
    .wechat{
        text-align: left;
    }
}
.serviceNumber{
    margin-bottom: 1rem;
    color: #333;
    text-align: left;
    letter-spacing: 1px;
}
</style>
