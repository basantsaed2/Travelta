import React,{useState} from "react";
import { TourPage } from "../../../../../Pages/AllPages";
import TitlePage from '../../../../../Components/TitlePage'

const TourLayout = () => {
      const [update, setUpdate] = useState(false)
  return (
    <>
    <div className="flex gap-3">
    <TitlePage text={'Tour Table'} /> 
    </div>
    <TourPage update={update} setUpdate={setUpdate} />
    </>
  ) 
};
export default TourLayout;