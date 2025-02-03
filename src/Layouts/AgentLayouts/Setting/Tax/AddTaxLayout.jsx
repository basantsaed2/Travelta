import React, { useState } from 'react'
import TitlePage from '../../../../Components/TitlePage'
import { AddWalletPage } from '../../../../Pages/AllPages'
import AddTax from '../../../../Pages/Dashboard/AgentDashboard/Setting/Tax/AddTax'

const AddTaxLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
      <TitlePage text={'Add Tax'} />
      <AddTax update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default AddTaxLayout