function closePhoto(){
    var b = document.getElementsByClassName("show-photo")[0];
    b.classList.remove("show-photo-active");
}
function showPhoto(img){
    var a = document.getElementsByClassName("wrapper")[0];
    var b = document.getElementsByClassName("show-photo")[0];
    var c = document.getElementsByClassName("image-show")[0];
    b.classList.add("show-photo-active");
    b.style.height = (a.clientHeight+100) + 'px'
    c.src = img;
}

