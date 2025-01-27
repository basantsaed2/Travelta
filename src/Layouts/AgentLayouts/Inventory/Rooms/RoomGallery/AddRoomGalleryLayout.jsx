import React, { useState } from 'react'
import TitlePage from '../../../../../Components/TitlePage'
import { AddRoomGalleryPage } from "../../../../../Pages/AllPages";
import { Link } from 'react-router-dom'
import AddButton from '../../../../../Components/Buttons/AddButton'
const AddRoomGalleryLayout = () => {
    const [update, setUpdate] = useState(false)
    return (
        <>
        <div className='flex justify-between items-center'>
        <TitlePage text={'Room Gallery'} />
          
        </div>
        <AddRoomGalleryPage update={update} setUpdate={setUpdate}/>
        </>
    );
    }

export default AddRoomGalleryLayout;