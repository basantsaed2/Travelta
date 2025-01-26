import React, { useState } from 'react'
import TitlePage from '../../../../../../Components/TitlePage'
import { AddRoomTypePage } from '../../../../../../Pages/AllPages'

const AddRoomTypeLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
      <TitlePage text={'Add Room Type'} />
      <AddRoomTypePage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default AddRoomTypeLayout