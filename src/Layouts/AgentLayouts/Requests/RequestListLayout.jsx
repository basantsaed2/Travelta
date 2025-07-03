import React, { useState } from 'react'
import TitlePage from '../../../Components/TitlePage'
import {RequestPage} from '../../../Pages/AllPages'
import AddButton from '../../../Components/Buttons/AddButton'
import { Link } from 'react-router-dom'

const RequestListLayout = () => {
    const [update, setUpdate] = useState(false)
    return (
      <>
        <div className='flex justify-between items-center'>
          <div className='w-3/9'>
          <TitlePage text={'Request List'} />
          </div>
          {/* <Link to='add_request'>
              <AddButton Size='text-base' Text='Add New Request' />
            </Link> */}
        </div>
        <RequestPage update={update} setUpdate={setUpdate}/>
      </>
    )
}

export default RequestListLayout;