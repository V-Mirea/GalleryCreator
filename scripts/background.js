var mImages = null;
var mContextMenus = [];
var mGalleryTitle = null;
var mSecretMode = false;
var mStartIndex = 0;

chrome.contextMenus.create({
    "id": "deleteImage",
    "title": "Delete image",
    "documentUrlPatterns": ["chrome-extension://*/gallery/gallery.html"],
    contexts: ["image"]
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action == "openPage") {
            chrome.tabs.create({url: request.page});
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
        }  else if (request.action == deleteImage) {
            deleteImage(request.url);
        }
    }
);

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId == "saveImage") {
        var message = {action: "saveImage", secret: mSecretMode};
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
                // TODO: check if saved
            });
        });
    }
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
    console.log(activeInfo.tabId);

    chrome.tabs.sendMessage(activeInfo.tabId, "isInjected", function(response) {
        response = response || {};
        if (!response.injected) {
            removeSaveCM();
        } else {
            addSaveCM();
        }
    }); 
});

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
    chrome.storage.local.get("savedImages", function(result) {
		mImages = result.savedImages || [];

        for(var i = 0; i < images.length; i++) {
            if(!mImages.includes(images[i])) {
                mImages.push(images[i]);
            }
        }
        chrome.storage.local.set({"savedImages": mImages});	
	});
}

function deleteImage(url) {
    
}