import * as base from "./base";
export const addProfileInfo=() =>{
  var image="";
  if(localStorage.getItem("photo")) {
    image=`<img src="data:image/png;base64,${localStorage.getItem("photo")}" class="profile_image rounded-circle">`
  } else {
    image=`<img src="../img/profile.png" class="profile_image rounded-circle">`
  }
  var html=`
  <div class="profile_style">
    <div style="font-family:'Dekko';text-align:center;font-size:1.5em;color:#00F97D">
      Profile Infotmation
    </div>
    <hr style="background-color:#ffffff;">
    ${image}
    <div>
      <div class="form-group">
        <label for="profile_username">UserName:</label>
        <input id="profile_username" type="text" class="form-control" placeholder="${localStorage.getItem("name")}" disabled>
      </div>
      <div class="form-group">
        <label for="profile_email">Email address:</label>
        <input id="profile_email" type="email" class="form-control" placeholder="${localStorage.getItem("email")}" disabled>
      </div>
      <br>
      <div class="form-group" style="display:none">
        <label for="profile_photo">photo:</label>
        <input type="file" name="profile_photo"  id="profile_photo">
      </div>
      <div class="error" id="profile_error" style="display:none">
      </div>
      <br>
      <button id="profile_button" type="submit" class="btn login_button">update</button>
      <br><br>
    </div>
  </div>
  `;
  document.getElementsByTagName("body")[0].insertAdjacentHTML("afterbegin",html);
}

export const startUpdateProfileInfo=()=>{
  var image="";
  if(localStorage.getItem("photo")) {
    image=`<img id="profile_image" src="data:image/png;base64,${localStorage.getItem("photo")}" class="profile_image rounded-circle">`
  } else {
    image=`<img id="profile_image" src="../img/profile.png" class="profile_image rounded-circle">`
  }
  var html=`
    <div style="font-family:'Dekko';text-align:center;font-size:1.5em;color:#00F97D">
      Profile Infotmation
    </div>
    <hr style="background-color:#ffffff;">
    <div class="image-upload profile_image rounded-circle">
      <label for="file-input">
      ${image}
      </label>
      <input id="file-input" type="file" />
    </div>
    <div class="error" id="image_profile_error"  style="text-align:center;"></div>
    <div>
      <div class="form-group">
        <label for="profile_username">UserName:</label>
        <input id="profile_username" type="text" class="form-control" value="${localStorage.getItem("name")}" ">
      </div>
      <div class="error" id="username_profile_error"></div>
      <div class="form-group">
        <label for="profile_email">Email address:</label>
        <input id="profile_email" type="email" class="form-control" value="${localStorage.getItem("email")}" ">
      </div>
      <div class="error" id="email_profile_error"></div>
      <div class="form-group">
        <label for="profile_password">password:</label>
        <input id="profile_password" type="password" class="form-control" placeholder="insert your password">
      </div>
      <div class="error" id="password_profile_error"></div>
      <button id="update_button" type="submit" class="btn login_button">update</button>
      <button id="close_button" type="submit" class="btn login_button">close</button>
      <br><br>
    </div>
  `;
  document.getElementsByClassName("profile_style")[0].innerHTML="";
  document.getElementsByClassName("profile_style")[0].insertAdjacentHTML("afterbegin",html);
}

export const changeProfilePhoto=async ()=>{
  base.errorMessage("image_profile_error","");
  var photo=document.getElementById("file-input");
  var photoContents;
  if(photo.files[0]){
    if(photo.files[0].size>16777215) {
      localStorage.setItem("new_photo",localStorage.getItem("photo"));
      base.errorMessage("image_profile_error","image size must be less than 15 MB");
    } else {
      photoContents = await base.readUploadedFileAsDataURL(photo.files[0]);
      document.getElementById("profile_image").setAttribute("src",photoContents);
      localStorage.setItem("new_photo",photoContents.split(",")[1]);
    }
  }
}

export const changeProfileUserName=()=> {
  base.errorMessage("username_profile_error","");
  var name=document.getElementById("profile_username").value;
  if(name){
    localStorage.setItem("new_name",name);
  } else {
    localStorage.setItem("new_name",localStorage.getItem("name"));
    base.errorMessage("username_profile_error","please fill in User name field");
  }
}

export const changeProfileEmail=()=>{
  base.errorMessage("email_profile_error","");
  var email=document.getElementById("profile_email").value;
  if(email) {
    localStorage.setItem("new_email",email);
  } else {
    localStorage.setItem("new_email",localStorage.getItem("email"));
    base.errorMessage("email_profile_error","please fill in Email field");
  }
}

export const endUpdateProfileInfo=()=>{
  if(document.getElementById("image_profile_error").innerHTML=="" && document.getElementById("username_profile_error").innerHTML=="" && document.getElementById("email_profile_error").innerHTML=="") {
    var pass=document.getElementById("profile_password").value;
    if(pass===localStorage.getItem("password")) {
      var new_photo=localStorage.getItem("new_photo");
      var new_name=localStorage.getItem("new_name");
      var new_email=localStorage.getItem("new_email");
      var user={
        "id":localStorage.getItem("id"),
        "name":new_name,
        "email":new_email,
        "password":pass,
        "photo":new_photo
      };
      return user;
    } else if(pass==""){
      base.errorMessage("password_profile_error","please fill in password field");
      return null;
    } else {
      base.errorMessage("password_profile_error","please enter correct password");
      return null;
    }
  }
}
