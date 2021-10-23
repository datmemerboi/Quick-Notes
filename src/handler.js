function switchNewNote() {
  let current = document.getElementById('new-note').style.display;
  if (current === '') {
    document.getElementById('new-note').style.display = 'block';
  } else {
    document.getElementById('new-note').style.display = '';
  }
}

function showOptionsDiv(attr) {
  attr.childNodes[ 0 ].lastElementChild.style.display = 'block';
}

function hideOptionsDiv(attr) {
  attr.childNodes[ 0 ].lastElementChild.style.display = 'none';
}

module.exports = {
  switchNewNote,
  showOptionsDiv,
  hideOptionsDiv
};
