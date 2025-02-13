import React,{useState} from "react";

import TitlePage from '../../../../../Components/TitlePage'
import TourPageInventory from "../../../../../Pages/Dashboard/AgentDashboard/Inventory/Tours/TourReview/TourPage";

const TourPageLayout = () => {
      const [update, setUpdate] = useState(false)
  return (
    <>
    <div className="flex gap-3">
    <TitlePage text={'Tour Table'} /> 
    </div>
    <TourPageInventory update={update} setUpdate={setUpdate} />
    </>
  ) 
};
export default TourPageLayout;