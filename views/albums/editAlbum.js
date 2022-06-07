var albumOldLength = 0
function removeImage(no) {
  var listImage = document.getElementsByClassName("image-albums")[0];
  listImage.removeChild(no);
  albumOldLength -= 1;
}
window.addEventListener("load", function(event) {
  albumOldLength = document.getElementsByClassName('label-picture').length;
  console.log(albumOldLength)
  if(albumOldLength === 25){
    var labelUpload = document.getElementsByClassName("label-upload")[0];
    labelUpload.style.display = "none";
  }
});
function setImageEdit(inputFile) {
  var button = document.getElementsByClassName("btn-album")[0];
  var span = document.getElementsByClassName("mess-album")[0];
  if (albumOldLength + inputFile.files.length <= 25) {
    var listImage = document.getElementsByClassName("image-albums")[0];
    var labelUpload = document.getElementsByClassName("label-upload")[0];
    var check = true;
    button.disabled = false;
    button.style.opacity = "1";
    for (const item of inputFile.files) {
      if (item.size > 5 * 1024 * 1024) {
        check = false;
      }
    }
    if (check) {
      for (let index = 0; index < inputFile.files.length; index++) {
        var fReader = new FileReader();
        fReader.readAsDataURL(inputFile.files[index]);
        fReader.onloadend = function (event) {
          var label = document.createElement("label");
          label.classList.add("label-picture");
          var image = document.createElement("img");
          label.appendChild(image);
          listImage.insertBefore(label, labelUpload);
          image.src = event.target.result;
        };
      }
      labelUpload.style.display = "none";
    }else{
      alert("Maximum size photo is 5MB!");
      button.disabled = true;
      button.style.opacity = "0.7";
      span.innerHTML = "Please choose photo under 5MB!";
      span.classList.add("error");
    }
  } else {
    alert("Maximun 25 photos in album!");
    button.disabled = true;
    span.innerHTML = "Please choose maximum 25 photos";
    span.classList.add("error");
  }
}
function checkDelete() {
  if(window.confirm("Do you want to delete this album?")){
      alert("Deleted album successfully!");
      document.getElementsByClassName("form-delete-album")[0].submit();
      return true;
  }else{
      alert("The deletion of the album has been canceled!");
      return false;
  }
}
