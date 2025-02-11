import React, { useState } from 'react'
import TitlePage from '../../../../../../Components/TitlePage'
import {EditRoomExtraPage} from '../../../../../../Pages/AllPages'
import AddButton from '../../../../../../Components/Buttons/AddButton'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'

const EditRoomExtraLayout = () => {
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
 <TitlePage text={'Edit Room Extra'} />
   
 </div>
      <EditRoomExtraPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default EditRoomExtraLayout