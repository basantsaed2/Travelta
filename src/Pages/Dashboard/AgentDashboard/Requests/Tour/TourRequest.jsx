import React, { useEffect, useState } from 'react'
import { useGet } from '../../../../../Hooks/useGet';
import CurrentTour from './CurrentTour';
import HistoryTour from './HistoryTour';

const TourRequest = () => {
          const {refetch: refetchTour,loading: loadingTour,data: Tour,} = useGet({ url: "https://travelta.online/agent/request"});
          const [dataTour,setDataTour] = useState([])
          const [dataCurrent,setDataCurrent] = useState([])
          const [dataHistory,setDataHistory] = useState([])
          const [selectedTab, setSelectedTab] = useState('Current');
          useEffect(() => {
            refetchTour()
          }, [refetchTour])
        
          useEffect(() => {
            if(Tour){
              setDataTour(Tour)
              setDataCurrent(Tour.current.tours)
              setDataHistory(Tour.history.tours)
            }
            console.log('data ',Tour)
          }, [Tour])
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
        <><CurrentTour data={dataCurrent} loading={loadingTour}/></>
      ) : (
        <><HistoryTour data ={dataHistory}/></>
      )}
    </div>
  </div>
  )
}

export default TourRequest