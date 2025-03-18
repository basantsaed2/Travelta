import React,{useState} from "react";
import {EditCategoryExpensesPage} from "../../../../../Pages/AllPages";
import TitlePage from '../../../../../Components/TitlePage'
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const EditCategoryExpensesLayout = () => {
      const [update, setUpdate] = useState(false)
      const navigate = useNavigate()
  return (
    <>
    <div className="flex gap-3">
    <button
            onClick={() => navigate(-1)}
            className=" top-2 text-mainColor text-2xl cursor-pointer hover:text-blue-500 transition-all"
        >
            <FaArrowLeft/>
        </button>
    <TitlePage text={'Edit Expenses Category'} />
    
    </div>
    <EditCategoryExpensesPage update={update} setUpdate={setUpdate} />
    </>
  ) 
};
export default EditCategoryExpensesLayout;