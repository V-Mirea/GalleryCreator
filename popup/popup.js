import * as Messager from '../modules/messager.js';

'use strict';

/**
 * Variable declarations
 */
var mGalleryButton = document.getElementById("pickElement");
var mSaveButton = document.getElementById("saveImages");
var mViewButton = document.getElementById("viewGallery");
var mExportButton = document.getElementById("exportImages");

/**
 * Gallery button click
 */
mGalleryButton.onclick = function() {
	Messager.messageContentScript("isInjected", 
		function(response) {
			response = response || {};
			if (!response.injected) {
				injectScripts(toggleElementPicker);
			} else {
				toggleElementPicker();
			}
		}
	);
}

mSaveButton.onclick = function(event) {
	Messager.messageContentScript("isInjected", 
		function(response) {
			response = response || {};
			if(chrome.runtime.lastError || !response.injected) {
				injectScripts(function() {
					Messager.messageBackgroundScript("addContextMenu");
				});
        	} else {
				Messager.messageBackgroundScript("addContextMenu");
			}
		}
	);
}

mViewButton.onclick = function() {
	Messager.messageBackgroundScript("getSecretMode", function(secret) {
		if(secret) {
			chrome.storage.local.get('secretImages', function(result) {
				var images = result.secretImages || [];
				var message = {action: "openPage", page: chrome.extension.getURL("gallery/gallery.html"), images: images, title: "Secret Images"};
	
				Messager.messageBackgroundScript(message);
			});
		} else {
			chrome.storage.local.get('savedImages', function(result) {
				var images = result.savedImages || [];
				var message = {action: "openPage", page: chrome.extension.getURL("gallery/gallery.html"), images: images, title: "Saved Images"};
	
				Messager.messageBackgroundScript(message);
			});
		}
	});
}

mExportButton.onclick = function() {
	var saveMode;
	Messager.messageBackgroundScript("getSecretMode", function(secret) {
		if (secret) {
			chrome.storage.local.get("secretImages", function(result) {
				exportImages(result["secretImages"]); 
			});
		} else {
			chrome.storage.local.get("savedImages", function(result) {
				exportImages(result["savedImages"]); 
			});
		}
	});
}

function toggleElementPicker() {
	Messager.messageContentScript("toggleElementPicker", function(response) {
		response = response || {};
		if(response.toggled) {
			const MESSAGES = ["Create a gallery", "Cancel gallery"];
			var text = document.getElementById("pickElement").innerHTML;
			document.getElementById("pickElement").innerHTML = (text==MESSAGES[0]) ? MESSAGES[1] : MESSAGES[0];
		}
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
		imagesString += JSON.stringify(images[i]) + ",\n";
	}
	imagesString += "]"

	download("SavedImages.json", imagesString);
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