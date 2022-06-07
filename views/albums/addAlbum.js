const MAX_SIZE_PHOTO = 5 * 1024 * 1024;
const MAX_LENGTH_ALBUM = 25;
function setImage(inputFile) {
  var button = document.getElementsByClassName("btn-album")[0];
  var span = document.getElementsByClassName("mess-album")[0];
  if (inputFile.files.length <= MAX_LENGTH_ALBUM) {
    var listImage = document.getElementsByClassName("image-albums")[0];
    var labelUpload = document.getElementsByClassName("label-upload")[0];
    var check = true;
    button.disabled = false;
    button.style.opacity = "1";
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
    } else {
      alert("Maximum size photo is 5MB!");
      button.disabled = true;
      button.style.opacity = "0.7";
      span.innerHTML = "Please choose photo under 5MB!";
      span.classList.add("error");
    }
  } else {
    alert("Maximum 25 photos in album!");
    button.disabled = true;
    span.innerHTML = "Please choose maximum 25 photos!";
    span.classList.add("error");
  }
}
