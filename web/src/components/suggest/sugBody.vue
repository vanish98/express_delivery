<template>
<transition name='moveY'>
    <div class="suggest-cont" 
    ref="sugCont"
    :class="{'hiden-h':!sugcontshow}"
    v-if="contShow"> 
        <transition name='transX'>
            <div class="sug-cont-body" v-if="sugcontshow"> 
                    <ul class="sug-list">
                        <li>
                            <label>姓名 : <input type="text"
                            v-model.trim="sugcontForm.userName"></label>
                        </li>
                        <li>
                            <label>电话 : <input type="text"
                             v-model.trim="sugcontForm.phoneNum"></label>
                        </li>   
                    </ul>
                <div class="textarea">
                    <span>内容 : </span>
                    <textarea name="suggestText" 
                        id="suggestText" 
                        v-model.trim="sugcontForm.suggestText"></textarea>
                </div>
                <div class="submit">
                    <input type="button" 
                    @click="$emit('handleSubSuggest',sugcontForm)" value="提交">
                </div>
            </div>        
        </transition>    
    </div>
</transition>
</template>

<script>
export default {
    props:{
        sugcontshow:Boolean,
        contShow:Boolean
    },
    data(){
        return{
            sugcontForm:{
                userName:'',
                phoneNum:'',
                suggestText:''
            }
        }
    }
}
</script>

<style scoped lang='scss'>
$text-color:#777;
.suggest-cont{
    overflow: hidden;
    display: flex;
    flex-direction: column;
    width: 60%;
    margin: -4rem auto 10rem;
    border:0.4rem solid #4facfe;
    box-sizing: border-box;
    box-shadow: 1rem 1rem 1rem #888;
    transition:.6s;
    height: 24.5rem;
    background-color: #fff;
}
.hiden-h{
    height: 2.5rem;
    margin-bottom: 32rem;
}
.sug-cont-body{
    padding: 2rem 1rem;
}
.sug-list{
    width: 100%;
    margin-bottom: 3rem;
    li{
        display: block;
        height: 2.5rem;
        line-height: 2.5rem;
        margin-bottom: 2rem;
    }
    label{
        display: block;
        font-size: 1rem;
        color: $text-color;
        input{
            overflow: hidden;
            height: 1.5rem;
            width: 60%;
            margin-left: 0.2rem;
            border: 2px solid transparent;
            border-bottom: 2px solid #4facfe;
            border-radius: 1rem;
            font-size: 0.9rem;
            letter-spacing: 0.1rem;
            text-align: center;
            outline: none;
            &:focus{
                border: 2px solid #4facfe;
            }
        }
    }
}
.textarea{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    span{
        font-size: 1rem;
        color: $text-color;
    }
}
#suggestText{
    resize: none;
    width:60%;
    height: 5rem;
    margin-left: 0.3rem;
    outline: none;
    border: 1px solid #4facfe;
    border-radius: 1rem;
    text-indent: 0.5rem;
    padding-top: 0.5rem;
    font-size: 0.8rem;
    letter-spacing: 1px;
    color: #444;
}
.submit{
    width: 100%;
    margin-top: 2rem;
    input{
        width: 40%;
        height: 2rem;
        border: none;
        border-radius: 1rem;
        background-color:lighten(#4facfe, 5%);
        background-image: linear-gradient(to bottom, #48c6ef 0%, #6f86d6 100%);
        outline: none;
        font-size: 1rem;
        color: #fff;
        letter-spacing: 10px;
        &:hover{
            background-image: linear-gradient(to bottom, #41c1ec 0%, #5a74cf 100%);
        }
    }
}
</style>
