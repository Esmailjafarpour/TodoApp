import { useState , useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import ProfileForm from "@/module/ProfileForm";
import ProfileData from "@/module/ProfileData";

const ProfilePage = () => {

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
        if (data.status === "success" && data.data.name && data.data.lastName) {
          console.log("data",data)
          setAllState({
               ...state,
               data : data.data
          })
        }
     }

     const submitHandler = async () => {

          const res = await fetch("/api/profile",{
               method : "POST",
               body : JSON.stringify({name : state.name,lastName : state.lastName ,password : state.password}),
               headers : {"Content-Type" : "application/json"}
          })
          const data = await res.json();
          console.log(data)
     }




     return (
          <div className="profile-form">
               <h2>
                    <CgProfile/>
                    Profile
               </h2>
               {state.data ? <ProfileData data={state.data}/> :
               <ProfileForm
                    state={state}
                    name={state.name}
                    lastName={state.lastName}
                    password={state.password}
                    setAllState={setAllState}
                    submitHandler={submitHandler}
               />
               }
          </div>
     );
}

export default ProfilePage;
