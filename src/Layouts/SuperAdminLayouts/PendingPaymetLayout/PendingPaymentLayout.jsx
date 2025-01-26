import React from 'react'
import TitlePage from '../../../Components/TitlePage'
import PendingPayment from '../../../Pages/SuperAdmin/PendingPayment/PendingPayment'
import AddButton from '../../../../src/Components/Buttons/AddButton'
import { Link } from 'react-router-dom'
const PendingPaymentLayout = () => {
    return (
        <>
                  <div className=" flex justify-between">
        <TitlePage text={'Pending Payment'} />
        <Link to='add'>
        <AddButton />
      </Link>
        </div>
          <PendingPayment/>
        </>
      )
    }

export default PendingPaymentLayout