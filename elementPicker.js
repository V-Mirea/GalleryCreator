var grey_out = "<div class='grey_out'></div>"
var screenDimmed = false;

var oldColor;
var oldElem = null;
var currentElem = null;

$( document ).ready(function () {
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
});

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
	$("body").wrap(grey_out);
	screenDimmed = true;
}

function undimScreen() {
	$("body").unwrap();
	screenDimmed = false;
}

function toggleScreenDimness() {
	if (screenDimmed) {
		undimScreen();
	} else {
		dimScreen();
	}
}
