import React,{useState} from "react";
import { Link } from 'react-router-dom'
import TitlePage from '../../../../../Components/TitlePage'
import TourPageInventory from "../../../../../Pages/Dashboard/AgentDashboard/Inventory/Tours/TourReview/TourPage";
import AddButton from '../../../../../Components/Buttons/AddButton'

const TourPageLayout = () => {
      const [update, setUpdate] = useState(false)
  return (
    <>
    <div className='flex justify-between items-center'>
        <TitlePage text={'Tour Table'} /> 
    <Link to='add'>
        <AddButton />
      </Link>
    </div>
    <TourPageInventory update={update} setUpdate={setUpdate} />
    </>
  ) 
};
export default TourPageLayout;