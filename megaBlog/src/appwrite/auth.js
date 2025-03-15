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
             return this.loginUser({email,password});
            }else{
              return userAccount;
            }
        } catch (error) {
          console.log(error);
          
        }
      };
      //this is the function that will be used to login the user
      async loginUser({email,password}){
        try {
          await this.Account.createEmailPasswordSession(email,password);

          
        } catch (error) {
          console.log(error);
          
        }
      };
      //this is the function that will be used to get the current  user
      async getCurrentUser(){
        try {

         const user= await this.Account.get();
         return user;
        } catch (error) {
          console.log(error);
          
        }
        return null;
      }
        //this is the function that will be used to logout the user
        async logoutUser(){
          try {
            await this.Account.deleteSessions();
          } catch (error) {
            console.log(error);
            
          }
        }
}

//this is the class that will be used to authenticate the user
//this class will be used to authenticate the user

const authService = new AuthService();

export default authService;
