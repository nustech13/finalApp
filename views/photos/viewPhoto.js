function closePhoto(){
    var b = document.getElementsByClassName("show-photo")[0];
    b.classList.remove("show-photo-active");
}
function showPhoto(img, tt, ct){
    var height = document.getElementsByClassName("wrapper")[0];
    var photoShow = document.getElementsByClassName("show-photo")[0];
    var image = document.getElementsByClassName("image-show")[0];
    var title = document.getElementsByClassName("photo-title-image")[0];
    var content = document.getElementsByClassName("photo-content-image")[0];
    photoShow.classList.add("show-photo-active");
    photoShow.style.height = (height.clientHeight+100) + 'px'
    image.src = img;
    title.innerHTML = tt;
    content.innerHTML = ct;
}
function pre(){
    var query = window.location.search.substring(1);
    var page = parseInt(query.charAt(query.length-1)) - 1;
    window.location.assign("/photos?page=" + page);
}
function next(){
    var query = window.location.search.substring(1);
    var page = parseInt(query.charAt(query.length-1)) + 1;
    window.location.assign("/photos?page=" + page);
}