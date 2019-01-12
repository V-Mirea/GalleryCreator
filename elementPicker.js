var grey_out = document.createElement("div");
grey_out.id = "grey_out";

var screenDimmed = false;
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
	while (document.body.firstChild) {
		grey_out.appendChild(document.body.firstChild);
	}
	document.body.appendChild(grey_out);

	screenDimmed = true;
}

function undimScreen() {
	var dim = document.getElementById("grey_out");
	while (dim.firstChild) {
		document.body.appendChild(dim.firstChild);
	}
	document.body.removeChild(dim);

	screenDimmed = false;
}

function toggleScreenDimness() {
	if (screenDimmed) {
		undimScreen();
	} else {
		dimScreen();
	}
}
