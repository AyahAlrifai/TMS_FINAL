import TmsServices from "../models/TmsServices";
import * as login from "../views/login";
import * as base from "../views/base";

const services=new TmsServices();
window.addEventListener("load",()=>{
  document.getElementById("login_button").addEventListener("click",async ()=>{
    var loginData=login.readLoginData();
    var user=await services.authentication(loginData);
    if(user) {
      localStorage.setItem("id",user.id);
      localStorage.setItem("name",user.name);
      localStorage.setItem("email",user.email);
      localStorage.setItem("password",user.password);
      localStorage.setItem("photo",user.photo);
      window.open(`http://localhost:8081/home`,"_self");
    } else {
      base.errorMessage("login_error","Incorrect username or password.");
    }
  })
})
