var images = null;

function saveImage(){}

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
        }
    }
);

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId == "saveImage") {
        saveImage();
    }
});