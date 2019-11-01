/* #region  Variable declararion */
var mImages = null;
var mContextMenus = [];
var mGalleryTitle = null;
var mSecretMode = false;
var mStartIndex = 0;
var mUser = { loggedIn: false, id: "", username: "" };
/* #endregion */

/* #region  Message handlers */
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.action == "openPage") {
            let newTab = request.newTab;
            if (typeof newTab === 'undefined') newTab = true;
            if (newTab) chrome.tabs.create({ url: request.page });
            else chrome.tabs.update({ url: request.page });

            mImages = request.images;
            mGalleryTitle = request.title || mGalleryTitle;
            mStartIndex = request.index || 0;
        } else if (request == "getImages") {
            sendResponse({ images: mImages, title: mGalleryTitle, index: mStartIndex });
        } else if (request == "addContextMenu") {
            addSaveCM();
        } else if (request == "removeContextMenu") {
            removeSaveCM();
        } else if (request == "getSecretMode") {
            sendResponse(mSecretMode);
        } else if (request.action == "deleteImage") {
            console.log("got it");
            deleteImage(request.id);
        } else if (request.action == "loadImages") {
            loadImages(request.images);
        } else if (request == "getUser") {
            console.log(mUser);
            sendResponse(mUser);
        } else if (request == "logOut") {
            logOut();
            sendResponse({ success: true });
        } else if (request.action == "loggedIn") {
            mUser = { loggedIn: true, id: request.user.userId, username: request.user.username };
            console.log("User " + request.username + " logged in");
            chrome.runtime.sendMessage({ action: "userLoggedIn", user: mUser }); // Todo: figure out why this throws an error
        }
    }
);
/* #endregion */

/* #region  Event listeners */
chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        id: "deleteImage",
        title: "Delete image",
        documentUrlPatterns: [
            "*://*.soft-taco.com/gallery/index.php",
            "http://192.168.0.152/gallery/index.php"
        ],
        contexts: ["image"]
    }, function () {
        console.log(chrome.runtime.lastError);
    });

    chrome.contextMenus.create({
        id: "saveImage",
        title: "Save image",
        documentUrlPatterns: ["<all_urls>"],
        contexts: ["all"]
    }, function () {
        console.log(chrome.runtime.lastError); // TODO: Make sure this can be ignored
    });
});

chrome.commands.onCommand.addListener(function (command) {
    if (command == "secret-mode") {
        mSecretMode = !mSecretMode;
        var message = "Secret mode is " + (mSecretMode ? "on" : "off");
        alert(message);
    }
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId == "saveImage") {
        var message = { action: "saveImage", secret: mSecretMode };
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
                if (mUser.loggedIn) {
                    downloadImage(mUser.id.toString(), response["image"]);
                }
            });
        });
    } else if (info.menuItemId == "deleteImage") {
        deleteImage();
    }
});
/* #endregion */

/* #region  Online mode */
function logOut() {
    var data = new FormData();
    data.append("logout", true);

    fetch('http://soft-taco.com/login.php', {
        method: 'POST',
        body: data
    }).then(res => {
        console.log(res);
        mUser = { loggedIn: false, id: "", username: "" };
    });
}

function downloadImage(userId, url) {
    let data = JSON.stringify({ action: "save-image", user_id: userId, url: url });

    console.log("Downloading ", data);

    fetch('http://soft-taco.com/save-image.php', {
        method: 'POST',
        body: data
    }).then(res => {
        alert(res.status); //Todo: tell content script to do this
    });
}

function deleteImage() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, "getImageId", function (response) {
            console.log(response.id);
            var imageId = response.id;

            console.log("Deleting image id ", imageId);

            let data = JSON.stringify({ action: "delete-image", image_id: imageId });
            fetch('http://soft-taco.com/save-image.php', {
                method: 'POST',
                body: data
            }).then(res => {
                alert(res.status); //Todo: tell content script to do this
            });
        });
    });
}
/* #endregion */

/* #region  Offline mode */
function loadImages(images) {
    chrome.storage.local.get("secretImages", function (result) {
        mImages = result.savedImages || [];

        for (var i = 0; i < images.length; i++) {
            if (!mImages.includes(images[i])) {
                mImages.push(images[i]);
            }
        }
        chrome.storage.local.set({ "secretImages": mImages });
    });
}

/*
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
*/

/* #endregion */

function messageContentScript(message, callback) {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
			callback(response);
		});
	});
}

/* #region  Temp graveyard */

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

/*
function addSaveCM() {
    chrome.contextMenus.create({
        id: "saveImage",
        title: "Save image",
        contexts: ["all"]
    }, function () {
        console.log(chrome.runtime.lastError); // TODO: Make sure this can be ignored
    });
}

function removeSaveCM() {
    chrome.contextMenus.remove('saveImage', function () {
        console.log(chrome.runtime.lastError); // TODO: Make sure this can be ignored
    });
}
*/
/* #endregion */