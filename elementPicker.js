var grey_out = document.createElement("div");
grey_out.id = "grey_out";

var elementPickerRunning = false;
var screenDimmed = false;
var oldColor;
var oldElem = null;
var currentElem = null;

var endings = [".jpg", ".png"]

chrome.runtime.onMessage.addListener(
	function (message, sender, sendResponse) {
		if (message == "toggleElementPicker") {
			if (elementPickerRunning) {
				stopElementPicker();			
			} else {
				runElementPicker();		
			}
		} else if (message == "isInjected") {
			sendResponse({injected: true});
		}
	}
);

document.body.onclick = function(event) {
	if (elementPickerRunning) {
		var images = $(event.target).find('img').map(function(){
			if ($(this).parent().is("a")){
				var isImage = false;

				var link = $(this).parent().attr('href');
				for (var i = 0; i < endings.length; i++) {
					if (link.endsWith(endings[i])) {
						isImage = true;
						break;
					}
				}

				if (isImage) {
					return link
				} else {
					return $(this).attr('src')
				}	
			} else {
				return $(this).attr('src')
			}
		}).get()

		
		message = {action: "openPage", page: chrome.extension.getURL("gallery.html"), images: images}

		chrome.runtime.sendMessage(message, function(response) {
			stopElementPicker();
		});
	}
}

function runElementPicker() {
	dimScreen();
	document.addEventListener("mousemove", highlightElement);

	elementPickerRunning = true;
}

function stopElementPicker() {
	if (oldElem) {
		oldElem.style.backgroundColor = oldColor;
	}

	undimScreen();
	document.removeEventListener("mousemove", highlightElement);

	elementPickerRunning = false;
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