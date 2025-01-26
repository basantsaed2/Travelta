import React from 'react'
import TitlePage from '../../../Components/TitlePage'
import Booking from '../../../Pages/SuperAdmin/Booking/Booking'
import AddButton from '../../../../src/Components/Buttons/AddButton'
import { Link } from 'react-router-dom'
const BookingSuperLayout = () => {
    return (
        <>
                 <div className=" flex justify-between">
        <TitlePage text={'Booking'} />
        {/* <Link to='add'>
        <AddButton />
      </Link> */}
        </div>
          <Booking/>
        </>
      )
    }

export default BookingSuperLayout