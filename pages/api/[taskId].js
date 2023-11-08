import connectDB from "@/utils/connectDB";
import User from "@/models/User";
import { getSession } from "next-auth/react";


async function handler(req , res) {

     try {
          await connectDB();
     } catch (error) {
          console.log("error in the taskId",error)
          return res.status(500).json({status : "failed" , message : "Error in connecting to DB"})
     }

     const session = await getSession({req});

     if (!session) {
          return res.status(401).json({status : "failed" , message : "your aren't logged!"})
     }

     const user = await User.findOne({email : session.user.email})

     if (!user) {
          return res.status(404).json({status : "failed" , message : "user doesn't exist!"})
     }

     if (req.method === "GET") {
          const id = req.query.taskId;     
          return res.status(200).json({status : "success" , message : "recive data" , data :{todos : user.todos}})
     }
     
}

export default handler;