import React from 'react'
import DetailsTransaction from '../../../../Pages/Dashboard/AgentDashboard/Users/Suppliers/DetailsTransaction'
import { useNavigate, useParams } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import TitlePage from '../../../../Components/TitlePage'

const DetailsTransactionLayout = () => {
    // const {supplier_id} = useParams()
    const navigate = useNavigate()
  return (
   
        <>
                  <div className="flex gap-3">
 <button
        onClick={() => navigate(-1)}
        className=" top-2 text-mainColor text-2xl cursor-pointer hover:text-blue-500 transition-all"
      >
        <FaArrowLeft/>
      </button>
 <TitlePage text={'Details'} />
   
 </div>
        
        <DetailsTransaction/></>
        
  )
}

export default DetailsTransactionLayout