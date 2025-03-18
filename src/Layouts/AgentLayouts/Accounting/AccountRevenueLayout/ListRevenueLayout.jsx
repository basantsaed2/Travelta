import React from 'react'
import TitlePage from '../../../../Components/TitlePage'
import { ListRevenuePage } from '../../../../Pages/AllPages'

const ListRevenueLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
    <div className='flex justify-between items-center'>
    <TitlePage text={'Revenue Table'} />
    <Link to='add'>
        <AddButton />
      </Link>
    </div>
      <ListRevenuePage update={update} setUpdate={setUpdate}/>
    </>
  )
}
export default ListRevenueLayout;