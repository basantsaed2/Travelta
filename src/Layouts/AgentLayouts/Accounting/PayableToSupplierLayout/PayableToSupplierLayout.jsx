import React , { useState } from 'react';
import PayableToSupplier from '../../../../Pages/Dashboard/AgentDashboard/Accounting/PayableToSupplier/PayableToSupplier'
import {  useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import TitlePage from '../../../../Components/TitlePage'

const PayableToSupplierLayout = () => {
    const navigate = useNavigate()
      const [update, setUpdate] = useState(false)
    
  return (
    <>
    <div className='flex justify-between items-center'>
      <TitlePage text={'Payable To Supplier Table'} />

      </div>
    <PayableToSupplier update={update} setUpdate={setUpdate}/></>
  )
}

export default PayableToSupplierLayout