import React, { useState } from 'react'
import TitlePage from '../../../../../../Components/TitlePage'
import {RoomExtraPage} from '../../../../../../Pages/AllPages'
import AddButton from '../../../../../../Components/Buttons/AddButton'
import { Link } from 'react-router-dom'

const RoomExtraLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
      <RoomExtraPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default RoomExtraLayout