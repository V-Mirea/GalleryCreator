$("body").wrap("<div class='grey_out'></div>");

document.addEventListener("mousemove", function(e) {
	var x = e.clientX;
	var y = e.clientY;
	
	//var element = document.elementFromPoint;
	console.log(x + " " + y);
});