import React,{useState} from "react";
import { EditSupplierPage } from "../../../../Pages/AllPages";
import TitlePage from '../../../../Components/TitlePage'

const AddLeadLayout = () => {
      const [update, setUpdate] = useState(false)
    
  return (
    <>
    <TitlePage text={'Edit Supplier'} />
    <EditSupplierPage update={update} setUpdate={setUpdate} />
    </>
  ) 
};
export default AddLeadLayout;