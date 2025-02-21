import React from 'react'
import Profile from '../../../../Pages/Dashboard/AgentDashboard/Users/Leads/Profile'
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import TitlePage from '../../../../Components/TitlePage';

const ProfileLayout = () => {
    const { id } = useParams(); 
    const navigate = useNavigate()
  return (
    <div>
              <div className="flex gap-3">
 <button
        onClick={() => navigate(-1)}
        className=" top-2 text-mainColor text-2xl cursor-pointer hover:text-blue-500 transition-all"
      >
        <FaArrowLeft/>
      </button>
 <TitlePage text={'Profile'} />
   
 </div>
  
      
      {<Profile id ={id} />}</div>
  )
}

export default ProfileLayout