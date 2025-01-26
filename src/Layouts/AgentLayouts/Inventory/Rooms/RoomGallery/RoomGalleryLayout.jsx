import React, { useState } from 'react'
import TitlePage from '../../../../../Components/TitlePage'
import { RoomGalleryPage } from "../../../../../Pages/AllPages";
import { Link } from 'react-router-dom'
import AddButton from '../../../../../Components/Buttons/AddButton'
const RoomGalleryLayout = () => {
    const [update, setUpdate] = useState(false)
    return (
        <>
        <div className='flex justify-between items-center'>
        <TitlePage text={'Room Gallery'} />
            <Link to='add'>
            <AddButton />
            </Link>
        </div>
        <RoomGalleryPage update={update} setUpdate={setUpdate}/>
        </>
    );
    }

export default RoomGalleryLayout;