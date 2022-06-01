function removeImage(no) {
  var listImage = document.getElementsByClassName("image-albums")[0];
  listImage.removeChild(no);
}
function setImageEdit(inputFile) {
  var listImage = document.getElementsByClassName("image-albums")[0];
  var labelUpload = document.getElementsByClassName("label-upload")[0];
  var fReader = new FileReader();
  fReader.readAsDataURL(inputFile.files[0]);
  fReader.onloadend = function (event) {
    var label = document.createElement("label");
    var image = document.createElement("img");
    var input = document.createElement("input");
    label.classList.add("label-picture");
    label.htmlFor = "imageOld";
    label.onclick = function(){removeImage(label)};
    input.id = "imageOld";
    input.name = "imageOld";
    input.type = "hidden";
    input.value = inputFile.files[0];
    label.appendChild(image);
    label.appendChild(input);
    listImage.insertBefore(label, labelUpload);
    image.src = event.target.result;
  };
  
}
