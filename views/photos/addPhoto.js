const MAX_SIZE_PHOTO = 5 * 1024 * 1024;
function setImage(inputFile) {
  var button = document.getElementsByClassName("btn-photo")[0];
  var span = document.getElementsByClassName("mess-photo")[0];
  if (inputFile.files[0].size < MAX_SIZE_PHOTO) {
    button.disabled = false;
    button.style.opacity = "1";
    var image = document.getElementsByClassName("upload-img")[0];
    var fReader = new FileReader();
    fReader.readAsDataURL(inputFile.files[0]);
    fReader.onloadend = function (event) {
      image.src = event.target.result;
    };
  } else {
    alert("Maximun size photo is 5MB!");
    button.disabled = true;
    button.style.opacity = "0.7";
    span.innerHTML = "Please choose photo under 5MB!";
    span.classList.add("error");
  }
}
