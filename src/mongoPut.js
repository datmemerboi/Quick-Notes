function postNote() {
	var row_title = $('#new-title').html();
	var row_content = $('#new-content').html();
	console.log(row_title+"::"+row_content)

	MongoClient.connect("mongodb://localhost:27017", (err, conn)=>{
		if(err){ throw err; }
		else {
			if(row_title!=undefined && row_content!=undefined)
			{
				var row = {'Title':row_title, 'Content':row_content};
				conn.db('Quick').collection('Notes').insertOne(row, (err, res)=>{
					if(err){ throw err; }
					console.log("inserted");
				});
			}
		}
		conn.close();
	});
	window.location.reload();
}