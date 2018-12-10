var mongoose = require('./ds');

var userSchema = new mongoose.Schema({
  userId:{type:String,indx:true},//注册账号
  userName:String,//名字
  passWord:String,//密码
  phoneNum:String,//联系电话
  address:String,//地址
  lastLoginTime:String,//上次登录时间
  loginTime:String,//登录时间
  regDate:String,//注册时间
  passwordQuestion:String,//密保问题
  questionAnswer:String,//密保答案
  gender:{type:Number,default:1},//性别 默认1男 0女
  grade:{type:Number,default:0},//等级 默认0 普通用户
  messages:[
    {
      title:{type:String,default:'欢迎新用户'},
      cont:{
        type:String,
        default:'欢迎您注册校园闪电侠,快递代拿系统,祝您使用愉快!'
      },//内容
      sendTime:{type:String,default:Date.now},//发送时间
      isRead:{type:Boolean,default:false}//是否查看
    }
  ],
  userOrderList:[
    {
      orderId:String,//订单号
      createTime:String,//发布时间
      orderState:{type:String,default:'未接单'},//订单状态 三种 未接单 已接单 已完成
      goodsTpye:String,//物品类型
      goodsSize:String,//大小
      company:Array,//快递公司
      goodsCode:Array,//取货码
      Price:Number,//价格
      goodsNumber:Number,//快递数量
      remarks:String,//备注,
      createOrderPeople:String,//发布人员
      createOrderPeoplePhone:String,//发布人员电话 
      address:String,//联系地址 
      courierPeople:String,//接单人员
      courierPhone:String,//接单人员电话 
      receivedDate:String,//接单时间 
      completedData:String,//完成时间
    }
  ]
});

module.exports = mongoose.model("User",userSchema);
//创建模块并导出  会在mongodb产生映射 User 会映射为 users  复数 而且都是小写