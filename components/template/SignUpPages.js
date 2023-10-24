import { useState , useEffect } from "react";
import Link from "next/link";
import FormInput from "@/module/FormInput";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const SignUpPages = () => {

     const router = useRouter();
     const { status } = useSession();

     const [state, setAllState] = useState({
          email :"",
          password :""
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

     const signUpHandler = async () => {

          const res = await fetch("/api/auth/signup" ,{
               method : "POST",
               body : JSON.stringify({
                    email : state.email,
                    password : state.password
               }),
               headers : {"Content-Type" : "application/json"}
          })
          const data = await res.json()
          console.log("SignUpPages data",data)
          if (data.status === "success") router.push("/signin")
     }
     
     return (
          <div className="signin-form">
               <h3>Registeration Form</h3>
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
               <button onClick={signUpHandler}>Register</button>    
               <div>
                    <p>Have an account?</p>
                    <Link href="/signin">sign in</Link>
               </div>         
          </div>
     );
}

export default SignUpPages;
