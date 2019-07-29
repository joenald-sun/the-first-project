/**
 * New node file
 */
const mongoose=require('../utils/mongooseConnection');

//var mongoose =require('mongoose');
//mongoose.connect("mongodb://localhost:27017/myStudent");
/**	
 * 定义schema 的model
 */
var studentSchema = new mongoose.Schema({
	studentNo:String,
	studentName:String,
	age:{type:Number,default:20},
	contact:{
		email:{type:String,default:'baidu@gmail.com'},
		phone:{type:String,default:'13456479754'}
	}
},
{versionKey:false});
studentSchema.add({
	address:String,
	grade:Number
});
//定义一个普通方法
studentSchema.methods.run=function(){
	console.log("你好，台湾");
}
//构建和数据库之间的紧密联系关系
var studentModel=mongoose.model('student',studentSchema);

//studentModel.remove({studentNo:'M1001'},(err,res)=>{
//	if(err)
//		throw new Error();
//	console.log('删除成功：'+res);
//})
//studentModel.findByIdAndUpdate({_id:'5d356ec74e6ce91cd0a9026d'},{age:15},{multi:true},(err,res)=>{
//	if(err)
//		throw new Error();
//		return;
//	console.log('修改'+res);
//})
//studentModel.count({grade:1},(err,res)=>{
//	if(err)
//		throw new Error();
//	console.log('总数：'+res);
//})
//studentModel.findById({_id:'5d356ec74e6ce91cd0a9026b'},{studentNo:1,studentName:1},(err,res)=>{
//	if(err){
//		throw new Error();
//	}
//	console.log('id查询'+res)
//})
//studentModel.find({age:10},{studentNo:1,studentName:1},(err,res)=>{
//	if(err){
//		throw new Error();
//	}
//	console.log('查询'+res)
//})
//
//studentModel.findOne({age:10},{studentNo:1,studentName:1},(err,res)=>{
//	if(err){
//		throw new Error();
//	}
//	console.log('单条查询'+res)
//})

//实例化实体
var doc1=({
	studentNo:"M1001",
	studentName:'Bruce Lie',
	age:15,
	contact:{
		email:'www.joenald@163.com',
		phone:'13771955491'
	},
	address:'长安路与南京路交叉口',
	grade:1
});
//实例化实体
var doc2=({
	studentNo:"M1002",
	studentName:'刘培强',
	age:10,
	contact:{
		email:'joenald@163.com',
		phone:'13771955492'
	},
	address:'南京路',
	grade:1
});
//实例化实体
var doc3=({
	studentNo:"M1003",
	studentName:'王磊',
	age:10,
	contact:{
		email:'www@163.com',
		phone:'13771955493'
	},
	address:'长安路',
	grade:2
});
//修改
//studentModel.update({studentNo:'M1003'},{$set:{age:15}},(err,res)=>{
//	if(err){
//		throw new Error();
//		return console.error(err);
//	}
//	console.log('修改结果:'+res);
//})
//添加多个
//studentModel.insertMany([doc1,doc2,doc3],(err,res)=>{
//	if(err){
//		throw new Error();
//		return console.error(err);
//	}
//	console.log('这次的结果：'+res)
//})

//studentModel.create(doc,(err,res)=>{
//	if(err){
//		throw new Error();
//		return console.error(err);
//	}
//	console.log('这次的结果：'+res)
//})

//var stu1=new studentModel({
//	studentNo:"M1001",
//	studentName:'Bruce Lie',
//	age:15,
//	contact:{
//		email:'www.joenald@163.com',
//		phone:'13771955492'
//	},
//	address:'长安路与南京路交叉口',
//	grade:1
//})
//
//stu1.save(function(err,res){
//	if(err){
//		throw new Error();
//		return console.error(err);
//	}
//	console.log('这次的结果：'+res)
//})

