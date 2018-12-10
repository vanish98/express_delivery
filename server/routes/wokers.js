var express = require('express');
var router = express.Router();
var Woker = require('./../models/woker');
var User = require('./../models/user');
require('./../public/js/dateInit')
function errTip(res,errmsg=err.message){
    res.json({
      status:"1",
      msg:errmsg,
      result:''
    });
}
//用户余额
router.get('/balance', (req, res, next)=> {
    let userId = req.session.userId;
    Woker.findOne({userId:userId},(err,doc)=>{
         if(err){
           errTip(res);
         }else{
             if(!doc){
               errTip(res,'用户不存在');
               return
             }
             res.json({
               status:"0",
               msg:'',
               result:{
                   balance:doc.balance,
                   alipayAccountzhiFuBao:doc.alipayAccountzhiFuBao,
                   alipayAccountBankCard:doc.alipayAccountBankCard
               }
             }) 
         }              
     });
 });

//用户提现
router.post('/cashWithDraw', (req, res, next)=> {
    var param = {
        alipayType:req.body.alipayType,
        alipayAccount:req.body.alipayAccount,
        WithDrawNum:req.body.WithDrawNum
    }
    Woker.findOne({userId:req.session.userId},(err,doc)=>{
    if(err){
        errTip(res);
    }else{
        if(!doc){
            errTip(res,"用户不存在");
            return 
        }else{
            if(param.alipayType=='支付宝'){
                let flag =doc.alipayAccountzhiFuBao.every(it=>it.value!=param.alipayAccount);
                flag && doc.alipayAccountzhiFuBao.push({value:param.alipayAccount});
            }else if(param.alipayType=='银行卡'){
                let flag =doc.alipayAccountBankCard.every(it=>it.value!=param.alipayAccount);
                flag && doc.alipayAccountBankCard.push({value:param.alipayAccount});
            }

            if(param.WithDrawNum > doc.balance){
                errTip(res,'提现金额大于余额!');
            }else{
                doc.balance -= Number.parseInt(param.WithDrawNum);
            }
            doc.save((err1,doc1)=>{
                if(err1){
                    errTip(res);
                }else{        
                    res.json({
                    status:"0",
                    msg:'',
                    result:''
                    }) ;
                }              
            });
        }  
    }
    });
});

//工作人员 接单大厅 所有普通用户的未接订单           
router.get('/allUserOrder', (req, res, next)=> {
    User.find({},(err,doc)=>{
         if(err){
           errTip(res);
         }else{
             if(!doc){
               errTip(res,'没有订单或者获取异常');
               return
             }
             let order = doc.filter(it=>it.userOrderList.length);
             let orderList = [];
             order.forEach(item=>{
                 var arr = item.userOrderList.filter(it=>it.orderState=='未接单');
                 arr.length && (orderList=[...orderList,...arr]);
             })
             res.json({
               status:"0",
               msg:'',
               result:orderList
             }); 
         }              
     });
 });

//接单大厅中 接收订单  
router.post('/receiveOrder', (req, res, next)=> {
    let param = req.body;
    Woker.findOne({userId:req.session.userId},(err,wokerdoc)=>{
         if(err){
           errTip(res);
         }else{
             if(!wokerdoc){
               errTip(res,'用户不存在!');
               return
             }
             let receiveTime = new Date().Format('yyyy-MM-dd hh:mm:ss');
             param.orderState = '已接单';
             param.receivedDate = receiveTime;
             wokerdoc.wokerOrderList.push(param);
             wokerdoc.save((err1,wokerdoc1)=>{
                if(err1){
                    errTip(res,'工作人员数据保存失败');
                }else{        
                    User.findOne({
                        phoneNum:param.createOrderPeoplePhone,
                        userName:param.createOrderPeople
                       },(err2,userdoc)=>{
                           if(err2){
                               errTip(res,'该订单用户数据读取失败');
                           }else{
                              if(!userdoc){
                                errTip(res,'该订单用户不存在或者查询失败!');
                                return
                              }
                              userdoc.userOrderList.forEach(it=>{
                                  if(it.orderId == param.orderId){
                                      it.orderState='已接单';
                                      it.courierPeople = wokerdoc.userName;
                                      it.courierPhone = wokerdoc.phoneNum;
                                      it.receivedDate = receiveTime;
                                  }
                              });
                              userdoc.save((err1,userdoc1)=>{
                                if(err1){
                                    errTip(res,'该订单用户数据保存失败!');
                                }else{  
                                     res.json({
                                       status:"0",
                                       msg:'',
                                       result:''
                                     }) 
                                }
                              });
                           }
                    });
                }              
             });
         }              
     });
 });

 //工作人员 已接订单  
 router.get('/theReceivedOrder', (req, res, next)=> {
    Woker.findOne({userId:req.session.userId},(err,doc)=>{
         if(err){
           errTip(res);
         }else{
             if(!doc){
               errTip(res,'用户不存在!');
               return
             }
             let received = doc.wokerOrderList.filter(it=>it.orderState=='已接单');
             res.json({
               status:"0",
               msg:'',
               result:received
             }); 
         }              
     });
 });

 //已接订单页 点击完成订单  
 router.post('/completedOrde', (req, res, next)=> {
    let orderData = req.body;
    User.findOne({
        userName:orderData.createOrderPeople,
        phoneNum:orderData.createOrderPeoplePhone
    },(err,doc)=>{
         if(err){
           errTip(res);
         }else{
             if(!doc){
               errTip(res,'用户不存在!');
               return
             }
             let sendTime = new Date().Format('yyyy-MM-dd hh:mm:ss');
             let message = {
                "title" : `送单员申请完成订单(${sendTime})`,
                "cont" : `送单员已经申请完成订单,您是否收到快递? 
                          收到快递则可在 我的订单>>当前订单 选择确认送达.
                          很高兴为您服务,欢迎再次使用`, 
                "sendTime" : sendTime
             }
             doc.messages.push(message);
             doc.save((err1,doc1)=>{
                if(err1){
                    errTip(res,'该订单发布人员数据保存失败');
                }else{   
                    res.json({
                        status:"0",
                        msg:'',
                        result:''
                    }); 
                }
             });
         }              
     });
 });

 //历史订单 
 router.get('/historyOrder', (req, res, next)=> {
    Woker.findOne({userId:req.session.userId},(err,doc)=>{
         if(err){
           errTip(res);
         }else{
             if(!doc){
               errTip(res,'用户不存在!');
               return
             }
             let history = doc.wokerOrderList.filter(it=>it.orderState=='已完成');
             res.json({
               status:"0",
               msg:'',
               result:history
             }); 
         }              
     });
 });

 //历史订单中 删除订单 删除后不可恢复 deleteOrder
 router.post('/deleteHistoryOrder', (req, res, next)=> {
    let orderId = req.body.orderId;
        Woker.update({
          userId:req.session.userId
        },{
            $pull:{
                wokerOrderList:{
                orderId:orderId,
                orderState:'已完成'
              }
            }
        },(err,doc)=>{
            if(err){
              errTip(res);
            }else{
                if(doc.nModified){ //删除数量不为0
                    res.json({
                      status:"0",
                      msg:'',
                      result:''
                    })
                }else{
                  errTip(res,'删除失败,未知错误');
                }
            }              
        });
  });
module.exports = router;