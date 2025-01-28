import React, { useState } from 'react'
import TitlePage from '../../../../../Components/TitlePage'
import { RoomPricingPage,AddRoomPricingPage } from "../../../../../Pages/AllPages";
import { Link } from 'react-router-dom'
import AddButton from '../../../../../Components/Buttons/AddButton'
import TitleSection from '../../../../../Components/TitleSection'
const RoomPricingLayout = () => {
    const [update, setUpdate] = useState(false)
    return (
        <>
        <TitlePage text={'Room Pricing'} />
        <AddRoomPricingPage update={update} setUpdate={setUpdate}/>
        <TitleSection text={'Pricing Table'} />
        <RoomPricingPage refetch={update} setUpdate={setUpdate}/>
        </>
    );
    }

export default RoomPricingLayout;