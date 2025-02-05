import React from 'react'
import Profile from '../../../../Pages/Dashboard/AgentDashboard/Users/Leads/Profile'
import { useParams } from 'react-router-dom';

const ProfileLayout = () => {
    const { id } = useParams(); 
  return (
    <div>{<Profile id ={id} />}</div>
  )
}

export default ProfileLayout