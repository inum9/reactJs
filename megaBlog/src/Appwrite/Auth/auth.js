import config from "../../environment_config/config";
import { Client, Id, Account } from "appwrite";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  //method for creating the user;
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        Id.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log(error);
    }
  }

  //method to login the user
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log(error);
    }
  }
  // method for getcurreent user
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log(error);
    }
    return null;
  }
  //method for logout
  async logout(){
    try {
      return  await this.account.deleteSessions();
    } catch (error) {
        console.log(error);
        
    }
  }
}

const authService = new AuthService();
export default authService;
