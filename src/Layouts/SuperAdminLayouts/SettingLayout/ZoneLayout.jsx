import React from 'react'
import AddButton from '../../../../src/Components/Buttons/AddButton'
import { Link } from 'react-router-dom'
import Zone from '../../../Pages/SuperAdmin/Settings/Tabs/Zone/Zone'
const ZoneLayout = () => {
  return (
    <>
    <div className=" flex justify-end">

<Link to='add'>
<AddButton />
</Link>
</div>
<Zone/>
</>
  )
}

export default ZoneLayout