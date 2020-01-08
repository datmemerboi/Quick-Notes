let date_ob = new Date();
var now = String(date_ob.getDate())+"-"+String(parseInt(date_ob.getMonth())+1)+"-"+String(date_ob.getFullYear());
var query = "mongoexport --db Quick --collection Notes --out backup/Quick_Notes_"+now+".json";
console.log(query);
let { exec } = require("child_process");
exec(query, (err, res)=>{
	if(err){ throw err; }
	else{ console.log("Data has been exported."); }
});