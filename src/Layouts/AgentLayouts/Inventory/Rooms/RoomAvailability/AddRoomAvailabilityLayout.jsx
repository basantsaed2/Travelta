import React, { useState } from 'react'
import TitlePage from '../../../../../Components/TitlePage'
import { AddRoomAvailabilityPage } from "../../../../../Pages/AllPages";
import { Link } from 'react-router-dom'
import AddButton from '../../../../../Components/Buttons/AddButton'
const AddRoomAvailabilityLayout = () => {
    const [update, setUpdate] = useState(false)
    return (
        <>
        <div className='flex justify-between items-center'>
        <TitlePage text={'Room Availability'} />
            <Link to='add'>
            <AddButton />
            </Link>
        </div>
        <AddRoomAvailabilityPage update={update} setUpdate={setUpdate}/>
        </>
    );
    }

export default AddRoomAvailabilityLayout;