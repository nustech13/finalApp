const MAX_SIZE_PHOTO = 5 * 1024 * 1024;
const MAX_LENGTH_ALBUM = 25;
function setImage(inputFile) {
  if (inputFile.files.length <= MAX_LENGTH_ALBUM) {
    var listImage = document.getElementsByClassName("image-albums")[0];
    var labelUpload = document.getElementsByClassName("label-upload")[0];
    var check = true;
    for (const item of inputFile.files) {
      if (item.size > MAX_SIZE_PHOTO) {
        check = false;
      }
    }
    if (check) {
      for (let index = 0; index < inputFile.files.length; index++) {
        var fReader = new FileReader();
        fReader.readAsDataURL(inputFile.files[index]);
        fReader.onloadend = function (event) {
          var label = document.createElement("label");
          var image = document.createElement("img");
          label.appendChild(image);
          listImage.insertBefore(label, labelUpload);
          image.src = event.target.result;
        };
      }
      labelUpload.style.display = "none";
    }else{
      alert("Maximun size photo is 5MB!");
    }
  } else {
    alert("Maximun 25 photos in album!");
  }
}
