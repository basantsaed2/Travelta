import React, { useState } from 'react'
import TitlePage from '../../../../../Components/TitlePage'
import {CategoryExpensesPage} from '../../../../../Pages/AllPages'
import { Link } from 'react-router-dom'
import AddButton from '../../../../../Components/Buttons/AddButton'

const CategoryExpensesLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
    <div className='flex justify-between items-center'>
    <TitlePage text={'Expenses Categories'} />
    <Link to='add'>
        <AddButton />
      </Link>
    </div>
      <CategoryExpensesPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default CategoryExpensesLayout;