/**
 * Created by zershond on 2017/3/21.
 */

var express = require('express');
var router = express.Router();
var url = require('url');
var dbOpreration = require('../dao/inquireInDB');
homePage = require('../processor/homePage');

//获取首页数据
//需要参数：pageNum
router.get('/homePage', function (req, res, next) {
    var param = req.parmas || req.query;console.log("homepage");
    homePage.getHomePage(res, param.pageNum, function (result) {
        var response = {
            code: 0,
            data: result.result,
            msg: ""
        }
        res.send(response);
    })
})




/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;