// import React, { useState } from 'react'
// import TitlePage from '../../../../../../Components/TitlePage'
// import {RoomTypePage } from '../../../../../../Pages/AllPages'
// import AddButton from '../../../../../../Components/Buttons/AddButton'
// import { Link } from 'react-router-dom'

// const RoomTypeLayout = () => {
  // const [update, setUpdate] = useState(false)
//   return (
//     <>
//     <div className='flex justify-between items-center'>
//     <TitlePage text={'Room Type'} />
//     <Link to='add'>
//         <AddButton />
//       </Link>
//     </div>
//       <RoomTypePage update={update} setUpdate={setUpdate}/>
//     </>
//   )
// }

// export default RoomTypeLayout

import React, { useState } from 'react';
import TitlePage from '../../../../../../Components/TitlePage';
import { RoomTypePage } from '../../../../../../Pages/AllPages';
import AddButton from '../../../../../../Components/Buttons/AddButton';
import { Link } from 'react-router-dom';

const RoomTypeLayout = () => {
  const [activeTab, setActiveTab] = useState('RoomType');
  const [update, setUpdate] = useState(false)

  const renderActiveTabPage = () => {
    switch (activeTab) {
      case 'RoomType':
        return <RoomTypePage update={update} setUpdate={setUpdate}/>;
      case 'Extra':
        return <ExtraPage />;
      case 'RoomAmenities':
        return <RoomAmenitiesPage />;
      default:
        return <RoomTypePage />;
    }
  };

  return (
    <div className="p-6">
      {/* <div className='flex justify-between items-center mb-6'>
        <TitlePage text={activeTab} />
        <Link to='add'>
          <AddButton />
        </Link>
      </div> */}
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

