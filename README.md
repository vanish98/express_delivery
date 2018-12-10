<h1>校园闪电侠 --快递代拿服务</h1>
express_delivery

<h2>说明</h2>
<h3>主要技术 :</h3> 
<h3>vue + nodejs + mongodb</h3> <br/>
项目地址: www.bg666.xyz <br/>
<h4>测试账号:</h4> <br/>
普通用户账号:15279778477 密码:814233583 <br/>
工作人员账号:15279778478 密码:814233583 <br/>
管理员账号: ...不能给.<br/>

======由于时间紧,主要是实现功能,样式很丑,勉强看

<h3>项目经历:</h3>
该项目是我花了近一个月的原创项目,从思路到实现, 完成前端,然后用nodejs写接口,数据库用的mongodb,
到后面的服务器部署,解决跨域问题,等等,收获甚多(一路踩坑过来),<br/><br/>
<br/>+++++++++++++++
本着开源精神,贡献出来给学习阶段的朋友学习,(大佬请忽略).====<br/><br/>
由于整个项目都是我一个人单独做,而且时间特别紧,大概<em>30</em>多个页面,所以样式很丑,勉强看吧,<br/>
哈哈哈,我主要是实现基本功能.

###主要是pc端 , 移动端只是稍微做了一下兼容,勉强能看.

额...废话有点多了,讲一下如何在你电脑运行

(因为是完整项目,前后端加数据库,所以有点麻烦)<br/>
有三个目录<br/>
server       (nodejs 服务端 接口)<br/>
web          (vue 前端 界面)<br/>
mongodb      (数据库 可导入)<br/>

<h2>简单教程(要详细的说明补充在下面)</h2>

1 >>>.先clone 到你本地<br/>
==== git clone git@github.com:bgwd666/express_delivery.git

<h3>web</h3>
2 >>> 前端: 进入 web 目录下打开终端(命令窗口)
    ==== npm i  (安装依赖) <br/>
    ==== npm run dev (运行,然后浏览器打开127.0.0.1:8080) <br/>

<h3>server</h3>
3 >>> 服务端: 进入 server 目录下打开终端(命令窗口)
   ==== npm i  (安装依赖) <br/>
   ==== node ./bin/www (推荐用 pm2管理node服务,修改代码后可自动重启等等强大功能!)<br/>

    (如果用的pm2 则 === pm2 start bin/www --watch) 
<h3>mongodb</h3>
4 >>> 数据库 :
    安装 mondodb 数据库,然后导入 该 mongodb 目录的 collection .<br/>
    数据库名 要叫 express_delivery (不想用这个名字就在项目目录 server/models/ds.js 第二行结尾换你自己数据库名字).


5 >> 然后你就完整运行项目了



<h2>补充</h2>
<h4>server</h4>
node框架用的 express
node : 推荐用pm2 不然老是手动重启node服务你会疯的!<br/>
pm2     github地址: https://github.com/Unitech/PM2/  (如侵权联系删) <br/>
        结尾加 --watch (检测代码更改,自动重加载)<br/>
        pm2 logs 日志模式 看接口请求,错误什么的 <br/>

        pm2常用命令介绍(转载SunsCheung的博客)  (如侵权联系删)   
        https://blog.csdn.net/sunscheung/article/details/79171608

session
        <p>一开始用的cookie,但是可以篡改,不安全,后面用的session,<br/>但是开发阶段建议用cookie,后面开发完用session一键替换cookie,(用session是多么痛的领悟,改一下nodejs代码什么的,验证一下就失效了,想哭);<br/>
        学习地址(转载 沉沉-_-的博客) (如侵权联系删)   
        http://www.cnblogs.com/chenchenluo/p/4197181.html</p>

mongooes 
        文档地址:https://mongoosejs.com/docs/index.html <br/>
        操作数据库,上地址:<br/>
        (转载 porschev的博客) (如侵权联系删)  
        地址 https://www.cnblogs.com/zhongweiv/p/mongoose.html#mg_model

        (转载node社区 xueyou2000的帖子) (如侵权联系删)  
        https://cnodejs.org/topic/548e54d157fd3ae46b233502


<h4>数据库</h4>
安装 mongodb
    官网:https://www.mongodb.com/ (打开较慢)<br/>
    安装教程(转载 李子园的梦想 的博客) (如侵权联系删)  
    地址 https://blog.csdn.net/heshushun/article/details/77776706 <br/>

    安装教程(转载 晴天Smile 的博客) (如侵权联系删) 
    地址 https://blog.csdn.net/liang377122210/article/details/79062681 

    不想用代码可以用图形界面管理数据库
    推荐 studio 3t (或者你用其他的,你有好的也可以推荐给我呗)
    地址 https://studio3t.com/ (好像免费30天,你可以下载 "你懂得"版本) 

    图形界面导入数据库就很简单了,不多说

    代码导入数据库
    教程(转载 cloud_wh 的博客) (如侵权联系删) 
    地址 https://www.cnblogs.com/qingtianyu2015/p/5968400.html

    教程(转载 qifengdao 的博客) (如侵权联系删) 
    地址 https://blog.csdn.net/liuzhoulong/article/details/6849978