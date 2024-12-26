import React,{useState} from "react";
import { AddSupplierPage } from "../../../../Pages/AllPages";
import TitlePage from '../../../../Components/TitlePage'

const AddLeadLayout = () => {
      const [update, setUpdate] = useState(false)
    
  return (
    <>
    <TitlePage text={'Add Supplier'} />
    <AddSupplierPage update={update} setUpdate={setUpdate} />
    </>
  ) 
};
export default AddLeadLayout;