import React, { useState } from 'react';
import { RoomTypePage } from '../../../../../../Pages/AllPages';
import RoomExtraLayout from '../RoomExtra/RoomExtraLayout';
import RoomAmenityLayout from '../RoomAmenities/RoomAmenityLayout';

const RoomTypeLayout = () => {
  const [activeTab, setActiveTab] = useState('RoomType');
  const [update, setUpdate] = useState(false)

  const renderActiveTabPage = () => {
    switch (activeTab) {
      case 'RoomType':
        return <RoomTypePage update={update} setUpdate={setUpdate}/>;
      case 'Extra':
        return <RoomExtraLayout />;
      case 'RoomAmenities':
        return <RoomAmenityLayout />;
      default:
        return <RoomTypePage />;
    }
  };

  return (
    <div className="p-6">
      <div className='flex border-b border-gray-300 mb-4'>
        {['RoomType', 'Extra', 'RoomAmenities'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 text-center py-2 transition-all duration-300 
              ${activeTab === tab 
                ? 'border-b-4 border-blue-500 text-blue-600 font-semibold shadow-lg bg-blue-50' 
                : 'text-gray-500 hover:text-blue-500 hover:bg-gray-100'}`}
          >
            {tab === 'RoomType' && 'Room Type'}
            {tab === 'Extra' && 'Extra'}
            {tab === 'RoomAmenities' && 'Room Amenities'}
          </button>
        ))}
      </div>
      <div>
        {renderActiveTabPage()}
      </div>
    </div>
  );
};

export default RoomTypeLayout;

