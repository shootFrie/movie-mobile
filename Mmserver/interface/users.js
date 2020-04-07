var { Email } = require('../utils/config.js')

var login = async (req, res, next) => {
	var { username , password , email , verify } = req.body;
	
	//数据库验证
	if( email !== req.session.email || verify !== req.session.verify){
		res.send({
			msg : '验证码错误',
			status : -1
		})
	}
}

var register = async (req, res, next) => {
	
	var email = req.query.email;
	var verify = Email.verify
	
	req.session.verify = verify; //存储验证
	req.session.email = email; //存储邮箱
	
	let info = await Email.transporter.sendMail({
	    from: '测试接口成功 2560909679@qq.com',
	    to: email,
	    subject: "Hello 验证码",
	    text: "邮箱验证码" + Email.verify
	}, (err) =>{
		if(info){
			res.send({
				msg: '验证码发送失败',
				status: -1
			});
		}else{
			res.send({
				msg: '验证码发送成功',
				status: 0
			});
		}
	});
	
	
}

var verify = async (req, res, next) => {
	
}
var logout = async (req, res, next) => {
	
}
var getUser = async (req, res, next) => {
	
}
var findPassword = async (req, res, next) => {
	res.send({
		msg: '测试',
		status: 0
	})
}

module.exports = {
	login,
	register,
	verify,
	logout,
	getUser,
	findPassword
}