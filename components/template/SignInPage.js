import { useState , useEffect } from "react";
import Link from "next/link";
import FormInput from "@/module/FormInput";
import { useRouter } from "next/router";
import { signIn , useSession } from "next-auth/react";

const SignInPage = () => {

     const router = useRouter();
     const { status } = useSession();

     const [state, setAllState] = useState({
          email :"nader@gmail.com",
          password :"123456"
     });

     useEffect(() => {
         if (status === "authenticated") router.replace("/")
     }, [status]);

     

     const changeHandler = (event) => {
          const { name , value } = event.target
          setAllState({
               ...state,
               [name] : value
          })
     }

     const loginHandler = async () => {
          const res = await signIn("credentials",{
               email : state.email,
               password : state.password,
               redirect : false 
          })

          if (!res.error) router.push("/")
               
          
     }

     return (
          <div className="signin-form">
          <h3>Login Form</h3>
          <FormInput
               label="Email"
               name="email"
               type="text"
               value={state.email}
               onChange={changeHandler}
               placeholder="Enter your email"

          />
          <FormInput
               label="Password"
               name="password"
               type="password"
               value={state.password}
               onChange={changeHandler}
               placeholder="Enter your Password"

          />
          <button onClick={loginHandler}>Login</button>    
          <div>
               <p>Create an account?</p>
               <Link href="/signup">sign up</Link>
          </div>         
     </div>
     );
}

export default SignInPage;
