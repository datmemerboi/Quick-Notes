const MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://localhost:27017", (err, conn)=>{
	if(err)
		throw err;
	else{
		conn.db('Quick').collection('Notes').find((err, res)=>{
			if(err)
				throw err;
			res.forEach( (a)=>{
				// createDiv(a['Head'], a['Body']);
				console.log(a['Head'], a['Body'])
			});
		});
	}
	conn.close();
});
alert("Welcome");
