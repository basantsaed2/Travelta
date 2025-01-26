import React from 'react'
import AddButton from '../../../Components/Buttons/AddButton'
import { Link } from 'react-router-dom'
import Paymeny from '../../../Pages/SuperAdmin/Settings/Tabs/Paymeny/Paymeny'
import PaymentMethod from '../../../Pages/SuperAdmin/Settings/Tabs/PaymentMethod/PaymentMethod'
const PaymentMethodLayout = () => {
  return (
    <>
    <div className=" flex justify-end">

<Link to='add'>
<AddButton />
</Link>
</div>
<PaymentMethod/>
</>
  )
}

export default PaymentMethodLayout