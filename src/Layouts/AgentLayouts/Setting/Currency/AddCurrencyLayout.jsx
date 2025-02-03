import React, { useState } from 'react'
import TitlePage from '../../../../Components/TitlePage'
import { AddWalletPage } from '../../../../Pages/AllPages'
import AddCurrency from '../../../../Pages/Dashboard/AgentDashboard/Setting/Currency/AddCurrency'
import { useNavigate } from 'react-router-dom'
import { IconButton } from '@mui/material'
import { IoArrowBack } from 'react-icons/io5'

const AddCurrencyLayout = () => {
  const [update, setUpdate] = useState(false)
  const navigate = useNavigate()
  const handleGoBack=()=>{
    navigate(-1);
  }
  return (
    <>
      <div className="flex mb-5 mt-4">
      <IconButton onClick={handleGoBack} color="primary">
          <IoArrowBack />
        </IconButton>
      <TitlePage text={'Add Currency'} />
      </div>
      <AddCurrency update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default AddCurrencyLayout