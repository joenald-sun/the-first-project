/**
 * New node file
 */

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
	extended: false
});
const mongoose = require('../utils/mongooseConnection');
const express = require('express');
const router = express.Router();
const client = require('../utils/cache.js');
//const redis = require('redis');
//var client = redis.redis_client;
//var client=redis.createClient();

/**	
 * 定义schema 的model
 */
var studentSchema = new mongoose.Schema({
	studentNo: String,
	studentName: String,
	age: {
		type: Number,
		default: 20
	},
	contact: {
		email: {
			type: String,
			default: 'baidu@gmail.com'
		},
		phone: {
			type: String,
			default: '13456479754'
		}
	}
}, {
	versionKey: false,
	collection: 'students'
});
studentSchema.add({
	address: String,
	grade: Number
});
//构建和数据库之间的紧密联系关系
const studentModel = mongoose.model('student', studentSchema);
/* GET users listing. */
//添加学生
router.get('/stuInsert', urlencodedParser, function(req, res, next) {
	var param = req.method == "POST" ? req.body : req.query || req.params;
	var stuNo = param.stuNo;
	var stuName = param.stuName;
	if(typeof(stuNo) == 'undefined' || typeof(stuName) == 'undefined') {
		res.json({
			code: '404',
			msg: '请完整输入正确的学生姓名和学号！！'
		})
	} else {
		var student = ({
			studentNo: stuNo,
			studentName: stuName,
			age: 15,
			contact: {
				email: 'gmail@163.com',
				phone: '17015246859'
			},
			address: '静安路',
			grade: 3
		});
		studentModel.insertMany([student], (err, result) => {
			if(err) {
				throw new Error();
				return;
				res.json({
					code: '-200',
					result: result
				});
			} else {
				res.json({
					code: '200',
					result: result
				});
			}
		});
	}
})
//删除学生数据
router.get('/stuDelete', urlencodedParser, function(req, res, next) {
	var param = req.method == "POST" ? req.body : req.query || req.params;
	var stuNo = param.stuNo;
	if(typeof(stuNo) == 'undefined') {
		studentModel.remove({}, (err, result) => {
			if(err)
				throw new Error();
			console.log("全部删除成功！" + res);
			res.json({
				code: '200',
				msg: '全部删除成功！'
			});
		})
	} else {
		studentModel.remove({
			studentNo: stuNo
		}, (err, result) => {
			if(err)
				throw new Error();
			console.log("单一删除成功！" + res);
			res.json({
				code: '200',
				msg: '单一删除成功！'
			})
		})
	}
});
//修改学生数据
router.get('/stuUpdate', urlencodedParser, function(req, res, next) {
	var param = req.method == "POST" ? req.body : req.query || req.params;
	var stuNo = param.stuNo;
	var stuAge = param.stuAge;
	if(typeof(stuNo) == 'undefined' || typeof(stuAge) == 'undefined') {
		res.json({
			code: '404',
			result: '请正确输入完整的查询学号和修改信息'
		});
	} else {
		studentModel.update({
			studentNo: stuNo
		}, {
			$set: {
				age: stuAge
			}
		}, (err, result) => {
			if(err) {
				throw new Error();
				res.json({
					code: '-200',
					result: '修改失败'
				})
				return;
			} else {
				res.json({
					code: '200',
					result: result
				});
			}

		})
	}
})
//获得学生数据
router.get('/stuList', urlencodedParser, function(req, res, next) {
	var param = req.method == "POST" ? req.body : req.query || req.params;
	var stuNo = param.stuNo;
	client.get('stuList').then((err,value)=>{
	    	if(err) throw err;
	    	console.log("获得的value:"+value);
	    	if(typeof(value)=='undefined'){
				console.log('********不存在的时候：************');
				studentModel.find({}, {studentNo: 1,studentName: 1,'contact.phone': 1},(err, result) => {
					if(err) {
						throw new Error();
						return;
					}
					if(result.length == 0) {
						res.json({
							code: '-200',
							msg: '根据请求没有获取到相应的数据！'
						});
					} else {
						res.json({msg:'数据已返回first',status:'200',result:result});
	//					client.set('stuList',JSON.stringify(result));
						client.set('stuList',result)
					}
				});
			}else{
				console.log('********存在的时候：************');
				if(err) throw err;
				res.json({msg:'数据已返回second',status:'200',result:value});
			
			}
	});//redis的get结束
});




//if(typeof(redisState)=='undefined'){//stuList不存在的话
//		if(typeof(stuNo) == 'undefined') {
//		studentModel.find({}, {studentNo: 1,studentName: 1,'contact.phone': 1},(err, result) => {
//			if(err) {
//				throw new Error();
//				return;
//			}
//			console.log('查询' + result);
//			if(res.length == 0) {
//				res.json({
//					code: '-200',
//					msg: '根据请求没有获取到相应的数据！'
//				});
//			} else {
//				redis.set('stuList',result);
//				//			res.json({msg:'数据已返回',status:'200',result:result});
//				res.json({
//					result: result
//				});
//
//			}
//		});
//
//	} else {
//		studentModel.find({studentNo: stuNo}, (err, result) => {
//			if(err) {
//				throw new Error();
//				return;
//			}
//			console.log('查询' + result);
//			if(res.length == 0) {
//				res.json({
//					code: '-200',
//					msg: '根据请求没有获取到相应的数据！'
//				});
//			} else {
//				redis.set('stuList',result);
//				//			res.json({msg:'数据已返回',status:'200',result:result});
//				res.json({
//					result: result
//				});
//
//			}
//		});
//	}
//	}else{//如果stuList存在的话；
//		 return  redis.get('stuList').then((err,value)=>{
//	    	if(err) throw err;
//	    	
//	    	if(!value){
//		   		res.json({ code:'-200', msg: '不存在！' }); 
//			} else { 
//				res.json({msg:'数据已返回',status:'200',result:value});
//			}
//	})
//	}

module.exports = router;