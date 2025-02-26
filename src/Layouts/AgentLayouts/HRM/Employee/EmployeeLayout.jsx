import React, { useState } from 'react'
import TitlePage from '../../../../Components/TitlePage'
import {EmployeePage } from '../../../../Pages/AllPages'
import AddButton from '../../../../Components/Buttons/AddButton'
import { Link } from 'react-router-dom'

const EmployeeLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
    <div className='flex justify-between items-center'>
    <TitlePage text={'Employee Table'} />
    <Link to='add'>
        <AddButton />
      </Link>
    </div>
      <EmployeePage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default EmployeeLayout