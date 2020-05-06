import * as base from "./base";
import * as filterTrans from "./filterTransactions";

export const updateAddTransactionView= (value) => {
  base.errorMessage("transaction_error","");
 if(value==16 || value==15) {
   for (const element in base.elementsForAddTransaction) {
     base.elementsForAddTransaction[element].disabled=false;
    }
   if(value==15) {
     base.elementsForAddTransaction.paymentMethod.disabled=true;
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
  base.elementsForAddTransaction.category.innerHTML="";
  base.elementsForAddTransaction.category.insertAdjacentHTML("beforeend",html)
}

export const clearAddTransactionForm= () => {
  document.getElementById("select_transaction_type").value="default";
  base.elementsForAddTransaction.category.innerHTML="";
  for (const element in base.elementsForAddTransaction) {
    base.elementsForAddTransaction[element].value="";
    base.elementsForAddTransaction[element].disabled=true;
  }
  base.elementsForAddTransaction["paymentMethod"].value=13;
}

export const getNewTransactionData= () => {
  var transaction={}
  var type=document.getElementById("select_transaction_type").value;
  var amount=base.elementsForAddTransaction["amount"].value;
  var category=base.elementsForAddTransaction["category"].value;
  var date=base.elementsForAddTransaction["date"].value;
  var comment=base.elementsForAddTransaction["comment"].value;
  var paymentMethod=base.elementsForAddTransaction["paymentMethod"].value;;
  base.errorMessage("transaction_error","");

  //amount
  if(amount=="") {
    base.errorMessage("transaction_error","can't insert empty amount");
    return null;
  } else if(amount<=0) {
    base.errorMessage("transaction_error","amount must be greater than zero");
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
      base.errorMessage("transaction_error","you must choose date of this transaction");
      return null;
    } else if(new Date(arrayDate[0],arrayDate[1]-1,arrayDate[2]) > new Date(new Date().toDateString())) {
      base.errorMessage("transaction_error","can't insert date in future");
      return null;
    } else {
      transaction["date"]=date;
    }

    //Comment
    transaction["comment"]=comment;
    filterTrans.removeFilterTransactionForm();
    return transaction;
}
