/**
 * Created by zershond on 2017/3/20.
 */

var operation = require('../dao/inquireInDB');

module.exports = {
    getUserInformation: function (res, userId) {
        var _sql = "select * from userinfo where userId=?";
        operation.dBOperation(_sql, [userId], function (response) {
            res.json(response);
        })
    }
}