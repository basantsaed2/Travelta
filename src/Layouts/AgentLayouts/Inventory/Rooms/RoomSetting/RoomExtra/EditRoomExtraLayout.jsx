import React, { useState } from 'react'
import TitlePage from '../../../../../../Components/TitlePage'
import {EditRoomExtraPage} from '../../../../../../Pages/AllPages'
import AddButton from '../../../../../../Components/Buttons/AddButton'
import { Link } from 'react-router-dom'

const EditRoomExtraLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
      <TitlePage text={'Edit Room Extra'} />
      <EditRoomExtraPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default EditRoomExtraLayout