let { readFromFile, writeIntoFile } = require('./file-handler');

async function toggleTaskStatus(elemObj) {
  try {
    let data = await readFromFile();
    let parentTask = data?.docs?.filter(
      (obj) => obj.type === 'Task' && elemObj.id.split(':')[ 1 ] === obj.id
    )[ 0 ];
    let parentIndex = data.docs.indexOf(parentTask);
    console.log(parentTask, parentIndex);
    for (let child of parentTask.children) {
      if (child.id === elemObj.id) {
        child.status = !child.status;
        break;
      }
    }
    parentTask.status =
      parentTask.children.filter(
        (obj) => obj.type === 'ChildTask' && obj.status === true
      ).length > 0;
    data.docs[ parentIndex ] = parentTask;
    writeIntoFile(data).then(() => {
      console.log('Done!');
      window.location.reload();
    });
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  toggleTaskStatus
};
