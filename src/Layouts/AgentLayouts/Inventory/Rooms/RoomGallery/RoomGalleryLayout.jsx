import React, { useState } from 'react'
import TitlePage from '../../../../../Components/TitlePage'
import { AddRoomGalleryPage, RoomGalleryPage } from "../../../../../Pages/AllPages";
import { Link, useNavigate, useParams } from 'react-router-dom'
import AddButton from '../../../../../Components/Buttons/AddButton'
import TitleSection from '../../../../../Components/TitleSection'
import { FaArrowLeft } from 'react-icons/fa';
const RoomGalleryLayout = () => {
    const [update, setUpdate] = useState(false)
    const {galleryId} = useParams();
    const navigate = useNavigate()

    return (
        <>
        <div className="flex gap-3">
 <button
        onClick={() => navigate(-1)}
        className=" top-2 text-mainColor text-2xl cursor-pointer hover:text-blue-500 transition-all"
      >
        <FaArrowLeft/>
      </button>
 <TitlePage text={'Add Gallery'} />
   
 </div>
        <AddRoomGalleryPage galleryId={galleryId} update={update} setUpdate={setUpdate} />
        
        <TitleSection text={'Room Gallery'} />
        <RoomGalleryPage update={update} setUpdate={setUpdate} galleryId={galleryId}/>
        </>
    );
    }

export default RoomGalleryLayout;