import React, { useState } from 'react'
import TitlePage from '../../../../Components/TitlePage'
import {DepartmentPage} from '../../../../Pages/AllPages'
import { Link } from 'react-router-dom'
import AddButton from '../../../../Components/Buttons/AddButton'

const DepartmentLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
    <div className='flex justify-between items-center'>
    <TitlePage text={'Department Table'} />
    <Link to='add'>
        <AddButton />
      </Link>
    </div>
      <DepartmentPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default DepartmentLayout;