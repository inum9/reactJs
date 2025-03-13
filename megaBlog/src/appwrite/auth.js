import config from "../conf/consf.js";

import {Client,Account,ID} from 'appwrite';

export class AuthService{
    client=new Client();
    Account;
    constructor(){
        this.client.setEndpoint(config.appWriteUrl).setProject(config.appWriteProjectId);//this is the endpoint and project id
        
        this.Account=new Account(this.client);//this is the account
    }

}//this is the class that will be used to authenticate the user
//this class will be used to authenticate the user

const authService =new AuthService();


export default authService;