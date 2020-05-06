import * as base from "./base";

export const updateAddCategoryView= (value) => {
  base.errorMessage("category_error","");
 if(value==16 || value==15) {
   for (const element in base.elementsForAddCategory) {
     base.elementsForAddCategory[element].disabled=false;
    }
  } else {
     clearAddCategoryForm();
  }
}

export const clearAddCategoryForm= () => {
  document.getElementById("select_category_type").value="default";
  for (const element in base.elementsForAddCategory) {
    base.elementsForAddCategory[element].value="";
    base.elementsForAddCategory[element].disabled=true;
  }
}

export const getNewCategoryData=async () => {
  base.errorMessage("category_error","");
  var category={
    "type":document.getElementById("select_category_type").value,
    "value":"",
    "iconPath":""
  }

  //iconPath
  var iconPath;
  var file = base.elementsForAddCategory["iconPath"].files[0];
  try {
    if(base.elementsForAddCategory["iconPath"].value!="") {
      const fileContents = await base.readUploadedFileAsDataURL(file);
      if(file.size>65535) {
        base.errorMessage("category_error","image size must be less than 64 KB");
        return null;
      } else {
        category["iconPath"]= fileContents.split(",")[1];
      }
    } else {
      category["iconPath"]="";
    }
    var value=base.elementsForAddCategory["value"].value;
    if(value=="") {
      base.errorMessage("category_error","can't insert empty value ");
      return null;
    }else{
      category["value"]=value;
    }
    return category;
  } catch (e) {
    console.warn(e.message)
  }
}
