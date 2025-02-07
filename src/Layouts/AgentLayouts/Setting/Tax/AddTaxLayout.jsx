import React, { useState } from 'react'
import TitlePage from '../../../../Components/TitlePage'
import { AddWalletPage } from '../../../../Pages/AllPages'
import AddTax from '../../../../Pages/Dashboard/AgentDashboard/Setting/Tax/AddTax'
import { IconButton } from '@mui/material'
import { IoArrowBack } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

const AddTaxLayout = () => {
  const [update, setUpdate] = useState(false)
  const navigate = useNavigate()
  const handleGoBack=()=>{
    navigate(-1);
  }
  return (
    <>
          <div className="flex mb-5 mt-4">
      {/* <IconButton onClick={handleGoBack} color="primary">
          <IoArrowBack />
        </IconButton>
      <TitlePage text={'Add Tax'} /> */}
      </div>
      <AddTax update={update} />
    </>
  )
}

export default AddTaxLayout