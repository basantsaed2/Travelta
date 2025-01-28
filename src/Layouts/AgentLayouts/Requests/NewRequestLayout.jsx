import React, { useState } from 'react'
import TitlePage from '../../../Components/TitlePage'
import NewRequest from '../../../Pages/Dashboard/AgentDashboard/Requests/NewRequest'

const NewRequestLayout = () => {
    const [update, setUpdate] = useState(false)
    return (
      <>
        {/* <TitlePage text={'New Request'}/> */}
        <NewRequest update={update} setUpdate={setUpdate}/>
      </>
  )
}

export default NewRequestLayout