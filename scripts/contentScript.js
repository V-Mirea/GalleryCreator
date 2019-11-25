var mGreyOut = document.createElement("div");
mGreyOut.id = "grey_out";

var mElementPickerRunning = false;
var mScreenDimmed = false;
var mOldBgColor = null;
var mOldElem = null;
var mCurrentElem = null;
var mContextMenuElement = null;

const IMAGE_ENDINGS = [".jpg", ".png"];
const GALLERY_PAGE = "gallery/gallery.html";

chrome.runtime.onMessage.addListener(
	function (message, sender, sendResponse) {
		if (message == "toggleElementPicker") {
			if (mElementPickerRunning) {
				stopElementPicker();	
			} else {
				runElementPicker();		
			}
			sendResponse({toggled: true});	
		} else if (message == "isInjected") {
			sendResponse({injected: true});
		} else if (message.action == "saveImage") {
			//saveImage(message.secret);
			//Todo: implement toggle to save image online or offline

			// TODO: Might need to send response
			sendResponse({image: findImage(mContextMenuElement)});
		} else if (message == "getImageId") {
			var id = mContextMenuElement.attr('id');
			console.log(id);
			sendResponse({id: id});
		}
	}
);

document.body.onclick = async function(event) {
	if (mElementPickerRunning) {
		var images = grabImages($(event.target));

		// Remove any images less than 150x150
		for (var i = images.length - 1; i >= 0; i--) {
			var meta = await getMeta(images[i]);
			if (meta.width <= 150 || meta.height <= 150) { 
				images.splice(i, 1);
			}
		}

		message = {action: "openPage", page: chrome.extension.getURL(GALLERY_PAGE), images: images, title: document.title};

		chrome.runtime.sendMessage(message, function(response) {
			stopElementPicker();
		});
	}
}

document.addEventListener("mousedown", function(event){
	if(event.button == 2) { //right click
		// Keep track of last element to be rightclicked for the context menu
        mContextMenuElement = $(event.target);
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
		for (let i = 0; i < IMAGE_ENDINGS.length; i++) {
			if (link.endsWith(IMAGE_ENDINGS[i])) {
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

function saveImage(secret) {
	// TODO: Notify on duplicate
	var imageUrl = findImage(mContextMenuElement);
	var image = {
		id: Math.random().toString(36).substr(2, 9),
		url: imageUrl,
		tags: []
	}
	
	//downloadImage(imageUrl);

	if(!secret) {
		chrome.storage.local.get('savedImages', function(result) {
			mImages = result.savedImages || [];

			if(!mImages.includes(image)) {
				mImages.push(image);
			}

			chrome.storage.local.set({'savedImages': mImages}, function() {
				if(chrome.runtime.lastError) {
					alert(chrome.runtime.lastError);
				} else {
					alert("Image saved: " + imageUrl);
				}
			});
		});
	} else {
		chrome.storage.local.get('secretImages', function(result) {
			mImages = result.secretImages || [];

			if(!mImages.includes(image)) {
				mImages.push(image);
			}

			chrome.storage.local.set({'secretImages': mImages}, function() {
				if(chrome.runtime.lastError) {
					alert(chrome.runtime.lastError);
				} else {
					alert("Image saved to secret: " + imageUrl);
				}
			});
		});
	}
}

function runElementPicker() {
	dimScreen();
	document.addEventListener("mousemove", highlightElement);

	mElementPickerRunning = true;
}

function stopElementPicker() {
	if (mOldElem) {
		mOldElem.style.backgroundColor = mOldBgColor;
	}
	undimScreen();
	document.removeEventListener("mousemove", highlightElement);

	mElementPickerRunning = false;
}

function highlightElement(event) {
	var x = event.clientX;
	var y = event.clientY;
	
	mCurrentElem = document.elementFromPoint(x, y);
	if (mCurrentElem != mOldElem) {
		if (mOldElem) {
			mOldElem.style.backgroundColor = mOldBgColor;
		}
		
		mOldBgColor = mCurrentElem.style.backgroundColor;
		mOldElem = mCurrentElem;
		
		mCurrentElem.style.backgroundColor = "#FDFF47";
	}
}

function dimScreen() {
	while (document.body.firstChild) {
		mGreyOut.appendChild(document.body.firstChild);
	}
	document.body.appendChild(mGreyOut);

	mScreenDimmed = true;
}

function undimScreen() {
	var dim = document.getElementById("grey_out");
	while (dim.firstChild) {
		document.body.appendChild(dim.firstChild);
	}
	document.body.removeChild(dim);

	mScreenDimmed = false;
}