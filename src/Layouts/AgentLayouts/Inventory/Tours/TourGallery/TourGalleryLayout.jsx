import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import TitlePage from '../../../../../Components/TitlePage'
import AddTourGallery from '../../../../../Pages/Dashboard/AgentDashboard/Inventory/Tours/TourGallery/AddTourGallery'
import TitleSection from '../../../../../Components/TitleSection'
import TourGallery from '../../../../../Pages/Dashboard/AgentDashboard/Inventory/Tours/TourGallery/TourGallery'

const TourGalleryLayout = () => {
    const navigate = useNavigate()
    const [update, setUpdate] = useState(false)
    const {TourId} = useParams();
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
    <AddTourGallery id={TourId} update={update} setUpdate={setUpdate} />
    
    <TitleSection text={'Tour Gallery'} />
    <TourGallery update={update} setUpdate={setUpdate} id={TourId}/>
    </>
  )
}

export default TourGalleryLayout