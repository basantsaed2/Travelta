import React, { useState } from 'react'
import TitlePage from '../../../Components/TitlePage'
import {NewRequestPage} from '../../../Pages/AllPages'

const NewRequestLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
      <TitlePage text={'New Request'} />
      <NewRequestPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default NewRequestLayout;