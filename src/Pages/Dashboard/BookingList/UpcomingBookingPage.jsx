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
  const [activeTab, setActiveTab] = useState("Flight");

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

  const headers = ['SL', 'Client Name','Client Phone','Client Email','Agent', 'Check In', 'Check Out', 'Total Price'];
  const headersFlight = ['SL','Code','Client Name','Client Phone','Agent','Flight Type','Direction', 'Check In', 'Check Out', 'Total Price'];

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
                    {flight?.to_client?.name|| '-'}
                  </td>
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {flight?.to_client?.emails[0] ||flight?.to_client?.emails || '-'}
                  </td>
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {flight?.to_client?.phones[0] || flight?.to_client?.phones|| '-'}
                  </td>
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {flight?.to_client?.agent || '-'}
                  </td>
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {flight?.flight?.type || '-'}
                  </td>
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {flight?.flight?.direction || '-'}
                  </td>
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {flight.start_date? flight.start_date.split(" ")[0] : '-'}
                  </td>
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {flight.end_date? flight.end_date.split(" ")[0] : '-'}
                  </td>
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {flight?.price || '-'}
                  </td>
                </tr>
              ))

            )}
          </tbody>
        </table>
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
