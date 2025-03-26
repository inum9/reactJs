import config from "../environment_config/config";
import { Client, Id, Storage, Query, Databases } from "appwrite";

export class DatabaseService {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }
//create the post in database
  async createPost({ title, content, featuredImage, slug, userId }) {
    try {
     return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,

        {
          title,
          content,
          featuredImage,
          userId,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  //update the dtabase
  async updatePost({ title, content, featuredImage, slug, userId }) {
    try {
     return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          userId,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  //delete the post
async deletePost(slug){
    try {
      return  await this.databases.deleteDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug
        )
      
    } catch (error) {
        console.log(error);
        
    }
    return true;
}
  
//get  the post
async getSinglePost(slug){
    try {
      return  await this.databases.getDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug
        )
    } catch (error) {
        console.log(error);
        
    }
    return false;
}

async getPost(queries=[Query.equal("status","active")]){
    try {
        return await this.databases.listDocuments(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            queries,
           
        )
    } catch (error) {
        console.log(error);
        
    }
}

//service for filew uploading 
async uploadFile(file){
    try {
    return await this.bucket.createFile(
        config.appwriteBucketId,
        Id.unique(),
        file
    )
    } catch (error) {
        console.log(error);

        
    }
    return false;
}
async deleteFile(fileId){
    try {
        return await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
        )
    } catch (error) {
        console.log(error);
        
    }
    return false;
}

getFilePreview(fileId){
    return this.bucket.getFilePreview(
        config.appwriteBucketId,
        fileId
    )
}
}







const databaseService = new DatabaseService();
export default databaseService;
