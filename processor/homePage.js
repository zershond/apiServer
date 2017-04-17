/**
 * Created by zershond on 2017/3/23.
 */

var dbOpreration = require('../dao/inquireInDB');

function getHomePageData(res, pageNum, fn) {
    var sql = "select * from homepagedata where pageNumber=?";
    dbOpreration.dBOperation(sql, [pageNum], function (result) {
        fn(result);
    })
}

module.exports = {
    getHomePage: function (res, pageNum, fn) {
        getHomePageData(res, pageNum, function (result) {
            fn(result);
        });
    }
}