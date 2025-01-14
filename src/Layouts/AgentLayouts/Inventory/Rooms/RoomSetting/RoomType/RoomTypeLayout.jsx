import React, { useState } from 'react'
import TitlePage from '../../../../../../Components/TitlePage'
import {RoomTypePage } from '../../../../../../Pages/AllPages'
import AddButton from '../../../../../../Components/Buttons/AddButton'
import { Link } from 'react-router-dom'

const RoomTypeLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
    <div className='flex justify-between items-center'>
    <TitlePage text={'Room Type'} />
    <Link to='add'>
        <AddButton />
      </Link>
    </div>
      <RoomTypePage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default RoomTypeLayout