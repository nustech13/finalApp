function checkDelete() {
    var input = document.getElementsByClassName("input-delete-photo")[0];
    if(window.confirm("Do you want to delete this photo?")){
        input.value = "true";
        alert("Deleted photo successfully!")
    }else{
        input.value = "false";
        alert("The deletion of the photo has been canceled!")
    }
}