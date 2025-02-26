import React, { useState } from 'react'
import TitlePage from '../../../../Components/TitlePage'
import {AddDepartmentPage, DepartmentPage} from '../../../../Pages/AllPages'
import TitleSection from '../../../../Components/TitleSection'

const DepartmentLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
      <TitlePage text={'Add Department'} />
      <AddDepartmentPage update={update} setUpdate={setUpdate}/>
      <TitleSection text={'Department Table'} />
      <DepartmentPage refetch={update}/>
    </>
  )
}

export default DepartmentLayout;