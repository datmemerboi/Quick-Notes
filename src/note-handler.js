let $ = require('./node_modules/jquery/dist/jquery.min.js');
let { readFromFile, genNextID, writeIntoFile } = require('./file-handler');

function noteDown() {
  let newNoteObj = { type: 'Note' };
  if ($('#new-note-title').text().length) {
    newNoteObj.title = $('#new-note-title').text();
  }
  if ($('#new-note-content').text().length) {
    newNoteObj.content = $('#new-note-content')[ 0 ].textContent;
  }
  if (newNoteObj.title || newNoteObj.content) {
    genNextID('Note')
      .then((id) => {
        newNoteObj.id = id;
        newNoteObj.created_at = parseInt(new Date().getTime() / 1000);
        readFromFile().then((data) => {
          data?.docs ? data.docs.push(newNoteObj) : (data.docs = [newNoteObj]);
          data.total_docs = data.docs.length;
          data.number_of_notes = data.docs.filter(
            (obj) => obj.type === 'Note'
          ).length;

          writeIntoFile(data).then(() => {
            window.location.reload();
          });
        });
      })
      .catch((err) => {
        window.alert('An error occured! Try again.');
        console.error(err);
      });
  } else {
    window.alert('Cannot create empty note.');
  }
}

function deleteNote(noteID) {
  readFromFile()
    .then((data) => {
      let index = data?.docs?.indexOf(
        data.docs.filter((obj) => obj.type === 'Note' && obj.id === noteID)[ 0 ]
      );
      if (index > -1) {
        data.docs.splice(index, 1);
        data.total_docs = data.docs.length;
        data.number_of_notes = data.docs.filter(
          (obj) => obj.type === 'Note'
        ).length;
        writeIntoFile(data).then(() => {
          window.location.reload();
        });
      }
    })
    .catch((err) => {
      window.alert('An error occured! Try again.');
      console.error(err);
    });
}

module.exports = {
  noteDown,
  deleteNote
};

function deleteNote(noteID) {
  readFromFile()
  .then(data => {
    let index = data?.docs?.indexOf(data.docs.filter(obj => obj.type === "Note" && obj.id === noteID)[0]);
    if(index > -1) {
      data.docs.splice(index, 1);
      data.total_docs = data.docs.length;
      data.number_of_notes = data.docs.filter(obj => obj.type === "Note").length;
      writeIntoFile(data)
      .then(() => {
        location.reload();
      })
    }
  })
  .catch(err => {
    alert("An error occured! Try again.");
    console.error(err);
  });
};
