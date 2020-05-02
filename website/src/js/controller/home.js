import TmsServices from "../models/TmsServices";
import * as TmsView from "../views/TmsView";
import * as ChatBot from "../models/ChatBot";


const services=new TmsServices();
const getTransactions=async (filter) => {
  filter["user_id"]=localStorage.getItem("id")
  TmsView.startLoading("transaction_body");
  await services.getTransactions(filter);
  TmsView.endLoading("transaction_body");
  TmsView.renderTransactions(services.transactions);
  addEventForEditFrequent();
}

const getBalance=async (filter) => {
  filter["user_id"]=localStorage.getItem("id")
  await services.getBalance(filter);
  TmsView.renderTotalBalance(services.totalBalance);
}

const getIncomeCategories=async () => {
  TmsView.startLoading("income_body");
  await services.getIncomeCategory(localStorage.getItem("id"));
  TmsView.endLoading("income_body");
  TmsView.renderIncomeCategories(services.incomeCategories);
  addEventForDeleteCategory();
  addEventForUpdateCategory();
}

const getExpenseCategories =async () => {
  TmsView.startLoading("expense_body");
  await services.getExpenseCategory(localStorage.getItem("id"));
  TmsView.endLoading("expense_body");
  TmsView.renderExpenseCategories(services.expenseCategories);
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
    TmsView.updateAddTransactionView(event.target.value);
    if(event.target.value==15) {
      TmsView.addSelectionForCategory(services.incomeCategories);
    }
    else if(event.target.value==16) {
      TmsView.addSelectionForCategory(services.expenseCategories);
    }
  });
}

const addTransaction=async () => {
  var transaction=TmsView.addTransaction();
  if(transaction!=null) {
    services.totalBalance+=transaction["amount"];
    transaction["user_id"]=localStorage.getItem("id");
    if(transaction["paymentMethod"]) {
      await services.addExpenseTransaction(transaction);
    } else {
      await services.addIncomeTransaction(transaction);
    }
    TmsView.renderTransactions(services.transactions);
    TmsView.renderTotalBalance(services.totalBalance);
    TmsView.clearAddTransactionForm();
    addEventForEditFrequent();
  }
}

const setCategoryType =async () => {
  var select=document.getElementById("select_category_type");
  select.addEventListener("change",(event)=>{
    TmsView.updateAddCategoryView(event.target.value);
  });
}

const addCategory=async () => {
  var category=await TmsView.addCategory();
    if(category!=null) {
    if(category["type"]=="15") {
      delete category.type;
      category["user_id"]=localStorage.getItem("id")
      await services.addIncomeCategory(category);
      TmsView.renderIncomeCategories(services.incomeCategories);
    } else if(category["type"]=="16") {
      delete category.type;
      category["user_id"]=localStorage.getItem("id")
      await services.addExpenseCategory(category);
      TmsView.renderExpenseCategories(services.expenseCategories);
    }
    addEventForDeleteCategory();
    addEventForUpdateCategory();
    TmsView.clearAddCategoryForm();
  }
}

const updateCategory=async (event) => {
  var type=event.target.id.split("/")[0];
  var id=event.target.id.split("/")[1];
  TmsView.addUpdateCategoryForm(id,type,services.incomeCategories,services.expenseCategories);
  document.getElementById(`done_update_${type}_${id}`).addEventListener("click",async ()=>{
      var new_data=await TmsView.getNewCategoryData(id,type);
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
        TmsView.removeUpdateCategoryForm(id,type,new_data["value"],new_data["icon"]);
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
    TmsView.renderIncomeCategories(services.incomeCategories);
  } else if(id[0]=="expense") {
    await services.diableCategory(parseInt(services.expenseCategories[id[1]]["id"]));
    services.expenseCategories[id[1]]=null;
    TmsView.renderExpenseCategories(services.expenseCategories);
  }
  addEventForDeleteCategory();
}

const filterTransactions=(event) => {
  TmsView.addFilterTransactionForm(services.incomeCategories,services.expenseCategories);
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
    var filter=TmsView.getFilterTransactions();
    if(filter!=null) {
      getTransactions(filter);
      getBalance(filter);
    }
  });
  document.getElementById("close_filter_transaction_button").addEventListener("click",()=>{
      getTransactions({});
      getBalance({});
      TmsView.removeFilterTransactionForm();
      event.target.addEventListener("click",filterTransactions);
  });
}

const editTransactionFrequent=async (event) => {
  var id=event.target.id;
  TmsView.addEditFreuentForm(id,services.transactions[id]["monthFrequent"]?services.transactions[id]["monthFrequent"]:0);
  document.getElementById(`done_${id}`).addEventListener("click",(event)=>{
      var newValue=TmsView.getNewFrequent(id);
      TmsView.removeEditFrequentForm(id,newValue);
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
      var hour=dateObj.getHours()	+ 8;
      var minutes=dateObj.getMinutes()
      let month = monthNames[dateObj.getMonth()];
      let day = String(dateObj.getDate()).padStart(2, '0');
      let year = dateObj.getFullYear();
      let date = hour+":"+minutes+"  "+month  + '\n'+ day  + ',' + year;
    if (event.keyCode === 13) {
      if(!event.shiftKey) {
        var mesg=TmsView.addUserMessage(date);
        if(mesg) {
          document.getElementById("send_mesg").disabled=true;
          await TmsView.addBotMessage(await ChatBot.sendMessage(mesg),date);
          audio.play();
          audio.muted = false;
          document.getElementById("send_mesg").disabled=false;
        }
      }
    }
  });
  document.getElementById("logout").addEventListener("click",()=>{
    localStorage.setItem("id",null);
    window.open(`http://localhost:8081`,"_self");
  })
});
