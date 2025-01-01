import React, { useState } from 'react'
import TitlePage from '../../Components/TitlePage'
import {CurrentBookingPage} from '../../Pages/AllPages'

const CurrentBookingLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
      <TitlePage text={'Current Booking'} />
      <CurrentBookingPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default CurrentBookingLayout