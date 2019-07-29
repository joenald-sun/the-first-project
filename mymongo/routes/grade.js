/**
 * New node file
 */
const mongoose = require('../utils/mongooseConnection');
//var mongoose=require('mongoose');
//mongoose.connect("mongodb://localhost:27017/myStudent");
var gradeSchema=new mongoose.Schema({
	gradeNo:Number,
	gradeName:String
},{versionKey:false,collection:'grade'});

var gradeModel=mongoose.model('grade',gradeSchema);
//var grade=new gradeModel({gradeNo:000,gradeName:'法律法规'})
//
//grade.save(function(err,res){
//	if(err){
//		return console.error(err);
//	}
//	console.log('这次的结果：'+res)
//})
var grade1=({
	gradeNo:1,
	gradeName:'计算机与技术'
});
var grade2=({
	gradeNo:2,
	gradeName:'人文科技'
});
var grade3=({
	gradeNo:3,
	gradeName:'自然科学'
});
gradeModel.insertMany([grade1,grade2,grade3],(err,res)=>{
	if(err){
		throw new Error();
		return console.error(err);
	}
	console.log('这次的结果：'+res)
})
