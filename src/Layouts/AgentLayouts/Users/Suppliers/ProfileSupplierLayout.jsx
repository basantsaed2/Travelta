import React from 'react'
import { useParams } from 'react-router-dom';
import ProfileSupplier from '../../../../Pages/Dashboard/AgentDashboard/Users/Suppliers/ProfileSupplier';

const ProfileSupplierLayout = () => {
    const { id } = useParams(); 
  return (
    <div><>{<ProfileSupplier id={id} />}</></div>
  )
}

export default ProfileSupplierLayout