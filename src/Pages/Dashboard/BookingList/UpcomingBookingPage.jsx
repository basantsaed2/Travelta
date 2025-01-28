import React, { useEffect, useState } from 'react';
import StaticLoader from '../../../Components/StaticLoader';
import { useGet } from '../../../Hooks/useGet';

import { FaPhoneAlt, FaEnvelope, FaBus,FaPlane,FaHotel  } from 'react-icons/fa';
import { FaMapMarkerAlt, FaDollarSign, FaClock, FaUser, FaBriefcase, FaCalendarAlt, FaBusAlt,FaMapPin } from 'react-icons/fa';
import { FaPlaneDeparture, FaArrowRight, FaCalendarDay, FaChild, FaCogs, FaIdBadge, FaTicketAlt } from 'react-icons/fa';
const UpcomingBookingPage = ({ refetch, setUpdate }) => {
  const { refetch: refetchUpcoming, loading: loadingUpcoming, data: upcomingData } = useGet({ url: 'https://travelta.online/agent/booking/upcoming' });
  const [upcomingBusList, setUpcomingBusList] = useState([]);
  const [upcomingFlightList, setUpcomingFlightList] = useState([]);
  const [upcomingHotelList, setUpcomingHotelList] = useState([]);
  const [upcomingTourList, setUpcomingTourList] = useState([]);
  const [upcomingVisaList, setUpcomingVisaList] = useState([]);
  const [activeTab, setActiveTab] = useState("Hotel");

  useEffect(() => {
    refetchUpcoming();
  }, [refetchUpcoming, refetch]);

  useEffect(() => {
    if (upcomingData) {
      console.log("Upcoming List:", upcomingData);
      setUpcomingBusList(upcomingData.bus || []);
      setUpcomingFlightList(upcomingData.flight || []);
      setUpcomingHotelList(upcomingData.hotel || []);
      setUpcomingTourList(upcomingData.tour || []);
      setUpcomingVisaList(upcomingData.visa || []);
    }
  }, [upcomingData]);

  const headers = ['SL', 'Client Name','Client Phone','Client Alternate','Client Email','Agent', 'Check In', 'Check Out', 'Total Price'];

  const tabLists = {
    Hotel: upcomingHotelList,
    Bus: upcomingBusList,
    Tour: upcomingTourList,
    Flight: upcomingFlightList,
    Visa: upcomingVisaList,
  };

    
    const renderBusCards = () => (
      <div className="flex flex-wrap flex-col lg:flex-row mt-4 gap-6">
        {upcomingBusList.map((item, index) => (
          <div
            key={index}
            className="w-[500px] p-6 transition-all duration-300 transform hover:shadow-xl rounded-lg border border-gray-200"
          >
            <div className="bg-gradient-to-r from-white to-white text-white rounded-lg shadow-lg overflow-auto">
              {/* Header Section */}
              <div className="bg-gradient-to-r from-indigo-600 to-blue-800 text-white p-6 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-semibold">{item.bus_name}</h3>
                  <p className="text-lg">{item.country}</p>
                </div>
                <FaBus className="text-white text-3xl" />
              </div>
    
              {/* Bus Info Section */}
              <div className="p-6 space-y-4 text-gray-800">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-indigo-600" size={18} />
                  <p><strong className="text-gray-700">Departure:</strong> {item.depature}</p>
                </div>
                <div className="flex items-center gap-2">
                  <FaBusAlt className="text-green-500" size={18} />
                  <p><strong className="text-gray-700">Bus No.:</strong> {item.bus_no}</p>
                </div>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-yellow-500" size={18} />
                  <p><strong className="text-gray-700">From:</strong> {item.from}</p>
                </div>
                <div className="flex items-center gap-2">
                  <FaMapPin className="text-red-500" size={18} />
                  <p><strong className="text-gray-700">To:</strong> {item.to}</p>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="text-purple-500" size={18} />
                  <p><strong className="text-gray-700">Arrival:</strong> {item.arrival}</p>
                </div>
                <div className="flex items-center gap-2">
                  <FaDollarSign className="text-teal-600" size={18} />
                  <p><strong className="text-gray-700">Price:</strong> ${item.total_price}</p>
                </div>
              </div>
    
              {/* Supplier Info Section */}
              <div className="border-t border-gray-200 p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <FaPhoneAlt className="text-gray-700" size={18} />
                  <p><strong className="text-gray-700">Supplier Phone:</strong> {item.supplier_from_phone || 'N/A'}</p>
                </div>
                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-gray-700" size={18} />
                  <p><strong className="text-gray-700">Supplier Email:</strong> {item.supplier_from_email || 'N/A'}</p>
                </div>
                <div className="flex items-center gap-2">
                  <FaPhoneAlt className="text-gray-700" size={18} />
                  <p><strong className="text-gray-700">Driver Phone:</strong> {item.driver_phone}</p>
                </div>
                <div className="flex items-center gap-2">
                  <FaUser className="text-gray-700" size={18} />
                  <p><strong className="text-gray-700">To Name:</strong> {item.to_name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <FaPhoneAlt className="text-gray-700" size={18} />
                  <p><strong className="text-gray-700">To Phone:</strong> {item.to_phone}</p>
                </div>
                <div className="flex items-center gap-2">
                  <FaBriefcase className="text-gray-700" size={18} />
                  <p><strong className="text-gray-700">To Role:</strong> {item.to_role}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );

    

    const renderFlightCards = () => (
      <div className="flex flex-wrap mt-4 gap-6">
        {upcomingFlightList.map((item, index) => (
          <div
            key={index}
            className="w-[500px] p-6 transition-all"
          >
            <div className="bg-white rounded-xl border border-gray-200 ">
              {/* Flight Info Section */}
              <div className="p-6 space-y-4 text-gray-800">
                
                {/* Flight Type */}
                <div className="flex items-center gap-2">
                  <FaPlaneDeparture className="text-blue-500" />
                  <p><strong>Flight Type:</strong> {item.flight?.type || "N/A"}</p>
                </div>
                
                {/* Direction */}
                <div className="flex items-center gap-2">
                  <FaArrowRight className="text-green-500" />
                  <p><strong>Direction:</strong> {item.flight?.direction || "N/A"}</p>
                </div>
                
                {/* Departure Date */}
                <div className="flex items-center gap-2">
                  <FaCalendarDay className="text-orange-500" />
                  <p>
                    <strong>Departure Date:</strong>
                    {item.flight?.departure
                      ? new Date(item.flight.departure).toLocaleString()
                      : "N/A"}
                  </p>
                </div>
    
                {/* Adult and Children Section */}
                <div className="flex gap-6">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <FaUser className="text-purple-500" />
                      <p><strong>Adult:</strong> {item.flight?.adults || "N/A"}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaDollarSign className="text-yellow-500" />
                      <p><strong>Adult Price:</strong> {item.flight?.adult_price || "N/A"}</p>
                    </div>
                  </div>
    
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <FaChild className="text-teal-500" />
                      <p><strong>Children:</strong> {item.flight?.childreen || "N/A"}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaDollarSign className="text-yellow-500" />
                      <p><strong>Children Price:</strong> {item.flight?.child_price || "N/A"}</p>
                    </div>
                  </div>
                </div>
    
                {/* Class */}
                <div className="flex items-center gap-2">
                  <FaCogs className="text-indigo-500" />
                  <p><strong>Class:</strong> {item.flight?.class || "N/A"}</p>
                </div>
    
                {/* Airline */}
                <div className="flex items-center gap-2">
                  <FaPlane className="text-red-500" />
                  <p><strong>Airline:</strong> {item.flight?.airline || "N/A"}</p>
                </div>
    
                {/* Ref PNR and Ticket Number */}
                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <FaIdBadge className="text-gray-500" />
                    <p><strong>Ref PNR:</strong> {item.flight?.ref_pnr || "N/A"}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaTicketAlt className="text-blue-500" />
                    <p><strong>Ticket Number:</strong> {item.flight?.ticket_number || "N/A"}</p>
                  </div>
                </div>
    
                {/* From and To Information */}
                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-purple-600" />
                    <p><strong>From:</strong> {item.flight?.from_to[0]?.from || "N/A"}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-teal-600" />
                    <p><strong>To:</strong> {item.flight?.from_to[0]?.to || "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
    
    
    
    
    const renderTourCards = () => (
      <div className="flex flex-wrap mt-4 gap-6">
        {upcomingTourList.map((item, index) => (
          <div
            key={index}
            className="w-[500px] p-6 transition-transform duration-300 transform hover:scale-105"
          >
            <div className="bg-white shadow-lg rounded-xl overflow-y-auto border border-gray-200 hover:shadow-xl h-[450px]">
              {/* Header Section */}
              <div className="bg-mainColor text-white p-6 rounded-t-lg flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-semibold">{item.tour_name}</h3>
                  <p className="text-lg">{item.tour_type}</p>
                </div>
              </div>
    
              {/* Tour Info Section */}
              <div className="p-6 space-y-4">
                <p><strong className="text-gray-700">Price:</strong> ${item.total_price}</p>
                <p><strong className="text-gray-700">Adults No.:</strong> {item.adults_no}</p>
                <p><strong className="text-gray-700">Children No.:</strong> {item.children_no}</p>
                <p><strong className="text-gray-700">Country:</strong> {item.country}</p>
              </div>
    
              {/* Supplier Info Section */}
              <div className="border-t border-gray-200 p-6 space-y-4">
                <p><strong className="text-gray-700">Supplier Name:</strong> {item.supplier_from_name}</p>
                <div className="flex items-center">
                  <FaPhoneAlt className="text-gray-700 mr-2" />
                  <p><strong className="text-gray-700">Supplier Phone:</strong> {item.supplier_from_phone || 'N/A'}</p>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-gray-700 mr-2" />
                  <p><strong className="text-gray-700">Supplier Email:</strong> {item.supplier_from_email || 'N/A'}</p>
                </div>
              </div>
    
              {/* To Info Section */}
              <div className="border-t border-gray-200 p-6 space-y-4">
                <p><strong className="text-gray-700">To Name:</strong> {item.to_name}</p>
                <p><strong className="text-gray-700">To Role:</strong> {item.to_role}</p>
                <div className="flex items-center">
                  <FaPhoneAlt className="text-gray-700 mr-2" />
                  <p><strong className="text-gray-700">To Phone:</strong> {item.to_phone || 'N/A'}</p>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-gray-700 mr-2" />
                  <p><strong className="text-gray-700">To Email:</strong> {item.to_email || 'N/A'}</p>
                </div>
              </div>
    
              {/* Tour Buses & Hotels Section */}
              <div className="border-t border-gray-200 p-6 space-y-4">
                <div>
                  <p><strong className="text-gray-700">Tour Buses:</strong></p>
                  {item.tour_buses.map((bus, idx) => (
                    <div key={idx} className="flex items-center">
                      <FaBus className="text-gray-700 mr-2" />
                      <p>{bus.transportation}: {bus.seats} seats</p>
                    </div>
                  ))}
                </div>
                <div>
                  <p><strong className="text-gray-700">Tour Hotels:</strong></p>
                  {item.tour_hotels.map((hotel, idx) => (
                    <div key={idx} className="flex items-center">
                      <FaHotel className="text-gray-700 mr-2" />
                      <p>{hotel.hotel_name} ({hotel.room_type} room, Check-in: {hotel.check_in}, Check-out: {hotel.check_out})</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
    
    
    
    
  
    const renderVisaCards = () => (
      <div className="flex flex-wrap gap-6 mt-4">
        {upcomingVisaList.map((item, index) => (
          <div
            key={index}
            className="w-[500px] p-6 transition-transform duration-300 transform hover:scale-105"
          >
            <div className="bg-white shadow-lg rounded-xl overflow-y-auto border border-gray-200 hover:shadow-xl h-[450px]">
              {/* Header Section */}
              <div className="bg-mainColor text-white p-6 rounded-t-lg flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-semibold">{item.visa_name}</h3>
                </div>
              </div>
    
              {/* Visa Info Section */}
              <div className="p-6 space-y-4">
                <p><strong className="text-gray-700">Appointment Date:</strong> {item.appointment}</p>
                <p><strong className="text-gray-700">Travel Date:</strong> {item.travel_date}</p>
                <p><strong className="text-gray-700">Price:</strong> ${item.total_price}</p>
                <p><strong className="text-gray-700">Country:</strong> {item.country}</p>
                <p><strong className="text-gray-700">Country Name:</strong> {item.country_name}</p>
                <p><strong className="text-gray-700">Adults No.:</strong> {item.no_adults}</p>
                <p><strong className="text-gray-700">Children No.:</strong> {item.no_children}</p>
                <p><strong className="text-gray-700">Notes:</strong> {item.notes}</p>
              </div>
    
              {/* Supplier Info Section */}
              <div className="border-t border-gray-200 p-6 space-y-4">
                <p><strong className="text-gray-700">Supplier From:</strong> {item.supplier_from_name}</p>
                <div className="flex items-center">
                  <FaPhoneAlt className="text-gray-700 mr-2" />
                  <p><strong className="text-gray-700">Supplier From Phone:</strong> {item.supplier_from_phone || 'N/A'}</p>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-gray-700 mr-2" />
                  <p><strong className="text-gray-700">Supplier From Email:</strong> {item.supplier_from_email || 'N/A'}</p>
                </div>
              </div>
    
              {/* To Info Section */}
              <div className="border-t border-gray-200 p-6 space-y-4">
                <p><strong className="text-gray-700">Supplier To:</strong> {item.to_name}</p>
                <p><strong className="text-gray-700">Supplier To Role:</strong> {item.to_role}</p>
                <div className="flex items-center">
                  <FaPhoneAlt className="text-gray-700 mr-2" />
                  <p><strong className="text-gray-700">Supplier To Phone:</strong> {item.to_phone || 'N/A'}</p>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-gray-700 mr-2" />
                  <p><strong className="text-gray-700">Supplier To Email:</strong> {item.to_email || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
    
    const renderHotelCards = () => (
      <div className="flex flex-wrap gap-6 mt-4">
        {upcomingHotelList.map((item, index) => (
          <div
            key={index}
            className="w-[500px] p-6 transition-transform duration-300 transform hover:scale-105"
          >
            <div className="bg-white border border-gray-200 shadow-lg rounded-xl overflow-y-auto hover:shadow-xl h-[450px]">
              {/* Header Section */}
              <div className="bg-mainColor text-white p-6 rounded-t-lg">
                <h3 className="text-2xl font-semibold">{item.hotel_name}</h3>
              </div>
    
              {/* Hotel Info Section */}
              <div className="p-6 space-y-4">
                <p><strong className="text-gray-700">Check-in Date:</strong> {item.check_in}</p>
                <p><strong className="text-gray-700">Check-out Date:</strong> {item.check_out}</p>
                <p><strong className="text-gray-700">Price:</strong> ${item.total_price}</p>
                <p><strong className="text-gray-700">Country:</strong> {item.country}</p>
                <p><strong className="text-gray-700">Room Type:</strong> {item.room_type}</p>
                <p><strong className="text-gray-700">Adults No.:</strong> {item.no_adults}</p>
                <p><strong className="text-gray-700">Children No.:</strong> {item.no_children}</p>
                <p><strong className="text-gray-700">Nights No.:</strong> {item.no_nights}</p>
              </div>
    
              {/* Supplier Info Section */}
              <div className="border-t border-gray-200 p-6 space-y-4">
                <p><strong className="text-gray-700">Supplier From:</strong> {item.supplier_from_name}</p>
                <div className="flex items-center">
                  <FaPhoneAlt className="text-gray-700 mr-2" />
                  <p><strong className="text-gray-700">Supplier From Phone:</strong> {item.supplier_from_phone || 'N/A'}</p>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-gray-700 mr-2" />
                  <p><strong className="text-gray-700">Supplier From Email:</strong> {item.supplier_from_email || 'N/A'}</p>
                </div>
              </div>
    
              {/* To Info Section */}
              <div className="border-t border-gray-200 p-6 space-y-4">
                <p><strong className="text-gray-700">Supplier To:</strong> {item.to_name}</p>
                <p><strong className="text-gray-700">Supplier To Role:</strong> {item.to_role}</p>
                <div className="flex items-center">
                  <FaPhoneAlt className="text-gray-700 mr-2" />
                  <p><strong className="text-gray-700">Supplier To Phone:</strong> {item.to_phone || 'N/A'}</p>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-gray-700 mr-2" />
                  <p><strong className="text-gray-700">Supplier To Email:</strong> {item.to_email || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
    
    
    
  
    const renderActiveTabContent = () => {
      switch (activeTab) {
        case 'Bus':
          return renderBusCards();
        case 'Flight':
          return renderFlightCards();
        case 'Tour':
          return renderTourCards();
        case 'Visa':
          return renderVisaCards();
        case 'Hotel':
          return renderHotelCards();
        default:
          return null;
      }
    };
  
  

  return (
    <>
  
    <div className="w-full mt-5 flex flex-col items-start justify-start overflow-x-scroll scrollSection">

      {loadingUpcoming ? (
        <div className="w-full h-56 flex justify-center items-center">
          <StaticLoader />
        </div>
      ) : (  <div>
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
};

export default UpcomingBookingPage;
