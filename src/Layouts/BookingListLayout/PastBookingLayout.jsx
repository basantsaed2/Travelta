import React, { useState } from 'react'
import TitlePage from '../../Components/TitlePage'
import {PastBookingPage} from '../../Pages/AllPages'

const PastBookingLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
      <TitlePage text={'Past Booking'} />
      <PastBookingPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default PastBookingLayout