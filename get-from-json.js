const fs = require('fs'),
      path = require('path');

$.getJSON(path.join(__dirname, 'data', 'main.json'), (object) => {
  var notesArr = object.docs.filter(doc => doc.type === "Note");
  notesArr.sort((a,b) => { return a.created_at - b.created_at });

  for (let i = 0; i < notesArr.length; i++) {
    let noteDiv = document.createElement('div');
    noteDiv.setAttribute('class', 'notes');

    if(notesArr[i].title) {
      let titleH5 = document.createElement('h5');
      titleH5.innerHTML = notesArr[i].title;
      noteDiv.appendChild(titleH5);
    }

    if(notesArr[i].content) {
      let contentPara = document.createElement('p');
      contentPara.innerHTML = notesArr[i].content;

      if(notesArr[i].content.length > 200) {
        let scrollDiv = document.createElement('div');
        scrollDiv.setAttribute('class', 'scrollable');
        scrollDiv.appendChild(contentPara);
        noteDiv.appendChild(scrollDiv);
      }
      else {
        noteDiv.appendChild(contentPara);
      }
    }

    document.getElementById('container').appendChild(noteDiv);
  }
});
