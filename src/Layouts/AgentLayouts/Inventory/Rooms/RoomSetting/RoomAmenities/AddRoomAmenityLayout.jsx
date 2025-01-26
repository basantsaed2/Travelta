import React, { useState } from 'react'
import TitlePage from '../../../../../../Components/TitlePage'
import {AddRoomAmenityPage} from '../../../../../../Pages/AllPages'

const AddRoomAmenityLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
      <TitlePage text={'Add Room Amenity'} />
      <AddRoomAmenityPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default AddRoomAmenityLayout;