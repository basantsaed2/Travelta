import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import { FaArrowLeft } from "react-icons/fa";
import { usePost } from "../../../Hooks/usePostJson";
import { useAuth } from "../../../Context/Auth";
import { useGet } from "../../../Hooks/useGet";
import { MenuItem, TextField, CircularProgress, Button } from "@mui/material";

const AddTicket = () => {
    const navigate = useNavigate();

  return (
       <div className="flex items-start justify-start min-h-screen">
      <div className="w-full p-8 rounded-2xl">
 <div className="flex items-center mb-6 space-x-2">
          <button onClick={()=>navigate(-1)} className="text-2xl text-mainColor">
            <FaArrowLeft />
          </button>
          <h2 className="text-3xl font-semibold text-mainColor">Add Ticket</h2>
        </div>
      </div>
    </div>
  )
}

export default AddTicket