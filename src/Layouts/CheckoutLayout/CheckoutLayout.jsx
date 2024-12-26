import React, { useState } from 'react'
import TitlePage from '../../Components/TitlePage'
import {CheckoutPage} from '../../Pages/AllPages'

const CheckoutLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
      {/* <TitlePage text={'Plans'} /> */}
      <CheckoutPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default CheckoutLayout