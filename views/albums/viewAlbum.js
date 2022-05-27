const { lazyrouter } = require("express/lib/application");

function closeAlbum(){
    var b = document.getElementsByClassName("show-photo")[0];
    var innerRemove = document.getElementsByClassName("carousel-inner")[0];
    var slide = document.getElementsByClassName("slide")[0];
    slide.removeChild(innerRemove);
    var inner = document.createElement("div");
    inner.classList.add("carousel-inner");
    slide.appendChild(inner);
    b.classList.remove("show-photo-active");
}
function showAlbum(img, tt, ct){
    var slide = document.getElementsByClassName("carousel-inner")[0];
    var height = document.getElementsByClassName("wrapper")[0];
    var photoShow = document.getElementsByClassName("show-photo")[0];
    var title = document.getElementsByClassName("photo-title-image")[0];
    var length = document.getElementsByClassName("length-album")[0];
    var content = document.getElementsByClassName("photo-content-image")[0];
    var listImage = img.split(",");
    photoShow.classList.add("show-photo-active");
    photoShow.style.height = (height.clientHeight+100) + 'px';
    title.innerHTML = tt;
    content.innerHTML = ct;
    length.innerHTML = listImage.length.toString();
    for(let i = 0; i < listImage.length; i++){
        var div = document.createElement("div");
        div.classList.add("carousel-item");
        if(i === 0){
            div.classList.add("active");
        }
        var pic = document.createElement("img");
        pic.classList.add("d-block")
        pic.classList.add("w-100");
        pic.src = listImage[i];
        div.appendChild(pic)
        slide.appendChild(div);
    }
}
;

