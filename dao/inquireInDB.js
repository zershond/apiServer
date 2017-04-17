/**
 * Created by zershond on 2017/3/8.
 */
var mysql = require('mysql');

var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test2',
    port: 3306
});

module.exports = {
    dBOperationAddUser: function (res, _sql, parmaArr) {console.log('AddUser')
        var returnResult = {
            code: 1,
            massage: ''
        };
        pool.getConnection(function (err, connection) {
            connection.query(_sql, parmaArr, function (err, result) {console.log('pool.getConnection')
                if(!result){console.log('!result')
                    returnResult = {
                        code: -1,
                        massage: err
                    }
                }else{console.log('result')
                    returnResult.result = result;
                }

                connection.release();
            })
        })
    },
    dBOperation: function (_sql, parmaArr, fn) {console.log('dBOperation');
        var resultResult = {
            code: 1,
            massage: ''
        };
        pool.getConnection(function (err, connection) {
            connection.query(_sql, parmaArr, function (err, result) {
                if(!result){
                    resultResult = {
                        code: -1,
                        massage: err
                    }
                }else {
                    resultResult.result = result;
                }
                fn(resultResult);
                connection.release();
                console.log('connection.release()')
            })
        })

    }
}