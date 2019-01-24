var images = null;

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action == "openPage") {
            chrome.tabs.create({url: request.page});
            images = request.images;
        } else if (request == "getImages") {
            sendResponse({images: images});
        }
    }
);