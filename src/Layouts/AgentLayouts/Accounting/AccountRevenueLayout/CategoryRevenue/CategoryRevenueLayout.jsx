import React, { useState } from 'react'
import TitlePage from '../../../../../Components/TitlePage'
import {CategoryRevenuePage} from '../../../../../Pages/AllPages'
import { Link } from 'react-router-dom'
import AddButton from '../../../../../Components/Buttons/AddButton'

const CategoryRevenueLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
    <div className='flex justify-between items-center'>
    <TitlePage text={'Revenue Table'} />
    <Link to='add'>
        <AddButton />
      </Link>
    </div>
      <CategoryRevenuePage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default CategoryRevenueLayout;