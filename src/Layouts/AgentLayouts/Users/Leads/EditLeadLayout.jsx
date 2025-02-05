import React, { useState } from 'react'
import TitlePage from '../../../../Components/TitlePage'
import EditLead from '../../../../Pages/Dashboard/AgentDashboard/Users/Leads/EditLead'

const EditLeadLayout = () => {
    const [update, setUpdate] = useState(false)
  return (
    <>
    <TitlePage text={'Edit Lead'} />
    <EditLead update={update} setUpdate={setUpdate} />
    </>
  )
}

export default EditLeadLayout