import React from 'react'
import Transaction from '../../../../Pages/Dashboard/AgentDashboard/Users/Suppliers/Transaction'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import TitlePage from '../../../../Components/TitlePage'

const TransactionLayout = () => {
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
 <TitlePage text={'Transaction'} />
   
 </div>
    {<Transaction />}</>
  )
}

export default TransactionLayout