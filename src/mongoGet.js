function createDiv(head, body) {
	var br = document.createElement("BR");
	br.setAttribute('class',"break-line");
	var divi = document.createElement("DIV");
	divi.setAttribute('class', "note");
	divi.setAttribute('contenteditable', "true");
	var text = document.createElement("P");
	text.setAttribute('class', "text");
	var bottomText = document.createElement("P");
	bottomText.setAttribute('class', "bottom-text");
	text.innerHTML = head;
	bottomText.innerHTML = body;
	divi.appendChild(text);
	divi.appendChild(bottomText);
	document.getElementById('container').appendChild(br);
	document.getElementById('container').appendChild(divi);
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
				createDiv(a['Head'], a['Body']);
				// console.log(a['Head'], a['Body'])
			});
		});
	}
	conn.close();
});
alert("Welcome");
