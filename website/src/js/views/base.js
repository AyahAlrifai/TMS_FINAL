export const elementsForAddTransaction={
  "category":document.getElementById('select_transaction_category'),
  "amount":document.getElementById('select_transaction_amount'),
  "date":document.getElementById('select_tarnsaction_date'),
  "paymentMethod":document.getElementById('select_tarnsaction_paymentMethod'),
  "comment":document.getElementById('select_transaction_comment'),
  "button":document.getElementById("add_transaction_button")
}

export const elementsForAddCategory={
  "value":document.getElementById('select_category_value'),
  "iconPath":document.getElementById('select_category_icon')
}

export const errorMessage=(id,message) => {
  document.getElementById(id).innerHTML=message;
}

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
