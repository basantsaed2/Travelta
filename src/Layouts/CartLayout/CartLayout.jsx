import React, { useState } from 'react'
import TitlePage from '../../Components/TitlePage'
import {CartPage} from '../../Pages/AllPages'

const CartLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
      {/* <TitlePage text={'Plans'} /> */}
      <CartPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default CartLayout