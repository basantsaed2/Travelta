import React, { useState } from 'react'
import TitlePage from '../../Components/TitlePage'
import BookingEngine from '../../Pages/Dashboard/Booking/BookingEngine'

const BookingEngineLayout = () => {
    const [update, setUpdate] = useState(false)
    return (
      <>
        <TitlePage text={'Booking Engine'} />
        <BookingEngine/>
      </>
  )
}

export default BookingEngineLayout