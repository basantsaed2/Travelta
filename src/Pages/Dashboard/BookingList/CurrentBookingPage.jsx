import React, { useEffect,useState } from 'react';
import StaticLoader from '../../../Components/StaticLoader';
import { useGet } from '../../../Hooks/useGet';
import { FaEllipsis } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';

const CurrentBookingPage = ({ update, setUpdate }) => {
    const { refetch: refetchCurrent, loading: loadingCurrent, data: currentData } = useGet({url:'https://travelta.online/agent/booking'});
    const [currentBusList, setCurrentBusList] = useState([])
    const [currentFlightList, setCurrentFlightList] = useState([])
    const [currentHotelList, setCurrentHotelList] = useState([])
    const [currentTourList, setCurrentTourList] = useState([])
    const [currentVisaList, setCurrentVisaList] = useState([])
    const [activeTab, setActiveTab] = useState("Hotel");
    const navigate = useNavigate()
    useEffect(() => {
        refetchCurrent();
    }, [refetchCurrent, update]);

    useEffect(() => {
        if (currentData) {
                console.log("Current List:", currentData);
                setCurrentBusList(currentData.current.buses);
                setCurrentFlightList(currentData.current.flights);
                setCurrentHotelList(currentData.current.hotels);
                setCurrentTourList(currentData.current.tours);
                setCurrentVisaList(currentData.current.visas);
        }
    }, [currentData]); // Only run this effect when `data` changes

    const headers = ['SL', 'Client Name','Client Phone','Client Alternate','Client Email','Agent', 'Check In', 'Check Out', 'Total Price',"Details"];
    const tabLists = {
      Hotel: currentHotelList,
      Bus: currentBusList,
      Tour: currentTourList,
      Flight: currentFlightList,
      Visa: currentVisaList,
    };

  
    const renderBusTable = () => (
      <div className="overflow-x-auto mt-4">
          <table className="w-full sm:min-w-0">
          <thead className="w-full">
          <tr>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              SL
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              Code
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              C-Name
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              C-Phone
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              C-Email
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              C-Role
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              Price
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              Status
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              Hotel Name
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              Check-in
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              Children No.
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              Nights No.
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              Details
            </th>
            {/* <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Supplier Name</th>
              <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Supplier Phone</th>
              <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Supplier Email</th>
              <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">To Name</th>
              <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">To Role</th>
              <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">To Phone</th>
              <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">To Email</th> */}
          </tr>
          </thead>
          <tbody>
          {currentBusList.map((item, index) => (
            <tr
              key={index}
              className="border-t border-gray-200 hover:bg-gray-100"
            >
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {index + 1}
              </td>
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {item.code}
              </td>
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {item.to_name}
              </td>
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                <a
                  href={`https://wa.me/${item.to_phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-green-500 hover:text-green-700"
                >
                  <FaWhatsapp className="w-5 h-5" />
                  <span>{item.to_phone}</span>
                </a>
              </td>

              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {item.to_email ? (
                  <a
                    href={`mailto:${item.to_email}`}
                    className="text-blue-500 hover:underline"
                  >
                    {item.to_email}
                  </a>
                ) : (
                  "-"
                )}
              </td>

              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {item.to_role}
              </td>

              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                ${item.total_price}
              </td>
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {item.status}
              </td>
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {item._name}
              </td>
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {item.check_in}
              </td>
              <td className="min-w-[150px] flex items-center justify-center sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                <FaEllipsis
                  className="w-10 h-10 text-mainColor  cursor-pointer hover:text-blue-500 transition-all"
                  onClick={() =>
                    navigate(
                      `/dashboard_agent/booking_list/upcoming_booking/details_upcoming/${item?.id}`,
                      { state: { type: "buses", data: item } }
                    )
                  }
                />
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    );
    
  
  
  
    const renderFlightTable = () => (
      <div className="overflow-x-auto mt-4">
          <table className="w-full sm:min-w-0">
          <thead className="w-full">
          <tr>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              SL
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              Code
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              C-Name
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              C-Phone
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              C-Email
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              C-Role
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              Price
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              Status
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              Hotel Name
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              Check-in
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              Children No.
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              Nights No.
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              Details
            </th>
            {/* <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Supplier Name</th>
              <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Supplier Phone</th>
              <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Supplier Email</th>
              <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">To Name</th>
              <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">To Role</th>
              <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">To Phone</th>
              <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">To Email</th> */}
          </tr>
          </thead>
      <tbody className="w-full">
        {currentFlightList.length === 0 ? (
          <tr>
            <td
              colSpan={12}
              className="text-center text-xl text-mainColor font-TextFontMedium  "
            >
              Not find Flight Booking
            </td>
          </tr>
        ) : (
          upcomingFlightList.map((flight, index) => (
            <tr className="w-full border-b-2" key={index}>
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {index + 1}
              </td>
              <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {flight?.code || "-"}
              </td>
              <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {flight?.to_name || "-"}
              </td>
              <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                  <a
                    href={`https://wa.me/$ {flight?.to_phone || "-"}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-green-500 hover:text-green-700"
                  >
                    <FaWhatsapp className="w-5 h-5" />
                    <span> {flight?.to_phone || "-"}</span>
                  </a>
                </td>
              </td>
              <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                <a
                  href={`mailto:${flight?.to_email}`}
                  className="truncate max-w-[120px] inline-block cursor-pointer group text-blue-500 hover:underline"
                ></a>
              </td>

              <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {flight?.to_role || "-"}
              </td>
              <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {flight?.flight_type || "-"}
              </td>
              <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {flight?.flight_direction || "-"}
              </td>

              <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {flight?.status || "-"}
              </td>

              <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {flight?.total_price || "-"}
              </td>
              <td className="min-w-[150px] flex items-center justify-center sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                <FaEllipsis
                  className="w-10 h-10 text-mainColor  cursor-pointer hover:text-blue-500 transition-all"
                  onClick={() =>
                    navigate(
                      `/dashboard_agent/booking_list/upcoming_booking/details_upcoming/${flight?.id}`,
                      { state: { type: "flights", data: flight } }
                    )
                  }
                />
              </td>
            </tr>
          ))
        )}
      </tbody>
        </table>
      </div>
    );
    
  
  
  
  
  

    const renderTourTable = () => (
      <div className="overflow-x-auto mt-4">
        <table className="w-full sm:min-w-0">
          <thead className="w-full">
          <tr>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              SL
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              Code
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              C-Name
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              C-Phone
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              C-Email
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              C-Role
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              Price
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              Status
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              Hotel Name
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              Check-in
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              Children No.
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              Nights No.
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              Details
            </th>
            {/* <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Supplier Name</th>
              <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Supplier Phone</th>
              <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Supplier Email</th>
              <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">To Name</th>
              <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">To Role</th>
              <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">To Phone</th>
              <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">To Email</th> */}
          </tr>
          </thead>
        <tbody>
          {currentTourList.map((item, index) => (
            <tr
              key={index}
              className="border-t border-gray-200 hover:bg-gray-100"
            >
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {index + 1}
              </td>
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {item.code}
              </td>
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {item.tour_name}
              </td>
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                  <a
                    href={`https://wa.me/${item.to_phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-green-500 hover:text-green-700"
                  >
                    <FaWhatsapp className="w-5 h-5" />
                    <span>{item.to_phone}</span>
                  </a>
                </td>
              </td>
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                  {item.to_email ? (
                    <a
                      href={`mailto:${item.to_email}`}
                      className="text-blue-500 hover:underline"
                    >
                      {item.to_email}
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
              </td>
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {item.to_role}
              </td>
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {item.total_price}
              </td>
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {item.status}
              </td>
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {item.hotel_name}
              </td>
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {item.check_in}
              </td>
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {item.country ? item.country : "-"}
              </td>

              <td className="min-w-[150px] flex items-center justify-center sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                <FaEllipsis
                  className="w-10 h-10 text-mainColor  cursor-pointer hover:text-blue-500 transition-all"
                  onClick={() =>
                    navigate(
                      `/dashboard_agent/booking_list/upcoming_booking/details_upcoming/${item?.id}`,
                      { state: { type: "tours", data: item } }
                    )
                  }
                />
              </td>

              {/* <td className="p-3">
                  {item.tour_buses.map((bus, idx) => (
                    <div key={idx}>{bus.transportation}: {bus.seats} seats</div>
                  ))}
                </td>
                <td className="p-3">
                  {item.tour_hotels.map((hotel, idx) => (
                    <div key={idx}>{hotel.hotel_name} ({hotel.room_type} room, Check-in: {hotel.check_in}, Check-out: {hotel.check_out})</div>
                  ))}
                </td> */}
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    );
    
  
  
  
  
    const renderVisaTable = () => (
      <div className="overflow-x-auto">
           <table className="w-full sm:min-w-0">
          <thead className="w-full">
          <tr>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              SL
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              Code
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              C-Name
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              C-Phone
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              C-Email
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              C-Role
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              Price
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              Status
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              Hotel Name
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              Check-in
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              Children No.
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              Nights No.
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              Details
            </th>
            {/* <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Supplier Name</th>
              <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Supplier Phone</th>
              <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Supplier Email</th>
              <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">To Name</th>
              <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">To Role</th>
              <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">To Phone</th>
              <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">To Email</th> */}
          </tr>
          </thead>
        <tbody>
          {currentVisaList.map((item, index) => (
            <tr
              key={index}
              className="border-t border-gray-200 hover:bg-gray-100"
            >
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {index + 1}
              </td>
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {item.code}
              </td>
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {item.to_name}
              </td>
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                  <a
                    href={`https://wa.me/${item.to_phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-green-500 hover:text-green-700"
                  >
                    <FaWhatsapp className="w-5 h-5" />
                    <span>{item.to_phone}</span>
                  </a>
                </td>
              </td>
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                  {item.to_email ? (
                    <a
                      href={`mailto:${item.to_email}`}
                      className="text-blue-500 hover:underline"
                    >
                      {item.to_email}
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
              </td>
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {item.to_role}
              </td>
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {item.appointment}
              </td>
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {item.travel_date}
              </td>
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                ${item.total_price}
              </td>
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {item.country}
              </td>
              {/* <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.country_name}</td>
                <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.no_adults}</td>
                <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.no_children}</td>
                <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.notes}</td>
                <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.supplier_from_name}</td>
                <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.supplier_from_phone[0] || 'N/A'}</td>
                <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.supplier_from_email[0] || 'N/A'}</td>
                <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.to_name}</td>
                <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.to_role}</td>
                <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.to_phone || 'N/A'}</td>
                <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.to_email || 'N/A'}</td> */}
              <td className="min-w-[150px] flex items-center justify-center sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                <FaEllipsis
                  className="w-10 h-10 text-mainColor  cursor-pointer hover:text-blue-500 transition-all"
                  onClick={() =>
                    navigate(
                      `/dashboard_agent/booking_list/upcoming_booking/details_upcoming/${item?.id}`,
                      { state: { type: "visas", data: item } }
                    )
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    );
    
  
    const renderHotelTable = () => (
      <div className="overflow-x-auto">
         <table className="w-full sm:min-w-0">
          <thead className="w-full">
          <tr>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              SL
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              Code
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              C-Name
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              C-Phone
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              C-Email
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              C-Role
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              Price
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              Status
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              Hotel Name
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              Check-in
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              Children No.
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              Nights No.
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              Details
            </th>
            {/* <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Supplier Name</th>
              <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Supplier Phone</th>
              <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Supplier Email</th>
              <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">To Name</th>
              <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">To Role</th>
              <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">To Phone</th>
              <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">To Email</th> */}
          </tr>
          </thead>
        <tbody>
          {currentHotelList.map((item, index) => (
            <tr
              key={index}
              className="border-t border-gray-200 hover:bg-gray-100"
            >
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {index + 1}
              </td>
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {item.code}
              </td>
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {item.to_name}
              </td>
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                <a
                  href={`https://wa.me/${item.to_phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-green-500 hover:text-green-700"
                >
                  <FaWhatsapp className="w-5 h-5" />
                  <span>{item.to_phone}</span>
                </a>
              </td>
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {item.to_email ? (
                  <a
                    href={`mailto:${item.to_email}`}
                    className="text-blue-500 hover:underline"
                  >
                    {item.to_email}
                  </a>
                ) : (
                  "-"
                )}
              </td>
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {item.to_role}
              </td>
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {item.total_price}
              </td>
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {item.status}
              </td>
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {item.hotel_name}
              </td>
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {item.check_in}
              </td>
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {item.no_children}
              </td>
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {item.no_nights}
              </td>

              <td className="min-w-[150px] flex items-center justify-center sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                <FaEllipsis
                  className="w-10 h-10 text-mainColor  cursor-pointer hover:text-blue-500 transition-all"
                  onClick={() =>
                    navigate(
                      `/dashboard_agent/booking_list/upcoming_booking/details_upcoming/${item?.id}`,
                      { state: { type: "hotels", data: item } }
                    )
                  }
                />
              </td>
              {/* <td className="p-3">{item.supplier_from_name}</td>
                <td className="p-3">{item.supplier_from_phone || 'N/A'}</td>
                <td className="p-3">{item.supplier_from_email || 'N/A'}</td>
                <td className="p-3">{item.to_name}</td>
                <td className="p-3">{item.to_role}</td>
                <td className="p-3">{item.to_phone || 'N/A'}</td>
                <td className="p-3">{item.to_email || 'N/A'}</td> */}
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    );
    
  
  
  

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'Bus':
        return renderBusTable();
      case 'Flight':
        return renderFlightTable();
      case 'Tour':
        return renderTourTable();
      case 'Visa':
        return renderVisaTable();
      case 'Hotel':
        return renderHotelTable();
      default:
        return null;
    }
  };



  return (
    <>
    <div className="w-full mt-5 flex flex-col items-start justify-start overflow-x-scroll scrollSection">

      {loadingCurrent ? (
        <div className="w-full h-56 flex justify-center items-center">
          <StaticLoader />
        </div>
      ) :  (  <div>
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('Hotel')}
            className={`py-2 px-4 rounded ${activeTab === 'Hotel' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Hotel
          </button>
          <button
            onClick={() => setActiveTab('Bus')}
            className={`py-2 px-4 rounded ${activeTab === 'Bus' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Bus
          </button>
          <button
            onClick={() => setActiveTab('Tour')}
            className={`py-2 px-4 rounded ${activeTab === 'Tour' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Tour
          </button>
          <button
            onClick={() => setActiveTab('Flight')}
            className={`py-2 px-4 rounded ${activeTab === 'Flight' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Flight
          </button>
          <button
            onClick={() => setActiveTab('Visa')}
            className={`py-2 px-4 rounded ${activeTab === 'Visa' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Visa
          </button>
        </div>
  
       <div className="overflow-x-auto mt-5">
       {renderActiveTabContent()}
       </div>
      </div>)}
    </div>
    </>
  );
}

export default CurrentBookingPage