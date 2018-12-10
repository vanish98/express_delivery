var express = require('express');
var router = express.Router();
var Woker = require('./../models/woker');
var User = require('./../models/user');
var Admin = require('./../models/admin');
require('./../public/js/dateInit')
function errTip(res,errmsg=err.message){
    res.json({
      status:"1",
      msg:errmsg,
      result:''
    });
}
//登录管理员
router.post('/login', (req, res, next)=> {
  var param = {
    adminId:req.body.adminId,
    adminPassWord:req.body.adminPassWord
  }
  Admin.findOne(param,(err,doc)=>{
      if(err){
        errTip(res);
      }else{
          if(!doc){
            errTip(res,'用户不存在');
            return
          }
          req.session.adminId = doc.adminId;
          req.session.adminName = doc.adminName;
          res.json({
            status:"0",
            msg:'',
            result:''
          }) 
      }              
});
});

//检测管理员是否登录
router.get("/checkLogin", function (req,res,next) {
  if(req.session.adminId){
      res.json({
        status:'0',
        msg:'',
        result:req.session.adminName
      });
  }else{
    res.json({
      status:'1',
      msg:'未登录',
      result:''
    });
  }
});

//管理员退出
router.post("/logout", function (req,res,next) {
    req.session.adminId=null;
    res.json({
      status:"0",
      msg:'',
      result:''
    })         
});

//获取所有普通用户
router.get('/allUser', (req, res, next)=> {
   User.find({},(err,doc)=>{
         if(err){
           errTip(res);
         }else{
             if(!doc){
               errTip(res,'没有用户数据');
               return
             }
             let userList = [];
             doc.forEach(it=>{
                 userList.push({
                   userName:it.userName,
                   gender:it.gender, 
                   grade:it.grade,
                   phoneNum:it.phoneNum,
                   address:it.address,
                   lastLoginTime:it.lastLoginTime,
                   regDate:it.regDate,
                   userId:it.userId,
                   passwordQuestion : it.passwordQuestion, 
                   questionAnswer : it.questionAnswer,
                   OrderNUm:it.userOrderList.length
                 });
             })
             res.json({
               status:"0",
               msg:'',
               result:userList
             }) 
         }              
     });
 });
 
 //获取所有工作人员
router.get('/allWoker', (req, res, next)=> {
  Woker.find({},(err,doc)=>{
        if(err){
          errTip(res);
        }else{
            if(!doc){
              errTip(res,'没有用户数据');
              return
            }
            let wokerList = [];
            doc.forEach(it=>{
               wokerList.push({
                  userName:it.userName,
                  gender:it.gender, 
                  grade:it.grade,
                  balance : it.balance, 
                  phoneNum:it.phoneNum,
                  address:it.address,
                  lastLoginTime:it.lastLoginTime,
                  regDate:it.regDate,
                  userId:it.userId,
                  passwordQuestion : it.passwordQuestion, 
                  questionAnswer : it.questionAnswer,
                  OrderNUm:it.wokerOrderList.length,
                  alipayAccountzhiFuBao:it.alipayAccountzhiFuBao,
                  alipayAccountBankCard:it.alipayAccountBankCard
                });
            })
            res.json({
              status:"0",
              msg:'',
              result:wokerList
            }) 
        }              
    });
});

//查找用户  findPeople
router.post('/findPeople', (req, res, next)=> {
  let param = {
    userId:req.body.userId,
    grade:req.body.grade
   }
   if(param.grade==0){
        User.findOne({userId:param.userId},(err,doc)=>{
              if(err){
                errTip(res);
              }else{
                  if(!doc){
                    errTip(res,'用户不存在');
                    return
                  }
                  res.json({
                    status:'0',
                    msg:'',
                    result:[{
                      userName:doc.userName,
                      gender:doc.gender, 
                      grade:doc.grade,
                      phoneNum:doc.phoneNum,
                      address:doc.address,
                      lastLoginTime:doc.lastLoginTime,
                      regDate:doc.regDate,
                      userId:doc.userId,
                      passwordQuestion : doc.passwordQuestion, 
                      questionAnswer : doc.questionAnswer,
                      OrderNUm:doc.userOrderList.length
                    }]
                  })
              }              
        });
   }else if(param.grade==1){
        Woker.findOne({userId:param.userId},(err,doc)=>{
              if(err){
                errTip(res);
              }else{
                  if(!doc){
                    errTip(res,'用户不存在');
                    return
                  }
                  res.json({
                    status:'0',
                    msg:'',
                    result:[{
                      userName:doc.userName,
                      gender:doc.gender, 
                      grade:doc.grade,
                      balance : doc.balance, 
                      phoneNum:doc.phoneNum,
                      address:doc.address,
                      lastLoginTime:doc.lastLoginTime,
                      regDate:doc.regDate,
                      userId:doc.userId,
                      passwordQuestion : doc.passwordQuestion, 
                      questionAnswer : doc.questionAnswer,
                      OrderNUm:doc.wokerOrderList.length,
                      alipayAccountzhiFuBao:doc.alipayAccountzhiFuBao,
                      alipayAccountBankCard:doc.alipayAccountBankCard
                    }]
                  })
              }              
        });
   }
      
});

//获取所有未接订单
router.get('/allNotReceiveOrder', (req, res, next)=> {
  User.find({},(err,doc)=>{
        if(err){
          errTip(res);
        }else{
            if(!doc){
              errTip(res,'没有订单数据');
              return
            }
            let NotReceiveOrder = [];
            doc.forEach(it=>{
                let notRec =it.userOrderList.filter(item=>item.orderState=='未接单');
                NotReceiveOrder=[...NotReceiveOrder,...notRec];
            })
            res.json({
              status:"0",
              msg:'',
              result:NotReceiveOrder
            }) 
        }              
    });
});

//获取所有已接订单
router.get('/allReceiveOrder', (req, res, next)=> {
  User.find({},(err,doc)=>{
        if(err){
          errTip(res);
        }else{
            if(!doc){
              errTip(res,'没有订单数据');
              return
            }
            let ReceiveOrder = [];
            doc.forEach(it=>{
                let RecOrder =it.userOrderList.filter(item=>item.orderState=='已接单');
                ReceiveOrder=[...ReceiveOrder,...RecOrder];
            })
            res.json({
              status:"0",
              msg:'',
              result:ReceiveOrder
            }) 
        }              
    });
});

//获取所有历史订单 
router.get('/allHistoryOrder', (req, res, next)=> {
  User.find({},(err,doc)=>{
        if(err){
          errTip(res);
        }else{
            if(!doc){
              errTip(res,'没有订单数据');
              return
            }
            let historyOrder = [];
            doc.forEach(it=>{
                let hisOrder =it.userOrderList.filter(item=>item.orderState=='已完成');
                historyOrder=[...historyOrder,...hisOrder];
            })
            res.json({
              status:"0",
              msg:'',
              result:historyOrder
            }) 
        }              
    });
});

//查找订单  
router.post('/searchOrder', (req, res, next)=> {
  let param = {
    condition:req.body.condition,
    answers:req.body.answers
   }
  if(param.condition=='订单号'){
      User.findOne({"userOrderList.orderId":param.answers},(err,doc)=>{
          if(err){
            errTip(res);
          }else{
              if(!doc){
                errTip(res,'没有订单数据');
                return
              }
              let resOrder = doc.userOrderList.filter(it=>it.orderId==param.answers);
              res.json({
                status:"0",
                msg:'',
                result:resOrder
              }) 
          }              
      });
  }else{
        let Who=null, whatOrderList ='';
        if(param.condition=='工作人员id'){
            Who = Woker; whatOrderList = "wokerOrderList";
        }else{
           Who = User; whatOrderList = "userOrderList";
        }
        Who.findOne({userId:param.answers},(err,doc)=>{
            if(err){
              errTip(res);
            }else{
                if(!doc){
                  errTip(res,'没有订单数据');
                  return
                }
                res.json({
                  status:"0",
                  msg:'',
                  result:doc[whatOrderList]
                }) 
            }              
        });
  }
  
});

//发送消息   (需要判断的有点多)
router.post('/sendMessage', (req, res, next)=> {
  let param = {
    msgWho:req.body.msgWho,
    userId:req.body.userId,
    msgTitle:req.body.msgTitle,
    remarks:req.body.remarks,
    msgOneGrade:req.body.msgOneGrade,
    msgAllList:req.body.msgAllList
   }
   let sendMsgTime = new Date().Format('yyyy-MM-dd hh:mm:ss');
   function sendMsg(Who, allOrOne ,condition ,fn){
      let flag=true;
      if(allOrOne=='all'){
          Who.find(condition,(err,doc)=>{
                  if(err){
                    errTip(res);
                  }else{
                      if(!doc){
                        errTip(res,'用户不存在或异常');
                        return
                      }
                      doc.forEach(it=>{
                        it.messages.push({
                          "title" : `${param.msgTitle}(${sendMsgTime})`, 
                          "cont" : param.remarks, 
                          "sendTime" : sendMsgTime 
                        })
                      })
                      doc.forEach(it=>{
                          it.save((err1,doc1)=>{
                              if(err1){
                                flag =false;
                                return
                              }
                          });
                      })
                      if(flag){
                          if(fn){
                             fn();
                          }else{
                              res.json({
                                status:'0',
                                msg:'',
                                result:''
                              })
                          }
                      }else{
                        errTip(res,"保存用户消息出错");
                      }
                      
                      
                  }              
            });
      }else if(allOrOne=='one'){
         Who.findOne(condition,(err,doc1)=>{
                if(err){
                  errTip(res);
                }else{
                    if(!doc1){
                      errTip(res,'用户不存在或异常');
                      return
                    }
                    doc1.messages.push({
                      "title" : `${param.msgTitle}(${sendMsgTime})`, 
                      "cont" : param.remarks, 
                      "sendTime" : sendMsgTime 
                    });
                    doc1.save((err2,doc2)=>{
                        if(err2){
                          errTip(res,'保存该用户消息失败');
                        }else{
                            res.json({
                              status:'0',
                              msg:'',
                              result:''
                            })
                        }
                    });
                }              
          });
      }  
   }
   if(param.msgWho=='all'){
      let len = param.msgAllList.length;
        if(len==1 && param.msgAllList[0]==0){
            sendMsg(User, 'all' ,{});
        }else if(len==1 && param.msgAllList[0]==1){
            sendMsg(Woker, 'all' ,{});    
        }else{
            sendMsg(User, 'all' ,{},()=>{
              sendMsg(Woker, 'all' ,{});
            });
        }
   }else if(param.msgWho=='one'){
        if(param.msgOneGrade==1){
          sendMsg(Woker, 'one' ,{userId:param.userId});
        }else{
          sendMsg(User, 'one' ,{userId:param.userId});
        }
   }
      
});

// 加入我们申请  只往我的管理员账号写入
router.post('/joinUsApply', (req, res, next)=> {
    let userId = req.body.userId ,
        applyTime = new Date().Format('yyyy-MM-dd hh:mm:ss');
    User.findOne({userId:userId},(err,userdoc)=>{
          if(err){
            errTip(res);
          }else{
              if(!userdoc){
                errTip(res,'用户不存在');
                return
              }
              Admin.findOne({adminId:"15279778477"},(err1,admindoc)=>{
                  if(err1){
                    errTip(res);
                  }else{
                      //是不是第一次申请 
                      let firstApply = admindoc.joinUsApplyList.every(it=>it.userId!=userId && !it.isHandle),
                          isHandleThenApply = admindoc.joinUsApplyList.filter(it=>it.userId==userId && it.isHandle);
                          //如果已处理还可以申请
                      // if(isHandleThenApply.length){
                                        //这里保存失败错误 
                                          // isHandleThenApply[0]=Object.assign(isHandleThenApply[0],{
                                          //   lastLoginTime:userdoc.lastLoginTime,
                                          //   applyTime:applyTime,
                                          //   applycount:userdoc.applycount+1,
                                          //   OrderNUm:userdoc.userOrderList.length,
                                          //   isHandle : false
                                          // })
                                          // admindoc.joinUsApplyList.forEach(it=>{
                                          //     if(it.userId==userId){
                                          //         it = {...it,...{
                                          //             lastLoginTime:userdoc.lastLoginTime,
                                          //             applyTime:applyTime,
                                          //             applycount:userdoc.applycount+1,
                                          //             OrderNUm:userdoc.userOrderList.length,
                                          //             isHandle : false
                                          //           }}
                                          //     }
                                          // })
                                          //这样会保存失败
                                        //    admindoc.joinUsApplyList.forEach(it=>{
                                        //     if(it.userId==userId){
                                        //       it.lastLoginTime =userdoc.lastLoginTime;
                                        //       it.applyTime =applyTime;
                                        //       it.applycount =userdoc.applycount+1;
                                        //       it.OrderNUm =userdoc.userOrderList.length;
                                        //       it.isHandle = false;
                                        //     }
                      //                   // })
                      //     admindoc.save((err2,admindoc2)=>{
                      //       if(err2){
                      //         errTip(res,'重新申请保存数据失败');
                      //       }else{
                      //         res.json({
                      //           status:"0",
                      //           msg:'',
                      //           result:''
                      //         }) 
                      //       }
                      //   });
                      // }else 
                      if(firstApply){
                              admindoc.joinUsApplyList.push({
                                  userName:userdoc.userName,
                                  gender:userdoc.gender, 
                                  grade:userdoc.grade,
                                  phoneNum:userdoc.phoneNum,
                                  address:userdoc.address,
                                  lastLoginTime:userdoc.lastLoginTime,
                                  regDate:userdoc.regDate,
                                  userId:userdoc.userId,
                                  applyTime:applyTime,
                                  applycount:1,
                                  passwordQuestion : userdoc.passwordQuestion, 
                                  questionAnswer : userdoc.questionAnswer,
                                  OrderNUm:userdoc.userOrderList.length
                              });
                              admindoc.save((err3,admindoc3)=>{
                                  if(err3){
                                    errTip(res,'首次保存数据失败');
                                  }else{
                                    res.json({
                                      status:"0",
                                      msg:'',
                                      result:''
                                    }) 
                                  }
                              });
                      }else{
                        errTip(res,'您已经申请过啦!  请耐心等待管理员审核哦.');
                      }
                      
                  }
              });
          }              
      });
});

//加入我们申请列表
router.get('/joinUsApplyList', (req, res, next)=> {
  Admin.findOne({adminId:req.session.adminId},(err,doc)=>{
        if(err){
          errTip(res);
        }else{
            if(!doc){
              errTip(res,'没有用户数据');
              return
            }
            let applyList = doc.joinUsApplyList.filter(it=>!it.isHandle);
            res.json({
              status:"0",
              msg:'',
              result:applyList
            }) 
        }              
    });
});

//加入我们申请 历史记录
router.get('/joinUsHistoryApply', (req, res, next)=> {
  Admin.findOne({adminId:req.session.adminId},(err,doc)=>{
        if(err){
          errTip(res);
        }else{
            if(!doc){
              errTip(res,'没有用户数据');
              return
            }
            let applyList = doc.joinUsApplyList.filter(it=>it.isHandle);
            res.json({
              status:"0",
              msg:'',
              result:applyList
            }) 
        }              
    });
});

//删除加入我们申请的 历史申请  
router.get('/DeleteHistoryApply', (req, res, next)=> {
  let userId = req.query.userId;
  Admin.update({
    adminId:req.session.adminId
  },{ $pull:{
    joinUsApplyList:{
        userId:userId,
        isHandle:true
        }
      }
    },(err,doc)=>{ 
        if(err){
          errTip(res);
          return
        }
        if(doc.nModified){ //删除数量不为0
            res.json({
              status:"0",
              msg:'',
              result:''
            })
        }else{
          errTip(res,'删除错误,请重试!');
        }
                     
    });
});

//同意加入我们申请 成为工作人员  ...回调地狱 层级复杂  应该用async 或者promise等等
router.post('/agreeJoinUsApply', (req, res, next)=> {
  let userId = req.body.userId ,
  joinUsTime = new Date().Format('yyyy-MM-dd hh:mm:ss');
  User.findOne({userId:userId},(err,userdoc)=>{
        if(err){
          errTip(res);
        }else{
            if(!userdoc){
              errTip(res,'用户不存在');
              return
            }
            let wokerData ={
                userName:userdoc.userName,
                gender:userdoc.gender, 
                grade:1,
                phoneNum:userdoc.phoneNum,
                address:userdoc.address,
                lastLoginTime:userdoc.lastLoginTime,
                regDate:userdoc.regDate,
                userId:userdoc.userId,
                passWord:userdoc.passWord,
                passwordQuestion : userdoc.passwordQuestion, 
                questionAnswer : userdoc.questionAnswer,
                theJoinUsTime:joinUsTime
            }
            let message ={
                "title" : `恭喜成为工作人员!(${joinUsTime})`, 
                "cont" : `您的申请在 ${joinUsTime} 被管理员审核通过,
                欢迎成为我们的一员!您可以在 接单大厅>>订单列表 中选择你
                想接受的订单,然后完成配送,用户确认后你就可以获得收益,在
                个人中心 >>我的钱包 中查看余额等操作.
                感谢您的加入, 祝您生活愉快!`, 
                "sendTime" : joinUsTime
            }
            let newWoker = new Woker(wokerData);
            newWoker.messages.push(message);
            newWoker.save((err3,doc3)=>{
                  if(err3){
                    errTip(res,"保存用户数据过程出错");
                  }else{
                    //设置该申请为已处理,及一些信息
                        Admin.findOne({adminId:req.session.adminId},(err1,admindoc)=>{
                              if(err1){
                                errTip(res);
                              }else{
                                admindoc.joinUsApplyList.forEach(it=>{
                                    if(it.userId==userId){
                                      it.isHandle = true;
                                      it.handleTime = joinUsTime;
                                      it.isJoinUsOk = true;
                                    }
                                });
                                admindoc.save((err2,admindoc1)=>{
                                    if(err2){
                                      errTip(res,'保存数据失败');
                                    }else{
                                      User.remove({userId:userId},(err4,doc4)=>{
                                          if(err4){
                                            errTip(res,'删除用户原数据失败');
                                          }else{
                                              res.json({
                                                status:"0",
                                                msg:'',
                                                result:''
                                              }) 
                                          }
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

//不同意加入我们  
router.post('/disagreeJoinUsApply', (req, res, next)=> {
  let userId = req.body.userId ,
  theTime = new Date().Format('yyyy-MM-dd hh:mm:ss');
  User.findOne({userId:userId},(err,userdoc)=>{
        if(err){
          errTip(res);
        }else{
            if(!userdoc){
              errTip(res,'用户不存在');
              return
            }
            let message ={
                "title" : `审核未通过!(${theTime})`, 
                "cont" : `很抱歉,您的申请被管理员拒绝,
                您可以多使用我们的产品,然后再尝试申请.
                很遗憾此次未能让您加入我们, 祝您生活愉快!`, 
                "sendTime" : theTime
            }
            userdoc.messages.push(message);
            userdoc.save((err3,doc3)=>{
                  if(err3){
                    errTip(res,"保存用户数据过程出错");
                  }else{
                      //设置该申请为已处理,及一些信息
                      Admin.findOne({adminId:req.session.adminId},(err1,admindoc)=>{
                            if(err1){
                              errTip(res);
                            }else{
                              admindoc.joinUsApplyList.forEach(it=>{
                                  if(it.userId==userId){
                                    it.isHandle = true;
                                    it.handleTime = theTime;
                                    it.isJoinUsOk = false;
                                  }
                              });
                              admindoc.save((err2,admindoc1)=>{
                                  if(err2){
                                    errTip(res,'保存数据失败');
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
//投诉建议  
router.post('/submitSuggest', (req, res, next)=> {
    let param = {
      userName:req.body.userName,
      phoneNum:req.body.phoneNum,
      suggestText:req.body.suggestText 
    }
    if(!Object.keys(param)){
      res.json({
        status:"1",
        msg:'内容不能为空!',
        result:''
      }) 
      return
    }
    Admin.findOne({adminId:"15279778477"},(err1,admindoc)=>{
        if(err1){
          errTip(res);
        }else{
        let sendMsgTime = new Date().Format('yyyy-MM-dd hh:mm:ss');          
            admindoc.suggestList.push({
              userName:param.userName,
              phoneNum:param.phoneNum,
              suggestText:param.suggestText,
              submitTime:sendMsgTime
            });
            admindoc.save((err2,admindoc1)=>{
                if(err2){
                  errTip(res,'保存数据失败');
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
});

//获取投诉建议列表
router.get('/suggestList', (req, res, next)=> {
  Admin.findOne({adminId:req.session.adminId},(err,doc)=>{
        if(err){
          errTip(res);
        }else{
            if(!doc){
              errTip(res,'没有用户数据');
              return
            }
            res.json({
              status:"0",
              msg:'',
              result:doc.suggestList
            }) 
        }              
    });
});
 module.exports = router;