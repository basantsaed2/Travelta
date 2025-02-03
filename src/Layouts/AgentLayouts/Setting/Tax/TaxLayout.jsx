import React, { useState } from 'react'
import TitlePage from '../../../../Components/TitlePage'
import { WalletPage } from '../../../../Pages/AllPages'
import AddButton from '../../../../Components/Buttons/AddButton'
import { Link } from 'react-router-dom'
import Tax from '../../../../Pages/Dashboard/AgentDashboard/Setting/Tax/Tax'
import AddTaxLayout from './AddTaxLayout'
import AddTax from '../../../../Pages/Dashboard/AgentDashboard/Setting/Tax/AddTax'
import TitleSection from '../../../../Components/TitleSection'

const TaxLayout = () => {
    const [update, setUpdate] = useState(false)
  return (
    <>
   
 
   <TitlePage text={'Add Tax'} />
  <AddTax update={update} setUpdate={setUpdate} />
  <TitleSection text={'Tax'} />
    <Tax update={update}  />
    </>
  )
}

export default TaxLayout;