/* eslint-disable no-useless-catch */
import conf from "../config/conf.js";

import { Client, Account, ID } from "appwrite";

export class AuthService {
  Client = new Client();
  account;

  constructor() {
    this.Client.setEndpoint(conf.appwriteUrl).setProject(
      conf.appwriteProjectId
    );

    this.account = new Account(this.Client);
  }

  async createAccount({email,password,name}){
    try {
           const userAccount=  await this.account.create(ID.unique(),email,password,name);
        if(userAccount){
            return this.login({email,password});
        }
        else{
            return userAccount;
        }
    } catch (error) {
        throw error
        
    }
  };

  async login({email,password}){
    try {
            const loggedInUser=    await this.account.createEmailPasswordSession(email,password);
            return loggedInUser;
    } catch (error) {
        throw error
    }
  };

  async getCurrentUser (){
    try {
         await this.account.get();
            
    } catch (error) {
        throw error;
    }
    return null;
  }
  async logout(){
    try {
        await this.account.deleteSession("current")
    } catch ( err) {
        throw err;
    }
  }
}
const authService = new AuthService();

export default authService;
