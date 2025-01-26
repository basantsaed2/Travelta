import React from 'react'
import TitlePage from '../../../Components/TitlePage'
import Client from '../../../Pages/SuperAdmin/Clinet/Client'
import { Link } from 'react-router-dom'
import AddButton from '../../../../src/Components/Buttons/AddButton'
const ClientLayout = () => {
    
    return (
      <>
        <div className=" flex justify-between">
        <TitlePage text={'Client'} />
        {/* <Link to='add'>
        <AddButton />
      </Link> */}
        </div>
        <Client/>
      </>
    )
  }

export default ClientLayout