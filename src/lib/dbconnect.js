import { MongoClient, ServerApiVersion } from 'mongodb';
export const collectionNames={
    TEST_USER:'test-users',
    PRODUCTS_DATA:'products'
}

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
 function dbconnet(collectionName){
    const uri=process.env.NEXT_PUBLIC_MONGODB_URI
    const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
return client.db(process.env.DB_NAME).collection(collectionName)
 }
 export default dbconnet