import React from 'react'
import TitlePage from '../../../../Components/TitlePage'
import AddButton from '../../../../Components/Buttons/AddButton'
import { Link } from 'react-router-dom'
import { CurrencyPage } from '../../../../Pages/AllPages'

const CurrencyAgentLayout = () => {
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

export default CurrencyAgentLayout;