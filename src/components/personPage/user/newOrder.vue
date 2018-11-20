<template>
    <div class="newOrder">
        <person-title>我的订单 >> <em>发布订单</em></person-title>
        <div class="createNewOrder">
            <el-form :model="ruleForm" 
            :rules="rules" ref="ruleForm" 
            label-position='left'
            @submit.native.prevent
            :status-icon='true'
            label-width="7rem" class="demo-ruleForm">
                <el-form-item label="物品类型 : " prop="goodsTpye">
                    <el-select v-model="ruleForm.goodsTpye" placeholder="请选择物品类型">
                        <el-option label="请选择" value="请选择" disabled></el-option>
                        <el-option 
                        v-for="goods in goodsTpyeList"
                        :key='goods'
                        :label="goods" :value="goods"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="物品大小 : " prop="goodsSize">
                    <el-select v-model="ruleForm.goodsSize" placeholder="请选择物品大小">
                        <el-option label="请选择" value="请选择" disabled></el-option>
                        <el-option 
                        v-for="size in goodsSizeList"
                        :key='size'
                        :label="size" :value="size"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="快递公司(可多选) : " prop="company">
                    <el-select v-model="ruleForm.company" 
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
                    v-model="ruleForm.goodsCode"
                    multiple
                    filterable
                    allow-create
                    default-first-option
                    no-data-text='添加方法: 回车或者选择下方'
                    placeholder="请输入取货码">
                    </el-select>
                </el-form-item> 
                <el-form-item label="发布价格(1-20元) : " prop="Price">
                    <el-input-number v-model="ruleForm.Price" 
                    :precision="2" :step="1.00" :max="20" :min="1"></el-input-number>
                </el-form-item> 
                <el-form-item label="快递数量 : " prop="goodsNumber">
                    <el-input-number v-model="ruleForm.goodsNumber" 
                    :step="1.00" :max="10" :min="1"></el-input-number>
                </el-form-item>  
                <el-form-item style='margin-left:0.5rem' label="备注 : " prop="remarks">
                    <el-input type="textarea" :rows="3"
                    placeholder="请输入内容..." resize='none'
                    v-model="ruleForm.remarks">
                    </el-input>
                </el-form-item>  
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">发布</el-button>
                    <el-button  @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        let trueGoodsNumber=(rule, value, callback) => {
            if (value !=this.$data.ruleForm.goodsCode.length) {
                  callback(new Error('取货码数量和快递数量不匹配 !'));
            }else{
                callback();
            }
        };
        let trueGoodsCode=(rule, value, callback) => {
            if (value) {
                console.log('66');
                
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
            ruleForm: {
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
                    { validator: trueGoodsCode,message: '取货码为6位数字 !', trigger: 'change'} 
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
    methods: {
      submitForm(formName) {
        // if(this.goodsCode.length != this.goodsNumber){

        // }
        this.$refs[formName].validate((valid) => {
          if (valid) {
                console.log('提交成功!');          
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
// 取货码
// .goodsCode.el-input{
//     width: auto;
// }
</style>
