import React, { useState } from 'react'
import TitlePage from '../../../../../Components/TitlePage'
import {AddRoomAvailabilityPage, RoomAvailabilityPage} from "../../../../../Pages/AllPages";
import { Link, useNavigate } from 'react-router-dom'
import AddButton from '../../../../../Components/Buttons/AddButton'
import TitleSection from '../../../../../Components/TitleSection'
import { FaArrowLeft } from 'react-icons/fa';
const RoomAvailabilityLayout = () => {
    const [update, setUpdate] = useState(false)
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
 <TitlePage text={'Room Availability'} />
   
 </div>
        <AddRoomAvailabilityPage update={update} setUpdate={setUpdate}/>
        <TitleSection text={'Availability Calender'} />
        <RoomAvailabilityPage refetch={update} setUpdate={setUpdate}/>
        </>
    );
    }

export default RoomAvailabilityLayout;