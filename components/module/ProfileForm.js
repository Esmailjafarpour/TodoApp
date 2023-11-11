import FormInput from "@/module/FormInput";

const ProfileForm = ({state , name , lastName , password , setAllState , submitHandler}) => {
     return (
          <>
               <div className="profile-form__input">
                         <FormInput 
                              label="Name" 
                              name="name" 
                              type="text" 
                              value={name} 
                              onChange={(e)=> setAllState({
                                   ...state,
                                   [e.target.name] : e.target.value
                              })}  
                              placeholder="name"
                         />
                         <FormInput 
                              label="LastName" 
                              name="lastName" 
                              type="text" 
                              value={lastName} 
                              onChange={(e)=> setAllState({
                                   ...state,
                                   [e.target.name] : e.target.value
                              })}  
                              placeholder="lastName"
                         />
                         <FormInput 
                              label="Password" 
                              name="password" 
                              type="password" 
                              value={password} 
                              onChange={(e)=> setAllState({
                                   ...state,
                                   [e.target.name] : e.target.value
                              })}  
                              placeholder="password"
                         />
                   </div>
                   {name && lastName ? 
                    <button onClick={submitHandler}>Edit Profile</button>
                    :
                    <button onClick={submitHandler}>Submit</button>
                   }
          </>
     );
}

export default ProfileForm;
