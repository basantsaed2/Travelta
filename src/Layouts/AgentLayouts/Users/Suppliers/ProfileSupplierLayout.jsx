import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import ProfileSupplier from '../../../../Pages/Dashboard/AgentDashboard/Users/Suppliers/ProfileSupplier';
import { FaArrowLeft } from 'react-icons/fa';
import TitlePage from '../../../../Components/TitlePage';

const ProfileSupplierLayout = () => {
    const { id } = useParams(); 
    const navigate= useNavigate()
  return (
 
      
      <>
           <div className="flex gap-3">
 <button
        onClick={() => navigate(-1)}
        className=" top-2 text-mainColor text-2xl cursor-pointer hover:text-blue-500 transition-all"
      >
        <FaArrowLeft/>
      </button>
 <TitlePage text={'Profile'} />
   
 </div>
      {<ProfileSupplier id={id} />}</>
  )
}

export default ProfileSupplierLayout