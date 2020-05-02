import TmsServices from "../models/TmsServices";
import * as TmsView from "../views/TmsView";
import * as ChatBot from "../models/ChatBot";

const services=new TmsServices();
window.addEventListener("load",()=>{
  document.getElementById("login_button").addEventListener("click",async ()=>{
    var loginData=TmsView.readLoginData();
    var user=await services.authentication(loginData);
    if(user) {
      localStorage.setItem("id",user.id);
      localStorage.setItem("name",user.name);
      localStorage.setItem("email",user.email);
      localStorage.setItem("password",user.password);
      localStorage.setItem("photo",user.photo);
      window.open(`http://localhost:8081/home`,"_self");
    } else {
      TmsView.errorMessage("login_error","Incorrect username or password.");
    }
  })
})
