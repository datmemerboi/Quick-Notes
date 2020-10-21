window.$ = window.jQuery = require('./node_modules/jquery/dist/jquery.min.js');
const fs = require('fs'),
      path = require('path');

function toggleDisplayNewNote() {
  var modal = document.getElementsByClassName('new-note-modal')[0];
  modal.style.display === "" || modal.style.display === null
    ? modal.style.display = 'block'
    : modal.style.display = null;
  // document.getElementsByClassName('new-note-modal')[0].style.display
  // getElementById('new-note').style.display = 'block';
}
