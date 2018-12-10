var mongoose = require('./ds');

var userSchema = new mongoose.Schema({
  userId:{type:String,indx:true},//注册账号
  userName:String,//名字
  passWord:String,//密码
  balance:{type:Number,default:0},//余额
  alipayAccountzhiFuBao:Array,//支付宝号
  alipayAccountBankCard:Array,//银行卡号
  phoneNum:String,//联系电话
  address:String,//地址
  loginTime:String,//上次登录时间
  lastLoginTime:String,//上次登录时间
  theJoinUsTime:String,//何时成为工作人员
  regDate:String,//注册时间
  passwordQuestion:String,//密保问题
  questionAnswer:String,//密保答案
  gender:{type:Number,default:1},//性别 默认1男 0女
  grade:{type:Number,default:0},//等级 默认0 普通用户
  messages:[
    {
      title:String,
      sendTime:String,//发送时间
      cont:String,//内容
      isRead:{type:Boolean,default:false}//是否查看
    }
  ],
  wokerOrderList:[
    {
      orderId:String,//订单号
      createTime:String,//发布时间
      orderState:String,//订单状态 三种 未接单 已接单 已完成
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
      receivedDate:String,//接单时间
      completedData:String,//完成时间
    }
  ]
});

module.exports = mongoose.model("woker",userSchema);
