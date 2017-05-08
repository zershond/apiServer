/**
 * Created by zershond on 2017/3/20.
 */
var operation = require('../dao/inquireInDB');


module.exports = {
   checkLoginInfo: function (res, obj) {
       var _this = this;
       var _sql = "select userId from userinfo where userAccount=?";
       operation.dBOperation(_sql, [obj.userAccount], function (response) {
            if(response.result.length == 0){
                console.log("用户不存在");
                response.code = 0;
                response.massage = "用户不存在";
                res.json(response);
            }else {
                console.log('用户存在');
                var responseObj = {
                    code: 1,
                    massage: "正在验证密码",
                    data: {
                        userId: response.result[0].userId
                    }
                };
                _this.checkPassword(res, obj.userAccount, obj.accountPassword);
            }
       })
   },
   checkPassword: function (res, userAccount, pwd) {
        var _sql = "select * from userinfo where userAccount=?";
        operation.dBOperation(_sql, [userAccount], function (response) {
            var responseObj = {
                code: 0,
                massage: "密码错误",
                data: {}
            };
            var _pwd = response.result[0].accountPassword;
            if(pwd == _pwd){
                responseObj.code = 1;
                responseObj.massage = "登录成功";
                responseObj.data.name = response.result[0].userName;
                responseObj.data.sign = response.result[0].userSign;
                responseObj.data.icon = response.result[0].userIcon;
                responseObj.data.status = response.result[0].status;
                responseObj.data.userId = response.result[0].userId;
            }
            res.json(responseObj);
        })
    }
}