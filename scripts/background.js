var mImages = null;
var mContextMenus = [];
var mGalleryTitle = null;

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
        } else if (request == "getImages") {
            sendResponse({images: mImages, title: mGalleryTitle});
        } else if (request == "addContextMenu") {
            addSaveCM();
        } else if (request == "removeContextMenu") {
            removeSaveCM();
        } 
    }
);

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId == "saveImage") {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, "saveImage", function(response) {
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
    if (command == "secret_stash") {
        loadSecretImages();
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
    chrome.storage.local.get('savedImages', function(result) {
		mImages = result.savedImages || [];

        for(var i = 0; i < images.length; i++) {
            if(!mImages.includes(images[i])) {
                mImages.push(images[i]);
            }
        }
        chrome.storage.local.set({'savedImages': mImages});	
	});
}

function loadSecretImages() {
    chrome.storage.local.get('secretImages', function(result) {
		var images = result.secretImages || [];
		var message = {action: "openPage", page: chrome.extension.getURL("gallery/gallery.html"), images: images, title: "Secret Images"};

		chrome.runtime.sendMessage(message);
	});
}