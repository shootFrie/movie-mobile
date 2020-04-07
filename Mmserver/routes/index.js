var express = require('express');
var router = express.Router();
var db = require('../utils/config');//引入数据库封装模块

/* GET home page. */
router.get('/', function(req, res, next) {
	
	//查询user_login表
	db.query('SELECT * FROM user_login', [], (results, fields) => {
		console.log(results);

		res.render('index', { title: 'Express' });
	})
	
  
});

var usersController = require('../interface/users.js');
//登陆接口...等各种接口
router.post('/login', usersController.login);
router.post('/register', usersController.register);
router.get('/verify', usersController.verify);
router.get('/logout', usersController.logout);
router.post('/getUser', usersController.getUser);
router.post('/findPassword', usersController.findPassword);


module.exports = router;
