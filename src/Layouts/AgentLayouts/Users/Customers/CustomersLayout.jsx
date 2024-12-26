import React, { useState } from 'react'
import TitlePage from '../../../../Components/TitlePage'
import {CustomerPage} from '../../../../Pages/AllPages'

const CustomersLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
      <TitlePage text={'Customer Table'} />
      <CustomerPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default CustomersLayout