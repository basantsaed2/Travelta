import React, { useState } from 'react'
import TitlePage from '../../../../Components/TitlePage'
import AddButton from '../../../../Components/Buttons/AddButton'
import { Link } from 'react-router-dom'
import { GroupPage } from '../../../../Pages/AllPages'

const GroupLayout = () => {
      const [update, setUpdate] = useState(false);
  
  return (
    <>
    <div className="flex justify-between">
 
    <TitlePage text={'Group Table'} />
    <Link to='add'>
        <AddButton />
      </Link>
    </div>
    <GroupPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default GroupLayout;