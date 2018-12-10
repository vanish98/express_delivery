const loginRegister = resolve => require(['@cts/loginRegister/loginRegister'], resolve),
    login = resolve => require(['@cts/loginRegister/login'], resolve),
    register = resolve => require(['@cts/loginRegister/register'], resolve),
    forgotPassword = resolve => require(['@cts/loginRegister/forgotPassword'], resolve),
    appHeader = resolve => require(['@cts/appHeader'], resolve),
    appHome = resolve => require(['@cts/home/home'], resolve),
    aboutUs = resolve => require(['@cts/aboutUs/aboutUs'], resolve),
    customerService = resolve => require(['@cts/customerService/customerService'], resolve),
    suggest = resolve => require(['@cts/suggest/suggest'], resolve);

export {loginRegister ,login ,register ,forgotPassword ,
        appHeader ,appHome ,aboutUs ,customerService ,suggest }