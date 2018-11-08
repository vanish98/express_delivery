<template>
    <div class="we-can-do">
        <div class="title">
            <h2>平台主要功能及特色</h2>
        </div>
        <div class="w-cont">
            <div class="item"
            v-for='(it,index) in title' 
            :key=it.id>
                <div class="item-title">
                    <div class="item-bg" :class="'bg'+index"></div>
                    <h3>{{it.title}}</h3>
                </div>
                <div class="item-body">
                    <P>{{it.body}}</P>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            title:[
                {id:1,title:'足不出户',
                body:`我们竭诚为您服务,让您足不出户就可以拿到自己的快递,
                    我们竭诚为您服务,让您足不出户就可以拿到自己的快递
                    我们竭诚为您服务,让您足不出户就可以拿到自己的快递`
                },
                {id:2,title:'高效快捷',
                body:`高效快捷,让您足不出户就可以拿到自己的快递,
                    我们竭诚为您服务,让足不出户就可以拿到自己的快递
                    我们竭诚为您服务,让您足不出户就可以拿到自己的快递`
                },
                {id:3,title:'安全保障',
                body:`安全保障,让您足不出户就可以拿到自己的快递,
                    我们竭诚为您服务,您足不出户就可以拿到自己的快递
                    我们竭诚为您服务,让您足不出户就可以拿到自己的快递`
                },
                {id:4,title:'贴心服务',
                body:`贴心服务,让您足不出户就可以拿到自己的快递,
                    我们竭诚为您服务,您足不出户就可以拿到自己的快递
                    我们竭诚为您服务,让您足不出户就可以拿到自己的快递`
                },
            ]
        }
    }
}
</script>

<style scoped lang='scss'>
@import '../../style/mixin';
.we-can-do{
    overflow: hidden;
    position: relative;
    width: 100%;
    padding-top: 3rem;
    margin-bottom: 7rem;
    cursor: pointer;
}
.title{   
    position: relative;
    width: 100%;
    height: 2rem;
    h2{        
        display: block;
        width: 14rem;
        height: 2rem;
        margin: 0 auto;
        font-size: 1.1rem;
        letter-spacing: 4px;    
        color: #FFF;
        &:after,
        &:before{
            content: '';
            display: block;
            position: absolute;
            right: -7rem;
            top: 25%;            
            width: 50%;
            height: 3px;
            background-color: #FFCCCC;
            background-image: linear-gradient(-20deg, #b721ff 0%, #21d4fd 100%);
        }  
        &:before{
            left: -7rem;
            background-image: linear-gradient(20deg, #b721ff 0%, #21d4fd 100%);
        }
    }
    &:before{
        content:'';
        position: absolute;
        left: 0;
        top: -3rem;
        display: block;         
        width: 100%;
        height: 6rem;
        background-image: url('../../../static/img/home-weCanDo-title-bg.jpg');
        z-index: -1;
    }
    
}
.w-cont{
    position: relative;
    display: flex;
    justify-content:space-around;
    flex-wrap: wrap;
    width: 100%;   
}
$item-w:12rem;
$item-title-h:7rem;
$item--title-w:7rem;
$bd-radius:$item-title-h /2 *1.1;
.item{
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    width:$item-w;
}
.item-title{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;   
    width: $item--title-w;
    min-width: $item--title-w;
    height: $item-title-h;
    margin-top: 5rem;
    @include border-radius(50%);    
    @include transition(.5s);
    background-color: #fff;   
    &:hover{
        background-color: lighten(#c9e4ff,4%);
    }
    h3{
        position: absolute;
        font-size: 1rem;
        letter-spacing: 3px;
        color: #333;
    }
}
.item-body{
    width: $item-w - 2rem;
    margin-top: 2rem;    
    text-align:justify; 
    text-justify:inter-ideograph; 
    P{
        line-height: 1.2rem;
        letter-spacing: 3px;
        font-size: 0.8rem;
        color: #000;
        text-indent: 2rem;        
        &::selection{
            background-color:#93C; 
            color:#FCF;
        }       
    }    
}
.item-title:hover .item-bg{
    animation: rotate 1s linear infinite;
}
.item-bg{
    position: relative;
    width: 100%;
    height: 100%;
    animation: rotate 5s ease-in infinite alternate;
    z-index: -1; 
    &:after,
    &:before{
        content:'';
        display: block;
        position: absolute;
        left: -$item--title-w /20;
        width: $item--title-w *1.1;
        height:$item-title-h /2 *1.1;
        background-color: #00f2fe;   
        background-image: linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%);

    }
    &:before{
        top: -$item--title-w /20;
        @include border-radius($bd-radius $bd-radius 0 0); 
    }
    &:after{
        bottom: -$item--title-w /20;
        @include border-radius(0 0 $bd-radius $bd-radius); 
        background-color:lighten($color: #4facfe, $amount: 15%);
        background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
    }
}
@for $i from 2 through 4{
    .bg#{$i}{
        animation-delay: $i / 2.5+s;
    }
}
@keyframes rotate{
    from{
        transform: rotate(0);
    }
    to{
        transform: rotate(360deg);
    }
}
</style>
