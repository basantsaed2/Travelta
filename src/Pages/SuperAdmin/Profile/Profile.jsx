import React, { useEffect, useState } from "react";
import { useGet } from "../../../Hooks/useGet";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import StaticLoader from '../../../Components/StaticLoader'
const Profile = () => {
    const navigate=useNavigate()
  const {
    refetch: refetcdata,
    loading: loading,
    data:dataprofile,
  } = useGet({ url: "https://www.travelta.online/api/my_profile" });
  const [data,setData]=useState([])

useEffect(()=>{
    refetcdata()
},[refetcdata])
useEffect(()=>{
if(dataprofile)
setData(dataprofile.user)
},[dataprofile])
if(loading)return( 
     <div className="flex items-center justify-center w-full h-56">
        <StaticLoader />
      </div>)
  return (
    <div className="w-full px-4 py-6">
   <button onClick={()=>navigate(-1)} className="my-5 text-2xl text-mainColor">
            <FaArrowLeft />
          </button>
      <div className="w-full p-3 pt-5 border rounded-lg border-borderColor">
        <span className="text-2xl font-medium text-mainColor">
          Personal Information:
        </span>
      </div>

      <div className="flex flex-wrap justify-between gap-6 px-2 py-5 border rounded-lg border-borderColor">
        <div className="flex flex-col gap-1">
          <span className="font-normal text-[13px] text-mainColor">
            Full Name:
          </span>
          <span className="font-medium text-[16px] text-mainColor">
{data.name??"N/A"}  
        </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-normal text-[13px] text-mainColor">Email:</span>
          <span className="font-medium text-[16px] text-mainColor">
{data.email??"N/A"}  
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-normal text-[13px] text-mainColor">
Phone:
          </span>
          <span className="font-medium text-[16px] text-mainColor">
{data.phone??"N/A"}  
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-normal text-[13px] text-mainColor">
            Country:
          </span>
          <span className="font-medium text-[16px] text-mainColor">
            Amal Mansour Ghanem
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-normal text-[13px] text-mainColor">City:</span>
          <span className="font-medium text-[16px] text-mainColor">
            Amal Mansour Ghanem
          </span>
        </div>
      </div>

      
      <div className="w-full p-3 pt-5 mt-5 border rounded-lg border-borderColor">
        <span className="text-2xl font-medium text-mainColor">
          Account Information: 
        </span>
      </div>

      <div className="flex flex-wrap justify-between gap-6 px-2 py-5 border rounded-lg border-borderColor">
        <div className="flex flex-col gap-1">
          <span className="font-normal text-[13px] text-mainColor">
           Username:
          </span>
          <span className="font-medium text-[16px] text-mainColor">
{data.name??"N/A"}  
        </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-normal text-[13px] text-mainColor">Password:</span>
          <span className="font-medium text-[16px] text-mainColor">
********
          </span>
        </div>
       
        <div className="flex flex-col gap-1">
          <span className="font-normal text-[13px] text-mainColor">
User Role:          </span>
          <span className="font-medium text-[16px] text-mainColor">
            Amal Mansour Ghanem
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-normal text-[13px] text-mainColor">Account Created:</span>
          <span className="font-medium text-[16px] text-mainColor">
            Amal Mansour Ghanem
          </span>
        </div>
      </div>
    </div>
  );
};
export default Profile;
