import React from 'react'
import TitlePage from '../../../Components/TitlePage'
import { Link } from 'react-router-dom'
import AddButton from '../../../../src/Components/Buttons/AddButton'

import Currency from '../../../Pages/SuperAdmin/Settings/Tabs/Currency/Currency'
const CurrencyLayout = () => {
  return (
    <>
    <div className=" flex justify-end">

<Link to='add'>
<AddButton />
</Link>
</div>
<Currency/>
</>
  )
}

export default CurrencyLayout