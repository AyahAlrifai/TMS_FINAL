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
  var parts=from.split("-");
  var date = new Date(parts[0], parts[1] - 1, parts[2]);
  date.setDate(date.getDate()+1);
  filter["from"]=from==""?null:date.toISOString().substring(0, 10);
  parts=to.split("-");
  date = new Date(parts[0], parts[1] - 1, parts[2]);
  date.setDate(date.getDate()+1);
  filter["to"]=to==""?null:date.toISOString().substring(0, 10);
  filter["frequent"]=frequent==false?null:frequent;
  if(Date.parse(from)>Date.now() || Date.parse(to)>Date.now()) {
    base.errorMessage("filter_error","can't insert date in future")
    return null;
  }
  if(Date.parse(from)>Date.parse(to)) {
    base.errorMessage("filter_error","fromDate must be befot toDate");
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
