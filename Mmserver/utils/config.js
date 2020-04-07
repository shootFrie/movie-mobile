//mysql 连接数据库配置文件
var mysql = require('mysql');
var dbConfig = require('./db'); //mysql 配置文件路径

var nodemailer = require('nodemailer');

//封装query
function query(sql, params, callback) {
	//每次需要时才创建连接,数据操作完成后关闭连接
	var connection = mysql.createConnection(dbConfig);
	//连接是否成功
	connection.connect((err) => {
		if(err){
			console.log('数据库连接失败');
			throw err;
		}
		//开始操作
		connection.query( sql, params, (err, results, fields) => {
			if(err){
				console.log('数据操作失败');
				throw err;
			}
			//将查询到的数据返回给回掉函数
			callback && callback(JSON.stringify(results)), JSON.parse(JSON.stringify(fields));
			//results作为数据操作后的结构,fields作为数据库连接的一些字段
			//停止连接数据库
			connection.end((err) => {
				if(err){
					console.log('关闭数据库失败');
					throw err;
				}
			});
		});
	});
}

//邮箱配置
var Email = {
	config: {
		host: "smtp.qq.email", 
		port: 587,
		auth: {
		  user: '2560909679@qq.com', 
		  pass: 'jinyanyw9512139621' 
		}
	},
	get transporter(){
		return nodemailer.createTransport(this.config);
	},
	get verify(){
		return Math.random().toString(.substring(2,6));
		// 生成随机验证码
	}
}

module.exports = {
	query,
	Email
}




