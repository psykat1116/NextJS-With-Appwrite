import config from "@/config/config";
import { Client, Account, ID } from "appwrite";

const appwriteClient = new Client();

type createUserAccount = {
  email: string;
  password: string;
  name: string;
};

type loginUserAccount = {
  email: string;
  password: string;
};

appwriteClient
  .setEndpoint(config.appwriteUrl)
  .setProject(config.appwriteProjectId);

export const appwriteAccount = new Account(appwriteClient);

export class AppwriteService {
  //create a new record of user inside appwrite
  async createUserAccount({ email, password, name }: createUserAccount) {
    try {
      const userAccount = await appwriteAccount.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.loginUserAccount({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async loginUserAccount({ email, password }: loginUserAccount) {
    try {
      return await appwriteAccount.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      const data = await this.getCurrentUserAccount();
      return Boolean(data);
    } catch (error) {
      return false;
    }
  }

  async getCurrentUserAccount() {
    try {
      return await appwriteAccount.get();
    } catch (error) {
      console.log("getCurrentUserAccount error: ", error);
    }
    return null;
  }

  async logoutUserAccount() {
    try {
      return await appwriteAccount.deleteSession("current");
    } catch (error) {
      console.log("logoutUserAccount error: ", error);
    }
  }
}

const appwriteService = new AppwriteService();

export default appwriteService;