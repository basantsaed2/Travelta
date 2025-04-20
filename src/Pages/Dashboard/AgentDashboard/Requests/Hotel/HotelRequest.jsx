import React, { useEffect, useState } from 'react';
import Current from './Current';
import History from './History';
import { useGet } from '../../../../../Hooks/useGet';

const HotelRequest = () => {
  // State to track which tab is selected
  const [selectedTab, setSelectedTab] = useState('Current');
  const {refetch: refetchHotel,loading: loadingHotel,data: Hotel,} = useGet({ url: "https://travelta.online/agent/request"});
  const [dataHotel,setDataList] = useState([])
  const [dataCurrent,setDataCurrent] = useState([])
  const [dataHistory,setDataHistory] = useState([])
  useEffect(() => {
    refetchHotel()
  }, [refetchHotel])

  useEffect(() => {
    if(Hotel){
      setDataList(Hotel)
      setDataCurrent(Hotel.current.hotels)
      setDataHistory(Hotel.history.hotels)
    }
    console.log('data ',Hotel)
  }, [Hotel])
  return (
    <div>
      {/* Tab buttons */}
      <div className="flex justify-between items-center gap-4 mb-4">
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
      <div className="">
        {selectedTab === 'Current' ? (
          <><Current data={dataCurrent} loading={loadingHotel} refetch={refetchHotel}/></>
        ) : (
          <><History data ={dataHistory} loading={loadingHotel} refetch={refetchHotel}/></>
        )}
      </div>
    </div>
  );
};

export default HotelRequest;
