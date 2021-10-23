const path = require('path');
let $ = require('./node_modules/jquery/dist/jquery.min.js');

$.getJSON(path.join(__dirname, 'data', 'main.json'), (object) => {
  if (object && Object.keys(object).length) {
    let { docs: objDocArr } = object.docs;
    objDocArr.sort((a, b) => b.created_at - a.created_at); // Descending sort by created_at

    for (let doc of objDocArr) {
      if (doc.type === 'Note') {
        let noteDiv = document.createElement('div');
        noteDiv.setAttribute('class', 'notes');
        if (doc.title) {
          let titleH5 = document.createElement('h5');
          titleH5.innerHTML = doc.title;
          noteDiv.appendChild(titleH5);
        }

        if (doc.content) {
          let contentPara = document.createElement('p');
          contentPara.innerHTML = doc.content;

          if (doc.content.length > 200) {
            let scrollDiv = document.createElement('div');
            scrollDiv.setAttribute('class', 'scrollable');
            scrollDiv.appendChild(contentPara);
            noteDiv.appendChild(scrollDiv);
          } else {
            noteDiv.appendChild(contentPara);
          }
        }
        // Meta Notes div
        let date = new Date(parseInt(doc.created_at) * 1000);
        let timestamp = document.createElement('span');
        timestamp.setAttribute('class', 'timestamp');
        timestamp.innerHTML =
          date.toLocaleString('default', { month: 'short' }) +
          ' ' +
          date.getDate() +
          ', ' +
          date.getFullYear() +
          ' ' +
          date.getHours() +
          ':' +
          date.getMinutes();

        let deleteBtn = document.createElement('button');
        deleteBtn.setAttribute('class', 'delete-btn');
        deleteBtn.setAttribute('onclick', `deleteNote("${doc.id}")`);

        let deleteIcon = document.createElement('img');
        deleteIcon.setAttribute('src', 'static/trash.svg');
        deleteIcon.setAttribute('alt', 'X');
        deleteIcon.setAttribute('class', 'delete-icon');
        deleteBtn.appendChild(deleteIcon);

        let metaDiv = document.createElement('div');
        metaDiv.setAttribute('class', 'meta-notes');
        metaDiv.appendChild(deleteBtn);
        metaDiv.appendChild(timestamp);

        noteDiv.appendChild(metaDiv);
        noteDiv.setAttribute('id', doc.id);

        document.getElementById('container').appendChild(noteDiv);
      } else if (doc.type === 'Task') {
        let taskDiv = document.createElement('div');
        doc.status === true
          ? taskDiv.setAttribute('class', 'tasks')
          : taskDiv.setAttribute('class', 'tasks mark-done');

        if (doc.title) {
          let titleH5 = document.createElement('h5');
          titleH5.innerHTML = doc.title;
          taskDiv.appendChild(titleH5);
        }
        if (doc.children && doc.children.length) {
          let orderedList = document.createElement('ol');

          doc.children.forEach((child) => {
            let listItem = document.createElement('li');
            child.status === true
              ? listItem.setAttribute('class', 'list-item')
              : listItem.setAttribute('class', 'list-item mark-done');
            listItem.innerHTML = child.content;
            listItem.setAttribute(
              'onclick',
              `toggleTaskStatus(${JSON.stringify(child)})`
            );

            orderedList.appendChild(listItem);
          });

          if (doc.children.length > 9) {
            // With scrollable
            let scrollDiv = document.createElement('div');
            scrollDiv.setAttribute('class', 'scrollable');
            scrollDiv.appendChild(orderedList);
            taskDiv.appendChild(scrollDiv);
          } else {
            // Without scrollable
            taskDiv.appendChild(orderedList);
          }
        }

        document.getElementById('container').appendChild(taskDiv);
      }
    }
  } else {
    console.log('Empty data');
  }
});
