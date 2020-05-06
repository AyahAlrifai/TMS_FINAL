import TmsServices from "../models/TmsServices";
import * as base from "../views/base";
import * as updateProfile from "../views/updateProfile";

const services=new TmsServices();

window.addEventListener("load",()=>{
  localStorage.setItem("new_name",localStorage.getItem("name"));
  localStorage.setItem("new_email",localStorage.getItem("email"));
  localStorage.setItem("new_photo",localStorage.getItem("photo"));
  updateProfile.addProfileInfo();
  document.getElementById("logout").addEventListener("click",()=>{
    localStorage.setItem("id",null);
    localStorage.setItem("name",null);
    localStorage.setItem("email",null);
    localStorage.setItem("password",null);
    localStorage.setItem("photo",null);
    localStorage.setItem("new_name",null);
    localStorage.setItem("new_email",null);
    localStorage.setItem("new_photo",null);
    window.open(`http://localhost:8081`,"_self");
  });
  document.getElementById("profile_button").addEventListener("click",()=> {
    var user=updateProfile.startUpdateProfileInfo();
    document.getElementById("file-input").addEventListener("change",()=>{
      updateProfile.changeProfilePhoto();
    })
    document.getElementById("profile_username").addEventListener("change",()=>{
      updateProfile.changeProfileUserName();
    })
    document.getElementById("profile_email").addEventListener("change",()=>{
      updateProfile.changeProfileEmail();
    })
    document.getElementById("close_button").addEventListener("click",()=>{
      window.open(`http://localhost:8081/home/profile`,"_self");
    })
    document.getElementById("update_button").addEventListener("click",async ()=>{
      var user=updateProfile.endUpdateProfileInfo();
      if(user) {
        var result=await services.updateUserInfo(user);
        if(result!="") {
          localStorage.setItem("email",user["email"]);
          localStorage.setItem("name",user["name"]);
          localStorage.setItem("photo",user["photo"]);
          window.open(`http://localhost:8081/home/profile`,"_self");
        } else {
          base.errorMessage("email_profile_error","Email is already taken")
        }
      }
    })
  });
})
