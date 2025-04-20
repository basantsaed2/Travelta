import React, { useState } from 'react'
import TitlePage from '../../../Components/TitlePage'
import {WorkStationPage} from '../../../Pages/AllPages'

const WorkStationLayout = () => {
    const [update, setUpdate] = useState(false)
    return (
      <>
        <TitlePage text={'Work Station'} />
        <WorkStationPage update={update} setUpdate={setUpdate}/>
      </>
  )
}

export default WorkStationLayout