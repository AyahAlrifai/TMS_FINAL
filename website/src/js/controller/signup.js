import TmsServices from "../models/TmsServices";
import * as signup from "../views/signup";
import * as base from "../views/base";

const services=new TmsServices();
window.addEventListener("load",()=>{
  document.getElementById("signup_button").addEventListener("click",async ()=>{
    var signupData=await signup.readSignupData();
    if(signupData){
      var newUser=await services.addNewUser(signupData);
      if(newUser) {
        localStorage.setItem("id",newUser.id);
        localStorage.setItem("password",newUser.password);
        localStorage.setItem("name",newUser.name);
        localStorage.setItem("email",newUser.email);
        localStorage.setItem("photo",newUser.photo);
        window.open(`http://localhost:8081/home`,"_self");
      } else {
        base.errorMessage("signup_error","Sorry. A user with that email address already exists, or the email was invalid.")
      }
    }
  })
})
