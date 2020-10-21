function toggleTaskStatus(elemObj) {
  // elemObj.status = !(elemObj.status);
  readFromFile()
  .then(data => {
    console.log(data);
    let parentTask = data.docs.filter(obj => obj.type === "Task" && elemObj.id.split(':')[1] === obj.id)[0];
    let parentIndex = data.docs.indexOf(parentTask);
    console.log(parentTask, parentIndex);
    for (var i = 0; i < parentTask.children.length; i++) {
      if(parentTask.children[i].id === elemObj.id) {
        parentTask.children[i].status = !(parentTask.children[i].status);
        break;
      }
    }
    parentTask.status = parentTask.children.filter(obj => obj.type === "ChildTask" && obj.status === true).length > 0; 
    data.docs[parentIndex] = parentTask;
    writeIntoFile(data).then(() => {
      console.log("Done!"); window.location.reload();
    });
  })
  .catch(err => {
    console.error(err);
  });
};
