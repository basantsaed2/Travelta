import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HotelRequest from './Hotel/HotelRequest';
import BusesRequest from './Bus/BusesRequest';
import TourRequest from './Tour/TourRequest';
import VisaRequest from './Visa/VisaRequest';
import FlightRequest from './Flight/FlightRequest';
import { useGet } from '../../../../Hooks/useGet';

const RequestPage = () => {
  const [selectedTab, setSelectedTab] = useState('Hotels');
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/dashboard_agent/requests/add_request")
  }
  // Content for each tab
  const tabContent = {
    Hotels: <HotelRequest />,
    Buses: <BusesRequest />,
    Tour: <TourRequest />,
    Visa: <VisaRequest />,
    Flight: <FlightRequest />,
  };

  return (
    <div className="p-2 flex flex-col min-h-screen">
      {/* Tabs Section */}
      <div className="w-full">
        <div className="grid grid-cols-5 gap-2 text-center">
          {['Hotels', 'Buses', 'Tour', 'Visa', 'Flight'].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`py-3 text-sm sm:text-base font-medium transition-colors duration-200 border-b-2
          ${selectedTab === tab
                  ? 'border-mainColor text-mainColor'
                  : 'border-transparent text-gray-500 hover:text-mainColor hover:border-mainColor'}
        `}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Display Content based on selected tab */}
      <div className="w-full mt-6">
        <p>{tabContent[selectedTab]}</p>
      </div>
    </div>
  );
};

export default RequestPage;
