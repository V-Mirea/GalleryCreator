var mElementPickerRunning;

var mGalleryButton = document.getElementById("pickElement");
var mSaveButton = document.getElementById("saveImages");
var mViewButton = document.getElementById("viewGallery");

mGalleryButton.onclick = function() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, "isInjected", function(response) {
			response = response || {};
			if (!response.injected) {
				injectScripts(toggleElementPicker);
			} else {
				toggleElementPicker();
			}
		});
	});
}

mSaveButton.onclick = function() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, "isInjected", function(response) {
			response = response || {};
			if (!response.injected) {
				injectScripts( function() {
					chrome.runtime.sendMessage("addContextMenu");
				});
			} else {
				chrome.runtime.sendMessage("addContextMenu");
			}
		});
	});
}

mViewButton.onclick = function() {
	chrome.storage.sync.get('savedImages', function(result) {
		images = result.savedImages || [];
		message = {action: "openPage", page: chrome.extension.getURL("gallery/gallery.html"), images: images};

		chrome.runtime.sendMessage(message);
	});
}

function toggleElementPicker() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, "toggleElementPicker", {});
	});
}

function injectScripts(callback) {
	chrome.tabs.insertCSS(null, {file: 'scripts/css/greyOut.css'}, function() {
		chrome.tabs.executeScript(null, {file: 'scripts/lib/jquery-3.3.1.min.js'}, function() {
			chrome.tabs.executeScript(null, {file: 'scripts/elementPicker.js'}, 
				callback
			);
		});
	});
}