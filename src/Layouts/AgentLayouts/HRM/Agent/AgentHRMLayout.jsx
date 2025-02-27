import React, { useState } from 'react'
import TitlePage from '../../../../Components/TitlePage'
import {AgentPage } from '../../../../Pages/AllPages'
import AddButton from '../../../../Components/Buttons/AddButton'
import { Link } from 'react-router-dom'

const AgentHRMLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
    <div className='flex justify-between items-center'>
    <TitlePage text={'Agency Table'} />
    <Link to='add'>
        <AddButton />
      </Link>
    </div>
      <AgentPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default AgentHRMLayout;