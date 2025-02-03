import React from 'react'
import TitlePage from '../../../../Components/TitlePage'
import { WalletPage } from '../../../../Pages/AllPages'
import AddButton from '../../../../Components/Buttons/AddButton'
import { Link } from 'react-router-dom'
import Tax from '../../../../Pages/Dashboard/AgentDashboard/Setting/Tax/Tax'

const TaxLayout = () => {
  return (
    <>
    <div className="flex justify-between">
 
    <TitlePage text={'Tax'} />
    <Link to='add'>
        <AddButton />
      </Link>
    </div>
    <Tax/>
    </>
  )
}

export default TaxLayout;