import React, { useState } from 'react'
import TitlePage from '../../Components/TitlePage'
import {BookingEngine} from '../../Pages/AllPages'

const BookingEngineLayout = () => {
    const [update, setUpdate] = useState(false)
    return (
      <>
        <TitlePage text={'Booking Engine'} />
        <BookingEngine update={update} setUpdate={setUpdate}/>
      </>
  )
}

export default BookingEngineLayout