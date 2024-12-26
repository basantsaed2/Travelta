import React, { useState } from 'react'
import TitlePage from '../../Components/TitlePage'
import {PlansPage} from '../../Pages/AllPages'

const PlanLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
      {/* <TitlePage text={'Plans'} /> */}
      <PlansPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default PlanLayout