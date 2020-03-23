var file = process.argv[2];
console.log(file+" will be used for Backup");

if(file.includes("backup/")){
	query = "mongoimport --db Quick --collection Notes --file "+file;
}
else{
	query = "mongoimport --db Quick --collection Notes --file "+__dirname+"/../backup/"+file;
}

// console.log(query)

const {exec} = require('child_process');
exec(query, (err, res)=>{
	if(err){ throw err; }
	else{
		console.log("Data has been imported.");
	}
});
