function closeAlbum(){
    var b = document.getElementsByClassName("show-album")[0];
    var innerRemove = document.getElementsByClassName("carousel-inner")[0];
    var slide = document.getElementsByClassName("slide")[0];
    slide.removeChild(innerRemove);
    var inner = document.createElement("div");
    inner.classList.add("carousel-inner");
    slide.appendChild(inner);
    b.classList.remove("show-album-active");
}
function showAlbum(img, tt, ct){
    var slide = document.getElementsByClassName("carousel-inner")[0];
    var height = document.getElementsByClassName("wrapper")[0];
    var photoShow = document.getElementsByClassName("show-album")[0];
    var title = document.getElementsByClassName("album-title-image")[0];
    var length = document.getElementsByClassName("length-album")[0];
    var content = document.getElementsByClassName("album-content-image")[0];
    var listImage = img.split(",");
    photoShow.classList.add("show-album-active");
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
        pic.src = "/" + listImage[i];
        div.appendChild(pic)
        slide.appendChild(div);
    }
};
function pre(){
    var query = window.location.search.substring(1);
    var page = parseInt(query.charAt(query.length-1)) - 1;
    window.location.assign("/albums?page=" + page);
}
function next(){
    var query = window.location.search.substring(1);
    var page = parseInt(query.charAt(query.length-1)) + 1;
    window.location.assign("/albums?page=" + page);
}
