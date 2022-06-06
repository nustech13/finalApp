const MAX_SIZE_IMAGE = 5 * 1024 * 1024;
function setImage(inputFile) {
  var button = document.getElementsByClassName("btn-profile")[0];
  var span = document.getElementsByClassName("mess-profile")[0];
  if (inputFile.files[0].size < MAX_SIZE_IMAGE) {
    button.disabled = false;
    var image = document.getElementsByClassName("image-infor")[0];
    var fReader = new FileReader();
    fReader.readAsDataURL(inputFile.files[0]);
    fReader.onloadend = function (event) {
      image.src = event.target.result;
    };
  } else {
    alert("Avatar photo maximum 2MB!");
    button.disabled = true;
    span.innerHTML = "Please choose photo under 2MB!";
    span.classList.add("error");
  }
}
