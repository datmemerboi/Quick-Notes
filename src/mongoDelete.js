function deleteNote(child){
	var parent = child.parentNode.parentNode;
	var ID = child.parentNode.id;
	var mongodb = require('mongodb');
	MongoClient.connect("mongodb://localhost:27017", (err, conn)=>{
		if(err)
			throw err;
		else {
			conn.db('Quick').collection('Notes').deleteOne({_id: new mongodb.ObjectID(ID)}, (err, res)=>{
				if(err)
					throw err;
				else{
					document.getElementById('container').removeChild(parent);
				}
			});
		}
	});
}
