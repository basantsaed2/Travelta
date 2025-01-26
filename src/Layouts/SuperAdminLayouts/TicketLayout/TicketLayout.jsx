import React from 'react'
import TitlePage from '../../../Components/TitlePage'
import TicketingSystem from '../../../Pages/SuperAdmin/TicketingSystem/TicketingSystem'
import AddButton from '../../../../src/Components/Buttons/AddButton'
import { Link } from 'react-router-dom'
const TicketLayout = () => {
    return (
        <>
                  <div className=" flex justify-between">
        <TitlePage text={'Ticket System'} />
        <Link to='add'>
        <AddButton />
      </Link>
        </div>
          <TicketingSystem/>
        </>
      )
    }

export default TicketLayout