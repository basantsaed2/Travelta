import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HotelRequest from './Hotel/HotelRequest';
import BusesRequest from './BusesRequest';
import TourRequest from './TourRequest';

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
      <div className="flex gap-4 mb-4 mt-10 border-b border-gray-300">
  {/* Tab buttons on the left */}
  <div className="flex gap-4">
    {['Hotels', 'Buses', 'Tour'].map((tab) => (
      <button
        key={tab}
        className={`py-2 px-4 rounded-lg w-32 text-center transition-all duration-300 
          ${selectedTab === tab
            ? 'bg-mainColor text-white border-b-4 border-mainColor'
            : 'bg-gray-200 text-gray-700'}
        `}
        onClick={() => setSelectedTab(tab)}
      >
        {tab}
      </button>
    ))}
  </div>

  {/* Add New Request Button on the right */}
  <button className="ml-auto mb-2 p-4 bg-mainColor text-white rounded-xl text-xl" onClick={handleNavigate}>
    
    + Add New Request
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
