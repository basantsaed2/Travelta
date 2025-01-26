import React, { useState } from 'react'
import TitlePage from '../../../../../Components/TitlePage'
import { EditRoomPricingPage } from "../../../../../Pages/AllPages";
import { Link } from 'react-router-dom'
import AddButton from '../../../../../Components/Buttons/AddButton'
const EditRoomPricingLayout = () => {
    const [update, setUpdate] = useState(false)
    return (
        <>
        <div className='flex justify-between items-center'>
        <TitlePage text={'Room Pricing'} />
            <Link to='add'>
            <AddButton />
            </Link>
        </div>
        <EditRoomPricingPage update={update} setUpdate={setUpdate}/>
        </>
    );
    }

export default EditRoomPricingLayout;