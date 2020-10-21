function noteDown() {
  let newNoteObj = { type: "Note" };
  if($('#new-note-title').text().length) {
    newNoteObj.title = $('#new-note-title').text();
  }
  if($('#new-note-content').text().length) {
    newNoteObj.content = $('#new-note-content')[0].innerText.replaceAll('\n', '<br/>');
  }

  if(newNoteObj.title || newNoteObj.content) {
    genNextID("Note")
    .then(id => {
      newNoteObj.id = id;
      newNoteObj.created_at = parseInt(new Date().getTime()/1000);
      readFromFile()
      .then(data => {

        data?.docs ? data.docs.push(newNoteObj) : data.docs = [newNoteObj];
        data.total_docs = data.docs.length;
        data.number_of_notes = data.docs.filter(obj => obj.type === "Note").length;

        writeIntoFile(data)
        .then(() => {
          location.reload();
        })
      })
    })
    .catch(err => {
      alert("An error occured! Try again.");
      console.error(err);
    });
  }
  else {
    alert("Cannot create empty note.");
  }
};
