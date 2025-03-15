import config from "../conf/consf.js";

import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  Account;
  constructor() {
    this.client
      .setEndpoint(config.appWriteUrl) //this is the endpoint
      .setProject(config.appWriteProjectId); //this is the endpoint and project id

    this.Account = new Account(this.client); //this is the account
  }
      //this is the function that will be used to create
      // the user
      async creatAccount({email,password,name}){
        try {
            const userAccount=  await this.Account.create(ID.unique(),email,password,name);

            if(userAccount){
              return userAccount;
            }else{
              return null;
            }
        } catch (error) {
          console.log(error);
          
        }
      };
}

//this is the class that will be used to authenticate the user
//this class will be used to authenticate the user

const authService = new AuthService();

export default authService;
