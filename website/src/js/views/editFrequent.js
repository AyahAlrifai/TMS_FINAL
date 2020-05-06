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

export const getNewFrequentData=(id) => {
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
