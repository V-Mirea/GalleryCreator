var mImages = null;
var mContextMenuElement = null;

$(document).ready(function() {
    chrome.runtime.sendMessage("getImages", function(response) {
        mImages = response.images;

        for(let i = 0; i < mImages.length; i++) {
            var element = `
                <div class="image">
                    <a>
                        <img src="` + mImages[i] + `" alt="Image missing">
                    </a>
                </div>
            `;
            $(".gallery").append(element);
        }

        $(".footer").click(function() {
            message = {action: "openPage", page: chrome.extension.getURL("slideshow/slideshow.html"), images: mImages};
		    chrome.runtime.sendMessage(message);
        });

        var imageElements = document.getElementsByClassName("image");
        for(var i = 0; i < imageElements.length; i++) {
            $(imageElements[i]).click(function() {
                var index = mImages.indexOf($(this).find("img").attr('src'));
                message = {action: "openPage", page: chrome.extension.getURL("slideshow/slideshow.html"), images: mImages, index: index};
                chrome.runtime.sendMessage(message);
            });
        }
    });
});

document.addEventListener("mousedown", function(event) {
    if(event.button == 2) { // right click
        mContextMenuElement = $(event.target); // Keep track of last element user right-clicked 
    }
}, true);

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId == "deleteImage") {
        deleteImage(mContextMenuElement);
    }
});

function deleteImage(element) {
    //console.log($("img[src='" + url + "']"));

    var url = mContextMenuElement.attr('src');
    mContextMenuElement.closest(".image").css("display", "none");

    var index = mImages.indexOf(url);
    if (index !== -1) mImages.splice(index, 1);

    chrome.runtime.sendMessage({action: "deleteImage", url: url});
}