import {StreamChat} from "stream-chat";
import { ENV } from "./env.js"

const apiKey= ENV.STREAM_API_KEY;
const apiSecret= ENV.STREAM_API_SECRET;

if(!apiKey||!apiSecret){
    console.error("API KEY or API SECRET is missing");
}

export const chatClient = StreamChat.getInstance(apiKey,apiSecret);

export const upsertStreamUser = async(userData)=>{
    try {
        await chatClient.upsertUser(userData);
        console.log("User upserted Successfully:", userData)
    } catch (error) {
        console.error("Error in upserting Stream User:", error);
    }
}

export const deleteStreamUser = async(userId)=>{
    try {
        await chatClient.deleteUser(userId);
       console.log("User deleted Successfully:", userId)
    } catch (error) {
        console.error("Error in deleting Stream User:", error);
    }
}
// todo - add another method to generate tokens