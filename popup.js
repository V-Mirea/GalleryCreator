var elementPickerInjected;
var elementPickerRunning;

chrome.storage.local.get("elementPickerInjected", function(data) {
	if (typeof data.elementPickerInjected === "undefined") {
		chrome.storage.local.set({elementPickerInjected: false});
		elementPickerInjected = false;
	} else {
		elementPickerInjected = data.elementPickerInjected;
	}

	chrome.storage.local.get("elementPickerRunning", function(data) {
		if (typeof data.elementPickerRunning === "undefined") {
			chrome.storage.local.set({elementPickerRunning: false});
			elementPickerRunning = false;
		} else {
			elementPickerRunning = data.elementPickerRunning;
		}

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
	});
});

function toggleElementPicker() {
	var message = elementPickerRunning ? "stopElementPicker" : "runElementPicker";

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
			elementPickerRunning = response.running;
			chrome.storage.local.set({elementPickerRunning: elementPickerRunning});
		});
	});
}