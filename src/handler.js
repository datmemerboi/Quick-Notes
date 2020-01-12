function switchnewnote() {
	var current = document.getElementById('new-note').style.display;
	if(current=="")
		document.getElementById('new-note').style.display = "block";
	else
		document.getElementById('new-note').style.display = "";
}