var row_title = document.getElementById('new-title').innerHTML;
var row_content = document.getElementById('new-content').innerHTML;
MongoClient.connect("mongodb://localhost:27017", (err, conn)=>{
	if(err){ throw err; }
	else{
		var row = {'Title':row_title, 'Content':row_content};
		conn.db('Quick').collection('Notes').insertOne(row, (err, res)=>{
			if(err){ throw err; }
			console.log("inserted");
		});
	}
	conn.close();
});