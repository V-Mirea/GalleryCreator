var elementPickerInjected = false;
var elementPickerRunning = false;
var button = document.getElementById("pickElement");

button.onclick = function() {
	if (!elementPickerInjected) {
		chrome.tabs.insertCSS(null, {file: 'greyOut.css'}, function() {
			chrome.tabs.executeScript(null, {file: 'jquery-3.3.1.min.js'}, function() {
				chrome.tabs.executeScript(null, {file: 'elementPicker.js'}, toggleElementPicker);
			});
		});
	} else {
		toggleElementPicker();
	}
}

function toggleElementPicker() {
	var message = elementPickerRunning ? "stopElementPicker" : "runElementPicker";

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
			elementPickerRunning = response.running;
		});
	});
}