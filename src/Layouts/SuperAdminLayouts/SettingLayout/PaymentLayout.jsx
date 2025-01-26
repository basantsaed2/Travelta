import React from 'react'
import AddButton from '../../../../src/Components/Buttons/AddButton'
import { Link } from 'react-router-dom'
import Paymeny from '../../../Pages/SuperAdmin/Settings/Tabs/Paymeny/Paymeny'
const PaymentLayout = () => {
  return (
    <>
    <div className=" flex justify-end">

{/* <Link to='add'>
<AddButton />
</Link> */}
</div>
<Paymeny/>
</>
  )
}

export default PaymentLayout