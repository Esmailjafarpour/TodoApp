import connectDB from "@/utils/connectDB";
import User from "@/models/User";
import  { verifyPassword } from "@/utils/auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
     session : {strategy : "jwt"},
     providers : [
          CredentialsProvider({
               async authorize(credentials ,req){
                    const { email , password , name , lastName } = credentials
                    try {
                         await connectDB();
                    } catch (error) {
                         throw new Error("Error to connect DB")
                    }

                    console.log(email,password)


                    if (!email || !password) {
                         throw new Error("Invalid Date")
                    }

                    const user = await User.findOne({email : email});
                    console.log("user",user)

                    if (!user) {
                         throw new Error("user doesn't exist!")
                    }

                    const isValid = await verifyPassword(password , user.password);

                    if (!isValid) {
                         throw new Error("Username or Password in incorrect")
                    }

                    console.log("...nextauth" , email , password , name , lastName)
                     return{email}
               },
          }),
     ],
};

export default NextAuth(authOptions);