export const sendMessage=async (mesg) =>{
  const axios = require("axios");
  var res;
  try {
     res = await axios(
      {
          "method":"GET",
          "url":"https://siris.p.rapidapi.com/json",
          "headers":{
          "content-type":"application/octet-stream",
          "x-rapidapi-host":"siris.p.rapidapi.com",
          "x-rapidapi-key":"a48854d39bmsh8373cac37acb79ap17cfdcjsn6f40931dc7e9"
          },"params":{
          "clientFeatures":"all",
          "locale":"en",
          "timeZone":"%2B120",
          "input":mesg
          }
        }
      );
      return res.data.output["0"].actions.say.text;
   } catch (error) {
     console.log(error);
   }
}
