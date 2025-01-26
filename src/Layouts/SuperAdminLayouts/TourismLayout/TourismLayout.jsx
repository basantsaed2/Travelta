import React from 'react'
import TitlePage from '../../../Components/TitlePage'
import Tourism from '../../../Pages/SuperAdmin/Tourism/Tourism'
import AddButton from '../../../../src/Components/Buttons/AddButton'
import { Link } from 'react-router-dom'
const TourismLayout = () => {
    
    return (
      <>
                <div className=" flex justify-between">
        <TitlePage text={'Tourism'} />
        <Link to='add'>
        <AddButton />
      </Link>
        </div>
        <Tourism/>
      </>
    )
  }

export default TourismLayout