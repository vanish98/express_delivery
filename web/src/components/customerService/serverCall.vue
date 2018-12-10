<template>
<transition name='transX-re'>
    <div class="server-callUs" v-if="show">
            <h4>联系客服</h4>
            <div class="callUs-body">
                <div class="chat">
                    <el-tooltip class="item" effect="dark" 
                    content="在线咨询 不懂就找我 !" 
                    placement="top-start">
                        <i class="icon"></i>
                    </el-tooltip>   
                    <div class="online-chat">
                        <h5>7x24 专业在线咨询</h5>
                        <p>小新期待为您解决遇到的问题</p>
                    </div>
                    <el-tooltip class="item" effect="dark" 
                    content="点击 立即咨询 !" 
                    placement="top">
                        <el-button :plain="true" 
                        @click="$emit('openMsg')">                   
                        <a class="askBtn" href="javascript:void(0);">立即咨询</a>
                        </el-button>   
                    </el-tooltip>                                      
                </div>    
                <div class="call">
                    <el-tooltip class="item" effect="dark" 
                    content="客服热线 : 5201314" 
                    placement="top-end">
                        <i class="icon"></i>
                    </el-tooltip>                    
                    <div class="callfor">
                        <h5>服务热线 : 5201314</h5>
                        <p>24小时服务</p>
                    </div>
                </div>
            </div>
        </div>
</transition>
</template>

<script>
export default {
    props:{
        show:Boolean
    }
}
</script>

<style scoped lang='scss'>
@import '../../style/mixin';
.server-callUs{
    position: relative;   
    width: 90%;
    margin: 0 auto;
    margin-top: 1rem;
    background-color: #fff;   
    cursor: pointer;
    h4{
        width: 100%;
        line-height: 2rem;
        text-align: left;
        text-indent: 2rem;
        padding-top: 1rem;
        margin-bottom: 1rem;
        font-size: 1rem;
    }
}
.callUs-body{
    position: relative;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 1rem 0;
    i.icon{
            overflow: hidden;
            display: block;
            width: 2.7rem;
            height: 2.7rem;
            background-size: contain;
            background-repeat: no-repeat;
    }
    .chat{
        display: flex;
        flex-grow: 1;
        align-items: center;
        margin: 0 1rem 2rem 2rem;
        border-right: 0.05rem solid #ccc;   
        i{
            background-image: url('../../assets/img/customer-service-footer-left.png');
        }
        
    }
    .online-chat,
    .callfor{
        display: flex;
        flex-direction: column;
        text-align: left;
        align-self: center;
        margin: 0 1rem;
        h5{
            font-size: .8rem;
            font-weight: bold;
            color: #666;
            margin-bottom: 1rem;
        }
        P{
            color: #999;
            letter-spacing: 0.05rem;
        }
        
    }
    .askBtn{
            display: block;
            width: 5rem;
            height: 2rem;
            line-height: 2rem;
            font-size: 0.7rem;
            border-radius: 0.2rem;
            background-color: #2396ff;
            color: #fff;           
            text-align: center;
            letter-spacing: 0.1rem;
            @include transition(.5s);
            &:hover{
                background-color: darken(#2396ff,10%);
            }
    }
    .call{
        display: flex;   
        align-items: center;
        margin-left: 2rem; 
        margin-bottom: 2rem;
        flex-grow: 1.3;
        i{
            background-image: url('../../assets/img/customer-service-footer-right.png');
        }
    }
}
.el-button{
    border: none;
    margin-left: 1rem;
}
@media only screen and (max-width:640px){
    .callUs-body .chat{
        border: none;
    }
    .server-callUs{
        margin-top: 2rem;
    }
}
</style>
