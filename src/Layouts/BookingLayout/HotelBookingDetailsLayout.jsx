import React, { useState } from 'react'
import TitlePage from '../../Components/TitlePage'
import {HotelBookingDetailsPage} from '../../Pages/AllPages'

const HotelBookingDetailsLayout = () => {
    const [update, setUpdate] = useState(false)
    return (
      <>
        <TitlePage text={'Hotel Details'} />
        <HotelBookingDetailsPage update={update} setUpdate={setUpdate}/>
      </>
  )
}

export default HotelBookingDetailsLayout;