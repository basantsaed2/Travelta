import React, { useState } from 'react'
import TitlePage from '../../../../Components/TitlePage'
import {PositionPage} from '../../../../Pages/AllPages'
import AddButton from '../../../../Components/Buttons/AddButton'
import { Link } from 'react-router-dom'

const PositionLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
    <div className='flex justify-between items-center'>
    <TitlePage text={'Role Table'} />
    <Link to='add'>
    <AddButton />
    </Link>
    </div>
      <PositionPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default PositionLayout;