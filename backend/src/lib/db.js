import mongoose from "mongoose"
import {ENV} from "./env.js"

export const connectDB = async()=>{
    try {
        if(!ENV.DB_URL){
            throw new Error("Db url is not defined is Enviornment Variable")
        }
        const conn= await mongoose.connect(ENV.DB_URL)
        console.log("Connected to MongoDB", conn.connection.host);
    } catch (error) {
        console.error("error occured", error)
        process.exit(1);
    }
}