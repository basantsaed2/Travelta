import React, { useState } from 'react'
import TitlePage from '../../../../../Components/TitlePage'
import {EditRevenueListPage} from '../../../../../Pages/AllPages'
import { Link } from 'react-router-dom'
import AddButton from '../../../../../Components/Buttons/AddButton'

const EditRevenueListLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
    <div className='flex justify-between items-center'>
    <TitlePage text={'Edit Revenue'} />
    <Link to='add'>
        <AddButton />
      </Link>
    </div>
      <EditRevenueListPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default EditRevenueListLayout;