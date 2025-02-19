import React from 'react'
import Owner from '../../../../Pages/Dashboard/AgentDashboard/ComingSoon/OwnerTransaction/Owner'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa';
import TitlePage from '../../../../Components/TitlePage';

const OwnerLayout = () => {
    const navigate = useNavigate();
  return (
    <>
    
    <div className="flex gap-3">
 <button
        onClick={() => navigate(-1)}
        className=" top-2 text-mainColor text-2xl cursor-pointer hover:text-blue-500 transition-all"
      >
        <FaArrowLeft/>
      </button>
 <TitlePage text={'All Owners'} />
   
 </div>
    <Owner/></>
  )
}

export default OwnerLayout