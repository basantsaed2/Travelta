import React,{useState} from "react";
import { AddPositionPage } from "../../../../Pages/AllPages";
import TitlePage from '../../../../Components/TitlePage'
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const AddPositionLayout = () => {
      const [update, setUpdate] = useState(false)
      const navigate = useNavigate()
    
  return (
    <>
    <div className="flex gap-2">
            <button
                onClick={() => navigate(-1)}
                className=" top-2 text-mainColor text-2xl cursor-pointer hover:text-blue-500 transition-all"
            >
                <FaArrowLeft/>
            </button>
    <TitlePage text={'Add Role'} />
    
    </div>
    <AddPositionPage update={update} setUpdate={setUpdate} />
    </>
  ) 
};
export default AddPositionLayout;