import React, { useState } from 'react'
import TitlePage from '../../../../../Components/TitlePage'
import { AddRoomPage } from '../../../../../Pages/AllPages'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const AddRoomLayout = () => {
  const [update, setUpdate] = useState(false)
  const navigate = useNavigate();
  return (
    <>
       <div className="flex gap-3">
 <button
        onClick={() => navigate(-1)}
        className=" top-2 text-mainColor text-2xl cursor-pointer hover:text-blue-500 transition-all"
      >
        <FaArrowLeft/>
      </button>
 <TitlePage text={'Add Room'} />
   
 </div>
      <AddRoomPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default AddRoomLayout;