const config={
        appwriteUrl:String(import.meta.env.VITE_APPWRITE_URL),
        appwriteProjectId:String(import.meta.env.VITE_PROJECT_ID),
        appwriteCollectionId:String(import.meta.env.VITE_COLLECTION_ID),
        appwriteDatabaseId:String(import.meta.env.VITE_DATABASE_URL),
        appwriteBucketId:String(import.meta.env.VITE_BUCKET_ID)

}

export default config;