import React from 'react'
import TitlePage from '../../../../Components/TitlePage'
import { WalletPage } from '../../../../Pages/AllPages'
import AddButton from '../../../../Components/Buttons/AddButton'
import { Link } from 'react-router-dom'

const WalletLayout = () => {
  return (
    <>
    <div className="flex justify-between">
 
    <TitlePage text={'Wallet'} />
    <Link to='add'>
        <AddButton />
      </Link>
    </div>
    <WalletPage/>
    </>
  )
}

export default WalletLayout;