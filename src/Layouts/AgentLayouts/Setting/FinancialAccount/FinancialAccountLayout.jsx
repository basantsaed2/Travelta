import React, { useState } from 'react'
import TitlePage from '../../../../Components/TitlePage'
import {FinancialAccountPage } from '../../../../Pages/AllPages'
import AddButton from '../../../../Components/Buttons/AddButton'
import { Link } from 'react-router-dom'

const FinancialAccountLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
    <div className='flex justify-between items-center'>
    <TitlePage text={'Financial Account'} />
    <Link to='add'>
        <AddButton />
      </Link>
    </div>
      <FinancialAccountPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default FinancialAccountLayout