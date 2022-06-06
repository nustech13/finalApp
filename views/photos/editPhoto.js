function checkDelete() {
    if(window.confirm("Do you want to delete this photo?")){
        alert("Deleted photo successfully!")
        document.getElementsByClassName("form-delete-photo")[0].submit();
        return true;
    }else{
        alert("The deletion of the photo has been canceled!");
        return false;
    }
}