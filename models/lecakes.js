/**
 * Created by lx on 2017/6/22.
 */
var mongoose=require('./models');

var dataSchema=new mongoose.Schema({
    id:Number,
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

var dataModel=mongoose.model('dataDetails',dataSchema);

//查找all cake的信息 并将信息返回至蛋糕馆页面中
exports.cakePavilion= function (callback) {
    dataModel.find({}, function (err,docs) {
        callback(docs)
    })
};

//查找cake详情信息 并将信息返回至cake详情页
exports.cakeDetail= function (id,callback) {
    var condition = {id:id}
    dataModel.find(condition, function (err,docs) {
        callback(docs)
    })
};

//首页 推荐cake
exports.cakeRecommend= function (callback) {
        var isRecommend={isRecommend:true}
    dataModel.find(isRecommend, function (err,docs) {
        callback(docs)
    })
};

// 查找 前台将localstorage中存储的cake ID和number
exports.cookiesCar= function (datas,callback) {
    dataModel.find(datas, function (err,docs) {
        callback(docs)
    })
};

