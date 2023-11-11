import React from 'react';
import Link from "next/link";

const ProfileData = ({data}) => {
     return (
          <div className="profile-data">
               <div>
                    <span>Name :</span>
                    <p>{data.name}</p>
               </div>

               <div>
                    <span>LastName :</span>
                    <p>{data.lastName}</p>
               </div>

               <div>
                    <span>Email :</span>
                    <p>{data.email}</p>
               </div>
               <button><Link href="/editProfile">Edit</Link></button>
          </div>
     );
}

export default ProfileData;
