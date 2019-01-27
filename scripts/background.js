var images = null;
var contextMenus = [];

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action == "openPage") {
            chrome.tabs.create({url: request.page});
            images = request.images;
        } else if (request == "getImages") {
            sendResponse({images: images});
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
                // check if saved
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

function addSaveCM() {
    chrome.contextMenus.create({
        id: "saveImage",
        title: "Save image",
        contexts:["all"]
    });
}

function removeSaveCM() {
    chrome.contextMenus.remove('saveImage');
}