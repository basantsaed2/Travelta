import React, { useState } from 'react'
import TitlePage from '../../../Components/TitlePage'
import {BookingPaymentPage} from '../../../Pages/AllPages'

const BookingPaymentLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
      <TitlePage text={'Booking Payment Table'} />
      <BookingPaymentPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default BookingPaymentLayout