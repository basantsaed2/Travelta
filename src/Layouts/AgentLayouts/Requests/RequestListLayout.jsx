import React, { useState } from 'react'
import TitlePage from '../../../Components/TitlePage'
import RequestList from '../../../Pages/Dashboard/AgentDashboard/Requests/RequestList'

const RequestListLayout = () => {
    const [update, setUpdate] = useState(false)
    return (
      <>
        <TitlePage text={'Request List'} />
        <RequestList update={update} setUpdate={setUpdate}/>
      </>
    )
}

export default RequestListLayout