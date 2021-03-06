var mImages = null;
var mContextMenuElement = null;

$(document).ready(function() {
    chrome.runtime.sendMessage("getImages", function(response) {
        mImages = response.images;

        for(let i = 0; i < mImages.length; i++) {
            var element = `
                <div class="image">
                    <a>
                        <img id="` + mImages[i].id + `" src="` + mImages[i].url + `" alt="Image missing">
                    </a>
                </div>
            `;
            $(".gallery").append(element);
        }

        $(".footer").click(function() {
            // TODO: Make this an option
            message = {action: "openPage", page: chrome.extension.getURL("slideshow/slideshow.html"), images: shuffle(mImages)};
		    chrome.runtime.sendMessage(message);
        });

        var imageElements = document.getElementsByClassName("image");
        for(var i = 0; i < imageElements.length; i++) {
            $(imageElements[i]).click(function() {
                var url = $(this).find("img").attr('src');
                var index = mImages.map((image) => {return image.url}).indexOf(url);
                message = {action: "openPage", page: chrome.extension.getURL("slideshow/slideshow.html"), 
                    images: mImages, index: index, newTab: false};
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

    var id = mContextMenuElement.attr('id');
    mContextMenuElement.closest(".image").css("display", "none");

    var index = mImages.indexOf(id);
    if (index !== -1) mImages.splice(index, 1);

    chrome.runtime.sendMessage({action: "deleteImage", id: id});
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}