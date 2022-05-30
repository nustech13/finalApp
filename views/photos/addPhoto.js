function setImage(inputFile){
    var image = document.getElementsByClassName("upload-img")[0];
    var fReader = new FileReader();
    fReader.readAsDataURL(inputFile.files[0]);
    fReader.onloadend = function(event){
        image.src = event.target.result;
    }
}

