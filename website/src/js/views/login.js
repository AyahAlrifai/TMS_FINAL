export const readLoginData=()=>{
  var email=document.getElementById("login_email").value;
  var password=document.getElementById("login_password").value;
  return {
    "email":email,
    "password":password
  }
}
