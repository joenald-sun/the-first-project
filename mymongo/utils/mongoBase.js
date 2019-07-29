
const Dbconfig=require('./dbconfig');//引入配置文件
const MongoClient = require('mongodb').MongoClient;

//const Dburl = "mongodb://" + Dbconfig.db_user + ":" + Dbconfig.db_pwd + "@" + Dbconfig.db_host + ":" + Dbconfig.db_port + "/" + Dbconfig.db_name;
const Dburl = "mongodb://"+ Dbconfig.db_host + ":" + Dbconfig.db_port + "/" + Dbconfig.db_name;

//不管数据库什么操作，都是先连接数据库，所以我们可以把连接数据库 
//封装成为内部函数
function _connectDB(callback) { 
	var url = Dburl;
	//从settings文件中，都数据库地址 
	//连接数据库 
	
	MongoClient.connect(url, function (err, client) {
		if (err) { 
			callback(err, null); 
			return;
		} 
		callback(err, client); 
	}); 
}

//插入数据
exports.insertOne = function (collectionName, json, callback) { 
	_connectDB(function (err, client) { 
		let mdb = client.db(Dbconfig.db_name);
		mdb.collection(collectionName).insertOne(json, function (err, result) { 
			callback(err, result); 
			client.close();//关闭数据库 
		}) 
	}) 
};

//查找数据，找到所有数据。args是个对象{"pageamount":10,"page":10} 
exports.find = function (collectionName, json, C, D) { 
	var result = []; //结果数组 
	if (arguments.length == 3) { 
		//那么参数C就是callback，参数D没有传。 
		var callback = C; 
		var skipnumber = 0; //数目限制 
		var limit = 0; 
	} else if (arguments.length == 4) { 
		var callback = D; 
		var args = C; //应该省略的条数
		var skipnumber = args.pageamount * args.page || 0; //数目限制 
		var limit = args.pageamount || 0; //排序方式 
		var sort = args.sort || {}; 
	} else { 
		throw new Error("find函数的参数个数，必须是3个，或者4个。");
		return; 
	} 
	//连接数据库，连接之后查找所有
	_connectDB(function (err, client) { 
		let mdb = client.db(Dbconfig.db_name);
		var cursor = mdb.collection(collectionName).find(json).skip(skipnumber).limit(limit).sort(sort); 
		cursor.each(function (err, doc) { 
			if (err) { 
				callback(err, null); 
				client.close(); //关闭数据库
				return; 
			} 
			if (doc != null) { 
				result.push(doc); //放入结果数组 
			} else { 
				//遍历结束，没有更多的文档了 
				callback(null, result); 
				client.close(); //关闭数据库 
			} 
		}); 
	}); 
}


//删除 
exports.deleteMany = function (collectionName, json, callback) { 
	_connectDB(function (err, client) { 
		//删除 
		let mdb = client.db(Dbconfig.db_name);
		mdb.collection(collectionName).deleteMany( 
			json, function (err, results) { 
				callback(err, results); 
				client.close(); //关闭数据库 
			}); 
	}); 
}

//修改 
exports.updateMany = function (collectionName, json1, json2, callback) { 
	_connectDB(function (err, client) { 
		let mdb = client.db(Dbconfig.db_name);
		mdb.collection(collectionName).updateMany( json1, json2, function (err, results) { 
			callback(err, results); 
			client.close();
		}); 
	}) 
}

// 总数
exports.getAllCount = function (collectionName,callback) { 
	_connectDB(function (err, client) { 
		let mdb = client.db(Dbconfig.db_name);
		mdb.collection(collectionName).count({}).then(function(count) { 
			callback(count); 
			client.close();
		}); 
	}) 
}

