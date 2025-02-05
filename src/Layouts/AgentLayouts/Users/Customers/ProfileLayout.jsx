import React from 'react'
import ProfileCustomer from '../../../../Pages/Dashboard/AgentDashboard/Users/Customers/Profile'
import { useParams } from 'react-router-dom';

const ProfileCustomerLayout = () => {
    const { id } = useParams(); 
  return (
    <div><>{<ProfileCustomer id={id} />}</></div>
  )
}

export default ProfileCustomerLayout