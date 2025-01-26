import React from 'react'
import TitlePage from '../../../Components/TitlePage'
import { Link } from 'react-router-dom'
import AddButton from '../../../../src/Components/Buttons/AddButton'
import Country from '../../../Pages/SuperAdmin/Settings/Tabs/Country/Country'
const CountryLayout = () => {
  return (
    <>
    <div className=" flex justify-end">

<Link to='add'>
<AddButton />
</Link>
</div>
<Country/>
</>
  )
}

export default CountryLayout