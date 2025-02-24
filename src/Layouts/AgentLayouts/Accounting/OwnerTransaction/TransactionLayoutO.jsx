import React from 'react'
import Transaction from '../../../../Pages/Dashboard/AgentDashboard/Accounting/OwnerTransaction/Transaction'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import TitlePage from '../../../../Components/TitlePage'

const TransactionLayoutO = () => {
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
 <TitlePage text={'Tranactions List'} />
   
 </div>
    <Transaction/></>
  )
}

export default TransactionLayoutO