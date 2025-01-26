import React from 'react'
import TitlePage from '../../../Components/TitlePage'
import AgentProfile from '../../../Pages/SuperAdmin/AgentProfile/AgentProfile'
import { Link } from 'react-router-dom'
import AddButton from '../../../../src/Components/Buttons/AddButton'
const AgentProfileLayout = () => {
    return (
        <>
                  <div className=" flex justify-between">
        
        {/* <Link to='add'>
        <AddButton />
      </Link> */}
        </div>
          <AgentProfile/>
        </>
      )
    }
export default AgentProfileLayout