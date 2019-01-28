var mImages = null;
var mTitle = null;
var index = 0;

$(document).ready(function() {
    chrome.runtime.sendMessage("getImages", function(response) {
        mImages = response.images;
        mTitle = response.title || "Slideshow";

        $(".title").text(mTitle);
        replaceImgElement(mImages[index]);
    });
});

function replaceImgElement(url) {
    $(".display").remove();
    galleryElement = "<img class=\"display\" src=\"" + url + "\"></img>"
    $(".gallery").append(galleryElement);
}

document.onkeydown = function(event) {
    if (event.keyCode == '37' && index > 0) { //left
        replaceImgElement(mImages[--index]);
    } else if (event.keyCode == '39' && index < mImages.length - 1) { //right
        replaceImgElement(mImages[++index]);
    }
}