/**
 * Created by zershond on 2017/3/8.
 */

var operationDB = require('../dao/inquireInDB');

function  checkForAccount(res, account, fn) {console.log('checkForAccount')
    var _sql = 'select count(userAccount) from userinfo where userAccount=?';
    operationDB.dBOperation(res, _sql, [account], function (response) {
        if(response.code == 1){
            console.log("response.code == 1")
            if(response.result[0]["count(userAccount)"] == 0){console.log("response.result[0].count(userAccount)==0")
                console.log(JSON.stringify(response))
                fn(response);
            }
        }
    });
}

function  checkForPwd(pwd) {console.log(pwd)
    var regexp = /^[a-z0-9_-]{6,18}$/;
    var regStrong = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;
    var regMedium = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;
    var regWeak = /^(?:\d+|[a-zA-Z]+|[!@#$%^&*]+)$/;
    if(pwd.length < 8){
        return '密码长度不能小于8位';
    }else  if(regexp.test(pwd)){
        return '合法密码';
    }else {
        return '非法密码';
    }
}

function checkForPhoneNum(phone) {
    var checkCode = '';
    for(var i = 0; i < 4; i++){
        checkCode += parseInt(Math.random()*10);
    }
    console.log(checkCode);
}

function addUserFn(res, obj) {console.log('adduserfn')
    var parma = obj;
    var _sql = 'insert into userinfo (userName, userAccount, userSign, userPhoneNum, mailBox, accountPassword, sex, age) values(?,?,?,?,?,?,?,?)';
    var _parma = [parma.userName, parma.userAccount, parma.userSign, parma.userPhoneNum, parma.mailBox, parma.accountPassword, parma.sex, parma.age];
    
    operationDB.dBOperation(res, _sql, _parma, function (response) {
        res.json(response);
    })
}


module.exports = {
    checkInformation: function (res, obj) {console.log('checkInformation')
        var _this = this
        checkForAccount(res, obj.userAccount, function (response) {console.log('check account');
            if(checkForPwd(obj.accountPassword) == '合法密码'){console.log('addUser')
                _this.addUser(res, obj)
            }else{
                res.json(checkForPwd(obj.accountPassword));
            }
        })
    },
    addUser: function (res, obj) {console.log('addUser')
        addUserFn(res, obj)
    }
}