<template>
    <div class="person-user">
        <div class="person-user-body">
            <leftMenu></leftMenu>
            <div class="pserson-router-cont">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import leftMenu from '../leftMenu'
export default {
    components:{
        leftMenu
    }

}
</script>

<style lang='scss'>
.person-user{
    position: relative;
    width: 100%;
    background-color: #f7f7f7;
}
.person-user-body{
    position: relative;
    display: flex;
    width: 80%;
    margin: 0 auto; 
}
.pserson-router-cont{
    width: 100%;
    min-height: 680px;
    background-color: #fff;
    border: 1px solid rgb(228, 225, 225);
}
@media only screen and (max-width:1200px){
    .person-user-body{
        width: 90%;
    }
}
</style>
