import React, { useState } from 'react'
import TitlePage from '../../../Components/TitlePage'
import WorkStation from '../../../Pages/Dashboard/AgentDashboard/Requests/WorkStation'

const WorkStationLayout = () => {
    const [update, setUpdate] = useState(false)
    return (
      <>
        <TitlePage text={'Work Station'} />
        <WorkStation update={update} setUpdate={setUpdate}/>
      </>
  )
}

export default WorkStationLayout