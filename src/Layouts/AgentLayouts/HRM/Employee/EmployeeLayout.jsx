import React, { useState } from 'react'
import TitlePage from '../../../../Components/TitlePage'
import {AddEmployeePage, EmployeePage} from '../../../../Pages/AllPages'
import TitleSection from '../../../../Components/TitleSection'

const EmployeeLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
      <TitlePage text={'Add Employee'} />
      <AddEmployeePage update={update} setUpdate={setUpdate}/>
      <TitleSection text={'Employee Table'} />
      <EmployeePage refetch={update}/>
    </>
  )
}

export default EmployeeLayout;