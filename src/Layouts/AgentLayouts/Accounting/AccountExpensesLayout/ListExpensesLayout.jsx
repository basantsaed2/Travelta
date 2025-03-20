import React, { useEffect, useState } from "react";
import TitlePage from '../../../../Components/TitlePage'
import { ListExpensesPage } from '../../../../Pages/AllPages'
import { Link } from 'react-router-dom';
import AddButton from '../../../../Components/Buttons/AddButton'
const ListExpensesLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
    <div className='flex justify-between items-center'>
    <TitlePage text={'Expenses Table'} />
    <Link to='add'>
        <AddButton />
      </Link>
    </div>
      <ListExpensesPage update={update} setUpdate={setUpdate}/>
    </>
  )
}
export default ListExpensesLayout;