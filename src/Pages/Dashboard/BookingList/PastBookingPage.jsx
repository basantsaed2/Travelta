import React, { useEffect,useState } from 'react';
import StaticLoader from '../../../Components/StaticLoader';
import { useGet } from '../../../Hooks/useGet';
import { FaEllipsis } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const PastBookingPage = ({ refetch, setUpdate }) => {
    const { refetch: refetchPast, loading: loadingPast, data: pastData } = useGet({url:'https://travelta.online/agent/booking'});
    const [pastBusList, setPastBusList] = useState([])
    const [pastFlightList, setPastFlightList] = useState([])
    const [pastHotelList, setPastHotelList] = useState([])
    const [pastTourList, setPastTourList] = useState([])
    const [pastVisaList, setPastVisaList] = useState([])
    const [activeTab, setActiveTab] = useState("Hotel");
    const navigate = useNavigate()
    useEffect(() => {
        refetchPast();
    }, [refetchPast, refetch]);

    useEffect(() => {
        if (pastData) {
                console.log("Past List:", pastData);
                setPastBusList(pastData.past.buses);
                setPastFlightList(pastData.past.flights);
                setPastHotelList(pastData.past.hotels);
                setPastTourList(pastData.past.tours);
                setPastVisaList(pastData.past.visas);
        }
    }, [pastData]); // Only run this effect when `data` changes

    const headers = ['SL', 'Code ','To Name','To Phone','To Email','To role', 'Status','Details'];

    const tabLists = {
      Hotel: pastHotelList,
      Bus: pastBusList,
      Tour: pastTourList,
      Flight: pastFlightList,
      Visa: pastVisaList,
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

      {loadingPast ? (
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
                  {item?.code|| '-'}
                </td>
                <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                  {item?.to_name|| '-'}
                </td>
                <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                  {item?.to_phone || '-'}
                </td>
                <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {item?.to_email || '-'}
                </td>
                <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {item?.to_role || '-'}
                </td>
                <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                  {item?.status|| '-'}
                </td>
                <td className="min-w-[150px] flex items-center justify-center sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
  <FaEllipsis 
    className="w-10 h-10 text-mainColor cursor-pointer hover:text-blue-500 transition-all"
    onClick={() => {
      // Define a mapping for tab names to the required type
      const typeMapping = {
        Hotel: "hotels",
        Bus: "buses",
        Tour: "tours",
        Flight: "flights",
        Visa: "visas",
      };

      // Get the correct type based on activeTab
      const selectedType = typeMapping[activeTab] || "unknown";

      navigate(`/dashboard_agent/booking_list/past_booking/details_past/${item?.id}`, { state: { type: selectedType ,data:item } });
    }}
  />
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

export default PastBookingPage