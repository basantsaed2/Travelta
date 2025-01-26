import React, { useState } from 'react'
import TitlePage from '../../../../../Components/TitlePage'
import { RoomPricingPage } from "../../../../../Pages/AllPages";
import { Link } from 'react-router-dom'
import AddButton from '../../../../../Components/Buttons/AddButton'
const RoomPricingLayout = () => {
    const [update, setUpdate] = useState(false)
    return (
        <>
        <div className='flex justify-between items-center'>
        <TitlePage text={'Room Pricing'} />
            <Link to='add'>
            <AddButton />
            </Link>
        </div>
        <RoomPricingPage update={update} setUpdate={setUpdate}/>
        </>
    );
    }

export default RoomPricingLayout;