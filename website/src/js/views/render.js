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
    var parts=transactions[i]["date"].split("-");
    var date = new Date(parts[0], parts[1] - 1, parts[2]);
    date.setDate(date.getDate()+2);
    var html=`
    <tr id="${i}">
      <td>${transactions[i]["type"]==15?"income":"expense"}</td>
      <td>
      ${icon}
      </td>
      <td>${transactions[i]["category"]["value"]}</td>
      <td>${Math.abs(transactions[i]["amount"])+"JD"}</td>
      <td>${date.toISOString().substring(0, 10)}</td>
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
