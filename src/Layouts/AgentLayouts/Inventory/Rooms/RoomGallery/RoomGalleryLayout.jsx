import React, { useState } from 'react'
import TitlePage from '../../../../../Components/TitlePage'
import { AddRoomGalleryPage, RoomGalleryPage } from "../../../../../Pages/AllPages";
import { Link, useParams } from 'react-router-dom'
import AddButton from '../../../../../Components/Buttons/AddButton'
import TitleSection from '../../../../../Components/TitleSection'
const RoomGalleryLayout = () => {
    const [update, setUpdate] = useState(false)
    const {galleryId} = useParams();

    return (
        <>
        <TitlePage text={'Room Gallery'} />
        <AddRoomGalleryPage galleryId={galleryId} update={update} setUpdate={setUpdate} />
        
        <TitleSection text={'Room Image'} />
        <RoomGalleryPage update={update} setUpdate={setUpdate} galleryId={galleryId}/>
        </>
    );
    }

export default RoomGalleryLayout;