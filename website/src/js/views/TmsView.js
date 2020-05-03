import fuctbase64 from "fuctbase64";

const elementsForAddTransaction={
  "category":document.getElementById('select_transaction_category'),
  "amount":document.getElementById('select_transaction_amount'),
  "date":document.getElementById('select_tarnsaction_date'),
  "paymentMethod":document.getElementById('select_tarnsaction_paymentMethod'),
  "comment":document.getElementById('select_transaction_comment'),
  "button":document.getElementById("add_transaction_button")
}

const elementsForAddCategory={
  "value":document.getElementById('select_category_value'),
  "iconPath":document.getElementById('select_category_icon')
}
/////////////////////////////// initial functions //////////////////////////////
export const renderTransactions = (transactions) => {
  var body=document.getElementById('transaction_body');
  body.innerHTML="";
  for(var i=0;i<transactions.length;i++) {
    var icon;
    if(transactions[i]["category"]["iconPath"]) {
      icon=`
      <img src="data:image/png;base64,${transactions[i]["category"]["iconPath"]}" class="rounded-circle" alt="" width="30" height="30" />
      `;
    } else {
      icon=`
      <img src="img/icon.png" class="rounded-circle" alt="" width="30" height="30" />
      `;
    }
    var html=`
    <tr id="${i}">
      <td>${transactions[i]["type"]==15?"income":"expense"}</td>
      <td>
      ${icon}
      </td>
      <td>${transactions[i]["category"]["value"]}</td>
      <td>${Math.abs(transactions[i]["amount"])+"JD"}</td>
      <td>${transactions[i]["date"]}</td>
      <td>${transactions[i]["comment"]}</td>
      <td><p>${transactions[i]["paymentMethod"]?(transactions[i]["paymentMethod"]==13?"Cash":"Visa"):"..."}</p></td>
      <td id="transaction_month_frequent_${i}">${transactions[i]["monthFrequent"]?transactions[i]["monthFrequent"]:"..."}</td>
      <td id="edit_frequent_${i}"><i  id="${i}" class="material-icons icon edit_frequent"> &#xe869;</i></td>
    </tr>
    `;
    body.insertAdjacentHTML("beforeend",html);
    }
}

export const renderTotalBalance = (totalBalance) => {
  var total=document.getElementById('total_balance');
  total.innerHTML="Total Balance:"+totalBalance+"JD";

}

export const renderIncomeCategories= (income) => {
  var body=document.getElementById('income_body');
  if(income.length!=0)
    body.innerHTML="";
  for(var i=0;i<income.length;i++) {
    if(income[i]!=null) {
      var icon;
      if(income[i]["iconPath"]) {
      icon=`
      <img src="data:image/png;base64,${income[i]["iconPath"]}" class="rounded-circle" alt="" width="30" height="30" />
      `;
      } else {
      icon=`
      <img src="img/icon.png" class="rounded-circle" alt="" width="30" height="30" />
      `;
      }
      var html=`
      <tr id="${i}">
        <td>${i+1}</td>
        <td id="income_value_${i}">${income[i]["value"]}</td>
        <td id="income_icon_${i}">
          ${icon}
        </td>
        <td id="income_edit_update_${i}">
          <i class="material-icons icon update_category" id="income/${i}">&#xe869;</i>
          &nbsp;
          <a><i class="material-icons icon delete_category" id="income/${i}">delete</i></a>
        </td>
      </tr>
      `;
      body.insertAdjacentHTML("beforeend",html);
    }
  }
}

export const renderExpenseCategories= (expense) => {
  var body=document.getElementById('expense_body');
  if(expense.length!=0)
    body.innerHTML="";
  for(var i=0;i<expense.length;i++) {
    if(expense[i]!=null) {
      var icon;
      if(expense[i]["iconPath"]) {
      icon=`
      <img src="data:image/png;base64,${expense[i]["iconPath"]}" class="rounded-circle" alt="" width="30" height="30" />
      `;
      } else {
      icon=`
      <img src="img/icon.png" class="rounded-circle" alt="" width="30" height="30" />
      `;
      }
      var html=`
      <tr id="${i}">
        <td>${i+1}</td>
        <td id="expense_value_${i}">${expense[i]["value"]}</td>
        <th id="expense_icon_${i}">
          ${icon}
        </th>
        <td id="expense_edit_update_${i}">
          <i class="material-icons icon update_category" id="expense/${i}">&#xe869;</i>
          &nbsp;
          <a><i class="material-icons icon delete_category" id="expense/${i}">delete</i></a>
        </td>
      </tr>
      `;
      body.insertAdjacentHTML("beforeend",html);
    }
  }
}
///////////////////////////// error detiction //////////////////////////////////
export const errorMessage=(id,message) => {
  document.getElementById(id).innerHTML=message;
}
///////////////////////////// add transaction //////////////////////////////////
export const updateAddTransactionView= (value) => {
  errorMessage("transaction_error","");
 if(value==16 || value==15) {
   for (const element in elementsForAddTransaction) {
     elementsForAddTransaction[element].disabled=false;
    }
   if(value==15) {
     elementsForAddTransaction.paymentMethod.disabled=true;
   }
  } else {
     clearAddTransactionForm();
  }
}

export const addSelectionForCategory= (categories) => {
 var html=`
 `;
 for (const category in categories) {
   if(categories[category]!=null)
     html+=`
        <option value="${categories[category].id}">${categories[category].value}</option>
     `;
  }
  elementsForAddTransaction.category.innerHTML="";
  elementsForAddTransaction.category.insertAdjacentHTML("beforeend",html)
}

export const clearAddTransactionForm= () => {
  document.getElementById("select_transaction_type").value="default";
  elementsForAddTransaction.category.innerHTML="";
  for (const element in elementsForAddTransaction) {
    elementsForAddTransaction[element].value="";
    elementsForAddTransaction[element].disabled=true;
  }
  elementsForAddTransaction["paymentMethod"].value=13;
}

export const addTransaction= () => {
  var transaction={}
  var type=document.getElementById("select_transaction_type").value;
  var amount=elementsForAddTransaction["amount"].value;
  var category=elementsForAddTransaction["category"].value;
  var date=elementsForAddTransaction["date"].value;
  var comment=elementsForAddTransaction["comment"].value;
  var paymentMethod=elementsForAddTransaction["paymentMethod"].value;;
  errorMessage("transaction_error","");

  //amount
  if(amount=="") {
    errorMessage("transaction_error","can't insert empty amount");
    return null;
  } else if(amount<=0) {
    errorMessage("transaction_error","amount must be greater than zero");
    return null;
  } else{
    transaction["amount"]=parseFloat(amount);
  }

  //category
  transaction["category"]={
    "id":parseInt(category)
  }


    //payment Method
    if(type==16) {
    transaction["paymentMethod"]=parseInt(paymentMethod);
    transaction["amount"]=-1*transaction["amount"];
    }
    //Date
    var arrayDate=date.split("-");
    if(date=="") {
      errorMessage("transaction_error","you must choose date of this transaction");
      return null;
    } else if(new Date(arrayDate[0],arrayDate[1]-1,arrayDate[2]) > new Date(new Date().toDateString())) {
      errorMessage("transaction_error","can't insert date in future");
      return null;
    } else {
      transaction["date"]=date;
    }

    //Comment
    transaction["comment"]=comment;
    removeFilterTransactionForm();
    return transaction;
}
/////////////////////////////// add category ///////////////////////////////////
export const updateAddCategoryView= (value) => {
  errorMessage("category_error","");
 if(value==16 || value==15) {
   for (const element in elementsForAddCategory) {
     elementsForAddCategory[element].disabled=false;
    }
  } else {
     clearAddCategoryForm();
  }
}

export const clearAddCategoryForm= () => {
  document.getElementById("select_category_type").value="default";
  for (const element in elementsForAddCategory) {
    elementsForAddCategory[element].value="";
    elementsForAddCategory[element].disabled=true;
  }
}

export const addCategory=async () => {
  errorMessage("category_error","");
  var category={
    "type":document.getElementById("select_category_type").value,
    "value":"",
    "iconPath":""
  }

  //iconPath
  var iconPath;
  var file = elementsForAddCategory["iconPath"].files[0];
  try {
    if(elementsForAddCategory["iconPath"].value!="") {
      const fileContents = await readUploadedFileAsDataURL(file);
      if(file.size>65535) {
        errorMessage("category_error","image size must be less than 64 KB");
        return null;
      } else {
        category["iconPath"]= fileContents.split(",")[1];
      }
    } else {
      category["iconPath"]="";
    }
    var value=elementsForAddCategory["value"].value;
    if(value=="") {
      errorMessage("category_error","can't insert empty value ");
      return null;
    }else{
      category["value"]=value;
    }
    return category;
  } catch (e) {
    console.warn(e.message)
  }
}

export const readUploadedFileAsDataURL = async (inputFile) => {
  const temporaryFileReader = new FileReader();

  return new Promise((resolve, reject) => {
    temporaryFileReader.onerror = () => {
      temporaryFileReader.abort();
      reject(new DOMException("Problem parsing input file."));
    };

    temporaryFileReader.onload = () => {
      resolve(temporaryFileReader.result);
    };
    temporaryFileReader.readAsDataURL(inputFile);
  });
};
//////////////////////////// loading data from api /////////////////////////////
export const startLoading= (id) => {
  var body=document.getElementById(id);
  body.insertAdjacentHTML("afterbegin",`
  <tr id="loading_transaction">
    <td colspan="10">
      <div class="loading">
      <h2>loading</h2>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
      </div>
    </td>
  </tr>
  `);
}

export const endLoading=(id) => {
  var parent=document.getElementById(id);
  var child=parent.childNodes;
  parent.removeChild(child[1]);
}
////////////////////////////// filter transactions /////////////////////////////
export const addFilterTransactionForm= (income,expense) => {
  var html=`
  <option></option>
  `;
  for (const category in income) {
    html+=`
       <option value="${income[category].id}">${income[category].value}</option>
    `;
  }

  for (const category in expense) {
     html+=`
        <option value="${expense[category].id}">${expense[category].value}</option>
     `;
  }

  event.target.parentNode.parentNode.insertAdjacentHTML("afterend",`
    <tr id="filter_form">
      <th colspan="10">
        <label for="type">Type:</label>
        <select id="select_filter_type" name="select_filter_type">
          <option></option>
          <option value="15">income</option>
          <option value="16">expense</option>
        </select>
        &nbsp;&nbsp;&nbsp;
        <label for="category">Category:</label>
        <select id="select_filter_category" name="select_filter_category">
        ${html}
        </select>
        &nbsp;&nbsp;&nbsp;
        <label for="date">from date:</label>
        <input type="date" name="select_filter_from_date" id="select_filter_from_date">
        &nbsp;&nbsp;&nbsp;
        <label for="date">to date:</label>
        <input type="date" name="select_filter_to_date" id="select_filter_to_date">
        &nbsp;&nbsp;&nbsp;
        <input type="checkbox" id="select_filter_frequent" name="select_filter_frequent">
        <lable for="frequent">frequent Transactions</lable>
        <br>
        <div id="filter_error" class="error"></div>
        <br>
        <button type="add_filter_tarnsaction" name="filter" class="add_transaction_button" id="add_filter_transaction_button">filter</button>
        <button type="close_filter_tarnsaction" name="close" class="add_transaction_button" id="close_filter_transaction_button">close</button>
      </th>
    </tr>
  `);
}

export const getFilterTransactions= () =>{
  var filter={

  }
  var type=document.getElementById("select_filter_type").value;
  var category=document.getElementById("select_filter_category").value;
  var from=document.getElementById("select_filter_from_date").value;
  var to=document.getElementById("select_filter_to_date").value;
  var frequent=document.getElementById("select_filter_frequent").checked;
  var error=document.getElementById("filter_error").value;

  filter["type"]=type==""?null:type;
  filter["category"]=category==""?null:category;
  filter["from"]=from==""?null:from;
  filter["to"]=to==""?null:to;
  filter["frequent"]=frequent==false?null:frequent;
  if(Date.parse(from)>Date.now() || Date.parse(to)>Date.now()) {
    errorMessage("filter_error","can't insert date in future")
    return null;
  }
  if(Date.parse(from)>Date.parse(to)) {
    errorMessage("filter_error","fromDate must be befot toDate");
    return null;
  }
  return filter;
}

export const removeFilterTransactionForm= () => {
  var form=document.getElementById("filter_form");
  if(form) {
    var parent=form.parentNode;
    parent.removeChild(form);
  }
}
//////////////////////////////// update category ///////////////////////////////
export const addUpdateCategoryForm=(id,type,incom,expense) => {
  var operations=document.getElementById(`${type}_edit_update_${id}`)
  var value=document.getElementById(`${type}_value_${id}`);
  var icon=document.getElementById(`${type}_icon_${id}`);
  value.innerHTML="";
  icon.innerHTML="";
  operations.innerHTML="";
  value.insertAdjacentHTML("afterbegin",`
    <input type="text" style="width:50px" id="new_${type}_value_${id}" value="${type=="income"?incom[id]["value"]:expense[id]["value"]}">
  `);
  icon.insertAdjacentHTML("afterbegin",`
    <input type="file" id="new_${type}_icon_${id}" ><br><div id="update_category_error" class="error">
            </div>
  `);
  operations.insertAdjacentHTML("afterbegin",`
    <i id="done_update_${type}_${id}" class="material-icons icon" style="font-size:1.5em;color:#FB8E63">check_circle_outline</i>
  `);
}

export const getNewCategoryData=async (id,type) => {
  var data={
    "value":"",
    "icon":""
  };
  var value=document.getElementById(`new_${type}_value_${id}`).value;
  var icon=document.getElementById(`new_${type}_icon_${id}`);
  var file = icon.files[0];
  try {
    if(value=="") {
      errorMessage("update_category_error","you must enter the value of category");
      return null;
    } else {
      data["value"]=value;
    }
    if(icon.value!="") {
      const fileContents = await readUploadedFileAsDataURL(file);
      if(file.size>65535) {
        errorMessage("update_category_error","image size must be less than 64 KB.");
        return null;
      } else {
        data["icon"]= await fileContents.split(",")[1];
        return data;      }
    } else {
      data["icon"]=null;
    }
    return data;
  } catch (e) {
    console.warn(e.message)
  }
}

export const removeUpdateCategoryForm= (id,type,new_value,new_icon) => {
  var operations=document.getElementById(`${type}_edit_update_${id}`)
  var value=document.getElementById(`${type}_value_${id}`);
  var icon=document.getElementById(`${type}_icon_${id}`);
  value.innerHTML="";
  icon.innerHTML="";
  operations.innerHTML="";

  value.insertAdjacentHTML("afterbegin",`${new_value}`);
  if(new_icon) {
  var ic=`
  <img src="data:image/png;base64,${new_icon}" class="rounded-circle" alt="" width="30" height="30" />
  `;
  } else {
  var ic=`
  <img src="img/icon.png" class="rounded-circle" alt="" width="30" height="30" />
  `;
  }
  icon.insertAdjacentHTML("afterbegin",`${ic}`);

  operations.insertAdjacentHTML("afterbegin",`
  <i class="material-icons icon update_category" id="${type}/${id}">&#xe869;</i>
  &nbsp;
  <a><i class="material-icons icon delete_category" id="${type}/${id}">delete</i></a>
  `);
}
////////////////////////////// edit month frequent /////////////////////////////
export const addEditFreuentForm = (id,frequent) => {
  var body=document.getElementById('transaction_month_frequent_'+id);
  if(body) {
    body.removeChild(body.childNodes[0])
    body.insertAdjacentHTML("afterbegin",`
  <input type="number" style="width:50px" min="0" max="12" id="new_frequent_${id}" value=${frequent}>
  `);
  }
  var tr=document.getElementById(`edit_frequent_${id}`);
  if(tr) {
    tr.removeChild(event.target);
    tr.insertAdjacentHTML("afterbegin",`
      <i id="done_${id}" class="material-icons icon" style="font-size:1.5em;color:#FB8E63">check_circle_outline</i>
    `)
  }
}

export const getNewFrequent=(id) => {
  return document.getElementById('new_frequent_'+id).value;
}

export const removeEditFrequentForm=(id,newValue) =>{
  var body=document.getElementById('transaction_month_frequent_'+id);
  var tr=document.getElementById(`edit_frequent_${id}`);
  body.innerHTML="";
  body.innerHTML=newValue==0?"---":newValue;
  tr.innerHTML="";
  tr.insertAdjacentHTML("afterbegin",`
    <i class="material-icons icon edit_frequent" id="${id}">&#xe869;</i>
  `);
}
////////////////////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////////////////////////
export const readLoginData=()=>{
  var email=document.getElementById("login_email").value;
  var password=document.getElementById("login_password").value;
  return {
    "email":email,
    "password":password
  }
}

export const readSignupData=async ()=>{
  var name=document.getElementById("signup_username").value;
  if(name==""){
    errorMessage("signup_error","please fill in User name field");
    return null;
  }
  var email=document.getElementById("signup_email").value;
  if(email=="") {
    errorMessage("signup_error","please fill in Email field");
    return null;
  }
  var password=document.getElementById("signup_password").value;
  if(password=="") {
    errorMessage("signup_error","please fill in Password field");
    return null;
  } else if(password.length<8) {
    errorMessage("signup_error","Password must be greater than 8");
    return null;
  }
  var photo=document.getElementById("signup_photo");
  var photoContents;
  if(photo.files[0]){
    if(photo.files[0].size>16777215) {
      errorMessage("signup_error","image size must be less than 15 MB");
      return null;
    }
    photoContents = await readUploadedFileAsDataURL(photo.files[0]);
  }
  return {
    "email":email,
    "name":name,
    "password":password,
    "photo":photoContents?photoContents.split(",")[1]:""
  }
}
///////////////////////////////////////////////////////////////////////////////
export const addProfileInfo=() =>{
  var image="";
  if(localStorage.getItem("photo")!="null") {
    image=`<img src="data:image/png;base64,${localStorage.getItem("photo")}" class="profile_image rounded-circle">`
  } else {
    image=`<img src="../../img/profile.png" class="profile_image rounded-circle">`
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
  if(localStorage.getItem("photo")!="null") {
    image=`<img id="profile_image" src="data:image/png;base64,${localStorage.getItem("photo")}" class="profile_image rounded-circle">`
  } else {
    image=`<img id="profile_image" src="../../img/profile.png" class="profile_image rounded-circle">`
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
        <input id="profile_password" type="password" class="form-control" placeholder="insert old password">
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
  errorMessage("image_profile_error","");
  var photo=document.getElementById("file-input");
  var photoContents;
  if(photo.files[0]){
    if(photo.files[0].size>16777215) {
      errorMessage("image_profile_error","image size must be less than 15 MB");
      return null;
    } else {
      photoContents = await readUploadedFileAsDataURL(photo.files[0]);
      document.getElementById("profile_image").setAttribute("src",photoContents);
      localStorage.setItem("new_photo",photoContents.split(",")[1]);
    }
  }
}

export const changeProfileUserName=()=> {
  errorMessage("username_profile_error","");
  var name=document.getElementById("profile_username").value;
  if(name){
    localStorage.setItem("new_name",name);
  } else {
    errorMessage("username_profile_error","please fill in User name field");
  }
}

export const changeProfileEmail=()=>{
  errorMessage("email_profile_error","");
  var email=document.getElementById("profile_email").value;
  if(email) {
    localStorage.setItem("new_email",email);
  } else {
    errorMessage("email_profile_error","please fill in Email field");
  }
}

export const endUpdateProfileInfo=()=>{
  if(document.getElementById("image_profile_error").innerHTML=="" && document.getElementById("username_profile_error").innerHTML=="" && document.getElementById("email_profile_error").innerHTML=="") {
    var pass=document.getElementById("profile_password").value;
    if(pass===localStorage.getItem("password")) {
      var new_photo=localStorage.getItem("new_photo");
      var new_name=localStorage.getItem("new_name");
      var new_email=localStorage.getItem("new_email");
      var photo=localStorage.getItem("photo");
      var name=localStorage.getItem("name");
      var email=localStorage.getItem("email");
      var user={
        "id":localStorage.getItem("id"),
        "name":new_name==null?name:new_name,
        "email":new_email==null?email:new_email,
        "password":pass,
        "photo":new_photo==null?photo:new_photo
      };
      return user;
    } else if(pass==""){
      errorMessage("password_profile_error","please fill in password field");
      return null;
    } else {
      errorMessage("password_profile_error","please enter correct password");
      return null;
    }
  }
}
