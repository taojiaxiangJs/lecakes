/**
 * Created by lx on 2017/6/22.
 */
var mongoose=require('./models');

var carPaySchema=new mongoose.Schema({
    id:Number,          //商品的ID
    number:Number,      //购物车中商品的数量
    name:String,
    enname:String,
    price:String,
    isRecommend:Boolean,
    isNews:Boolean,
    isBlast:Boolean,
    isHot:Boolean,
    isSign:Boolean,
    isSale:Boolean,
    isPrompt:Boolean,
    isLimit:Boolean,
    isStand:Boolean,
    images:{type:Array},
    norms:{type:Array},
    detImages:{type:Array},
    aboutFood:Array,
    aboutEat:String
});

var carPayModel=mongoose.model('caches',carPaySchema);

/*// 点击购物车时 将对应ID的cake的 所有数据存入cache表中
exports.cacheDatas= function (cacheDatas,callback) {
    carPayModel.create(cacheDatas, function (err) {
        if(err){
            callback(false);
        }else{
            callback(true);
        }
    })
};*/

/*//  在点击结算时 更新cache表中对应ID cake的number值
exports.cacheUpdate= function (id,num) {
    var idFind={id:id};
    var numset={$set:{number:num}};
    carPayModel.update(idFind,numset,{multi:true,overwrite:true},function (err) {
        if(err){
            throw err;
        }
        console.log('修改数据库成功')
    })
};*/

//点击 结算 时，将从主数据库表中查找过来的数据添加到caches表中
exports.addId= function (data) {
    carPayModel.create(data, function (err) {
        if(err){
            console.log('数据添加错误')
        }
    })
};

//点击 结算 时，将number 数添加到对应的ID cake数据中
exports.addNum= function (data) {
    var number={number:data}
    carPayModel.create(number, function (err) {
        if(err){
            console.log('数据添加错误')
        }
    })
}

//登录成功时find caches表中所有数据 并将数据返回至购物车详情页中
exports.findAll= function (callback) {
    carPayModel.find({}, function (err,docs) {
        callback(docs);
    })
}
