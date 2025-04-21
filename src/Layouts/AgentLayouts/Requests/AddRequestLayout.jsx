import React, { useState } from 'react'
import TitlePage from '../../../Components/TitlePage'
import {AddRequestPage} from '../../../Pages/AllPages'

const AddRequestLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
      <TitlePage text={'Add New Request'} />
      <AddRequestPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default AddRequestLayout;