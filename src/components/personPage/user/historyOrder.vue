<template>
    <div class="historyOrder">
        <person-title>当前位置 :: 我的订单 >> <em>历史订单</em></person-title>
         <div class="hidtoryOrder-cont">
                <orderList 
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                :userOrder='CompOrder'
                :listType='listType'
                @DeleteOrder='handleDelete'>
                </orderList>
         </div>
    </div>
</template>

<script>
import orderList  from './orderList' 
export default {
        data(){
        return {
            loading:true,
            userOrder: [{
                    createTime: '2018-11-20 13:50',
                    goodsTpye:'零食',
                    goodsSize:'一般',
                    Price:3.00,
                    goodsNumber:2,
                    company:['圆通','韵达'],
                    goodsCode: ['123456','654214'],
                    orderState: '已完成',
                    isCompleted:true,
                    courierPeople:'陈醉',
                    courierPhone:'15279778477',
                    remarks:'送我楼下'
                }, 
                {
                    createTime: '2018-11-11 18:30',
                    goodsTpye:'家具',
                    goodsSize:'小',
                    Price:1.88,
                    goodsNumber:1,
                    company:['申通'],
                    goodsCode: ['167556'],
                    orderState: '待接单',
                    isCompleted:false,
                    courierPeople:'',
                    courierPhone:'',
                    remarks:'大中午午休不要打电话'
                }, 
                {
                    createTime: '2018-11-08 12:10',
                    goodsTpye:'零食',
                    goodsSize:'较大',
                    Price:2.00,
                    goodsNumber:1,
                    company:['韵达'],
                    goodsCode: ['167756'],
                    orderState: '待接单',
                    isCompleted:false,
                    courierPeople:'',
                    courierPhone:'',
                    remarks:''
            }],
            listType:{
                noCompBtn:false
            }
        }
    },
    mounted() {
        setTimeout(()=>this.loading=false,600);
    },
    components:{
        orderList
    },
    computed:{
        CompOrder(){
            return this.userOrder.filter(it=>it.isCompleted);
        }
    },
    methods:{
        handleDelete(data){
            // 删除订单
            this.$confirm('此操作将永久删除该文件, 是否继续?', 
                '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'error'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                 });          
            });  
        }
    }
}
</script>

<style>

</style>
