import React, { useState } from 'react'
import TitlePage from '../../../../Components/TitlePage'
import AddButton from '../../../../Components/Buttons/AddButton'
import { Link } from 'react-router-dom'
import { LedgerPage } from '../../../../Pages/AllPages'
const LedgerLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
    <div className='flex justify-between items-center'>
    <TitlePage text={'General Ledger Table'} />
    <Link to='add'>
        <AddButton />
      </Link>
    </div>
      <LedgerPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default LedgerLayout;