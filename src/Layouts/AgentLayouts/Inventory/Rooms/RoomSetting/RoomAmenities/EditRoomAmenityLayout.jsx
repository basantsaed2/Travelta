import React, { useState } from 'react'
import TitlePage from '../../../../../../Components/TitlePage'
import {EditRoomAmenityPage} from '../../../../../../Pages/AllPages'

const EditRoomAmenityLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
      <TitlePage text={'Edit Room Amenity'} />
      <EditRoomAmenityPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default EditRoomAmenityLayout;