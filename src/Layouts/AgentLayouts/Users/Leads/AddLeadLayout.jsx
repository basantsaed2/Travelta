import React,{useState} from "react";
import { AddLeadPage } from "../../../../Pages/AllPages";
import TitlePage from '../../../../Components/TitlePage'

const AddLeadLayout = () => {
      const [update, setUpdate] = useState(false)
    
  return (
    <>
    <TitlePage text={'Add Lead'} />
    <AddLeadPage update={update} setUpdate={setUpdate} />
    </>
  ) 
};
export default AddLeadLayout;