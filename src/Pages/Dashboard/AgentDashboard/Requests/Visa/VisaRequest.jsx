import React, { useEffect, useState } from 'react'
import { useGet } from '../../../../../Hooks/useGet';
import CurrentVisa from './CurrentVisa';
import HistoryVisa from './HistoryVisa';

const VisaRequest = () => {
        const {refetch: refetchVisa,loading: loadingVisa,data: Visa,} = useGet({ url: "https://travelta.online/agent/request"});
        const [dataVisa,setDataVisa] = useState([])
        const [dataCurrent,setDataCurrent] = useState([])
        const [dataHistory,setDataHistory] = useState([])
        const [selectedTab, setSelectedTab] = useState('Current');
        useEffect(() => {
          refetchVisa()
        }, [refetchVisa])
      
        useEffect(() => {
          if(Visa){
            setDataVisa(Visa)
            setDataCurrent(Visa.current.visas)
            setDataHistory(Visa.history.visas)
          }
          console.log('data ',Visa)
        }, [Visa])
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
        <><CurrentVisa data={dataCurrent} loading={loadingVisa} /></>
      ) : (
        <><HistoryVisa data ={dataHistory}/></>
      )}
    </div>
  </div>
  )
}

export default VisaRequest