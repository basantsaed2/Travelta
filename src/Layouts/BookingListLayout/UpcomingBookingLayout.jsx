import React, { useState } from 'react'
import TitlePage from '../../Components/TitlePage'
import {UpcomingBookingPage} from '../../Pages/AllPages'

const UpcomingBookingLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
      <TitlePage text={'Upcoming Booking'} />
      <UpcomingBookingPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default UpcomingBookingLayout