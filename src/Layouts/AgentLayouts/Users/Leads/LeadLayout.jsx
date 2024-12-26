import React, { useState } from 'react'
import TitlePage from '../../../../Components/TitlePage'
import {LeadPage} from '../../../../Pages/AllPages'
import AddButton from '../../../../Components/Buttons/AddButton'
import { Link } from 'react-router-dom'
const LeadLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
    <div className='flex justify-between items-center'>
    <TitlePage text={'Lead Table'} />
    <Link to='add'>
      <AddButton />
    </Link>
    </div>
      <LeadPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default LeadLayout