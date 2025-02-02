import React, { useState } from 'react'
import TitlePage from '../../../../../Components/TitlePage'
import { EditRoomAvailabilityPage } from "../../../../../Pages/AllPages";
import { Link } from 'react-router-dom'
import AddButton from '../../../../../Components/Buttons/AddButton'
const EditRoomAvailabilityLayout = () => {
    const [update, setUpdate] = useState(false)
    return (
        <>
        <TitlePage text={'Edit Room Availability'} />
        <EditRoomAvailabilityPage update={update} setUpdate={setUpdate}/>
        </>
    );
    }

export default EditRoomAvailabilityLayout;