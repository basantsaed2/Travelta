import React from 'react'
import TitlePage from '../../../../Components/TitlePage'
import { WalletPage } from '../../../../Pages/AllPages'
import AddButton from '../../../../Components/Buttons/AddButton'
import { Link } from 'react-router-dom'
import CurrencyPage from '../../../../Pages/Dashboard/AgentDashboard/Setting/Currency/CurrencyPage'

const CurrencyLayoutPage = () => {
  return (
    <>
    <div className="flex justify-between">
 
    <TitlePage text={'Currency'} />
    <Link to='add'>
        <AddButton />
      </Link>
    </div>
    <CurrencyPage/>
    </>
  )
}

export default CurrencyLayoutPage;