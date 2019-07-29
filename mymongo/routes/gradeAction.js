/**
 * New node file
 */

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const mongoose=require('../utils/mongooseConnection');
const express = require('express');
const router = express.Router();
const mongooser=require('mongoose');

/**	
 * 定义schema 的model
 */
var gradeSchema = new mongoose.Schema({
//	_id:String,
	gradeNo:Number,
	gradeName:String
},
{versionKey:false,collection:'grades'});

//构建和数据库之间的紧密联系关系
const gradeModel=mongoose.model('grades',gradeSchema);
/* GET users listing. */
//添加数据
router.get('/gradeInsert',urlencodedParser,function(req,res,next){
	var param = req.method == "POST"?req.body:req.query || req.params;
	var gradeIder=param.id
//	var gradeNo=mongooser.Types.ObjectId.isValid(object.format(param.no));
//	var gradeNo=mongoose.Types.ObjectId(param.no)
	var gradeNameer=param.name;
	
	if(typeof(gradeIder)=='undefined'||typeof(gradeNameer)=='undefined'){
		res.json({code:'404',result:'请正确输入完整的查询和修改信息'});
	}else{
		var gradeer=new Array({
			gradeNo:gradeIder,
			gradeName:gradeNameer
		});
		console.log("正常传过来的值："+gradeIder+","+gradeNameer);
//		var gradd=new gradeModel({'gradeNo':gradeId,'gradeName':gradeName});
//		
//		gradd.save(function(err,result){
//			if(err){
//				res.json({code:'-200',result:result})
//				return console.error(err);
//			}
//			res.json({code:'200',result:result})
//			console.log('新增的结果：'+JSON.stringify(result))
//		})
		gradeModel.insertMany(gradeer,(err,result)=>{
			if(err){
				throw new  Error();
				return;
				res.json({code:'-200',result:result});
			}else{
				res.json({code:'200',result:result});
				console.log("新增之后的效果："+JSON.stringify(result));
			}
		});
	}
})
//删除数据
router .post('/gradeDelete',urlencodedParser,function(req,res,next){
	var param = req.method == "POST"?req.body:req.query || req.params;
	var gradeNoer=param.id;
	console.log("删除传值："+gradeNoer)
	if(typeof(gradeNoer)=='undefined'){
//		gradeModel.remove({},(err,result)=>{
//			if(err)
//				throw new Error();
//			console.log("全部删除成功！"+res);
//			res.json({ code:'200', msg: '全部删除成功！' }); 
//		})
	}else{
		console.log("删除传值："+gradeNoer)
		gradeModel.remove({gradeNo:gradeNoer},(err,result)=>{
			if(err)
			throw new Error();
			console.log("单一删除成功！"+JSON.stringify(result));
			res.json({code:'200',msg:'单一删除成功！'})
		})
	}
});
//修改数据
router.get('/gradeUpdate',urlencodedParser,function(req,res,next){
	var param = req.method == "POST"?req.body:req.query || req.params;
	var gradeId=param.id
	var gradeNo=param.no;
	var gradeName=param.name;
	if(typeof(gradeId)=='undefined'||typeof(gradeName)=='undefined'||typeof(gradeNo)=='undefined'){
		res.json({code:'404',result:'请正确输入完整的查询和修改信息'});
	}else{
		gradeModel.updateOne({gradeNo:gradeId},{$set:{_id:gradeNo,gradeName:gradeName}},(err,result)=>{
			if(err){
				throw new Error();
				res.json({code:'-200',result:'修改失败'})
				return;
			}else{
				res.json({code:'200',result:result});
				console.log("这个是修改，修改之后的返回长度："+JSON.stringify(result))
			}
		
		})
	}
})
//获得单独一条数据
router.post('/gradeOne',urlencodedParser,function(req,res,next){
	var param = req.method == "POST"?req.body:req.query || req.params;
	var $id=param.id;
	gradeModel.find({gradeNo:$id},(err,result)=>{
			if(err){
				throw new Error();
				return;
			}
			console.log('单个查询'+result+"\n类型："+typeof(result)+"\n,"+"条数："+result.length);
			if(res.length==0){
		   		res.json({ code:'-200', msg: '根据请求没有获取到相应的数据！' }); 
			} else { 
	//			res.json({msg:'数据已返回',status:'200',result:result});
				res.json({result:result});
			}
		});
})
//获得数据
router.get('/gradeList', urlencodedParser, function(req, res, next) {
	var param = req.method == "POST"?req.body:req.query || req.params;
	var gradeLike=param.gradeLike;
	console.log("参数："+gradeLike)
	if(typeof(gradeLike)=='undefined'){
		gradeModel.find({},{},(err,result)=>{
			if(err){
				throw new Error();
				return;
			}
			console.log('全部查询'+result+"\n类型："+typeof(result)+"\n,"+result[0].gradeName);
			if(res.length==0){
		   		res.json({ code:'-200', msg: '根据请求没有获取到相应的数据！' }); 
			} else { 
	//			res.json({msg:'数据已返回',status:'200',result:result});
				res.json({result:result});
			}
		});
		
	}else{
		gradeModel.find({gradeName:{'$regex':gradeLike}},(err,result)=>{
			if(err){
				throw new Error();
				return;
			}
			console.log('单一查询'+result);
			if(res.length==0){
		   		res.json({ code:'-200', msg: '根据请求没有获取到相应的数据！' }); 
			} else { 
	//			res.json({msg:'数据已返回',status:'200',result:result});
				res.json({result:result});
				
			}
		});
		
	}
	
});

module.exports = router;