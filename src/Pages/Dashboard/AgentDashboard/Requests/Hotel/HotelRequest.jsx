import React, { useState } from 'react';
import Current from './Current';
import History from './History';

const HotelRequest = () => {
  // State to track which tab is selected
  const [selectedTab, setSelectedTab] = useState('Current');

  return (
    <div>
      {/* Tab buttons */}
      <div className="flex justify-between items-center gap-4 mb-4  border-gray-300">
        <button
          className={`py-4 px-4 rounded-lg w-[40%] text-center transition-all duration-300 
            ${selectedTab === 'Current' ? 'bg-mainColor text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setSelectedTab('Current')}
        >
          Current
        </button>
        <button
          className={`py-4 px-4 rounded-lg w-[40%] text-center transition-all duration-300 
            ${selectedTab === 'History' ? 'bg-mainColor text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setSelectedTab('History')}
        >
          History
        </button>
      </div>

      {/* Display content based on selected tab */}
      <div className="p-4">
        {selectedTab === 'Current' ? (
          <><Current/></>
        ) : (
          <><History/></>
        )}
      </div>
    </div>
  );
};

export default HotelRequest;
