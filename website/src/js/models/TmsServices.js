import axios from "axios";
import * as host from "../controller/config";

const hostApi=host.localhost;

export default class TmsServices {

  constructor() {
    this.transactions=[];
    this.incomeCategories=[];
    this.expenseCategories=[];
    this.totalBalance=0;
    this.types=[];
    this.paymentMethods=[];
  }

  async getPaymentMethods() {
    var res;
    try {
      const res = await axios(
        `${hostApi}paymentMethods`, {
      	method: "GET",
      });
      this.paymentMethod=res["data"];
     } catch (error) {
       console.log(error);
     }
  }

  async getTypes() {
    var res;
    try {
      const res = await axios(
        `${hostApi}types`, {
      	method: "GET",
      });
      this.types=res["data"];
     } catch (error) {
       console.log(error);
     }
  }

  async getIncomeCategory(user_id) {
    var res;
    try {
      const res = await axios(
        `${hostApi}category/income`, {
      	method: "GET",
        params:{
          "user_id":user_id
        }
      });
        this.incomeCategories=res["data"];
     } catch (error) {
       console.log(error);
     }
  }

  async getExpenseCategory(user_id) {
    var res;
    try {
      const res = await axios(
        `${hostApi}category/expense`, {
      	method: "GET",
        params:{
          "user_id":user_id
        }
      });
        this.expenseCategories=res["data"];
     } catch (error) {
       console.log(error);
     }
  }

  async getTransactions(filter) {
    // filter={
    //   "type":int,
    //   "category":int,
    //   "from":"yyyy-mm-dd",
    //   "to":"yyyy-mm-dd",
    //   "frequent":true
    //    user_id:userId
    // }
    var res;
    try {
      const res = await axios({
          method: 'post',
          url:`${hostApi}transaction`,
          data:filter
         });
         if(res["status"]==200) {
           this.transactions=res["data"];
         }
     } catch (error) {
       console.log(error);
     }
  }

  async getBalance(filter) {
    // filter={
    //   "type":int,
    //   "category":int,
    //   "from":"yyyy-mm-dd",
    //   "to":"yyyy-mm-dd",
    //   "frequent":true,
    //    user_id:user_id
    // }
    var res;
    try {
      const res = await axios({
          method: 'post',
          url:`${hostApi}balance`,
          data:filter
         });
         if(res["status"]==200)
           this.totalBalance=res["data"];
     } catch (error) {
       console.log(error);
     }
  }

  async addIncomeCategory(incomeCategory) {
    // incomeCategory={
    //   "value":string,
    //   "iconPath":image,
    //    "user_id":user_id
    // }
    var res;
    try {
      const res = await axios({
          method: 'post',
          url:`${hostApi}category/income`,
          headers: {},
          data:incomeCategory
         });
         this.incomeCategories.push(res["data"]);
     } catch (error) {
       console.log(error);
     }
  }

  async addExpenseCategory(expenseCategory) {
    // incomeCategory={
    //   "value":string,
    //   "iconPath"image,
    //    "user_id":user_id
    // }
    var res;
    try {
      const res = await axios({
          method: 'post',
          url:`${hostApi}category/expense`,
          headers: {},
          data:expenseCategory
         });
         this.expenseCategories.push(res["data"]);
     } catch (error) {
       console.log(error);
     }
  }

  async updateIncomeCategory(incomeCategory) {
    // incomeCategory={
    //   "id":int,
    //   "value":string,
    //   "iconPath":image,
    // }
    var res;
    try {
      const res = await axios({
          method: 'put',
          url:`${hostApi}category/income`,
          headers: {},
          data:incomeCategory
         });
         return res;
     } catch (error) {
       console.log(error);
     }
  }

  async updateExpenseCategory(expenseCategory) {
    // expenseCategory={
    //   "id":int,
    //   "value":string,
    //   "iconPath":image
    // }
    var res;
    try {
      const res = await axios({
          method: 'put',
          url:`${hostApi}category/expense`,
          headers: {},
          data:expenseCategory
         });
         return res;
     } catch (error) {
       console.log(error);
     }
  }

  async diableCategory(categoryId) {
    var res;
    try {
      const res = await axios({
          method: 'put',
          url:`${hostApi}category/${categoryId}`,
          headers: {},
         });
         return res;

     } catch (error) {
       console.log(error);
     }
  }

  async addIncomeTransaction(incomeTransaction) {
    // incomeTransaction=
    // {
    //   "amount": +double,
    //   "category": {
    //       "id": int
    //       },
    //   "comment": string,
    //   "date":"yyyy-mm-dd",
    //  "user_id":user_id
    // }
    var res;
    try {
      const res = await axios({
          method: 'post',
          url:`${hostApi}transaction/income`,
          headers: {},
          data:incomeTransaction
         });
         this.transactions.push(res["data"]);
     } catch (error) {
       console.log(error);
     }
  }

  async addExpenseTransaction(expenseTransaction) {
    // expenseTransaction={
    //   "amount": +double,
    //   "category": {
    //       "id": int
    //       },
    //   "comment": string,
    //   "date":"yyyy-mm-dd",
    //  "paymentMethod":int,
    //  "user_id":user_id
    // }
    var res;
    try {
      const res = await axios({
          method: 'post',
          url:`${hostApi}transaction/expense`,
          headers: {},
          data:expenseTransaction
         });
         this.transactions.push(res["data"]);
     } catch (error) {
         console.log(error);
     }
  }

  async setFrequent(transactionId,monthFrequent) {
    var res;
    try {
      const res = await axios({
          method: 'post',
          url:`${hostApi}transaction/${transactionId}/${monthFrequent}`,
          headers: {},
         });
         return res;
     } catch (error) {
       console.log(error);
     }
  }

  async authentication(loginData) {
    var res;
    try {
      const res = await axios({
          method: 'post',
          url:`${hostApi}authentication`,
          headers: {},
          data:loginData
         });
         return res["data"];
     } catch (error) {
       console.log(error);
     }
  }

  async addNewUser(signupData) {
    var res;
    try {
      const res = await axios({
          method: 'post',
          url:`${hostApi}user`,
          headers: {},
          data:signupData
         });
         return res["data"];
     } catch (error) {
       console.log(error);
     }
  }

  async updateUserInfo(user) {
    var res;
    try {
      const res = await axios({
          method: 'put',
          url:`${hostApi}user`,
          headers: {},
          data:user
         });
         return res["data"];
     } catch (error) {
       console.log(error);
     }
  }
}
