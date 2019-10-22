var mImages = null;
var mContextMenus = [];
var mGalleryTitle = null;
var mSecretMode = false;
var mStartIndex = 0;
var mUser = {loggedIn: false, id: "", username: ""};

window.addEventListener('load', function () {
		chrome.contextMenus.create({
		id: "deleteImage",
		title: "Delete image",
		documentUrlPatterns: ["moz-extension://*/gallery/gallery.html"],
		contexts: ["image"]
	}, function() {
		console.log(chrome.runtime.lastError);
	});

	chrome.contextMenus.create({
			id: "saveImage",
			title: "Save image",
			documentUrlPatterns: ["<all_urls>"],
			contexts: ["all"]
		}, function() {
			console.log(chrome.runtime.lastError); // TODO: Make sure this can be ignored
		});
});

// On message from gallery webpage
chrome.runtime.onMessageExternal.addListener(
	function(request, sender, sendResponse) {
		mUser = {loggedIn: true, id: request.userId, username: request.username};
		console.log("User " + request.username + " logged in");
		chrome.sendMessage({action: "userLoggedIn", user: mUser});
		sendResponse({success: true});
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action == "openPage") {
            let newTab = request.newTab;
            if (typeof newTab === 'undefined') newTab = true;
            if (newTab) chrome.tabs.create({url: request.page});
            else chrome.tabs.update({url: request.page});

            mImages = request.images;
            mGalleryTitle = request.title || mGalleryTitle;
            mStartIndex = request.index || 0;
        } else if (request == "getImages") {
            sendResponse({images: mImages, title: mGalleryTitle, index: mStartIndex});
        } else if (request == "addContextMenu") {
            addSaveCM();
        } else if (request == "removeContextMenu") {
            removeSaveCM();
        } else if (request == "getSecretMode") {
            sendResponse(mSecretMode);
        }  else if (request.action == "deleteImage") {
            console.log("got it");
            deleteImage(request.id);
        } else if (request.action == "loadImages") {
            loadImages(request.images);
        } else if (request == "getUser") {
			console.log("returning user");
            sendResponse(mUser);
        } else if (request == "logOut") {
			logOut();
			sendResponse({success: true});
		}
    }
);

function logOut() {
	var data = new FormData();
	data.append("logout", true);
	
	fetch('http://soft-taco.com/login.php', {
		method: 'POST',
		body: data
	}).then(res => {
		console.log(res);
		mUser = {loggedIn: false, id: "", username: ""};
	});
}

function downloadImage(userId, url) {
	let data = JSON.stringify({id: userId, url: url});
	
	console.log("Downloading ", data);
	
	fetch('http://soft-taco.com/save-image.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; utf-8'
		},
		body: data
	}).then(res => {
		console.log("Request complete! response: ", res);
	});
}

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId == "saveImage") {
        var message = {action: "saveImage", secret: mSecretMode};
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
				console.log(mUser);
				if(mUser.loggedIn) {
					downloadImage(mUser.id.toString(), response["image"]);
				}
            });
        });
    }
});

/*
chrome.tabs.onActivated.addListener(function(activeInfo) {
    chrome.tabs.sendMessage(activeInfo.tabId, "isInjected", function(response) {
        if(chrome.runtime.lastError) {
                removeSaveCM();
        } else {
            response = response || {};
            if (!response.injected) {
                removeSaveCM();
            } else {
                addSaveCM();
            }
        }
    }); 
});
*/

chrome.commands.onCommand.addListener(function(command) {
    if (command == "secret-mode") {
        mSecretMode = !mSecretMode;
        var message = "Secret mode is " + (mSecretMode ? "on" : "off");
        alert(message);
    }
});

function addSaveCM() {
    chrome.contextMenus.create({
        id: "saveImage",
        title: "Save image",
        contexts: ["all"]
    }, function() {
        console.log(chrome.runtime.lastError); // TODO: Make sure this can be ignored
    });
}

function removeSaveCM() {
    chrome.contextMenus.remove('saveImage', function() {
        console.log(chrome.runtime.lastError); // TODO: Make sure this can be ignored
    });
}

function loadImages(images) {
    chrome.storage.local.get("secretImages", function(result) {
        mImages = result.savedImages || [];

        for(var i = 0; i < images.length; i++) {
            if(!mImages.includes(images[i])) {
                mImages.push(images[i]);
            }
        }
        chrome.storage.local.set({"secretImages": mImages});	
    });
}

function deleteImage(id) {
    if (mSecretMode) {
        var saveMode = "secretImages";
    } else {
        var saveMode = "savedImages";
    }

    chrome.storage.local.get(saveMode, function(result) {
        console.log (result.length);
        var images = result[saveMode] || [];

        console.log (images.length);
        var imgIndex = images.findIndex(img => {
            return img.id == id;
        });
        console.log(imgIndex);
        if (imgIndex > -1) {
            images.splice(imgIndex, 1);
        }
        console.log (images.length);

        chrome.storage.local.set({[saveMode]: images});
    });
}