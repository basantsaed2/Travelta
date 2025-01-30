import React, { useEffect, useState } from 'react'
import { useGet } from '../../../../../Hooks/useGet';
import CurrenctBus from './CurrenctBus';
import HistoryBus from './HistoryBus';

const BusesRequest = () => {
    const {refetch: refetchBus,loading: loadingBus,data: Bus,} = useGet({ url: "https://travelta.online/agent/request"});
    const [dataBus,setDataBus] = useState([])
    const [dataCurrent,setDataCurrent] = useState([])
    const [dataHistory,setDataHistory] = useState([])
    const [selectedTab, setSelectedTab] = useState('Current');
    useEffect(() => {
      refetchBus()
    }, [refetchBus])
  
    useEffect(() => {
      if(Bus){
        setDataBus(Bus)
        setDataCurrent(Bus.current.buses)
        setDataHistory(Bus.history.buses)
      }
      console.log('data ',Bus)
    }, [Bus])
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
        <><CurrenctBus data={dataCurrent} loading={loadingBus}/></>
      ) : (
        <><HistoryBus data ={dataHistory}/></>
      )}
    </div>
  </div>
  )
}

export default BusesRequest