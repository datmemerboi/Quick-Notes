function createNote(Title, Content) {
	var padded = document.createElement("DIV");
	padded.setAttribute('class', "note-padding");
	
	var divi = document.createElement("DIV");
	divi.setAttribute('class', "note");
	divi.setAttribute('name', "note");
	divi.setAttribute('contenteditable', "true");
	
	var text = document.createElement("P");
	text.setAttribute('class', "text");
	text.innerHTML = Title;
	
	var bottomText = document.createElement("P");
	bottomText.setAttribute('class', "bottom-text");
	bottomText.innerHTML = Content;

	divi.appendChild(text);
	divi.appendChild(bottomText);
	
	padded.appendChild(divi);
	document.getElementById('container').appendChild(padded);
}

const MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://localhost:27017", (err, conn)=>{
	if(err)
		throw err;
	else{
		conn.db('Quick').collection('Notes').find((err, res)=>{
			if(err)
				throw err;
			res.forEach( (a)=>{
				createNote(a['Title'], a['Content']);
			});
		});
	}
	conn.close();
});