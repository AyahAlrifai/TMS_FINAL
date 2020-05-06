import * as base from "./base";

export const readSignupData=async ()=>{
  var name=document.getElementById("signup_username").value;
  if(name==""){
    base.errorMessage("signup_error","please fill in User name field");
    return null;
  }
  var email=document.getElementById("signup_email").value;
  if(email=="") {
    base.errorMessage("signup_error","please fill in Email field");
    return null;
  }
  var password=document.getElementById("signup_password").value;
  if(password=="") {
    base.errorMessage("signup_error","please fill in Password field");
    return null;
  } else if(password.length<8) {
    base.errorMessage("signup_error","Password must be greater than 8");
    return null;
  }
  var photo=document.getElementById("signup_photo");
  var photoContents;
  if(photo.files[0]){
    if(photo.files[0].size>16777215) {
      base.errorMessage("signup_error","image size must be less than 15 MB");
      return null;
    }
    photoContents = await base.readUploadedFileAsDataURL(photo.files[0]);
  }
  return {
    "email":email,
    "name":name,
    "password":password,
    "photo":photoContents?photoContents.split(",")[1]:""
  }
}
