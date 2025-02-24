import React, { useState } from 'react'
import TitlePage from '../../../../Components/TitlePage'
import {AdminAccountPage} from '../../../../Pages/AllPages'
import AddButton from '../../../../Components/Buttons/AddButton'
import { Link } from 'react-router-dom'

const AdminAccountLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
    <div className='flex justify-between items-center'>
    <TitlePage text={'Admin Account Table'} />
    <Link to='add'>
    <AddButton />
    </Link>
    </div>
      <AdminAccountPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default AdminAccountLayout;