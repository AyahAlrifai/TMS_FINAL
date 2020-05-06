import * as base from "./base";
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
      base.errorMessage("update_category_error","you must enter the value of category");
      return null;
    } else {
      data["value"]=value;
    }
    if(icon.value!="") {
      const fileContents = await base.readUploadedFileAsDataURL(file);
      if(file.size>65535) {
        base.errorMessage("update_category_error","image size must be less than 64 KB.");
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
