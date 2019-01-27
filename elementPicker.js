var grey_out = document.createElement("div");
grey_out.id = "grey_out";

var elementPickerRunning = false;
var screenDimmed = false;
var oldColor;
var oldElem = null;
var currentElem = null;

var contextMenuElement = null;

var endings = [".jpg", ".png"];

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
		} else if (message == "saveImage") {
			saveImage();

			//sendResponse(contextMenuElement);
		}
	}
);

document.body.onclick = async function(event) {
	if (elementPickerRunning) {
		var images = grabImages($(event.target));

		// Remove any images less than 150x150
		for (var i = images.length - 1; i >= 0; i--) {
			var meta = await getMeta(images[i]);
			if (meta.width <= 150 || meta.height <= 150) { 
				images.splice(i, 1);
			}
		}

		message = {action: "openPage", page: chrome.extension.getURL("gallery.html"), images: images};

		chrome.runtime.sendMessage(message, function(response) {
			stopElementPicker();
		});
	}
}

document.addEventListener("mousedown", function(event){
    if(event.button == 2) { //right click
        contextMenuElement = $(event.target);
    }
}, true);

async function getMeta(url) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
    });
}

function grabImages(target) {
	var images = target.find('img').map(function(){
		return findImage($(this));
	}).get();

	return images;
}

function findImage(target) {
	if (target.parent().is("a")){
		var isImage = false;

		var link = target.parent().attr('href');
		for (let i = 0; i < endings.length; i++) {
			if (link.endsWith(endings[i])) {
				isImage = true;
				break;
			}
		}

		if (isImage) {
			return link;
		} else {
			return target.attr('src');
		}	
	} else if (target.is("img")) {
		return target.attr('src');
	} else {
		var img = target.find("img");
		
		if(img.length > 0) {
			img = img.first();
		} else {
			img = target.siblings().find("img");
			if(img.length > 0) {
				img = img.first();
			}
		}
		return img.attr('src');
	}
}

function saveImage() {
	var imageUrl = findImage(contextMenuElement);

	chrome.storage.sync.get('savedImages', function(result) {
		images = result.savedImages || [];

		if(!images.includes(imageUrl)) {
			images.push(imageUrl);
		}

		chrome.storage.sync.set({'savedImages': images}, function() {
			alert("Image saved: " + imageUrl);
		});
	});
}

function runElementPicker() {
	dimScreen();
	document.addEventListener("mousemove", highlightElement);
	//chrome.runtime.sendMessage("addContextMenu");
	elementPickerRunning = true;
}

function stopElementPicker() {
	if (oldElem) {
		oldElem.style.backgroundColor = oldColor;
	}

	undimScreen();
	document.removeEventListener("mousemove", highlightElement);
	//chrome.runtime.sendMessage("removeContextMenu");

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