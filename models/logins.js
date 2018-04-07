/**
 * Created by lx on 2017/6/22.
 */
var mongoose=require('./models');

var myCenterSchema=new mongoose.Schema({
    tel:String,
    username:String,
    password:String,
    birthday:String,
    sex:String,
    userdata:Array
});

var myCenterModels=mongoose.model('users',myCenterSchema);

exports.login= function (data,callback) {        //会员登录
    myCenterModels.find(data, function (err,docs) {
        callback(docs)
    })
};

exports.register= function (userList,callback) {       //会员注册
    myCenterModels.create(userList, function (err) {
        if(err){
            callback(false)
        }else{
            callback(true)
        }
    })
};

exports.deliveryData= function (data,callback) {
    var datas={cakes:data};
    myCenterModels.create(datas, function (err) {
        if(err){
            callback(false)
        }else{
            callback(true)
        }
    })
}