function readFromFile() {
  return new Promise(function(resolve, reject) {
    fs.readFile(path.join(__dirname, 'data', 'main.json'), (err, obj) => {
      if (err) {
        console.error(err);
        return reject(false);
      }
      else {
        console.log(`Read file success`);
        return resolve(JSON.parse(obj));
      }
    });
  });
};

function writeIntoFile(updatedObj) {
  return new Promise(function(resolve, reject) {
    if(updatedObj) {
      fs.writeFile(path.join(__dirname, 'data', 'main.json'), JSON.stringify(updatedObj, null, 4), (err) => {
        if(err) { return reject(err); }
        else {
          console.log("Written into file success!");
          return resolve(true);
        }
      });
    }
    else { return reject(false); }
  });
};
