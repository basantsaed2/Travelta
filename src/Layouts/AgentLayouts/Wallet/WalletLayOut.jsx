import React from 'react'
import TitlePage from '../../../Components/TitlePage'
import Wallet from '../../../Pages/Dashboard/AgentDashboard/Wallet/Wallet'
import AddButton from '../../../../src/Components/Buttons/AddButton'
import { Link } from 'react-router-dom'

const WalletLayOut = () => {
  return (
    <>
    <div className="flex justify-between">
 
    <TitlePage text={'Wallet'} />
    <Link to='add'>
        <AddButton />
      </Link>
    </div>
    <Wallet/>
    </>
  )
}

export default WalletLayOut