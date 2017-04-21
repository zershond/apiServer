var express = require('express');
var router = express.Router();

var url = require('url');
var userDao = require('../dao/userDao');
var register = require('../processor/registration');
var login = require('../processor/login');
var getInfo = require('../processor/getUserInfo');

//用户注册
router.post('/addUser', function(req, res, next){
    var param = req.body || req.parmas;console.log(param.userAccount);
    register.checkInformation(res, param)
});
//检查账号是否可用
router.get('/checkAccount', function (req, res, next) {
    var param = req.parmas || req.query;
    register.checkAccount(res, param);
})

//用户登录
//需要参数：userAccount，accountPassword
router.get('/login', function(req, res, next){
    var param = req.parmas || req.query;
    login.checkLoginInfo(res, param);
});

//获取用户信息
router.get('/getUserInformation', function (req, res, next) {
    var param = req.parmas || req.query;
    getInfo.getUserInformation(res, param.userId)
})


router.get('/select', function(req, res, next){
    userDao.select(req,res,next);
});
router.get('/register', function (req, res, next) {
    register.checkInformation(res, {account: 'Janny'});
});


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
