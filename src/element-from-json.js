$.getJSON(path.join(__dirname, 'data', 'main.json'), (object) => {
  if(object && Object.keys(object).length) {
    var objDocArr = object.docs;
    // var notesArr = object.docs.filter(doc => doc.type === "Note");
    objDocArr.sort((a,b) => b.created_at - a.created_at ); // Descending sort by created_at

    for (let i = 0; i < objDocArr.length; i++) {
      if(objDocArr[i].type === "Note") {
        let noteDiv = document.createElement('div');
        noteDiv.setAttribute('class', 'notes');

        if(objDocArr[i].title) {
          let titleH5 = document.createElement('h5');
          titleH5.innerHTML = objDocArr[i].title;
          noteDiv.appendChild(titleH5);
        }

        if(objDocArr[i].content) {
          let contentPara = document.createElement('p');
          contentPara.innerHTML = objDocArr[i].content;

          if(objDocArr[i].content.length > 200) {
            let scrollDiv = document.createElement('div');
            scrollDiv.setAttribute('class', 'scrollable');
            scrollDiv.appendChild(contentPara);
            noteDiv.appendChild(scrollDiv);
          }
          else {
            noteDiv.appendChild(contentPara);
          }
        }
        // Meta Notes div
        let date = new Date(parseInt(objDocArr[i].created_at)*1000);
        let timestamp = document.createElement('span');
        timestamp.setAttribute('class', "timestamp");
        timestamp.innerHTML = date.toLocaleString('default', {month: 'short'}) + " "
          + date.getDate() + ", "
          + date.getFullYear() + " "
          + date.getHours() + ":"
          + date.getMinutes();

        let deleteBtn = document.createElement('button');
        deleteBtn.setAttribute('class', "delete-btn");
        deleteBtn.setAttribute('onclick', `deleteNote("${objDocArr[i].id}")`)
        let deleteIcon = document.createElement('img');
        deleteIcon.setAttribute('src', "static/trash.svg");
        deleteIcon.setAttribute('alt', "X");
        deleteIcon.setAttribute('class', "delete-icon");
        deleteBtn.appendChild(deleteIcon);

        let metaDiv = document.createElement('div');
        metaDiv.setAttribute("class", "meta-notes");
        metaDiv.appendChild(deleteBtn);
        metaDiv.appendChild(timestamp);

        noteDiv.appendChild(metaDiv);
        noteDiv.setAttribute('id', objDocArr[i].id);

        document.getElementById('container').appendChild(noteDiv);
      }
      else if(objDocArr[i].type === "Task") {
        let taskDiv = document.createElement('div');
        objDocArr[i].status === true ? taskDiv.setAttribute('class', 'tasks') : taskDiv.setAttribute('class', 'tasks mark-done');

        if(objDocArr[i].title) {
          let titleH5 = document.createElement('h5');
          titleH5.innerHTML = objDocArr[i].title;
          taskDiv.appendChild(titleH5);
        }
        if(objDocArr[i].children && objDocArr[i].children.length) {
          let unorder = document.createElement('ol');
          objDocArr[i].children.forEach(child => {
            let listItem = document.createElement('li');
            child.status === true ? listItem.setAttribute('class', 'list-item') : listItem.setAttribute('class', 'list-item mark-done');
            listItem.innerHTML = child.content;
            listItem.setAttribute('onclick', `toggleTaskStatus(${JSON.stringify(child)})`);
            unorder.appendChild(listItem);
          });
          if(objDocArr[i].children.length > 9) {
            // With scrollable
            let scrollDiv = document.createElement('div');
            scrollDiv.setAttribute('class', 'scrollable');
            scrollDiv.appendChild(unorder);
            taskDiv.appendChild(scrollDiv);
          }
          else {
            // Without scrollable
            taskDiv.appendChild(unorder);
          }
        }

        document.getElementById('container').appendChild(taskDiv);
      }
    }
  }
  else {
    console.log("Empty data");
  }
});
