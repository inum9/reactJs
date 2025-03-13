import config from "../conf/consf.js";

import {Client,Account,ID} from 'appwrite';

export class AuthService{
    client=new Client();
    Account;
    constructor(){
        this.client.setEndpoint(config.appWriteUrl).setProject(config.appWriteProjectId);//this is the endpoint and project id
        
        this.Account=new Account(this.client);//this is the account


        async function createAccount({,email,password,name}){
           try {
                 const userAccount=    await this.Account.create(ID.unique(),email,password,name);
                  if(userAccount){
                   //call another function to send email
                  }else{
                    return userAccount
                  }

           } catch (error) {
            console.log(error);
            
           }

           
        }
    }

}//this is the class that will be used to authenticate the user
//this class will be used to authenticate the user

const authService =new AuthService();


export default authService;