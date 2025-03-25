import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017";
const dbName="medicalDatabase"
let db;
export const connectDB = async () => {
    if(db){
        return db;
    }
    try {
        const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        db = client.db(dbName);
        console.log("MongoDB connected");
        return db;
    }catch(err){
        console.error("Error connecting to MongoDB", err);
        throw err;
    }
}
