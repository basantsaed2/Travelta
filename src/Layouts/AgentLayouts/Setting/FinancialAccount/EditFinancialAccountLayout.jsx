import React, { useState } from 'react'
import TitlePage from '../../../../Components/TitlePage'
import { EditFinancialAccountPage } from '../../../../Pages/AllPages'

const EditFinancialAccountLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
      <TitlePage text={'Edit Financial Account'} />
      <EditFinancialAccountPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default EditFinancialAccountLayout