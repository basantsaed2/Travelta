import React, { useEffect, useState } from 'react'
import { useGet } from '../../../../../Hooks/useGet';
import CurrentFlight from './CurrentFlight';
import HistoryFlight from './HistoryFlight';

const FlightRequest = () => {
        const {refetch: refetchFlight,loading: loadingFlight,data: Flight,} = useGet({ url: "https://travelta.online/agent/request"});
        const [dataFlight,setDataFlight] = useState([])
        const [dataCurrent,setDataCurrent] = useState([])
        const [dataHistory,setDataHistory] = useState([])
        const [selectedTab, setSelectedTab] = useState('Current');
        useEffect(() => {
          refetchFlight()
        }, [refetchFlight])
      
        useEffect(() => {
          if(Flight){
            setDataFlight(Flight)
            setDataCurrent(Flight.current.flights)
            setDataHistory(Flight.history.flights)
          }
          console.log('data ',Flight)
        }, [Flight])
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
        <><CurrentFlight data={dataCurrent} loading={loadingFlight}/></>
      ) : (
        <><HistoryFlight data ={dataHistory}/></>
      )}
    </div>
  </div>
  )
}

export default FlightRequest