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
				injectScripts(function() {
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
		mImages = result.savedImages || [];
		message = {action: "openPage", page: chrome.extension.getURL("gallery/gallery.html"), images: mImages, title: "Saved Images"};

		chrome.runtime.sendMessage(message);
	});
}

function toggleElementPicker() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, "toggleElementPicker", {});
	});
}

function injectScripts(callback) {
	var errors = [];
	chrome.tabs.insertCSS(null, {file: 'scripts/css/greyOut.css'}, function() {
		if(chrome.runtime.lastError) errors.push(chrome.runtime.lastError.message);
		chrome.tabs.executeScript(null, {file: 'scripts/lib/jquery-3.3.1.min.js'}, function() {
			if(chrome.runtime.lastError) errors.push(chrome.runtime.lastError.message);
			chrome.tabs.executeScript(null, {file: 'scripts/elementPicker.js'}, function() {
				if(chrome.runtime.lastError) errors.push(chrome.runtime.lastError.message);		
				errors = errors.filter(function(item, index){ // Remove duplicate errors
					return errors.indexOf(item) >= index;
				});

				for(let i = 0; i < errors.length; i++) { // Display all errors
					alert(errors[i]); // TODO: Make this appear more centered
				}

				callback();
			});
		});
	});
}