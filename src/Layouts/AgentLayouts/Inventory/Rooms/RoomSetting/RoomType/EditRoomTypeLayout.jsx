import React, { useState } from 'react'
import TitlePage from '../../../../../../Components/TitlePage'
import {EditRoomTypePage } from '../../../../../../Pages/AllPages'

const EditRoomTypeLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
      <TitlePage text={'Edit Room Type'} />
      <EditRoomTypePage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default EditRoomTypeLayout