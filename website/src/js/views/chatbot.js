export const addUserMessage=(date)=>{
  var textarea=document.getElementById("send_mesg");
  var value=textarea.value;
  if(value.replace(/^\s+|\s+$/g,"")!="") {
    document.getElementById("chat_mesgs").insertAdjacentHTML("beforeend",`
    <div class="chat_mesg sb2">${value}  <div class="date_notific">${date}</div> </div>
    `);
    textarea.value="";
    return value;
  }
  textarea.value="";
  return "";
}

export const addBotMessage=(mesg,date) => {
  if(!mesg) {
    mesg="??";
  }
  document.getElementById("chat_mesgs").insertAdjacentHTML("beforeend",`
  <div class="chat_mesg sb1">${mesg} <div class="date_notific">${date}</div> </div>
  `);
}
