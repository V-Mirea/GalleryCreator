chrome.runtime.onMessage.addListener(
	function(message, callback) {
		if (message == 'runElementPicker') { // Todo: Make sure it's not a chrome:// page
			chrome.tabs.insertCSS(null, {file: 'greyOut.css'}, function() {
				chrome.tabs.executeScript(null, {file: 'jquery-3.3.1.min.js'}, function() {
					chrome.tabs.executeScript(null, {file: 'elementPicker.js'});
				});
			});
		}
	}
);