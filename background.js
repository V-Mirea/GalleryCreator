var images = null;

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action == "openPage") {
            chrome.tabs.create({url: request.page});
            images = request.images;
        } else if (request == "getImages") {
            sendResponse({images: images});
        } else if (request == "addContextMenu") {
            chrome.contextMenus.create({
                id: "saveImage",
                title: "Save image",
                contexts:["image"]
            });
        } else if (request == "removeContextMenu") {
            chrome.contextMenus.remove('saveImage');
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