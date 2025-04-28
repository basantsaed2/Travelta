import React, { useState } from 'react'
import TitlePage from '../../../../../Components/TitlePage'
import {ExpensesListPage} from '../../../../../Pages/AllPages'
import { Link } from 'react-router-dom'
import AddButton from '../../../../../Components/Buttons/AddButton'

const ExpensesListLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
    <div className='flex justify-between items-center'>
    <TitlePage text={'Expenses List'} />
    <Link to='add'>
        <AddButton />
      </Link>
    </div>
      <ExpensesListPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default ExpensesListLayout;