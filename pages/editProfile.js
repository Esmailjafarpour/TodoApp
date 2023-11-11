import ProfileForm from "@/module/ProfileForm";
import { useState , useEffect } from "react";
import { useRouter } from "next/router";

const EditProfile = () => {

     const router = useRouter();
     const [state, setAllState] = useState({
          name : "",
          lastName : "",
          password : "",
          data : null
     });

     useEffect(() => {
          fetchProfile()
     }, []);

     const fetchProfile = async () => {
        const res = await fetch("/api/profile");
        const data = await res.json()
        console.log(data)
        if (data.status === "success" && data.data.name && data.data.lastName) {
          console.log("data",data)
          setAllState({
               ...state,
               name : data.data.name,
               lastName : data.data.lastName,
               data : data.data
          })
        }
     }

     const submitHandler = async () => {
          const res = await fetch("/api/profile",{
               method : "POST",
               body : JSON.stringify({name : state.name, lastName : state.lastName ,password : state.password}),
               headers : {"Content-Type" : "application/json"}
          })
          const data = await res.json();
          if (data.status === "success") router.replace("/profile")
     }

     return (
          <div>
              <ProfileForm
                    state={state}
                    name={state.name}
                    lastName={state.lastName}
                    password={state.password}
                    setAllState={setAllState}
                    submitHandler={submitHandler}
               />
          </div>
     );
}

export default EditProfile;
