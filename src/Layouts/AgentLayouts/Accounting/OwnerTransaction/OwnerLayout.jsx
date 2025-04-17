import React, { useState } from "react";
import { useNavigate,Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa';
import TitlePage from '../../../../Components/TitlePage';
import { OwnerPage } from "../../../../Pages/AllPages";
import AddButton from '../../../../Components/Buttons/AddButton'

const OwnerLayout = () => {
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false)

  return (
    <>
    <div className='flex justify-between items-center'>
      <TitlePage text={'Owners Table'} />
        <Link to='add'>
          <AddButton />
        </Link>
      </div>
      <OwnerPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default OwnerLayout;