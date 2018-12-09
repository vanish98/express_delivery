<template>
    <div class="newOrder">
        <person-title>当前位置 :: 我的订单 >> <em>发布订单</em></person-title>
        <div class="createNewOrder">
            <el-form :model="orderForm" 
            :rules="rules" ref="newOrder" 
            label-position='left'
            @submit.native.prevent
            :status-icon='true'
            label-width="7rem" class="demo-orderForm">
                <el-form-item label="物品类型 : " prop="goodsTpye">
                    <el-select v-model="orderForm.goodsTpye" placeholder="请选择物品类型">
                        <el-option label="请选择" value="请选择" disabled></el-option>
                        <el-option 
                        v-for="goods in goodsTpyeList"
                        :key='goods'
                        :label="goods" :value="goods"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="物品大小 : " prop="goodsSize">
                    <el-select v-model="orderForm.goodsSize" placeholder="请选择物品大小">
                        <el-option label="请选择" value="请选择" disabled></el-option>
                        <el-option 
                        v-for="size in goodsSizeList"
                        :key='size'
                        :label="size" :value="size"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="快递公司(可多选) : " prop="company">
                    <el-select v-model="orderForm.company" 
                    multiple placeholder="请选择快递公司">
                        <el-option label="请选择" value="请选择" disabled></el-option>
                        <el-option 
                        v-for="item in companyList"
                        :key='item'
                        :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="取货码(可多个) : " prop="goodsCode" >
                    <el-select
                    v-model="orderForm.goodsCode"
                    multiple
                    filterable
                    allow-create
                    default-first-option
                    no-data-text='添加方法: 回车或者选择文本'
                    placeholder="请输入取货码">
                    </el-select>
                </el-form-item> 
                <el-form-item label="发布价格(1-20元) : " prop="Price">
                    <el-input-number v-model="orderForm.Price" 
                    :precision="2" :step="1.00" :max="20" :min="1"></el-input-number>
                </el-form-item> 
                <el-form-item label="快递数量 : " prop="goodsNumber">
                    <el-input-number v-model="orderForm.goodsNumber" 
                    :step="1.00" :max="10" :min="1"></el-input-number>
                </el-form-item>  
                <el-form-item style='margin-left:0.5rem' label="备注 : " prop="remarks">
                    <el-input type="textarea" :rows="3"
                    placeholder="请输入内容..." resize='none'
                    v-model="orderForm.remarks">
                    </el-input>
                </el-form-item>  
                <el-form-item>
                    <el-button type="primary"
                     @click="submitForm('newOrder')">发布</el-button>
                    <el-button  @click="resetForm('newOrder')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import {gotoNewOrder} from './../../../assets/js/gotoNewOrder'
export default {
    data(){
        let trueGoodsNumber=(rule, value, callback) => {
            if (value !=this.$data.orderForm.goodsCode.length) {
                  callback(new Error('取货码数量和快递数量不匹配 !'));
            }else{
                callback();
            }
        };
        let trueGoodsCode=(rule, value, callback) => {
            if (value) {
                if(value.length!=this.orderForm.company.length){
                    callback(new Error('取货码和快递公司数量不匹配 !'));
                    return;
                }
                for(let i=0;i<value.length;i++){
                   if(! /^[0-9]{6}$/.test(value[i]) ){
                        callback(new Error('取货码为6位数字 !'));
                   }
                }
                callback();  
            }else{
                callback();
            }
        };
        return {
            goodsTpyeList:['生活用品','衣物','食物','数码3c','小家具','电器','箱包','乐器','其他'],
            goodsSizeList:['较小','小','一般','大','较大','非常大'],
            companyList:['顺丰','韵达','圆通','中通','申通','邮政','天天','安能','优速','京东','其他'],
            orderForm: {
                goodsTpye: '',
                goodsSize:'',
                company:[],
                goodsCode:[],
                Price:0.00,
                goodsNumber:0,
                remarks:''
            },
            rules: {
                goodsTpye: [
                    { required: true, message: '请选择物品类型', trigger: 'change' }    
                ],
                goodsSize: [
                    { required: true, message: '请选择快递大小', trigger: 'change' } 
                ],
                company:[
                    { required: true, message: '请选择快递公司', trigger: 'change' } 
                ],
                goodsCode:[
                    { required: true,message: '请输入快递取货码', trigger: 'change' },
                    { validator: trueGoodsCode, trigger: 'change'} 
                ],
                Price: [
                    { required: true, type:'number', message: '请设置发布价格', trigger: 'blur' }
                ],
                goodsNumber:[
                    { required: true, message: '请选择快递数量', trigger: 'blur' },
                    { validator: trueGoodsNumber,message: '取货码数量和快递数量不匹配 !', trigger: 'change'}
                ]
            }
      }
    },
    created() {
        this.handleIsCompInfo();
    },
    methods: {
        //如果没有完善个人信息不可以发布订单
        handleIsCompInfo(){
            let loading = this.$loading({lock:true,text:'玩命加载中...'});
            axios.get(`/users/userInformation`).then(response=>{
                let res = response.data;
                loading.close();
                if(res.status=='0'){
                    let userInfo = res.result;
                    if(!userInfo.userName || !userInfo.address){
                        this.$message({
                            message: '请先完善个人信息,便于联系您',
                            type: 'error',
                            showClose:true
                        });  
                        gotoNewOrder.$emit('goNewOrder','addInformation',1);
                        this.$router.push({ path: 'addInformation' });  
                    }
                }else{
                    console.log(res.msg);    
                }
            }).catch(err=>{
                console.log(err);
                
            })
        },
        handleNewOrder(objdata){
            let loading = this.$loading({lock:true,text:'正在发布...'});
            axios.post('/users/newOrder',objdata).then(response=>{
                let res = response.data;
                loading.close();
                if(res.status=='0'){
                    this.$message({
                        message: '恭喜你，发布成功!',
                        type: 'success'
                    });
                    gotoNewOrder.$emit('goNewOrder','currentOrder');
                    this.$router.push({ path: 'currentOrder' });  
                }else{
                    this.$message({
                        message: res.msg,
                        type: 'error'
                    });   
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$confirm(`确认填写正确, 是否支付 ${this.orderForm.Price} 元并发布订单?`, 
                        '发布订单', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'success'
                    }).then(() => {
                        let order = {
                            goodsTpye:this.orderForm.goodsTpye,
                            goodsSize:this.orderForm.goodsSize,
                            company:this.orderForm.company,
                            goodsCode:this.orderForm.goodsCode,
                            Price:this.orderForm.Price,
                            goodsNumber:this.orderForm.goodsNumber,
                            remarks:this.orderForm.remarks
                        }
                        let loading = this.$loading({lock:true,text:'正在支付...'});
                        setTimeout(()=>{
                            loading.close();
                            this.$message({
                                message: '支付成功!',
                                type: 'success'
                            });
                            this.handleNewOrder(order)
                        },600);
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消发布'
                        });          
                    });   
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>

<style lang='scss'>
.createNewOrder{
    padding-left: 5rem;
    padding-top: 2rem;
    width: 40%;
    min-width: 20rem;
}
@media only screen and (max-width:768px){
    .createNewOrder{
        width: 75%;
    }
}
</style>
