chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action == "openPage") {
            chrome.tabs.create({url: request.page});
        }
    }
);