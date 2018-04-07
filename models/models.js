/**
 * Created by lx on 2017/6/22.
 */
var setting=require('../common/config');
var mongoose=require('mongoose');
mongoose.connect('mongodb://'+setting.dbhttp+':'+setting.dbport+'/'+setting.dbname, function (err) {
    if(err) throw err;
    console.log('连接数据库成功');
});

module.exports=mongoose;