import React, { useState } from 'react'
import TitlePage from '../../../../../Components/TitlePage'
import {RevenueListPage} from '../../../../../Pages/AllPages'
import { Link } from 'react-router-dom'
import AddButton from '../../../../../Components/Buttons/AddButton'

const RevenueListLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
    <div className='flex justify-between items-center'>
    <TitlePage text={'Revenue List'} />
    <Link to='add'>
        <AddButton />
      </Link>
    </div>
      <RevenueListPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default RevenueListLayout;