import React, { useState } from 'react'
import TitlePage from '../../../Components/TitlePage'
import { CheckOutProcessPage } from '../../../Pages/AllPages'

const CheckOutProcessLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
      {/* <TitlePage text={'CheckOut Process'} /> */}
      <CheckOutProcessPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default CheckOutProcessLayout