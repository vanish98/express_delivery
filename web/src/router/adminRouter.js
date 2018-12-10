const adminLogin =  resolve => require(['@ctsAdmin/admin_login'], resolve),
    adminPage =  resolve => require(['@ctsAdmin/adminPage'], resolve),
    findPeople =  resolve => require(['@ctsAdmin/allPerson/findPeople'], resolve),
    allUser =  resolve => require(['@ctsAdmin/allPerson/allUser'], resolve),
    allWoker =  resolve => require(['@ctsAdmin/allPerson/allWoker'], resolve),
    findOneOrder =  resolve => require(['@ctsAdmin/allOrder/findOneOrder'], resolve),
    allNotReceiveOrder =  resolve => require(['@ctsAdmin/allOrder/allNotReceiveOrder'], resolve),
    allReceivedOrder =  resolve => require(['@ctsAdmin/allOrder/allReceivedOrder'], resolve),
    allHistoryOrder =  resolve => require(['@ctsAdmin/allOrder/allHistoryOrder'], resolve),
    sendMessage =  resolve => require(['@ctsAdmin/message/sendMessage'], resolve),
    joinUsApply =  resolve => require(['@ctsAdmin/joinUS/joinUsApply'], resolve),
    joinUsHistoryApply =  resolve => require(['@ctsAdmin/joinUS/joinUsHistoryApply'], resolve),
    suggestList =  resolve => require(['@ctsAdmin/suggestList'], resolve);

export {adminLogin ,adminPage ,findPeople ,allUser ,allWoker ,findOneOrder ,allNotReceiveOrder ,
        allReceivedOrder ,allHistoryOrder ,sendMessage ,joinUsApply ,joinUsHistoryApply ,suggestList}