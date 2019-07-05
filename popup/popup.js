'use strict';

var mGalleryButton = document.getElementById("pickElement");
var mSaveButton = document.getElementById("saveImages");
var mViewButton = document.getElementById("viewGallery");
var mExportButton = document.getElementById("exportImages");

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

mSaveButton.onclick = function(event) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, "isInjected", function(response) {
			response = response || {};
			if(chrome.runtime.lastError || !response.injected) {
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
	chrome.runtime.sendMessage("getSecretMode", function(secret) {
		if(secret) {
			chrome.storage.local.get('secretImages', function(result) {
				var images = result.secretImages || [];
				var message = {action: "openPage", page: chrome.extension.getURL("gallery/gallery.html"), images: images, title: "Secret Images"};
	
				chrome.runtime.sendMessage(message);
			});
		}else {
			chrome.storage.local.get('savedImages', function(result) {
				var images = result.savedImages || [];
				var message = {action: "openPage", page: chrome.extension.getURL("gallery/gallery.html"), images: images, title: "Saved Images"};
	
				chrome.runtime.sendMessage(message);
			});
		}
	});
}

mExportButton.onclick = function() {
	chrome.storage.local.get('secretImages', function(result) {
		exportImages(result.savedImages); 
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
	chrome.tabs.insertCSS(null, {file: '/scripts/css/greyOut.css'}, function() {
		if(chrome.runtime.lastError) errors.push(chrome.runtime.lastError.message);
		chrome.tabs.executeScript(null, {file: '/scripts/lib/jquery-3.3.1.min.js'}, function() {
			if(chrome.runtime.lastError) errors.push(chrome.runtime.lastError.message);
			chrome.tabs.executeScript(null, {file: '/scripts/elementPicker.js'}, function() {
				if(chrome.runtime.lastError) errors.push(chrome.runtime.lastError.message);		
				errors = errors.filter(function(item, index){ // Remove duplicate errors
					return errors.indexOf(item) >= index;
				});

				for(let i = 0; i < errors.length; i++) { // Display all errors
					console.log(errors[i]); // TODO: Make this appear more centered
				}

				callback();
			});
		});
	});
}

function exportImages(images) {
	images = images || [];
	//var imageString = "" + images;

	var imagesString = "[\n";
	for(var i = 0; i < images.length; i++) {
		imagesString += "'" + images[i] + "',\n";
	}
	imagesString += "]"

	download("SavedImages.txt", imagesString);
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}