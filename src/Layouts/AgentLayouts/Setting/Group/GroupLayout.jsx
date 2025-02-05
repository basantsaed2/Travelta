import React from 'react'
import TitlePage from '../../../../Components/TitlePage'
import { WalletPage } from '../../../../Pages/AllPages'
import AddButton from '../../../../Components/Buttons/AddButton'
import { Link } from 'react-router-dom'
import Tax from '../../../../Pages/Dashboard/AgentDashboard/Setting/Tax/Tax'
import Group from '../../../../Pages/Dashboard/AgentDashboard/Setting/Group/Group'

const GroupLayout = () => {
  return (
    <>
    <div className="flex justify-between">
 
    <TitlePage text={'Group'} />
    <Link to='add'>
        <AddButton />
      </Link>
    </div>
    <Group/>
    </>
  )
}

export default GroupLayout;