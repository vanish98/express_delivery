const wokerPage = resolve => require(['@ctsPage/woker/woker'], resolve),
    wokerAccount = resolve => require(['@ctsPage/woker/wokerAccount'], resolve),
    wokerReceivedOrder = resolve => require(['@ctsPage/woker/wokerReceivedOrder'], resolve),
    wokerHistoryOrder = resolve => require(['@ctsPage/woker/wokerHistoryOrder'], resolve),
    allUserOrderList = resolve => require(['@ctsPage/woker/allUserOrderList'], resolve);

export {wokerPage ,wokerAccount ,wokerReceivedOrder ,
        wokerHistoryOrder ,allUserOrderList }