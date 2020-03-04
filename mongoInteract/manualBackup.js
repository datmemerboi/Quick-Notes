var filename = process.argv[2];
console.log(filename+" will be used for Backup");
query = "mongoimport --db Quick --collection Notes --file "+filename;
const {exec} = require('child_process');
exec(query, (err, res)=>{
	if(err){ throw err; }
	else{
		console.log("Data has been imported.");
	}
});
