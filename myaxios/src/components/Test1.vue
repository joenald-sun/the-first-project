<template>
	<div id="axios1">
		<hr/>
		<h1>{{title}}</h1>
		<el-button type="primary" @click='handleInsert()' id='insert'>新增</el-button>
		<el-input v-model="input" placeholder='按需查找' class='search'></el-input>
		<el-button @click='search()' type='danger' class='searchBtn'>按需查找</el-button>
		<el-table
			ref="filterTable"
			style="width: 100%"
			:data='grades'
			 >
			<el-table-column
			  prop="gradeNo"
			  label="年级排序"
			  width="180">
			</el-table-column>
			<el-table-column
			  prop="_id"
			  label="年级id">
			</el-table-column>
			<el-table-column
			  prop="gradeName"
			  label="年级名称">
			</el-table-column>
			<el-table-column label="操作">
			  <template slot-scope="scope">
				<el-button
				  size="mini"
				  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
				<el-button
				  size="mini"
				  type="danger"
				  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
			  </template>
			</el-table-column>
		  </el-table>
		  
		  <div id="back" @click='dispeared()'></div>
		  <section id="panel">
				<el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
				  <el-form-item label="年级id" >
					<el-input v-model="formLabel.id" readonly='readonly' id='only'></el-input>
				  </el-form-item>
				  <el-form-item label="年级序列">
					<el-input v-model="formLabel.no" id='ever'></el-input>
				  </el-form-item>
				  <el-form-item label="年级名称">
					<el-input v-model="formLabel.name"></el-input>
				  </el-form-item>
				  <el-button type="success" id='success' @click="handleUpdate(formLabel.id,formLabel.no,formLabel.name)">提交</el-button>
				  <el-button type="warning" id='reset' @click='clear(formLabel.id)'>重置</el-button>
				</el-form>
		  </section>
			<hr/>
		<hr/>
	</div>
</template>

<script>
	import mongoose from 'mongoose';
	export default{
		name:'',
		data(){
			return{
				labelPosition: 'left',
				formLabel: {
				  name: '',
				  id: '',
				  no: ''
				},
				input:'',
				title:'这是axios的第一个测试',
				type:'',
				grades:[{}],
				students:[{}],
				studenters:[{}],
				stu:[{}],
				stuer:[{}],
				show:true,
				searcher:'',
				stuNo:'S10025121',
				stuPwd:'123456'
			}
		},
		methods:{
			//清空input的方法
			clear(id){
				$('.el-input__inner').val(' ');
				$("#only").val(id);
			},
			//按需查询
			search(){
				this.type='查询';
				this.init(this.input);
			},
			//提交方法
			handleUpdate(id,no,name){
				var type=this.type
				if(type=='修改'){
					//是修改
					// alert(id+","+no+","+name+type)
					this.$axios.get('grade/gradeUpdate',{
						params:{
							id:id,
							no:no,
							name:name
						}
					})
					.then( (result)=> {
						var len=result.data.result.ok;
						if(len==1){
							this.dispeared()
							this.init(null);
						}
					})
					.catch( (error)=> {
						console.log(error);
					});
				}else{
					//是新增
					 // alert(id+","+no+","+name+",,,"+type)
					this.$axios.get('grade/gradeInsert',{
						params:{
							id:id,
							no:no,
							name:name,
						}
					})
					.then( (result)=> {
						// var len=result.data.result[0].length;
						// alert("新增之后的返回值长度："+len)
						// if(len==1){
						// 
						// 	
						// }
						this.dispeared()
						this.init(null);
					})
					.catch( (error)=> {
						console.log(error);
					});
				}
					
			},
			dispeared:function(){
				$("#panel").fadeOut(500)
				$("#back").fadeOut(500)
			},
			//新增按钮
			handleInsert(){
				$('.el-input__inner').val(' ');
				this.type='新增';
				var len=this.grades.length;
				this.formLabel.id=(len+1);
				$("#only").val(len+1)
				$("#ever").val("序列化是个随机数，加不加都不会起效(ObjectID)")
				$("#panel").fadeIn(1000)
				$("#back").fadeIn(1000)
			},
			//删除方法
			delete(ider){
				// alert(id)
				this.$axios.post('grade/gradeDelete',{
					id:ider
				})
				.then((response)=>{
					// var len=result.data.ok;
					// alert(len)
					// if(len==1){
					// 	this.init();
					// }
					this.init(null);
				})
				.catch((err)=>{
					console.log(err);
				})
			},
			//删除按钮
			handleDelete(index,row){
				var idd=index+1;
				this.$confirm('是否将永久删除这条数据，是否继续？','提示',{
					confirmButtonText:"确认",
					cancelButtonText:"取消",
					type:'warning'
				}).then(()=>{
					this.message({
						type:'success',
						message:this.delete(idd)
					});
				}).catch(()=>{
					this.message({
						type:'info',
						message:'已取消删除'
					})
				})
			},
			//修改按钮
			handleEdit(index,row){
				$('.el-input__inner').val(' ');
				//确定是修改，通知上下
				this.type='修改';
				// alert((index+1)+","+(this.grades.length))
				$("#panel").fadeIn(1000)
				$("#back").fadeIn(1000)
				var idd=index+1;
				this.getUpdate(idd);
			},
			//修改的查询方法
			getUpdate:function(val){
				this.$axios.post('grade/gradeOne',{
					id:val
				})
				.then((response)=>{
					this.formLabel.id=response.data.result[0].gradeNo;
					this.formLabel.no=response.data.result[0]._id;
					this.formLabel.name=response.data.result[0].gradeName;
				})
				.catch((err)=>{
					console.log(err);
				})
			},
			//初始化
			init:function(val){
			  this.$axios.get('grade/gradeList',{
				  params:{
					 gradeLike:val 
				  }
			  })
			  .then( (response)=> {
				console.log(".then的结果："+response.data)
				this.grades=null;
				this.grades=response.data.result;
			  })
			  .catch( (error)=> {
				console.log(error);
			  });
			},
			
			/**
			myGet(){
				this.$axios.get('stuReadOne',{
					params:{
						studentNo:'S10025121',
						loginPwd:'123456'
					}
				})
				.then( (result)=> {
								this.stu=result.data.result;
				})
				.catch( (error)=> {
								console.log(error);
				});
			},
			
			myPoster(){
				 this.$axios.post('stuReadAll')
				.then( (result)=> {
					this.studenters=result.data.result;
				})
				.catch( (error)=> {
					console.log(error);
				});
			},
			
			myPost(){
				this.$axios.post('stuReadOne',{
					studentNo:'S10025121',
					loginPwd:'123456'
				})
				.then( (result)=> {
					this.stuer=result.data.result;
					console.log(result)
				})
				.catch( (error)=> {
					console.log(error);
				});
			},
			**/
		   
			/*
			* 处理高并发
			* */
			getStuList(){
				 var result=this.$axios.get('http://localhost:3000/grade/gradeList');
				// console.log("结果："+typeof(result.length))
				 // this.grades=result.result
				 return result;
				// return this.$axios.get('http://localhost:3000/grade/gradeList');
			},
			getStuOne(stuNo,stuPwd){
				return this.$axios.get('/api/stuReadOne?studentNo='+stuNo+'&loginPwd='+stuPwd);
			},
			postStuList(){
				return this.$axios.post('/api/stuReadAll');
			},
			postStuOne(stuNo,stuPwd){
				return this.$axios.post('/api/stuReadOne',{studentNo:stuNo,loginPwd:stuPwd});
			},
			// queryAll(stuNo,stuPwd){
			// 	this.$axios.all([this.getStuList(),this.getStuOne(stuNo,stuPwd),this.postStuList(),this.postStuOne(stuNo,stuPwd)])
			// 	.then(this.$axios.spread((getList,getOne,postList,postOne)=>{
			// 		this.grades=getList.data.result;
			// 		this.studenters=postList.data.result;
			// 		this.stu=getOne.data.result;
			// 		this.stuer=postOne.data.result;
			// 	}))
			// }
		},
		
		// mounted(){
		// 	// this.myGet();
		// 	// this.myPoster();
		// 	// this.myPost();
		// this.queryAll(this.stuNo,this.stuPwd);
		// },
		beforeUpdate:function(){
			// this.getUpdate();
		},
		created:function(){
			this.init(null);
		}
	}
</script>

<style>
	.search,.searchBtn{
		text-align: left;
		float: left;
		width: auto;
	}
	#insert{
		text-align: right;
		float: right;
	}
	#back{
		display: none;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		position: fixed;
		background-color: rgba(133,133,133,0.4);
		z-index: 1;
	}
	#panel{
		display: none;
		border-radius: 10px;
		z-index: 10;
		background-color: rgba(10,100,255,0.9);
		position: fixed;
		width: 50%;
		height: 50%;
		top: 25%;
		left: 25%;
	}
	.el-form-item__label{
		color: whitesmoke;
		font-size: 1.5rem;
	}
	.el-form{
		text-align: center;
		position: absolute;
		top: 25%;
		left: 25%;
	}
	#axios1{
		background: lightcyan;
		width: 80%;
		margin-left: 10%;
		margin-bottom: 50px;
	}
	li{
		list-style: none;
		display: inline-block;
	}
	ul:first-child{
		z-index: 100;
		width: 100%;
		background-color: lightgrey;
	}
</style>
