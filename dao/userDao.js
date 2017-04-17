/**
 * Created by zershond on 2017/3/8.
 */
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./userSqlMapping');

// var pool = mysql.createPool($util.extend({}, $conf.mysql));
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test2',
    port: 3306
});

var jsonWrite = function(res, ret){
    if(typeof ret === 'undefined'){console.log('faild');
        res.json({
            code: 1,
            msg: '操作失败',
        });
    }else{
        res.json(ret);
    }
};

module.exports = {
    add: function(req, res, next){
        pool.getConnection(function(err, connection){
            var param = req.query || req.parmas;
            console.log(param.id);
            //$sql.insert, [param.name, param.age]
            connection.query($sql.insert,  [param.id, param.name, param.age],
                function(err, result){
                    if(result){
                        result = {
                            code: 200,
                            msg: '添加成功'
                        };
                    }
                    jsonWrite(res, result);

                    connection.release();
                })
        })
    },

    select: function(req, res, next){
        pool.getConnection(function(err, connection){
            var param = req.query || req.param;

            connection.query('select * from userinfo', function(err, result){
                // if(result){
                // 	result = rows[0].solution;
                // }
                // jsonWrite(res, rows[0].solution);
                // console.log('The result is: ', result[0].name);
                res.json(result)
                connection.release();
            })
        })
    },

    getImg: function(req, res, next){
        pool.getConnection(function(err, connection){
            var param = req.query || req.param;

            connection.query('select url from img', function(err, result){
                // if(result){
                // 	result = rows[0].solution;
                // }
                // jsonWrite(res, rows[0].solution);
                // console.log('The result is: ', result[0].name);
                res.json(result)

                connection.release();
            })
        })
    }
}