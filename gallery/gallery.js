var images = null;
var index = 0;

$(document).ready(function() {
    chrome.runtime.sendMessage("getImages", function(response) {
        images = response.images;

        replaceImgElement(images[index]);
    });
});

function replaceImgElement(url) {
    $(".display").remove();
    galleryElement = "<img class=\"display\" src=\"" + url + "\"></img>"
    $(".gallery").append(galleryElement);
}

document.onkeydown = function(event) {
    if (event.keyCode == '37' && index > 0) { //left
        replaceImgElement(images[--index]);
    } else if (event.keyCode == '39' && index < images.length - 1) { //right
        replaceImgElement(images[++index]);
    }
}