'use strict';
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
	chrome.storage.local.get('savedImages', function(result) {
		var images = result.savedImages || [];
		var message = {action: "openPage", page: chrome.extension.getURL("gallery/gallery.html"), images: images, title: "Saved Images"};

		chrome.runtime.sendMessage(message);
	});
}

function toggleElementPicker() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, "toggleElementPicker", function(response) {
			response = response || {};
			if(response.toggled) {
				const MESSAGES = ["Create a gallery", "Cancel gallery"];
				var text = document.getElementById("pickElement").innerHTML;
				document.getElementById("pickElement").innerHTML = (text==MESSAGES[0]) ? MESSAGES[1] : MESSAGES[0];
			}
		});
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