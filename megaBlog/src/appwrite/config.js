import config from "../conf/consf.j";
import { Client, Id, Query, Databases,Storage } from "appwrite";

export class DataBaseService {
  client = new Client();
  dataBase;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appWriteUrl)
      .setProject(config.appWriteProjectId);

   
    this.dataBase = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }
  //method to the create a post 
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      const response = await this.dataBase.createDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  };
  // method to update all the posts
  async updatePost(slug,{title,content,featuredImage,status}){

  try {
    const response=await this.dataBase.updateDocument(
      config.appWriteDatabaseId,
      config.appWriteCollectionId,
      slug,{
        title,
        content,
        featuredImage,
        status,
       
      }

    )
    return response;
    
  } catch (error) {
    console.log(error);

    
  }



};
// method to delete the post 
async deletePost(slug){
  try {
   const response= await this.dataBase.deleteDocument(
    config.appWriteDatabaseId,
    config.appWriteCollectionId,
    slug,

    )
    return response;
    
  } catch (error) {
    console.log(error);
    
  }
};

//get a document id
async getPost(slug){
  try {
      const response=  await this.dataBase.getDocument(
          config.appWriteDatabaseId,
          config.appWriteCollectionId,
          slug
        )
        return response;
  }   catch (error) {
    console.log(error);
    
  }
};

async getPosts(Queries=[Query.equal("status","active")]){
    try {
      let response=    await this.dataBase.listDocuments(
            config.appWriteDatabaseId,
            config.appWriteCollectionId,
            Queries,

          )
          return response;
    } catch (error) {
      console.log(error);
      
    }
};
//method for file upload
async uploadFile(file){
  try {
    return await this.bucket.createFile(
      config.appWritebucketId,
      Id.unique(),
      file,
    )


  } catch (error) {
    console.log(error);
    
  }
};
// method to delete file 
async deleteFile (fileId){
    try {
        return await this.bucket.deleteFile(
          config.appWritebucketId,
          fileId
        )
    } catch (error) {
      console.log(error);
      
    }
};
//method for filr preview
async getFilePreview(fileId){
  return await this.bucket.getFile(
    config.appWritebucketId,
    fileId,
  )
}; 


}
const service = new DataBaseService();
export default service;
