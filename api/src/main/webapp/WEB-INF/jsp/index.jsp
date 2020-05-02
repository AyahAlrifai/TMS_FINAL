<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>tms api</title>
  </head>
  <body style="background-color:#000000">
    <h1 style="text-align:center;color:#FFD700">TMS-Transaction Module System</h1>
    <h1 style="text-align:center;color:#FFD700">By:Eng-Ayah Alrifai</h1>

    <h2 style="text-align:center;color:#ffffff">how to use this API?</h2>
    <hr><br>
    <ol style="color:#FFC0CB">
      <li>
        process:Get Transactions<br><br>
        URL:POST https://tms-api-alrifai.herokuapp.com/api/transaction<br><br>
        Body:{<br><br>
          &nbsp;&nbsp;&nbsp;&nbsp;*"type":typeId,<br><br>
          &nbsp;&nbsp;&nbsp;&nbsp;*"from":date in this format "yyyy-mm-dd",<br><br>
          &nbsp;&nbsp;&nbsp;&nbsp;*"to":date in this format "yyyy-mm-dd",<br><br>
          &nbsp;&nbsp;&nbsp;&nbsp;*"frequent":true,<br><br>
          &nbsp;&nbsp;&nbsp;&nbsp;*"category":CategoryId<br><br>
          &nbsp;&nbsp;&nbsp;&nbsp;*"user_id":userId<br><br>
        }<br><br>
        "*"  mean: this property not mandatory<br><br>
      </li>
      <hr><br>
      <li>
        process:Set Frequent<br><br>
        URL:POST https://tms-api-alrifai.herokuapp.com/api/transaction/{transactionId}/{monthFrequent}<br>
        monthFrequent=0 to delete transaction from frequent transactions other value greater than 0 to add/update transaction frequen
        <br><br>
        Body:noBody<br><br>
      </li>
      <hr><br>
      <li>
        process:Get Balance<br><br>
        URL:POST https://tms-api-alrifai.herokuapp.com/api/balance<br><br>
        Body:{<br><br>
          &nbsp;&nbsp;&nbsp;&nbsp;*"type":typeId,<br><br>
          &nbsp;&nbsp;&nbsp;&nbsp;*"from":date in this format "yyyy-mm-dd",<br><br>
          &nbsp;&nbsp;&nbsp;&nbsp;*"to":date in this format "yyyy-mm-dd",<br><br>
          &nbsp;&nbsp;&nbsp;&nbsp;*"frequent":true,<br><br>
          &nbsp;&nbsp;&nbsp;&nbsp;*"category":CategoryId<br><br>
        }<br><br>
        "*"  mean: this property not mandatory<br><br>
      </li>
      <hr><br>
      <li>
        process:Get Income Categories<br><br>
        URL:GET https://tms-api-alrifai.herokuapp.com/api/category/income<br><br>
        Body:noBody <br><br>
      </li>
      <hr><br>
      <li>
        process:Get Expense Categories<br><br>
        URL:GET https://tms-api-alrifai.herokuapp.com/api/category/expense<br><br>
        Body:noBody <br><br>
      </li>
      <hr><br>
      <li>
        process:Add Income Category<br><br>
        URL:POST https://tms-api-alrifai.herokuapp.com/api/category/income<br><br>
        Body:{<br><br>
	         &nbsp;&nbsp;&nbsp;&nbsp;"value":name of category as String,<br><br>
	         &nbsp;&nbsp;&nbsp;&nbsp;"iconPath":PathIcon of category enter null if no iconPath<br><br>
        }<br><br>
      </li>
      <hr><br>
      <li>
        process:Add Expense Category<br><br>
        URL:POST https://tms-api-alrifai.herokuapp.com/api/category/expense<br><br>
        Body:{<br><br>
           &nbsp;&nbsp;&nbsp;&nbsp;"value":name of category as String,<br><br>
           &nbsp;&nbsp;&nbsp;&nbsp;"iconPath":PathIcon of category enter null if no iconPath<br><br>
        }<br><br>
      </li>
      <hr><br>
      <li>
        process:Update Income Category<br><br>
        URL:PUT https://tms-api-alrifai.herokuapp.com/api/category/income<br><br>
        Body:{<br><br>
           &nbsp;&nbsp;&nbsp;&nbsp;"id":categoryId,<br><br>
	         &nbsp;&nbsp;&nbsp;&nbsp;"value":new name of category as String,<br><br>
	         &nbsp;&nbsp;&nbsp;&nbsp;"iconPath":new PathIcon of category enter null if no iconPath<br><br>
         }<br><br>
      </li>
      <hr><br>
      <li>
        process:Update Expense Category<br><br>
        URL:PUT https://tms-api-alrifai.herokuapp.com/api/category/expense<br><br>
        Body:{<br><br>
           &nbsp;&nbsp;&nbsp;&nbsp;"id":categoryId,<br><br>
           &nbsp;&nbsp;&nbsp;&nbsp;"value":new name of category as String,<br><br>
           &nbsp;&nbsp;&nbsp;&nbsp;"iconPath":new PathIcon of category enter null if no iconPath<br><br>
         }<br><br>
      </li>
      <hr><br>
      <li>
        process:disable Category<br><br>
        URL:PUT https://tms-api-alrifai.herokuapp.com/api/category/{categoryId}<br><br>
        Body:noBody<br><br>
      </li>
      <hr><br>
      <li>
        process:Add income<br><br>
        URL:POST https://tms-api-alrifai.herokuapp.com/api/transaction/income<br><br>
        Body:{<br><br>
        &nbsp;&nbsp;&nbsp;&nbsp;"amount":positive double number,<br><br>
        &nbsp;&nbsp;&nbsp;&nbsp;"category":{<br><br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id":categoryId<br><br>
          &nbsp;&nbsp;&nbsp;&nbsp;},<br><br>
        &nbsp;&nbsp;&nbsp;&nbsp;"comment":comment as String,<br><br>
        &nbsp;&nbsp;&nbsp;&nbsp;"date":date in this format "yyyy-mm-dd"<br><br>
        }<br><br>
      </li>
      <hr><br>
      <li>
        process:Add Expense<br><br>
        URL:POST https://tms-api-alrifai.herokuapp.com/api/transaction/Expense<br><br>
        Body:{<br><br>
        &nbsp;&nbsp;&nbsp;&nbsp;"amount":negative double number,<br><br>
        &nbsp;&nbsp;&nbsp;&nbsp;"category":{<br><br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id":categoryId<br><br>
          &nbsp;&nbsp;&nbsp;&nbsp;},<br><br>
        &nbsp;&nbsp;&nbsp;&nbsp;"comment":comment as String,<br><br>
        &nbsp;&nbsp;&nbsp;&nbsp;"date":date in this format "yyyy-mm-dd",<br><br>
        &nbsp;&nbsp;&nbsp;&nbsp;"paymentMethod":paymentMethodId<br><br>
        }<br><br>
      </li>
      <hr><br>
      <li>
        process:get Types<br><br>
        URL:GET https://tms-api-alrifai.herokuapp.com/api/types<br><br>
        Body:noBody<br><br>
      </li>
      <hr><br>
      <li>
        process:get paymentMethod<br><br>
        URL:GET https://tms-api-alrifai.herokuapp.com/api/paymentMethods<br><br>
        Body:noBody<br><br>
      </li>
    </ol>
  </body>
</html>
