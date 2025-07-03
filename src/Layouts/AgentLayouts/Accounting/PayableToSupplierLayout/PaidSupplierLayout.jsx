import React from 'react'
import PaidToSupplier from '../../../../Pages/Dashboard/AgentDashboard/Accounting/PayableToSupplier/PaidToSupplier'
import { useNavigate } from 'react-router-dom'
import TitlePage from '../../../../Components/TitlePage'

const PaidSupplierLayout = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className="flex gap-3">
        <TitlePage text={'Paid Supplier'} />

      </div>
      <PaidToSupplier /></>
  )
}

export default PaidSupplierLayout