<template>
    <div class="header">
            <div class="left-part">
                <i></i>
                <span>公告</span>
            </div>
            <div class="Notice">
                <span>NEW</span>
                <transition name='changeNote' mode="out-in">
                     <h3 :key='index'>{{note}}</h3>
                </transition>                
            </div>
    </div>
</template>

<script>
export default {
    props:{
        headerNote:Array      
    },
    data(){
        return{
            index:0
        }
    },
    computed:{
        note(){                              
            return this.headerNote[this.index];
        }
    },
    created() {
        setInterval(()=>{  
                this.index++;
                this.index %=this.headerNote.length;
        },5000); 
    },
}
</script>

<style lang='scss'>
@import '../../style/mixin';
.header{
    position: relative;
    display: flex;
    align-items: center;
    width: 90%;  
    background-color: #fff;  
    margin: 0 auto;
    margin-bottom: 1rem;
}
.left-part{
    display: flex;
    align-items: center;
    width: 5rem;
    height: 3rem;
    margin-left: 1rem;
    margin-right: 2rem;
    i{
        display: block;
        width: 1.2rem;
        height: 1.2rem;
        margin: 0 0.5rem;
        background-image: url('../../assets/customer-service-header-left.png');
        background-size: contain;
    }
    span{
        font-size: 0.7rem;
    }
}
.Notice{
    display: flex;
    align-items: center;
    span{
        display: block;   
        line-height: 1rem;
        width: 2.2rem;
        margin: 0 1rem;
        text-align: center;
        @include border-radius(0.2rem);
        background-color: #62db70;
        color: #fff;
    }
    h3{
        letter-spacing: 0.1rem;
    }
}
.changeNote-leave-to,
.changeNote-enter{
    opacity: 0;
    @include translateY(30px);
}
.changeNote-enter{
    @include translateY(-30px);
}
.changeNote-leave-active,
.changeNote-enter-active{
    @include transition(1s);
}
</style>
