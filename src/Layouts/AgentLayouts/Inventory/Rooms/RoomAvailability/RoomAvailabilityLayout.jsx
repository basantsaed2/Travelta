import React, { useState } from 'react'
import TitlePage from '../../../../../Components/TitlePage'
import {AddRoomAvailabilityPage, RoomAvailabilityPage} from "../../../../../Pages/AllPages";
import { Link } from 'react-router-dom'
import AddButton from '../../../../../Components/Buttons/AddButton'
import TitleSection from '../../../../../Components/TitleSection'
const RoomAvailabilityLayout = () => {
    const [update, setUpdate] = useState(false)
    return (
        <>
        <TitlePage text={'Room Availability'} />
        <AddRoomAvailabilityPage update={update} setUpdate={setUpdate}/>
        <TitleSection text={'Availability Calender'} />
        <RoomAvailabilityPage refetch={update} setUpdate={setUpdate}/>
        </>
    );
    }

export default RoomAvailabilityLayout;