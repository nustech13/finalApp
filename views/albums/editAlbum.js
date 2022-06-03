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
  if (albumOldLength + inputFile.files.length <= 25) {
    var listImage = document.getElementsByClassName("image-albums")[0];
    var labelUpload = document.getElementsByClassName("label-upload")[0];
    var check = true;
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
      alert("Maximun size photo is 5MB!");
    }
  } else {
    alert("Maximun 25 photos in album!");
  }
}
function checkDelete() {
  var input = document.getElementsByClassName("input-delete-album")[0];
  if(window.confirm("Do you want to delete this album?")){
      input.value = "true";
      alert("Deleted album successfully!")
  }else{
      input.value = "false";
      alert("The deletion of the album has been canceled!")
  }
}
