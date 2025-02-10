import React, { useEffect,useState } from 'react';
import StaticLoader from '../../../Components/StaticLoader';
import { useGet } from '../../../Hooks/useGet';
import { FaPhoneAlt, FaEnvelope, FaBus,FaPlane,FaHotel  } from 'react-icons/fa';
import { FaMapMarkerAlt, FaDollarSign, FaClock, FaUser, FaBriefcase, FaCalendarAlt, FaBusAlt,FaMapPin } from 'react-icons/fa';
import { FaEllipsis } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

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
            <tr className="w-full border-b-2">
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">SL</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Code</th>
          
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">To Name</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">To Phone</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">To Email</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">To Role</th>
  
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Status</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Details</th>
            {/* <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Price</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Supplier Phone</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Supplier Email</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Driver Phone</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">To Name</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">To Phone</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">To Role</th> */}
            </tr>
          </thead>
          <tbody>
            {currentBusList.map((item, index) => (
              <tr key={index} className="text-gray-800 hover:bg-gray-100">
                                 <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{index+1}</td>
                 <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.code}</td>
         
                 <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.to_name}</td>
                 <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.to_phone}</td>
                 <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.to_email}</td>
                 <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.to_role}</td>

                 <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.status}</td>
                 <td className="min-w-[150px] flex items-center justify-center sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
      <FaEllipsis 
        className="w-10 h-10 text-mainColor  cursor-pointer hover:text-blue-500 transition-all"
        onClick={() => navigate(`/dashboard_agent/booking_list/current_booking/details/${item?.id}`, { state: { type: "buses" , data :item } })}
      />
    </td>
                {/* <td className="p-3 border">${item.total_price}</td>
                <td className="p-3 border">{item.supplier_from_phone || 'N/A'}</td>
                <td className="p-3 border">{item.supplier_from_email || 'N/A'}</td>
                <td className="p-3 border">{item.driver_phone}</td>
                <td className="p-3 border">{item.to_name}</td>
                <td className="p-3 border">{item.to_phone}</td>
                <td className="p-3 border">{item.to_role}</td> */}
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
            <tr className="w-full border-b-2">
              {['SL', 'Code', 'To Name', 'To Phone', 'To Email', 'To Role', 'Status',"Details"].map((header, idx) => (
                <th key={idx} className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentFlightList.map((item, index) => (
              <tr key={index} className="border hover:bg-gray-100 transition">
                 <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{index+1}</td>
                 <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.code}</td>
                 <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.to_name}</td>
                 <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">${item.to_phone}</td>
                 <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.to_email}</td>
                 <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.to_role}</td>
                 <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.status}</td>
                 <td className="min-w-[150px] flex items-center justify-center sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
      <FaEllipsis 
        className="w-10 h-10 text-mainColor  cursor-pointer hover:text-blue-500 transition-all"
        onClick={() => navigate(
          `/dashboard_agent/booking_list/current_booking/details/${item?.id || ''}`, 
          { state: { type: "flights" , data :item } }
        )}
      />
    </td>
                {/* <td className="p-3 border">{item.from_to[0]?.from || 'N/A'}</td>
                <td className="p-3 border">{item.from_to[0]?.to || 'N/A'}</td>
                <td className="p-3 border">{item.arrival || 'N/A'}</td>
                <td className="p-3 border">{item.supplier_from_phone}</td>
                <td className="p-3 border">{item.supplier_from_email}</td>
                <td className="p-3 border">{item.adults_no}</td>
                <td className="p-3 border">{item.children_no}</td>
                <td className="p-3 border">{item.infants_no}</td>
                <td className="p-3 border">{item.ref_pnr}</td>
                <td className="p-3 border">{item.to_name}</td>
                <td className="p-3 border">{item.to_phone}</td>
                <td className="p-3 border">{item.to_role}</td>
                <td className="p-3 border">{item.to_email}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    
  
  
  
  
  

    const renderTourTable = () => (
      <div className="overflow-x-auto mt-4">
        <table className="w-full sm:min-w-0">
          <thead className="w-full">
            <tr className="w-full border-b-2">
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">SL</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Code</th>
          
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">To Name</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">To Phone</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">To Email</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">To Role</th>
  
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Status</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Details</th>
            {/* <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Supplier Phone</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Supplier Email</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">To Name</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">To Role</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">To Phone</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">To Email</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Tour Buses</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Tour Hotels</th> */}
            </tr>
          </thead>
          <tbody>
            {currentTourList.map((item, index) => (
              <tr key={index} className="border hover:bg-gray-100">
                        <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{index+1}</td>
                 <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.code}</td>
         
                 <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.to_name}</td>
                 <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.to_phone}</td>
                 <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.to_email}</td>
                 <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.to_role}</td>

                 <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.status}</td>
                 <td className="min-w-[150px] flex items-center justify-center sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
      <FaEllipsis 
        className="w-10 h-10 text-mainColor  cursor-pointer hover:text-blue-500 transition-all"
        onClick={() => navigate(`/dashboard_agent/booking_list/current_booking/details/${item?.id}`, { state: { type: "tours" , data :item  } })}
      />
    </td>
                {/* <td className="border p-3">{item.supplier_from_phone || 'N/A'}</td>
                <td className="border p-3">{item.supplier_from_email || 'N/A'}</td>
                <td className="border p-3">{item.to_name}</td>
                <td className="border p-3">{item.to_role}</td>
                <td className="border p-3">{item.to_phone || 'N/A'}</td>
                <td className="border p-3">{item.to_email || 'N/A'}</td>
                <td className="border p-3">
                  {item.tour_buses.length > 0 ? (
                    <ul className="list-disc pl-4">
                      {item.tour_buses.map((bus, idx) => (
                        <li key={idx}>{bus.transportation}: {bus.seats} seats</li>
                      ))}
                    </ul>
                  ) : 'N/A'}
                </td>
                <td className="border p-3">
                  {item.tour_hotels.length > 0 ? (
                    <ul className="list-disc pl-4">
                      {item.tour_hotels.map((hotel, idx) => (
                        <li key={idx}>{hotel.hotel_name} ({hotel.room_type}, {hotel.check_in} - {hotel.check_out})</li>
                      ))}
                    </ul>
                  ) : 'N/A'}
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
            <tr className="w-full border-b-2">
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">SL</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Code</th>
          
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">To Name</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">To Phone</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">To Email</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">To Role</th>
  
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Status</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Details</th>
              {/* <th className="p-4">Children</th>
              <th className="p-4">Notes</th>
              <th className="p-4">Supplier From</th>
              <th className="p-4">Supplier From Phone</th>
              <th className="p-4">Supplier From Email</th>
              <th className="p-4">Supplier To</th>
              <th className="p-4">Supplier To Role</th>
              <th className="p-4">Supplier To Phone</th>
              <th className="p-4">Supplier To Email</th> */}
            </tr>
          </thead>
          <tbody>
            {currentVisaList.map((item, index) => (
              <tr key={index} className="border-t border-gray-200 hover:bg-gray-100">
                        <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{index+1}</td>
                 <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.code}</td>
         
                 <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.to_name}</td>
                 <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.to_phone}</td>
                 <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.to_email}</td>
                 <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.to_role}</td>

                 <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.status}</td>
                 <td className="min-w-[150px] flex items-center justify-center sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
      <FaEllipsis 
        className="w-10 h-10 text-mainColor  cursor-pointer hover:text-blue-500 transition-all"
        onClick={() => navigate(`/dashboard_agent/booking_list/current_booking/details/${item?.id}`,{ state: { type: "visas", data :item  } })}
      />
    </td>
                {/* <td className="p-4">{item.no_children}</td>
                <td className="p-4">{item.notes}</td>
                <td className="p-4">{item.supplier_from_name}</td>
                <td className="p-4">{item.supplier_from_phone || 'N/A'}</td>
                <td className="p-4">{item.supplier_from_email || 'N/A'}</td>
                <td className="p-4">{item.to_name}</td>
                <td className="p-4">{item.to_role}</td>
                <td className="p-4">{item.to_phone || 'N/A'}</td>
                <td className="p-4">{item.to_email || 'N/A'}</td> */}
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
            <tr className="w-full border-b-2">
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">SL</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Code</th>
          
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">To Name</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">To Phone</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">To Email</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">To Role</th>
  
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Status</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Details</th>
              {/* <th className="p-4">Children</th>
              <th className="p-4">Nights</th>
              <th className="p-4">Supplier From</th>
              <th className="p-4">Supplier From Phone</th>
              <th className="p-4">Supplier From Email</th>
              <th className="p-4">Supplier To</th>
              <th className="p-4">Supplier To Role</th>
              <th className="p-4">Supplier To Phone</th>
              <th className="p-4">Supplier To Email</th> */}
            </tr>
          </thead>
          <tbody>
            {currentHotelList.map((item, index) => (
               <tr key={index} className="border-t border-gray-200 hover:bg-gray-100">
                        <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{index+1}</td>
                 <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.code}</td>
         
                 <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.to_name}</td>
                 <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.to_phone}</td>
                 <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.to_email}</td>
                 <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.to_role}</td>

                 <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.status}</td>
                               <td className="min-w-[150px] flex items-center justify-center sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
      <FaEllipsis 
        className="w-10 h-10 text-mainColor  cursor-pointer hover:text-blue-500 transition-all"
        onClick={() => navigate(`/dashboard_agent/booking_list/current_booking/details/${item?.id}`, { state: { type: "hotels",data :item  } })}
      />
    </td>
                {/* <td className="p-4">{item.no_children}</td>
                <td className="p-4">{item.no_nights}</td>
                <td className="p-4">{item.supplier_from_name}</td>
                <td className="p-4">{item.supplier_from_phone || 'N/A'}</td>
                <td className="p-4">{item.supplier_from_email || 'N/A'}</td>
                <td className="p-4">{item.to_name}</td>
                <td className="p-4">{item.to_role}</td>
                <td className="p-4">{item.to_phone || 'N/A'}</td>
                <td className="p-4">{item.to_email || 'N/A'}</td> */}
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