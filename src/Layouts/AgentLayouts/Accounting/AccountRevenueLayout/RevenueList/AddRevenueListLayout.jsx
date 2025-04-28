import React, { useState } from 'react'
import TitlePage from '../../../../../Components/TitlePage'
import {AddRevenueListPage} from '../../../../../Pages/AllPages'
import { Link } from 'react-router-dom'
import AddButton from '../../../../../Components/Buttons/AddButton'

const AddRevenueListLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
    <div className='flex justify-between items-center'>
    <TitlePage text={'Add Revenue'} />
    <Link to='add'>
        <AddButton />
      </Link>
    </div>
      <AddRevenueListPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default AddRevenueListLayout;