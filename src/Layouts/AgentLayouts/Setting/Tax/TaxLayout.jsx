import React from 'react'
import TitlePage from '../../../../Components/TitlePage'
import AddButton from '../../../../Components/Buttons/AddButton'
import { Link } from 'react-router-dom'
import { TaxPage } from '../../../../Pages/AllPages'

const TaxLayout = () => {
  return (
    <>
    <div className="flex justify-between">
 
    <TitlePage text={'Tax'} />
    <Link to='add'>
        <AddButton />
      </Link>
    </div>
    <TaxPage/>
    </>
  )
}

export default TaxLayout;