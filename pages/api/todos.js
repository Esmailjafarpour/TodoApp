import connectDB from "@/utils/connectDB";
import { getSession } from "next-auth/react";
import User from "@/models/User";

async function handler(req , res) {
    
     try {
          await connectDB();
     } catch (error) {
          console.log("error api todos",error)
          return res.status(500).json({status :"failed", message : "Error in connecting to DB"})
     }

     const session = await getSession({ req });
     
     if (!session) {
          return res.status(401).json({status : "failed" , message : "you aren't logged in!"})
     }

     const user = await User.findOne({email : session.user.email})

     if (!user) {
         return res.status(404).json({status : "failed" , message : "user doesn't exist!"}) 
     }

     if (req.method === "POST") {
          
          const { title , status } = req.body;

          if (!title || !status) {
               return res.status(422).json({status : "failed" , message : "Invalid data!"})
          }

          user.todos.push({title , status});
          user.save();

          return res.status(201).json({status : "success" , message : "todo Created!"})
     }

}


export default handler;