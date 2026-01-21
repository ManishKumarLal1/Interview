import {Inngest} from "inngest";
import {connectDB} from "./db.js";
import User from "../models/User.js";
import {ENV} from "./env.js";

const inngest= new Inngest({
    id:"intervew-platform",
    eventKey: ENV.INNGEST_EVENT_KEY,
    signingKey: ENV.INNGEST_SIGNING_KEY,
})
const syncUser= inngest.createFunction(
    {id:"sync-user"},
    {event:"clerk/user.created"},
    async(event)=>{
        await connectDB();
         const {id,email_address,first_name,last_name,image_url} = event.data
         //creating new user using param
         const newUser= {
            clerkId:id,
            email:email_address[0]?.email_address,
            name:`${first_name || ""} ${last_name || ""}`,
            profilepic:image_url,
         }
         await User.create(newUser);
          //todo - do something else
    }
)
const deleteUserFromDB= inngest.createFunction(
    {id:"delete-User_From_DB"},
    {event:"clerk/user.deleted"},
    async(event)=>{
        await connectDB();
         const {id,} = event.data
        
         await User.deleteOne({clerkId:id});

         //todo - do something else
    }
)

export const functions = [syncUser, deleteUserFromDB]
export { inngest }