import React, { useState } from 'react'
import TitlePage from '../../../Components/TitlePage'
import {EditRequestPage} from '../../../Pages/AllPages'

const EditRequestLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
      <TitlePage text={'Edit Request'} />
      <EditRequestPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default EditRequestLayout;