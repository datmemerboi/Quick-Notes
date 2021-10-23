window.$ = window.jQuery = require('./node_modules/jquery/dist/jquery.min.js');

function toggleDisplayNewNote() {
  let modal;
  [modal] = document.getElementsByClassName('new-note-modal');
  modal.style.display === '' ||
  modal.style.display === null ||
  modal.style.display === undefined
    ? (modal.style.display = 'block')
    : (modal.style.display = null);
  // document.getElementsByClassName('new-note-modal')[0].style.display
  // getElementById('new-note').style.display = 'block';
}

module.exports = {
  toggleDisplayNewNote
};
