import { getSession } from "next-auth/react";
import SignInPage from "@/template/SignInPage";

const Signin = () => {
     return (<SignInPage/>)
}

export default Signin;

// export async function getServerSideProps({req}){
 
//      const session = await getSession({req})
   
//      if (!session) {
//        return{
//          redirect : {
//            destination : "/signup",
//            permanent : false
//          }
//        }
//      }
   
//      return {
//        props : {}
//      }
//    }

