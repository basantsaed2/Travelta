import React from 'react'
import TitlePage from '../../../../Components/TitlePage'
import AddButton from '../../../../Components/Buttons/AddButton'
import { Link } from 'react-router-dom'
import { GroupPage } from '../../../../Pages/AllPages'

const GroupLayout = () => {
  return (
    <>
    <div className="flex justify-between">
 
    <TitlePage text={'Group'} />
    <Link to='add'>
        <AddButton />
      </Link>
    </div>
    <GroupPage/>
    </>
  )
}

export default GroupLayout;