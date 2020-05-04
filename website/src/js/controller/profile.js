import TmsServices from "../models/TmsServices";
import * as TmsView from "../views/TmsView";
import * as ChatBot from "../models/ChatBot";
const services=new TmsServices();

window.addEventListener("load",()=>{
  TmsView.addProfileInfo();
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
    var user=TmsView.startUpdateProfileInfo();
    document.getElementById("file-input").addEventListener("change",()=>{
      TmsView.changeProfilePhoto();
    })
    document.getElementById("profile_username").addEventListener("change",()=>{
      TmsView.changeProfileUserName();
    })
    document.getElementById("profile_email").addEventListener("change",()=>{
      TmsView.changeProfileEmail();
    })
    document.getElementById("close_button").addEventListener("click",()=>{
      window.open(`http://localhost:8081/home/profile`,"_self");
    })
    document.getElementById("update_button").addEventListener("click",async ()=>{
      var user=TmsView.endUpdateProfileInfo();
      if(user) {
        var result=await services.updateUserInfo(user);
        if(result!="") {
          localStorage.setItem("email",user["email"]);
          localStorage.setItem("name",user["name"]);
          localStorage.setItem("photo",user["photo"]);
          window.open(`http://localhost:8081/home/profile`,"_self");
        } else {
          TmsView.errorMessage("email_profile_error","Email is already taken")
        }
      }
    })
  });
})
