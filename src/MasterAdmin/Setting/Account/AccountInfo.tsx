import React, { ChangeEvent } from "react";
import { BadgeCheck, Dribbble, Facebook, Github, Globe, ImagePlus, Instagram, Linkedin, Mail, MapPin, MoreHorizontal, Plus, UserCircle, Twitter } from "lucide-react";
import { Dropdown } from "Common/Components/Dropdown";

// IMage
import avatar1 from "assets/images/users/avatar-1.png";
 

const AccountInfo = ({ className }: any) => {

    const [selectedImage, setSelectedImage] = React.useState<string | ArrayBuffer | null>(avatar1);

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {

        const file = event.target.files?.[0];

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };


 

    return (
        <React.Fragment>
            <div className={className}>
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 2xl:grid-cols-12">
                    <div className="lg:col-span-2 2xl:col-span-1">
                        <div className="relative inline-block size-20 rounded-full shadow-md bg-slate-100 profile-user xl:size-28">
                            <img src={selectedImage?.toString() ?? avatar1} alt="" className="object-cover border-0 rounded-full img-thumbnail user-profile-image" />
                            <div className="absolute bottom-0 flex items-center justify-center size-8 rounded-full ltr:right-0 rtl:left-0 profile-photo-edit">
                                <input id="profile-img-file-input" type="file"
                                    className="hidden profile-img-file-input"
                                    onChange={handleImageChange} />
                                <label htmlFor="profile-img-file-input" className="flex items-center justify-center size-8 bg-white rounded-full shadow-lg cursor-pointer dark:bg-zink-600 profile-photo-edit">
                                    <ImagePlus className="size-4 text-slate-500 dark:text-zink-200 fill-slate-100 dark:fill-zink-500"></ImagePlus>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-10 2xl:col-span-9">
                        <h5 className="mb-1">Akash <BadgeCheck className="inline-block size-4 text-sky-500 fill-sky-100 dark:fill-custom-500/20"></BadgeCheck></h5>
                        <div className="flex gap-3 mb-4">
                            <p className="text-slate-500 dark:text-zink-200"><UserCircle className="inline-block size-4 ltr:mr-1 rtl:ml-1 text-slate-500 dark:text-zink-200 fill-slate-100 dark:fill-zink-500"></UserCircle>Tech_admin</p>
                             
                        </div>
                        <div className="flex gap-3 mb-4">
                            <p className="text-slate-500 dark:text-zink-200"><Mail className="inline-block size-4 ltr:mr-1 rtl:ml-1 text-slate-500 dark:text-zink-200 fill-slate-100 dark:fill-zink-500"></Mail>workflow@gmail.com</p>
                             
                        </div>
                        
                        {/* <p className="mt-4 text-slate-500 dark:text-zink-200">Strong leader and negotiator adept at driving collaboration and innovation. Highly accomplished CEO & Founder with 10+ years of experience creating, launching and leading successful business ventures. Proven ability to build relationships, drive customer loyalty and increase profitability.</p> */}
                        <div className="flex gap-2 mt-4">
                            <a href="#!" className="flex items-center justify-center transition-all duration-200 ease-linear rounded size-9 text-sky-500 bg-sky-100 hover:bg-sky-200 dark:bg-sky-500/20 dark:hover:bg-sky-500/30">
                                <Facebook className="size-4"></Facebook>
                            </a>
                            <a href="#!" className="flex items-center justify-center text-pink-500 transition-all duration-200 ease-linear bg-pink-100 rounded size-9 hover:bg-pink-200 dark:bg-pink-500/20 dark:hover:bg-pink-500/30">
                                <Instagram className="size-4"></Instagram>
                            </a>
                            {/* <a href="#!" className="flex items-center justify-center text-red-500 transition-all duration-200 ease-linear bg-red-100 rounded size-9 hover:bg-red-200 dark:bg-red-500/20 dark:hover:bg-red-500/30">
                                <Globe className="size-4"></Globe>
                            </a> */}
                            <a href="#!" className="flex items-center justify-center transition-all duration-200 ease-linear rounded text-custom-500 bg-custom-100 size-9 hover:bg-custom-200 dark:bg-custom-500/20 dark:hover:bg-custom-500/30">
                                <Linkedin className="size-4"></Linkedin>
                            </a>
                            
                            <a href="#!" className="flex items-center justify-center transition-all duration-200 ease-linear rounded size-9 text-slate-500 bg-slate-100 hover:bg-slate-200 dark:bg-zink-600 dark:hover:bg-zink-500">
                                <Twitter className="size-4"></Twitter>
                            </a>
                        </div>
                    </div>
                    
                </div>
            </div>
            
        </React.Fragment>
    );
}

export default AccountInfo;









// import React, { useState } from 'react';

// function Profile() {
//   // State to manage whether we are in edit mode or view mode
//   const [isEditing, setIsEditing] = useState(false);

//   // Function to toggle edit mode
//   const handleEditClick = () => {
//     setIsEditing(!isEditing);
//   };

//   return (
//     <div className="profile-container">
//       {/* Conditional rendering based on isEditing */}
//       {!isEditing ? (
//         // Display profile details when not in edit mode
//         <div className="profile-details">
//           <h2>Akash</h2>
//           <p>CEO & Founder - Los Angeles, California</p>
//           <p>
//             Strong leader and negotiator adept at driving collaboration and innovation...
//           </p>
//           {/* Edit button */}
//           <button className="edit-button" onClick={handleEditClick}>
//             + Edit Info
//           </button>
//         </div>
//       ) : (
//         // Display edit form when in edit mode
//         <div className="profile-edit-form">
//           <h3>Edit Profile</h3>
//           <label>
//             User Name:
//             <input type="text" placeholder="Enter your name" />
//           </label>
//           <label>
//             User Email:
//             <input type="email" placeholder="Enter your email" />
//           </label>
//           <label>
//             User Id:
//             <input type="text" placeholder="User Id" />
//           </label>
//           {/* Save or Cancel buttons */}
//           <button onClick={() => setIsEditing(false)}>Save</button>
//           <button onClick={() => setIsEditing(false)}>Cancel</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Profile;





