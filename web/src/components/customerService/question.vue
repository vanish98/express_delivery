<template>
<transition name='transX'>
    <div class="question" v-if='show'>
        <h4>常见问题</h4>
        <div class="question-body">
            <dl v-for='item in questionData' :key='item.id'>
                <dt>
                    <img :src="item.topImg" alt="常见问题图标">
                    <h5>{{item.h5Title}}</h5>
                </dt>
                <dd>
                    <ul>
                        <li v-for="it in item.list" :key='it.quest'>
                            <el-popover
                            placement="left"
                            :title="item.h5Title"
                            width="200"
                            trigger="hover"
                            :content="it.result">
                            <a href="javascript:void(0);" slot="reference">{{it.quest}}</a>
                            </el-popover>
                        </li>
                    </ul>
                </dd>
            </dl>
        </div>
    </div>
</transition>
</template>

<script>
export default {
    props:{
        questionData:Array,
        show:Boolean
    }
}
</script>

<style scoped lang='scss'>
@import '../../style/mixin';
.question{
    position: relative;
    width: 90%;
    margin: 0 auto;
    background-color: #fff;  
    padding-bottom: 5rem;
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
.question-body{
    position: relative;
    display: flex;
    justify-content: space-around;
    padding-top: 2rem;
    dt{
        text-align: left;
        img{
            width: 4rem;
            height: 4rem;
        }
        h5{
            margin: 1rem 0;
            font-size: 0.8rem;
            color: #333;
        }
    }
    dd{
        position: relative;
        width: 10rem;
        ul{
            width: 100%;
            height: 100%;
            li{
                width: 100%;
                height: 1.4rem;
                line-height: 1.4rem;
                text-align: left;

                
            }            
        }
        a{
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #666;
            &:hover{
                color: #999;
            }
        }
    }
}
</style>
