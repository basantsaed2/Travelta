import React, { useState } from 'react'
import TitlePage from '../../../../Components/TitlePage'
import {AddAgentPage, AgentPage} from '../../../../Pages/AllPages'
import TitleSection from '../../../../Components/TitleSection'

const AgentHRMLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
      <TitlePage text={'Add Agency'} />
      <AddAgentPage update={update} setUpdate={setUpdate}/>
      <TitleSection text={'Agency Table'} />
      <AgentPage refetch={update}/>
    </>
  )
}

export default AgentHRMLayout;