import React from 'react'
import TitlePage from '../../../Components/TitlePage'
import Subscription from '../../../Pages/SuperAdmin/Subscription/Subscription'
import AddButton from '../../../../src/Components/Buttons/AddButton'
import { Link } from 'react-router-dom'
const SubscriptionLayout = () => {
    return (
        <>
                <div className=" flex justify-between">
        <TitlePage text={'Subscription'} />
        {/* <Link to='add'>
        <AddButton />
      </Link> */}
        </div>
          <Subscription/>
        </>
      )
    }

export default SubscriptionLayout