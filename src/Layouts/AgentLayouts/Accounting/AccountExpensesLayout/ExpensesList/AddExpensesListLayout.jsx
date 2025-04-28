import React, { useState } from 'react'
import TitlePage from '../../../../../Components/TitlePage'
import {AddExpensesListPage} from '../../../../../Pages/AllPages'
import { Link } from 'react-router-dom'
import AddButton from '../../../../../Components/Buttons/AddButton'

const AddExpensesListLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
    <div className='flex justify-between items-center'>
    <TitlePage text={'Add Expenses'} />
    <Link to='add'>
        <AddButton />
      </Link>
    </div>
      <AddExpensesListPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default AddExpensesListLayout;