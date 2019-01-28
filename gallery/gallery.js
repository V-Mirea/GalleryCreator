var images = null;

$(document).ready(function() {
    chrome.runtime.sendMessage("getImages", function(response) {
        images = response.images;

        for(let i = 0; i < images.length; i++) {
            var element = `
                <div class="image">
                    <a target="_blank" href="` + images[i] + `">
                        <img src="` + images[i] + `" alt="Image missing">
                    </a>
                </div>
            `;
            $(".gallery").append(element);
        }

        $(".footer").click(function() {
            message = {action: "openPage", page: chrome.extension.getURL("slideshow/slideshow.html"), images: images};
		    chrome.runtime.sendMessage(message);
        });
    });
});