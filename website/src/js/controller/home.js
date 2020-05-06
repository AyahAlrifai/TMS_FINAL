import TmsServices from "../models/TmsServices";
import * as chatbot from "../views/chatbot";
import * as ChatBot from "../models/ChatBot";
import * as base from "../views/base";
import * as render from "../views/render";
import * as addTrans from "../views/addTransaction";
import * as filterTrans from "../views/filterTransactions";
import * as addCategories from "../views/addCategory";
import * as updateCategories from "../views/updateCategory";
import * as editFrequent from "../views/editFrequent";


const services=new TmsServices();
const getTransactions=async (filter) => {
  filter["user_id"]=localStorage.getItem("id")
  base.startLoading("transaction_body");
  await services.getTransactions(filter);
  base.endLoading("transaction_body");
  render.renderTransactions(services.transactions);
  addEventForEditFrequent();
}

const getBalance=async (filter) => {
  filter["user_id"]=localStorage.getItem("id")
  await services.getBalance(filter);
  render.renderTotalBalance(services.totalBalance);
}

const getIncomeCategories=async () => {
  base.startLoading("income_body");
  await services.getIncomeCategory(localStorage.getItem("id"));
  base.endLoading("income_body");
  render.renderIncomeCategories(services.incomeCategories);
  addEventForDeleteCategory();
  addEventForUpdateCategory();
}

const getExpenseCategories =async () => {
  base.startLoading("expense_body");
  await services.getExpenseCategory(localStorage.getItem("id"));
  base.endLoading("expense_body");
  render.renderExpenseCategories(services.expenseCategories);
  addEventForDeleteCategory();
  addEventForUpdateCategory();
}

const addEventForEditFrequent=() => {
  var transactions=document.getElementsByClassName('edit_frequent');
  for(var i=0;i<transactions.length;i++) {
    transactions[i].addEventListener("click",editTransactionFrequent);
  }
}

const addEventForDeleteCategory=() => {
  var categories=document.getElementsByClassName('delete_category');
  for(var i=0;i<categories.length;i++) {
    categories[i].addEventListener("click",deleteCategory);
  }

}

const addEventForUpdateCategory=() => {
  var categories=document.getElementsByClassName('update_category');
  for(var i=0;i<categories.length;i++) {
    categories[i].addEventListener("click",updateCategory);
  }
}

const setTransactionType =async () => {
  var select=document.getElementById("select_transaction_type");
  select.addEventListener("change",(event)=>{
    addTrans.updateAddTransactionView(event.target.value);
    if(event.target.value==15) {
      addTrans.addSelectionForCategory(services.incomeCategories);
    }
    else if(event.target.value==16) {
      addTrans.addSelectionForCategory(services.expenseCategories);
    }
  });
}

const addTransaction=async () => {
  var transaction=addTrans.getNewTransactionData();
  if(transaction!=null) {
    services.totalBalance+=transaction["amount"];
    transaction["user_id"]=localStorage.getItem("id");
    if(transaction["paymentMethod"]) {
      await services.addExpenseTransaction(transaction);
    } else {
      await services.addIncomeTransaction(transaction);
    }
    render.renderTransactions(services.transactions);
    render.renderTotalBalance(services.totalBalance);
    addTrans.clearAddTransactionForm();
    addEventForEditFrequent();
  }
}

const setCategoryType =async () => {
  var select=document.getElementById("select_category_type");
  select.addEventListener("change",(event)=>{
    addCategories.updateAddCategoryView(event.target.value);
  });
}

const addCategory=async () => {
  var category=await addCategories.getNewCategoryData();
    if(category!=null) {
    if(category["type"]=="15") {
      delete category.type;
      category["user_id"]=localStorage.getItem("id")
      await services.addIncomeCategory(category);
      render.renderIncomeCategories(services.incomeCategories);
    } else if(category["type"]=="16") {
      delete category.type;
      category["user_id"]=localStorage.getItem("id")
      await services.addExpenseCategory(category);
      render.renderExpenseCategories(services.expenseCategories);
    }
    addEventForDeleteCategory();
    addEventForUpdateCategory();
    addCategories.clearAddCategoryForm();
  }
}

const updateCategory=async (event) => {
  var type=event.target.id.split("/")[0];
  var id=event.target.id.split("/")[1];
  updateCategories.addUpdateCategoryForm(id,type,services.incomeCategories,services.expenseCategories);
  document.getElementById(`done_update_${type}_${id}`).addEventListener("click",async ()=>{
      var new_data=await updateCategories.getNewCategoryData(id,type);
      if(new_data) {
        if(type=="income") {
          services.incomeCategories[id]["value"]=new_data["value"];
          services.incomeCategories[id]["iconPath"]=new_data["icon"]?new_data["icon"]:services.incomeCategories[id]["iconPath"];
          new_data["icon"]=services.incomeCategories[id]["iconPath"];
          await services.updateIncomeCategory(services.incomeCategories[id]);
        } else if(type=="expense") {
          services.expenseCategories[id]["value"]=new_data["value"];
          services.expenseCategories[id]["iconPath"]=new_data["icon"]?new_data["icon"]:services.expenseCategories[id]["iconPath"];
          new_data["icon"]=services.expenseCategories[id]["iconPath"];
          await services.updateExpenseCategory(services.expenseCategories[id]);
        }
        await getTransactions({});
        updateCategories.removeUpdateCategoryForm(id,type,new_data["value"],new_data["icon"]);
         addEventForDeleteCategory();
         addEventForUpdateCategory();
      }
    });
}

const deleteCategory=async (event) => {
  var id=event.target.id.split("/");
  if(id[0]=="income") {
    await services.diableCategory(parseInt(services.incomeCategories[id[1]]["id"]));
    services.incomeCategories[id[1]]=null;
    render.renderIncomeCategories(services.incomeCategories);
  } else if(id[0]=="expense") {
    await services.diableCategory(parseInt(services.expenseCategories[id[1]]["id"]));
    services.expenseCategories[id[1]]=null;
    render.renderExpenseCategories(services.expenseCategories);
  }
  addEventForDeleteCategory();
  addEventForUpdateCategory();
}

const filterTransactions=(event) => {
  filterTrans.addFilterTransactionForm(services.incomeCategories,services.expenseCategories);
  document.getElementById("select_filter_type").addEventListener("change",(event)=>{
    if(event.target.value!="") {
      document.getElementById("select_filter_category").disabled=true;
    } else {
      document.getElementById("select_filter_category").disabled=false;

    }
  });
  document.getElementById("select_filter_category").addEventListener("change",(event)=>{
    if(event.target.value!="") {
      document.getElementById("select_filter_type").disabled=true;
    } else {
      document.getElementById("select_filter_type").disabled=false;

    }
  });
  event.target.removeEventListener("click",filterTransactions);
  document.getElementById("add_filter_transaction_button").addEventListener("click",()=>{
    var filter=filterTrans.getFilterTransactions();
    if(filter!=null) {
      getTransactions(filter);
      getBalance(filter);
    }
  });
  document.getElementById("close_filter_transaction_button").addEventListener("click",()=>{
      getTransactions({});
      getBalance({});
      filterTrans.removeFilterTransactionForm();
      event.target.addEventListener("click",filterTransactions);
  });
}

const editTransactionFrequent=async (event) => {
  var id=event.target.id;
  editFrequent.addEditFreuentForm(id,services.transactions[id]["monthFrequent"]?services.transactions[id]["monthFrequent"]:0);
  document.getElementById(`done_${id}`).addEventListener("click",(event)=>{
      var newValue=editFrequent.getNewFrequentData(id);
      editFrequent.removeEditFrequentForm(id,newValue);
      services.transactions[id]["monthFrequent"]=newValue;
      services.setFrequent(services.transactions[id]["id"],newValue);
      addEventForEditFrequent();
    });
}

const startEndChat=()=>{
  var notification=document.getElementById("notific");
  if(notification) {
    notification.parentNode.removeChild(notification);
  }
  var talkbubble=document.getElementById("talkbubble");
  if(talkbubble.style.display=="block"){
    talkbubble.setAttribute("style","display:none");
  } else {
    talkbubble.setAttribute("style","display:block");
  }
}

window.addEventListener("load",() => {
  var audio = new Audio("img/beyond-doubt-2.ogg");
  audio.muted =false;
  getTransactions({});
  getBalance({});
  getIncomeCategories();
  getExpenseCategories();
  setTransactionType();
  audio.play();
  document.getElementById("add_transaction_button").addEventListener("click",(event)=>{
    addTransaction();
  });
  setCategoryType();
  document.getElementById("add_category_button").addEventListener("click",(event)=>{
  addCategory();
  });
  document.getElementById("transaction_filter").addEventListener("click",filterTransactions);
  document.getElementById("chat").addEventListener("click",startEndChat);
  document.getElementById("send_mesg").addEventListener("keyup",async (event) => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"];
      let dateObj = new Date();
      var hour=dateObj.getHours();
      var minutes=dateObj.getMinutes()
      let month = monthNames[dateObj.getMonth()];
      let day = String(dateObj.getDate()).padStart(2, '0');
      let year = dateObj.getFullYear();
      let date = hour+":"+minutes+"  "+month  + '\n'+ day  + ',' + year;
    if (event.keyCode === 13) {
      if(!event.shiftKey) {
        var mesg=chatbot.addUserMessage(date);
        if(mesg) {
          document.getElementById("send_mesg").disabled=true;
          await chatbot.addBotMessage(await ChatBot.sendMessage(mesg),date);
          audio.play();
          audio.muted = false;
          document.getElementById("send_mesg").disabled=false;
        }
      }
    }
  });
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
  })
});
