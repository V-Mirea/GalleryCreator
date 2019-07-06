export function messageContentScript(message, callback) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message, callback);
    });
}

export function messageBackgroundScript(message, callback) {
    chrome.runtime.sendMessage(message, callback);
}