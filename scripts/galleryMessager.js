var port = chrome.runtime.connect();

window.addEventListener("message", function(event) {

    if (event.source != window || event.origin != "http://soft-taco.com") {
		console.log("Ignored message from " + event.origin);
        return;
	}
	
    if (event.data.type && (event.data.type == "FROM_PAGE")) {
        chrome.runtime.sendMessage({
            action: "loggedIn",
			user: event.data.user
        });
    }
}, false);