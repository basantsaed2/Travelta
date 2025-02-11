import React from "react";
import BookingInvoice from "../../../Pages/Dashboard/AgentDashboard/BookingPayments/BookingInvoice";
import TitlePage from "../../../Components/TitlePage";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BookingInvoiceLayout = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-start  gap-2">
      <div className="flex gap-4 justify-start items-center">
        <button
          onClick={() => navigate(-1)}
          className=" top-2 text-mainColor text-2xl cursor-pointer hover:text-blue-500 transition-all"
        >
          <FaArrowLeft />
        </button>
        <TitlePage text="Booking Invoice" />
      </div>

      <BookingInvoice />
    </div>
  );
};

export default BookingInvoiceLayout;
