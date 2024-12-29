import React, { useState } from 'react'
import TitlePage from '../../Components/TitlePage'
import {ManualBookingPage} from '../../Pages/AllPages'

const ManualBookingLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
      <TitlePage text={'Manual Booking'} />
      <ManualBookingPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default ManualBookingLayout