import React, { useState } from 'react'
import TitlePage from '../../../../Components/TitlePage'
import {SupplierPage} from '../../../../Pages/AllPages'
import AddButton from '../../../../Components/Buttons/AddButton'
import { Link } from 'react-router-dom'
const SupplierLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
    <div className='flex justify-between items-center'>
    <TitlePage text={'Supplier Table'} />
    <Link to='add'>
    <AddButton />
    </Link>
    </div>
      <SupplierPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default SupplierLayout