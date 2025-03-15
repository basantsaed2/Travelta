import React, { useState } from 'react'
import TitlePage from '../../../../Components/TitlePage'
import AddButton from '../../../../Components/Buttons/AddButton'
import { Link } from 'react-router-dom'
import { CurrencyPage } from '../../../../Pages/AllPages'

const CurrencyAgentLayout = () => {
    const [update, setUpdate] = useState(false)
  
  return (
    <>
    <div className="flex justify-between">
 
    <TitlePage text={'Currency Table'} />
    <Link to='add'>
        <AddButton />
      </Link>
    </div>
    <CurrencyPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default CurrencyAgentLayout;