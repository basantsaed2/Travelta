import React from 'react'
import TitlePage from '../../../Components/TitlePage'
import { Link } from 'react-router-dom'
import AddButton from '../../../../src/Components/Buttons/AddButton'
import City from '../../../Pages/SuperAdmin/Settings/Tabs/City/City'
const CityLayout = () => {
  return (
    <>
    <div className=" flex justify-end">
<Link to='add'>
<AddButton />
</Link>
</div>
<City/>
</>
  )
}

export default CityLayout