import React, { useState } from 'react'
import {RoomAmenityPage,} from '../../../../../../Pages/AllPages'

const RoomAmenityLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
      <RoomAmenityPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default RoomAmenityLayout