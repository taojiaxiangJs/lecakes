/**
 * Created by lx on 2017/6/22.
 */
var express=require('express');
var router=express.Router();
var dataModel=require('../models/lecakes');
var loginModel=require('../models/logins');
var carPayModel=require('../models/carPay');

//返回蛋糕馆页面所有数据                                       ===    models -> lecakes.js  ====
router.get('/cakePavilion',function(req,res){
    dataModel.cakePavilion(function (data) {
        res.status(200).json(data)
    })
});

//cake 详情 （返回cake详情页蛋糕的详细信息数据）               ===    models -> lecakes.js  ====
router.get('/cakeDetail',function(req,res){
    var id=req.query.id;
    dataModel.cakeDetail(id, function (data) {
       res.status(200).json(data)
    })
});

//首页 推荐cake（返回首页和购物车页面中 推荐cake 信息数据）    ===    models -> lecakes.js  ====
router.get('/cakeRecommend',function(req,res){
    dataModel.cakeRecommend(function (data) {
        res.status(200).json(data)
    })
});

//会员登录                                                     ===    models -> login.js    ====
router.post('/myCenterLogin', function (req,res) {
    var data=req.body;
    console.log('data',data);
    if(data==''){
        data=-1;
    }
    loginModel.login(data,function(docs){
        if(docs==''){
            res.status(200).json({status: false, msg: '用户名'})
            //req.session.user = {
            //    username: 'Jerry',
            //    password: '123123',
            //    age: 18,
            //    last_login_time: '2017-6-26'
            //};
            //res.send("<script>alert('用户名或密码错误');history.back()</script>");       //回到登录页
        }else{
            req.session.username = docs[0].tel;
            res.status(200).json({status:true, msg: req.session.username});
            //res.send("<script>alert('登录成功');location.href='http://localhost:3000/#/personal'</script>"); //跳转至购物车
        }
    })
});

router.get('/isLogin', function (req, res) {
    if(req.session.username !== undefined){
        res.status(200).json({status:true, msg: req.session.username});
    }else{
        res.status(200).json({status: false})
    }
});

//会员注册                                                     ===    models -> login.js    ====
router.post('/myCenterRegister', function (req,res) {
    var userList=req.body;
    var data={tel:userList.tel};
    loginModel.login(data,function(docs){
        if(docs==''){
            loginModel.register(userList, function (docs) {   //注册提交时查找 用户是否已存在
                if(docs){
                    res.send("<script>alert('注册成功');location.href='http://localhost:3000/#/login'</script>");  //跳转至登录页面
                }else{
                    res.send("<script>alert('抱歉！注册错误稍后重试！');history.back()</script>");  //返回至注册页面
                }
            })
        }else{
            res.send("<script>alert('用户已存在！');history.back()</script>");   //回到注册页面
        }
    })
});

// ===  点击购物车  发出的请求  ===
//将localstorage里面存放的ID 发送过来 并返回相应ID的相应的数据
router.post('/localstorage', function (req,res) {
    var datas=req.body;// datas=[{id:1,number:3},{id:2,number:3}]
    dataModel.cookiesCar(datas, function (data) {     //      ===    models -> lecakes.js  ====
        /*var cacheDatas=data;
        //将localstorage中的cake数据 存入cache数据表中
        carPayModel.cacheDatas(cacheDatas, function (data){// ===    models -> carPay.js   ====
            if(data){
                console.log(data)
            }
        })*/
        res.status(200).json(data)
    })
});

//====================================================================================
//====================================================================================
/*router.get('/checkLogin', function (req, res) {
    // 保存session
    req.session.num = 100;
    req.session.username = "xiaoming";
    req.session.user = {
        username: 'Jerry',
        password: '123123',
        age: 18,
        last_login_time: '2017-6-26'
    };
    res.end();
});*/

/*router.get('/getSession', function (req, res) {
    console.log(req.session);
    res.send(JSON.stringify(req.session.user));
});*/

//========================================================================================
//========================================================================================


/*
//===  点击结算时  发出的请求  ===                            ===    models -> carPay.js   ====
//点击结算时，再将购物车中 商品的数量提交过来并存入cache表中
router.post('/number', function (req,res) {
    var datasNum=req.body;     
    //主要意图是  提交对应ID cake的number数量
    for(var i=0;i<datasNum.length;i++){
        var id=datasNum[i].id;   //获取点击结算时 购物车中对应cake的ID
        var num=datasNum[i].num; //获取点击结算时 购物车中对应cake的number
        carPayModel.cacheUpdate(id,num)
    }
});*/

//===  点击结算时  发出的请求  ===                            ===    models -> carPay.js   ====
router.post('/idNumber', function (req) {
    var datas=req.body;
    for(var i=0;i<datas.length;i++){
        var id=datas[i].id;
        var number=datas[i].number;
        dataModel.cakeDetail(id, function (docs) {   //在主数据库表中查找对应的ID数据 并添加至缓存数据表中
            if(docs!=''){
                carPayModel.addId(docs)
            }
        });
        carPayModel.addNum(number)
    }
});

//登陆成功后 购物车详情页所请求的数据                         ===    models -> carPay.js   ====
router.get('/carPayDetail', function (req,res) {
    carPayModel.findAll(function (datas) {
        res.status(200).json(datas)
    })
});

//购物车详情页 提交数据
router.post('carPaydetails', function (req,res) {
    var datas=req.body;
    loginModel.deliveryData(datas, function (docs) {
        if(docs==true){
            res.send("<script>alert('提交成功！')</script>")
        }else{
            res.send("<script>alert('系统故障，请稍后再试！')</script>")
        }
    })
})




module.exports=router;
