import React, { useEffect,useState } from 'react';
import StaticLoader from '../../../Components/StaticLoader';
import { useGet } from '../../../Hooks/useGet';

const CurrentBookingPage = ({ refetch, setUpdate }) => {
    const { refetch: refetchCurrent, loading: loadingCurrent, data: currentData } = useGet({url:'https://travelta.online/agent/booking/current'});
    const [currentBusList, setCurrentBusList] = useState([])
    const [currentFlightList, setCurrentFlightList] = useState([])
    const [currentHotelList, setCurrentHotelList] = useState([])
    const [currentTourList, setCurrentTourList] = useState([])
    const [currentVisaList, setCurrentVisaList] = useState([])
    const [activeTab, setActiveTab] = useState("Hotel");

    useEffect(() => {
        refetchCurrent();
    }, [refetchCurrent, refetch]);

    useEffect(() => {
        if (currentData) {
                console.log("Current List:", currentData);
                setCurrentBusList(currentData.bus);
                setCurrentFlightList(currentData.flight);
                setCurrentHotelList(currentData.hotel);
                setCurrentTourList(currentData.tour);
                setCurrentVisaList(currentData.visa);
        }
    }, [currentData]); // Only run this effect when `data` changes

    const headers = ['SL', 'From Client','To Client', 'Check In', 'Check Out', 'Total Price'];

    const tabLists = {
      Hotel: currentHotelList,
      Bus: currentBusList,
      Tour: currentTourList,
      Flight: currentFlightList,
      Visa: currentVisaList,
    };
  return (
    <>
    <div className="w-full tabs flex gap-1 lg:gap-4 mb-5">
      {Object.keys(tabLists).map((tab) => (
        <button
          key={tab}
          className={`px-4 py-2 text-sm font-semibold rounded ${activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
    <div className="w-full mt-5 flex flex-col items-start justify-start overflow-x-scroll scrollSection">

      {loadingCurrent ? (
        <div className="w-full h-56 flex justify-center items-center">
          <StaticLoader />
        </div>
      ) : (
        <table className="w-full sm:min-w-0 ">
          <thead className="w-full">
            <tr className="w-full border-b-2 ">
              {headers.map((name, index) => (
                <th
                  key={index} className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
                  {name}
                  
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="w-full">
            {tabLists[activeTab].length === 0 ? (
              <tr>
                <td colSpan={headers.length} className="text-center text-xl text-mainColor font-TextFontMedium">No data available</td>
              </tr>
            ) : (
              tabLists[activeTab].map((item, index) => (
                <tr className="w-full border-b-2" key={index}>
                <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                  {index + 1}
                </td>
                <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                  {item?.name|| '-'}
                </td>
                <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                  {item?.to_client?.name || '-'}
                </td>
                <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {item?.[activeTab.toLowerCase()]?.departure?.split(" ")[0] || '-'}
                </td>
                <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {item?.[activeTab.toLowerCase()]?.arrival?.split(" ")[0] || '-'}
                </td>
                <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                  {item?.total_price|| '-'}
                </td>
              </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
    </>
  );
}

export default CurrentBookingPage