import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HotelRequest from './Hotel/HotelRequest';
import BusesRequest from './Bus/BusesRequest';
import TourRequest from './Tour/TourRequest';
import VisaRequest from './Visa/VisaRequest';
import FlightRequest from './Flight/FlightRequest';
import { useGet } from '../../../../Hooks/useGet';

const RequestList = () => {
  const [selectedTab, setSelectedTab] = useState('Hotels');



  const navigate = useNavigate();
  const handleNavigate = () =>{
    navigate("/dashboard_agent/requests/new_request")
  }
  // Content for each tab
  const tabContent = {
    Hotels: <HotelRequest/>,
    Buses: <BusesRequest/>,
    Tour: <TourRequest/>,
    Visa: <VisaRequest/>,
    Flight: <FlightRequest/>,
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Center Request Button */}
   <div className="flex items-center justify-center">
   <button className="mb-4 p-10 bg-mainColor w-[30%] font-bold  text-white rounded-xl text-3xl">
        Request
      </button> 
   </div>

{/* Tabs Section */}
<div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-300 pb-3 mt-10">

  {/* Tab buttons */}
  <div className="flex flex-wrap gap-3">
    {['Hotels', 'Buses', 'Tour', 'Visa', 'Flight'].map((tab) => (
      <button
        key={tab}
        className={`py-2 px-5 rounded-full text-lg font-medium transition-all duration-300 shadow-sm
          ${selectedTab === tab
            ? 'bg-mainColor text-white shadow-md scale-105'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
        `}
        onClick={() => setSelectedTab(tab)}
      >
        {tab}
      </button>
    ))}
  </div>

  {/* Add New Request Button */}
  <button 
    className="p-3 px-5 bg-mainColor text-white rounded-full text-lg font-semibold shadow-md transition-transform duration-300 hover:scale-105 flex items-center gap-2"
    onClick={handleNavigate}
  >
    <span className="text-2xl">+</span> Add New Request
  </button>
</div>



      {/* Display Content based on selected tab */}
      <div className="w-full p-6 bg-gray-100 rounded-lg shadow-md">
      
        <p>{tabContent[selectedTab]}</p>
      </div>
    </div>
  );
};

export default RequestList;
