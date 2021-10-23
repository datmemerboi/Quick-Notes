const path = require('path');
const fs = require('fs');

function readFromFile() {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, 'data', 'main.json'), (err, obj) => {
      if (err) {
        console.error(err);
        return reject(err);
      } else {
        console.log('Read file success');
        return resolve(JSON.parse(obj));
      }
    });
  });
}

function writeIntoFile(updatedObj) {
  return new Promise((resolve, reject) => {
    if (updatedObj) {
      fs.writeFile(
        path.join(__dirname, 'data', 'main.json'),
        JSON.stringify(updatedObj, null, 4),
        (err) => {
          if (err) {
            return reject(err);
          } else {
            console.log('Written into file success!');
            return resolve(true);
          }
        }
      );
    } else {
      return reject(false);
    }
  });
}

async function genNextID(type) {
  try {
    switch (type) {
      case 'Note': {
        let data = await readFromFile();
        let maxID = data?.docs
          ?.filter((obj) => obj.type === 'Note')
          ?.sort((a, b) => b.created_at - a.created_at)[ 0 ]?.id;
        if (maxID) {
          return (
            'Note' +
            ('00' + `${parseInt(maxID.replace('Note', '')) + 1}`).slice(3)
          );
        } else {
          return 'Note001';
        }
      }
      default: {
        null;
      }
    }
  } catch (err) {
    return null;
  }
}

module.exports = {
  readFromFile,
  writeIntoFile,
  genNextID
};
