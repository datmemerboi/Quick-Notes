function createNote(Title, Content, ID) {
	var padded = document.createElement("DIV");
	padded.setAttribute('class', "note-padding");
	padded.setAttribute('onmouseover',"showOptionsDiv(this)");
	padded.setAttribute('onmouseout',"hideOptionsDiv(this)");

	var divi = document.createElement("DIV");
	divi.setAttribute('class', "note");
	divi.setAttribute('name', "note");
	divi.setAttribute('contenteditable', "true");
	divi.setAttribute('id', ID);

	var text = document.createElement("P");
	text.setAttribute('class', "text");
	text.innerHTML = Title;

	var bottomText = document.createElement("P");
	bottomText.setAttribute('class', "bottom-text");
	bottomText.innerHTML = Content;

	var options = document.createElement("DIV");
	options.setAttribute('class', "options-div");

	var deleteBtn = document.createElement("BUTTON");
	deleteBtn.setAttribute('class', "delete-btn");
	deleteBtn.setAttribute('onclick', "deleteNote(this)");
	var deleteIcon = document.createElement("I");
	deleteIcon.setAttribute('class', "fa fa-trash");
	deleteBtn.appendChild(deleteIcon);
	options.appendChild(deleteBtn);

	divi.appendChild(text);
	divi.appendChild(bottomText);
	divi.appendChild(options);

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
				createNote(a['Title'], a['Content'], a['_id']);
			});
		});
	}
	conn.close();
});
