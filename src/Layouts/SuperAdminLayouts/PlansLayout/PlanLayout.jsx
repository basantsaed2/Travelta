import React from 'react'
import TitlePage from '../../../Components/TitlePage'
import Plans from '../../../Pages/SuperAdmin/Plans/Plans'
import AddButton from '../../../../src/Components/Buttons/AddButton'
import { Link } from 'react-router-dom'
const PlanLayout = () => {
    return (
        <>
                  <div className=" flex justify-end">
        <Link to='add'>
        <AddButton />
      </Link>
        </div>
          <Plans/>
        </>
      )
    }

export default PlanLayout