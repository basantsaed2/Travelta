import React, { useEffect, useState } from 'react';
import StaticLoader from '../../../Components/StaticLoader';
import { useGet } from '../../../Hooks/useGet';

import { FaPhoneAlt, FaEnvelope, FaBus,FaPlane,FaHotel  } from 'react-icons/fa';
import { FaMapMarkerAlt, FaDollarSign, FaClock, FaUser, FaBriefcase, FaCalendarAlt, FaBusAlt,FaMapPin } from 'react-icons/fa';
import { FaPlaneDeparture, FaArrowRight, FaCalendarDay, FaChild, FaCogs, FaIdBadge, FaTicketAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { FaEllipsis } from 'react-icons/fa6';
const UpcomingBookingPage = ({ refetch, setUpdate }) => {
  const { refetch: refetchUpcoming, loading: loadingUpcoming, data: upcomingData } = useGet({ url: 'https://travelta.online/agent/booking' });
  const navigate = useNavigate();
  const [upcomingBusList, setUpcomingBusList] = useState([]);
  const [upcomingFlightList, setUpcomingFlightList] = useState([]);
  const [upcomingHotelList, setUpcomingHotelList] = useState([]);
  const [upcomingTourList, setUpcomingTourList] = useState([]);
  const [upcomingVisaList, setUpcomingVisaList] = useState([]);
  const [activeTab, setActiveTab] = useState("Flight");

  useEffect(() => {
    refetchUpcoming();
  }, [refetchUpcoming, refetch]);

  useEffect(() => {
    if (upcomingData) {
      console.log("Upcoming List:", upcomingData);
      setUpcomingBusList(upcomingData.upcoming.buses || []);
      setUpcomingFlightList(upcomingData.upcoming.flights || []);
      setUpcomingHotelList(upcomingData.upcoming.hotels || []);
      setUpcomingTourList(upcomingData.upcoming.tours || []);
      setUpcomingVisaList(upcomingData.upcoming.visas || []);
    }
  }, [upcomingData]);

  const headers = ['SL', 'To Name','To Phone','Client Email','Agent', 'Check In', 'Check Out', 'Total Price'];
  const headersFlight = ['SL','Code','To Name','To Phone', 'To Email','To Role','Flight Type','Direction', 'Status', 'Total Price' ,"Details"];

  const tabLists = {
    Hotel: upcomingHotelList,
    Bus: upcomingBusList,
    Tour: upcomingTourList,
    Flight: upcomingFlightList,
    Visa: upcomingVisaList,
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
           
            
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Price</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Country</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Details</th>
          </tr>
        </thead>
        <tbody>
          {upcomingBusList.map((item, index) => (
            <tr key={index} className="border-t border-gray-200 hover:bg-gray-100">
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{index+1}</td>
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.code}</td>
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.to_name}</td>
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.to_phone}</td>
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.to_email}</td>
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.to_role}</td>
             
             
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">${item.total_price}</td>
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.country}</td>
              <td className="min-w-[150px] flex items-center justify-center sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
      <FaEllipsis 
        className="w-10 h-10 text-mainColor  cursor-pointer hover:text-blue-500 transition-all"
        onClick={() => navigate(`/dashboard_agent/booking_list/upcoming_booking/details_upcoming/${item?.id}`, { state: { type: "buses" ,data:item } })}
      />
    </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  

    const renderFlightCards = () => (
         <table className="w-full sm:min-w-0">
          <thead className="w-full">
            <tr className="w-full border-b-2">
              {headersFlight.map((name, index) => (
                <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3" key={index}>
                  {name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="w-full">
            {upcomingFlightList.length === 0 ? (
              <tr>
                <td colSpan={12} className='text-center text-xl text-mainColor font-TextFontMedium  '>Not find Flight Booking</td>
              </tr>
            ) : (
                upcomingFlightList.map((flight, index) => ( 
                <tr className="w-full border-b-2" key={index}>
                  <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {index + 1}
                  </td>
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {flight?.code|| '-'}
                  </td>
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {flight?.to_name|| '-'}
                  </td>
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {flight?.to_phone|| '-'}
                  </td>
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {flight?.to_email|| '-'}
                  </td>
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {flight?.to_role || '-'}
                  </td>
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {flight?.flight_type || '-'}
                  </td>
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {flight?.flight_direction|| '-'}
                  </td>

                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {flight?.status|| '-'}
                  </td>
              
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {flight?.total_price || '-'}
                  </td>
                  <td className="min-w-[150px] flex items-center justify-center sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
      <FaEllipsis 
        className="w-10 h-10 text-mainColor  cursor-pointer hover:text-blue-500 transition-all"
        onClick={() => navigate(`/dashboard_agent/booking_list/upcoming_booking/details_upcoming/${flight?.id}`,{ state: { type: "flights" ,data:flight } })}
      />
    </td>
                </tr>
              ))

            )}
          </tbody>
        </table>
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
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Children No.</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Country</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Details</th>

            </tr>
          </thead>
          <tbody>
            {upcomingTourList.map((item, index) => (
              <tr key={index} className="border-t border-gray-200 hover:bg-gray-100">
               <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{index+1}</td>
               <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.code}</td>
               <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.to_name}</td>
               <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.to_phone}</td>
               <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">${item.to_email}</td>
               <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.to_role}</td>
               <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.children_no}</td>
               <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.country?item.country:"-"}</td>

               <td className="min-w-[150px] flex items-center justify-center sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
      <FaEllipsis 
        className="w-10 h-10 text-mainColor  cursor-pointer hover:text-blue-500 transition-all"
        onClick={() => navigate(`/dashboard_agent/booking_list/upcoming_booking/details_upcoming/${item?.id}`,{ state: { type: "tours",data:item } })}
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
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Appointment Date</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Travel Date</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Price</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Country</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Details</th>
            {/* <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Country Name</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Adults No.</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Children No.</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Notes</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Supplier From</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Supplier From Phone</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Supplier From Email</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Supplier To</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Supplier To Role</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Supplier To Phone</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Supplier To Email</th> */}
            </tr>
          </thead>
          <tbody>
            {upcomingVisaList.map((item, index) => (
              <tr key={index} className="border-t border-gray-200 hover:bg-gray-100">
                <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{index+1}</td>
                <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.code}</td>
                <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.to_name}</td>
                <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.to_phone}</td>
                <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.to_email}</td>
                <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.to_role}</td>
                <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.appointment}</td>
                <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.travel_date}</td>
                <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">${item.total_price}</td>
                <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.country}</td>
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
        onClick={() => navigate(`/dashboard_agent/booking_list/upcoming_booking/details_upcoming/${item?.id}`,{ state: { type: "visas",data:item } })}
      />
    </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    
    
    const renderHotelTable = () => (
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full rounded-lg">
          <thead>
            <tr>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">SL</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Code</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">To Name</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">To Phone</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">To Email</th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">To Role</th>
              <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Price</th>
              <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Country</th>
              <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Room Type</th>
              <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Adults No.</th>
              <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Children No.</th>
              <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Nights No.</th>
              <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Details</th>
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
            {upcomingHotelList.map((item, index) => (
              <tr key={index} className="border-t border-gray-200 hover:bg-gray-100">
                                <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{index+1}</td>
                                <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.code}</td>
                <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.to_name}</td>
                <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.to_phone}</td>
                <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.to_email}</td>
                <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.to_role}</td>
                <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.total_price}</td>
                <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.country?item.country:"-"}</td>
                <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.room_type}</td>
                <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.no_adults}</td>
                <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.no_children}</td>
                <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{item.no_nights}</td>

                                               <td className="min-w-[150px] flex items-center justify-center sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
      <FaEllipsis 
        className="w-10 h-10 text-mainColor  cursor-pointer hover:text-blue-500 transition-all"
        onClick={() => navigate(`/dashboard_agent/booking_list/upcoming_booking/details_upcoming/${item?.id}`,{ state: { type: "hotels",data:item } })}
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
          return renderFlightCards();
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

        <div className="w-full tabs flex gap-1 lg:gap-4 mb-5">
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
  
      <div className="w-full mt-5 flex flex-col items-start justify-start overflow-x-scroll scrollSection">

      {loadingUpcoming ? (
        <div className="w-full h-56 flex justify-center items-center">
          <StaticLoader />
        </div>
      ) : (   
      <div className='max-w-full flex scrollSection overflow-x-scroll'>
        {renderActiveTabContent()}
      </div>
      )}
    </div>
    </>
  );
};

export default UpcomingBookingPage;
