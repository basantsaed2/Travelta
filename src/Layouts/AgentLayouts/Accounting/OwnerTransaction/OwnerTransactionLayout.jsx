import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import TitlePage from '../../../../Components/TitlePage'
import { OwnerTransactionPage } from "../../../../Pages/AllPages";

const OwnerTransactionLayout = () => {
  const navigate = useNavigate()
  const [update, setUpdate] = useState(false)
  
  return (
    <>
      <div className="flex gap-3">
        <button
          onClick={() => navigate(-1)}
          className=" top-2 text-mainColor text-2xl cursor-pointer hover:text-blue-500 transition-all"
        >
          <FaArrowLeft />
        </button>
        <TitlePage text={'Tranactions Table'} />

      </div>
      <OwnerTransactionPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default OwnerTransactionLayout;