var mImages = null;
var mTitle = null;
var mGalleryIndex = 0;

$(document).ready(function() {
    console.log("Started");
    chrome.runtime.sendMessage("getImages", function(response) {
        mImages = response.images;
        mTitle = response.title || "Slideshow";

        $(".title").text(mTitle);
        for(var i = 0; i < mImages.length; i++) {
            var elem = `
                <li class="img-link">
                </li>
            `;
            elem = $(elem).text(i+1);
            $(".nav-body .links").append(elem);
        }

        replaceImgElement(0);

        var links = document.getElementsByClassName("img-link");
        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener('click', function(event) {
                replaceImgElement($(event.target).text() - 1);
            });
        }
    });
});

function replaceImgElement(index) {
    $(".display").remove();
    galleryElement = "<img class=\"display\" src=\"" + mImages[index] + "\"></img>"
    $(".gallery").append(galleryElement);

    $(".image-count").text(index + 1 + "/" + mImages.length);

    document.getElementsByClassName("img-link")[mGalleryIndex].style.backgroundColor = null;
    mGalleryIndex = index;
    document.getElementsByClassName("img-link")[index].style.backgroundColor = "grey";
}

document.onkeydown = function(event) {
    if (event.keyCode == '37' && mGalleryIndex > 0) { //left
        replaceImgElement(mGalleryIndex - 1);
    } else if (event.keyCode == '39' && mGalleryIndex < mImages.length - 1) { //right
        replaceImgElement(mGalleryIndex + 1);
    }
}