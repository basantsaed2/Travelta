import React from 'react'
import TitlePage from '../../../../Components/TitlePage'
import { ListExpensesPage } from '../../../../Pages/AllPages'

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