import React, { useState } from 'react'
import TitlePage from '../../../../../Components/TitlePage'
import {EditExpensesListPage} from '../../../../../Pages/AllPages'
import { Link } from 'react-router-dom'
import AddButton from '../../../../../Components/Buttons/AddButton'

const EditExpensesListLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
    <div className='flex justify-between items-center'>
    <TitlePage text={'Edit Expenses'} />
    <Link to='add'>
        <AddButton />
      </Link>
    </div>
      <EditExpensesListPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default EditExpensesListLayout;