function setImage(inputFile) {
  var listImage = document.getElementsByClassName("image-albums")[0];
  var labelUpload = document.getElementsByClassName("label-upload")[0];
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
}
