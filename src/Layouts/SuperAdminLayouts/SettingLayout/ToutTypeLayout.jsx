import React from 'react'
import TourType from '../../../Pages/SuperAdmin/Settings/Tabs/TourType/TourType'
import { Link } from 'react-router-dom'
import AddButton from '../../../../src/Components/Buttons/AddButton'
const TourTypeLayout = () => {
  return (
    <>
    <div className=" flex justify-end">

<Link to='add'>
<AddButton />
</Link>
</div>
<TourType/>
</>
  )
}

export default TourTypeLayout