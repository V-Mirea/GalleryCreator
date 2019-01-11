var button = document.getElementById("pickElement");

button.onclick = function() {
	chrome.runtime.sendMessage("runElementPicker");
}