import React, { useState } from 'react'
import TitlePage from '../../../../../../Components/TitlePage'
import {AddRoomExtraPage} from '../../../../../../Pages/AllPages'
import AddButton from '../../../../../../Components/Buttons/AddButton'
import { Link } from 'react-router-dom'

const AddRoomExtraLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
      <TitlePage text={'Add Room Extra'} />
      <AddRoomExtraPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default AddRoomExtraLayout;