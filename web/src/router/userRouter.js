const userPage = resolve => require(['@ctsPage/user/user'], resolve),
    userInformation = resolve => require(['@ctsPage/userInformation'], resolve),
    addInformation = resolve => require(['@ctsPage/user/addInformation'], resolve),
    currentOrder = resolve => require(['@ctsPage/user/currentOrder'], resolve),
    joinUs = resolve => require(['@ctsPage/user/joinUs'], resolve),
    newOrder = resolve => require(['@ctsPage/user/newOrder'], resolve),
    historyOrder = resolve => require(['@ctsPage/user/historyOrder'], resolve),
    myMessage = resolve => require(['@ctsPage/myMessage'], resolve);

export {userPage ,userInformation ,addInformation ,
        currentOrder ,joinUs ,newOrder ,historyOrder ,myMessage }