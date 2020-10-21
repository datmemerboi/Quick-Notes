function readFromFile() {
  return new Promise(function(resolve, reject) {
    fs.readFile(path.join(__dirname, 'data', 'main.json'), (err, obj) => {
      if (err) {
        console.error(err);
        return reject(err);
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

function genNextID(type, parent = null) {
  return new Promise(function(resolve, reject) {
    switch (type) {
      case "Note":
        readFromFile()
        .then(data => {
          let maxID = data?.docs?.filter(obj => obj.type === "Note")?.sort((a, b) => b.created_at - a.created_at)[0]?.id;
          if(maxID) {
            let nextID = "Note" + ("00" + (parseInt(maxID.replace("Note", '')) + 1).toString() ).slice(-3);
            return resolve(nextID);
          }
          else { return resolve("Note001"); }
        })
        .catch(err => { return reject(err) });
        break;
      default:
        return reject(null);
    }
  });
}
