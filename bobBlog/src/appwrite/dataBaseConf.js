/* eslint-disable no-useless-catch */
import conf from "./conf.js";
import {Client,ID,Storage,Databases,Query} from "appwrite";


export class Service {
    Client=new Client;
    databases ;
    storage;
        constructor(){
                    this.Client.setEndpoint(conf.appwriteUrl)
                    .setProject(conf.appwriteProjectId);
                   this.databases=new Databases(this.Client);
                this.storage=new Storage(this.Client);

        }

        async createPost({title,slug,content,featuredImage,status,userId}){
            try {
                await this.databases.createDocument(
                    conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,
                    {
                        title,content,featuredImage,status,userId
                    }
                )
            } catch (error) {
                throw error;
            }

        }

         async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,

                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

     async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
                

            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }
    //file upload file

      async uploadFile(file){
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }
     async deleteFile(fileId){
        try {
            await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    
    getFilePreview(fileId){
        return this.storage.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}


const service= new Service();

export default service;