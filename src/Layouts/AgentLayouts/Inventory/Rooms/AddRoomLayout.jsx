import React, { useState } from 'react'
import TitlePage from '../../../../Components/TitlePage'
import { AddRoomPage } from '../../../../Pages/AllPages'

const AddRoomLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
      <TitlePage text={'Add Room'} />
      <AddRoomPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default AddRoomLayout;