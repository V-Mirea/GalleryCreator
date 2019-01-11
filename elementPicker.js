$("body").wrap("<div class='grey_out'></div>");

var oldColor;
var oldElem = null;
var currentElem = null;
document.addEventListener("mousemove", function(e) {
	var x = e.clientX;
	var y = e.clientY;
	
	currentElem = document.elementFromPoint(x, y);
	if (currentElem != oldElem) {
		if (oldElem) {
			oldElem.style.backgroundColor = oldColor;
		}
		
		oldColor = currentElem.style.backgroundColor;
		oldElem = currentElem;
		
		currentElem.style.backgroundColor = "#FDFF47";
	}
	
});
