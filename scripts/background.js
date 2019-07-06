import * as Messager from '../modules/messager.js';

var mImages = null;
var mContextMenus = [];
var mGalleryTitle = null;
var mSecretMode = false;
var mStartIndex = 0;

chrome.contextMenus.create({
    "id": "deleteImage",
    "title": "Delete image",
    "documentUrlPatterns": ["moz-extension://*/gallery/gallery.html"],
    contexts: ["image"]
}, function() {
    console.log(chrome.runtime.lastError);
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
        } 
    }
);

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId == "saveImage") {
        var message = {action: "saveImage", secret: mSecretMode};
        Messager.messageContentScript(message, function(response) {
            // TODO: check if saved
        });
    }
});

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