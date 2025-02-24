import React from 'react'
import ListExpenses from '../../../../Pages/Dashboard/AgentDashboard/Accounting/AccountExpenses/ListExpenses'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa';
import TitlePage from '../../../../Components/TitlePage';

const ListExpensesLayout = () => {
    const navigate = useNavigate();
  return (
    <>
          <div className="flex gap-3">
 <button
        onClick={() => navigate(-1)}
        className=" top-2 text-mainColor text-2xl cursor-pointer hover:text-blue-500 transition-all"
      >
        <FaArrowLeft/>
      </button>
 <TitlePage text={'List Expenses'} />
   
 </div>
    <ListExpenses/></>
  )
}

export default ListExpensesLayout