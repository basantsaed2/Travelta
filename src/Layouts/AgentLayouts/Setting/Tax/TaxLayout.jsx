import React, { useState } from 'react'
import TitlePage from '../../../../Components/TitlePage'
import AddButton from '../../../../Components/Buttons/AddButton'
import { Link } from 'react-router-dom'
import { TaxPage } from '../../../../Pages/AllPages'

const TaxLayout = () => {
      const [update, setUpdate] = useState(false);
  
  return (
    <>
    <div className="flex justify-between">
 
    <TitlePage text={'Tax Table'} />
    <Link to='add'>
        <AddButton />
      </Link>
    </div>
    <TaxPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default TaxLayout;