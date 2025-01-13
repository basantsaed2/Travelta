import React, { useState } from 'react'
import TitlePage from '../../../../Components/TitlePage'
import { AddFinancialAccountPage } from '../../../../Pages/AllPages'

const AddFinancialAccountLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
      <TitlePage text={'Add Financial Account'} />
      <AddFinancialAccountPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default AddFinancialAccountLayout