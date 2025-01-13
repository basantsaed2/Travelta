import React from 'react'
import TitlePage from '../../../Components/TitlePage'
import Wallet from '../../../Pages/Dashboard/AgentDashboard/Wallet/Wallet'

const WalletLayOut = () => {
  return (
    <>
    <TitlePage text={'Wallet'} />
    <Wallet/>
    </>
  )
}

export default WalletLayOut