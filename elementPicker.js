$("body").wrap("<div class='grey_out'></div>");

screenDimmed = false;

var oldColor;
var oldElem = null;
var currentElem = null;

chrome.runtime.onMessage.addListener(
	function (message, sender, sendResponse) {
		if (message == "runElementPicker") {
			runElementPicker();
			sendResponse({running: true});
		} else if (message == "stopElementPicker") {
			stopElementPicker();
			sendResponse({running: false});
		}
	}
);

function runElementPicker() {
	dimScreen();
	document.addEventListener("mousemove", highlightElement);
}

function stopElementPicker() {
	undimScreen();
	document.removeEventListener("mousemove", highlightElement);
}

function highlightElement(event) {
	var x = event.clientX;
	var y = event.clientY;
	
	currentElem = document.elementFromPoint(x, y);
	if (currentElem != oldElem) {
		if (oldElem) {
			oldElem.style.backgroundColor = oldColor;
		}
		
		oldColor = currentElem.style.backgroundColor;
		oldElem = currentElem;
		
		currentElem.style.backgroundColor = "#FDFF47";
	}
}

function dimScreen() {
	$(".grey_out").css("display", "block");

	screenDimmed = true;
}

function undimScreen() {
	$(".grey_out").css("display", "none");
	
	screenDimmed = false;
}

function toggleScreenDimness() {
	if (screenDimmed) {
		undimScreen();
	} else {
		dimScreen();
	}
}
