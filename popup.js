var elementPickerRunning;

var galleryButton = document.getElementById("pickElement");
var savedButton = document.getElementById("viewGallery");

galleryButton.onclick = function() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, "isInjected", function(response) {
			response = response || {};
			if (!response.injected) {
				chrome.tabs.insertCSS(null, {file: 'greyOut.css'}, function() {
					chrome.tabs.executeScript(null, {file: 'jquery-3.3.1.min.js'}, function() {
						chrome.tabs.executeScript(null, {file: 'elementPicker.js'}, toggleElementPicker);
					});
				});
			} else {
				toggleElementPicker();
			}
		});
	});
}

savedButton.onclick = function() {
	chrome.storage.sync.get('savedImages', function(result) {
		images = result.savedImages || [];
		message = {action: "openPage", page: chrome.extension.getURL("gallery.html"), images: images};

		chrome.runtime.sendMessage(message);
	});
}

function toggleElementPicker() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, "toggleElementPicker", {});
	});
}