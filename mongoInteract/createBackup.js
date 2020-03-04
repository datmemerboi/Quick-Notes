let date_ob = new Date();
let date = String('0'+date_ob.getDate()).slice(-2);
let month = String('0'+(parseInt(date_ob.getMonth())+1)).slice(-2);
let year = String(date_ob.getFullYear());
let now = date+"-"+month+"-"+year
let query = "mongoexport --db Quick --collection Notes --out ../backup/Quick_Notes_"+now+".json";
console.log(query)
let { exec } = require("child_process");
exec(query, (err, res)=>{
	if(err){ throw err; }
	else{ console.log("Data has been exported."); }
});
