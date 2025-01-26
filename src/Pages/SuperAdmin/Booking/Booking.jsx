import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useGet } from '../../../Hooks/useGet';
import StaticLoader from '../../../Components/StaticLoader';
const Booking = () => {
  const { refetch: refetchBooking, loading: loadingBooking, data: DataBooking } = useGet({ url: 'https://www.travelta.online/api/super/bookings' });

  const [dataBooking, setDataBooking] = useState([]);
  const [dataBus, setDataBus] = useState([]);
  const [dataFlight, setDataFlight] = useState([]);
  const [dataTour, setDataTour] = useState([]);
  const [dataVisa, setDataVisa] = useState([]);
  const [dataHotel, setDataHotel] = useState([]);
  const [activeTab, setActiveTab] = useState('bus'); // Initial active tab is 'bus'

  useEffect(() => {
    refetchBooking();
  }, [refetchBooking]);

  useEffect(() => {
    if (DataBooking) {
      setDataBooking(DataBooking);
      setDataBus(DataBooking.bus);
      setDataHotel(DataBooking.hotel);
      setDataFlight(DataBooking.flight);
      setDataTour(DataBooking.tour);
      setDataVisa(DataBooking.visa);
    }
  }, [DataBooking]);

  const navigate = useNavigate();

  const handleUpdate = (bookId) => {
    navigate(`/super_admin/booking/update/${bookId}`);
  };

  const handleDelete = (id, destination) => {
    if (window.confirm(`Are you sure you want to delete the booking for ${destination}?`)) {
      setDataBooking(dataBooking.filter((booking) => booking.id !== id));
    }
  };

  const renderBusCards = () => (
    <div className="flex flex-wrap flex-col lg:flex-row mt-4">
      {dataBus.map((item, index) => (
        <div
          key={index}
          className="bg-blue-100 shadow-lg rounded-lg overflow-hidden transform  transition-transform duration-300"
        >
          <div className="bg-mainColor text-white p-4">
            <h3 className="text-xl font-semibold">{item.bus_name}</h3>
            <p>{item.country}</p>
          </div>
          <div className="p-4">
            <p><strong>Departure:</strong> {item.depature}</p>
            <p><strong>Bus No.:</strong> {item.bus_no}</p>
            <p><strong>From:</strong> {item.from}</p>
            <p><strong>To:</strong> {item.to}</p>
            <p><strong>Arrival:</strong> {item.arrival}</p>
            <p><strong>Price:</strong> ${item.total_price}</p>
          </div>
          <div className="border border-t-2 p-4">
            <p><strong>Supplier Name:</strong> {item.supplier_from_name}</p>
            <p><strong>Supplier Phone:</strong> {item.supplier_from_phone || 'N/A'}</p>
            <p><strong>Supplier Email:</strong> {item.supplier_from_email || 'N/A'}</p>
            <p><strong>Driver Phone:</strong> {item.driver_phone}</p>
            <p><strong>To Name:</strong> {item.to_name}</p>
            <p><strong>To Phone:</strong> {item.to_phone}</p>
            <p><strong>To Role:</strong> {item.to_role}</p>
          </div>
          
          {/* <div className="flex justify-between items-center p-4 bg-gray-200">
            <button
              onClick={() => handleUpdate(item.id)}
              className="text-blue-500 hover:text-blue-700"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => handleDelete(item.id, item.supplier_from_name)}
              className="text-red-500 hover:text-red-700"
            >
              <FaTrash />
            </button>
          </div> */}
        </div>
      ))}
    </div>
  );
  
  
  const renderFlightCards = () => (
    <div className="flex flex-col flex-wrap lg:flex-row gap-6 mt-4">
      {dataFlight.map((item, index) => (
        <div
          key={index}
          className="bg-blue-100 shadow-lg rounded-lg overflow-hidden transform  transition-transform duration-200"
        >
          <div className="bg-mainColor text-white p-4">
            <h3 className="text-xl font-semibold">{item.supplier_from_name}</h3>
            <p>{item.depature}</p>
          </div>
          <div className="p-4">
            <p><strong>Arrival:</strong> {item.arrival || 'N/A'}</p>
            <p><strong>Flight No.:</strong> {item.ticket_no}</p>
            <p><strong>Flight Class:</strong> {item.flight_class}</p>
            <p><strong>Flight Direction:</strong> {item.flight_direction}</p>
            <p><strong>Flight Type:</strong> {item.flight_type}</p>
            <p><strong>From:</strong> {item.from_to[0]?.from || 'N/A'}</p>
            <p><strong>To:</strong> {item.from_to[0]?.to || 'N/A'}</p>
            <p><strong>Price:</strong> ${item.total_price}</p>
          </div>
          <div className="border border-t-2 p-4">
            <p><strong>Supplier Name:</strong> {item.supplier_from_name}</p>
            <p><strong>Supplier Phone:</strong> {item.supplier_from_phone || 'N/A'}</p>
            <p><strong>Supplier Email:</strong> {item.supplier_from_email || 'N/A'}</p>
            <p><strong>Adults No.:</strong> {item.adults_no}</p>
            <p><strong>Children No.:</strong> {item.children_no}</p>
            <p><strong>Infants No.:</strong> {item.infants_no}</p>
            <p><strong>Ref PNR:</strong> {item.ref_pnr}</p>
          </div>
          <div className="border border-t-2 p-4">
            <p><strong>To Name:</strong> {item.to_name}</p>
            <p><strong>To Phone:</strong> {item.to_phone}</p>
            <p><strong>To Role:</strong> {item.to_role}</p>
            <p><strong>To Email:</strong> {item.to_email || 'N/A'}</p>
          </div>
          {/* <div className="flex justify-between items-center p-4 bg-gray-200">
            <button
              onClick={() => handleUpdate(item.id)}
              className="text-blue-500 hover:text-blue-700"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => handleDelete(item.id, item.supplier_from_name)}
              className="text-red-500 hover:text-red-700"
            >
              <FaTrash />
            </button>
          </div> */}
        </div>
      ))}
    </div>
  );
  
  
  
  

  const renderTourCards = () => (
    <div className="flex flex-col flex-wrap lg:flex-row gap-6 mt-4">
      {dataTour.map((item, index) => (
        <div
          key={index}
          className="bg-blue-100 shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300"
        >
          <div className="bg-mainColor text-white p-4">
            <h3 className="text-xl font-semibold">{item.tour_name}</h3>
            <p>{item.tour_type}</p>
          </div>
          <div className="p-4">
            <p><strong>Price:</strong> ${item.total_price}</p>
            <p><strong>Adults No.:</strong> {item.adults_no}</p>
            <p><strong>Children No.:</strong> {item.children_no}</p>
            <p><strong>Country:</strong> {item.country}</p>
          </div>
          <div className="border border-t-2 p-4">
            <p><strong>Supplier Name:</strong> {item.supplier_from_name}</p>
            <p><strong>Supplier Email:</strong> {item.supplier_from_email || 'N/A'}</p>
            <p><strong>Supplier Phone:</strong> {item.supplier_from_phone || 'N/A'}</p>
            <p><strong>To Name:</strong> {item.to_name}</p>
            <p><strong>To Email:</strong> {item.to_email || 'N/A'}</p>
            <p><strong>To Phone:</strong> {item.to_phone || 'N/A'}</p>
            <p><strong>To Role:</strong> {item.to_role}</p>
          </div>
          <div className="border border-t-2 p-4">
            <p><strong>Tour Buses:</strong></p>
            {item.tour_buses.map((bus, idx) => (
              <div key={idx}>
                {bus.transportation}: {bus.seats} seats
              </div>
            ))}
            <p><strong>Tour Hotels:</strong></p>
            {item.tour_hotels.map((hotel, idx) => (
              <div key={idx}>
                {hotel.hotel_name} ({hotel.room_type} room, Check-in: {hotel.check_in}, Check-out: {hotel.check_out})
              </div>
            ))}
          </div>
          {/* <div className="flex justify-between items-center p-4 bg-gray-200">
            <button onClick={() => handleUpdate(item.id)} className="text-blue-500 hover:text-blue-700">
              <FaEdit />
            </button>
            <button onClick={() => handleDelete(item.id, item.supplier_from_name)} className="text-red-500 hover:text-red-700">
              <FaTrash />
            </button>
          </div> */}
        </div>
      ))}
    </div>
  );
  
  
  const renderVisaCards = () => (
    <div className="flex flex-col flex-wrap lg:flex-row gap-6 mt-4">
      {dataVisa.map((item, index) => (
        <div
          key={index}
          className="bg-blue-100 shadow-lg rounded-lg overflow-hidden transform  transition-transform duration-300"
        >
            <div className="bg-mainColor text-white p-4">
            <h3 className="text-xl font-semibold">{item.visa_name}</h3>
            
          </div>
          <div className="p-4">
            <p><strong>Appointment Date:</strong> {item.appointment}</p>
            <p><strong>Travel Date:</strong> {item.travel_date}</p>
            <p><strong>Price:</strong> ${item.total_price}</p>
            <p><strong>Country:</strong> {item.country}</p>
            <p><strong>Country Name:</strong> {item.country_name}</p>
            <p><strong>Adults No.:</strong> {item.no_adults}</p>
            <p><strong>Children No.:</strong> {item.no_children}</p>
            <p><strong>Notes:</strong> {item.notes}</p>
          </div>
          <div className="border border-t-2 p-4">
            <p><strong>Supplier From:</strong> {item.supplier_from_name}</p>
            <p><strong>Supplier From Email:</strong> {item.supplier_from_email || 'N/A'}</p>
            <p><strong>Supplier From Phone:</strong> {item.supplier_from_phone || 'N/A'}</p>
            <p><strong>Supplier To:</strong> {item.to_name}</p>
            <p><strong>Supplier To Email:</strong> {item.to_email || 'N/A'}</p>
            <p><strong>Supplier To Phone:</strong> {item.to_phone || 'N/A'}</p>
            <p><strong>Supplier To Role:</strong> {item.to_role}</p>
          </div>
          {/* <div className="flex justify-between items-center p-4 bg-gray-200">
            <button onClick={() => handleUpdate(item.id)} className="text-blue-500 hover:text-blue-700">
              <FaEdit />
            </button>
            <button onClick={() => handleDelete(item.id, item.supplier_from_name)} className="text-red-500 hover:text-red-700">
              <FaTrash />
            </button>
          </div> */}
        </div>
      ))}
    </div>
  );
  
  const renderHotelCards = () => (
    <div className="flex flex-col flex-wrap lg:flex-row gap-6 mt-4">
      {dataHotel.map((item, index) => (
        <div
          key={index}
          className="bg-blue-100 border shadow-lg rounded-lg  transform transition-transform duration-300"
        >
          <div className="bg-mainColor text-white p-4">
            <h3 className="text-xl font-semibold">{item.hotel_name}</h3>
          </div>
          <div className="p-4">
            
            <p><strong>Check-in Date:</strong> {item.check_in}</p>
            <p><strong>Check-out Date:</strong> {item.check_out}</p>
            <p><strong>Price:</strong> ${item.total_price}</p>
            <p><strong>Country:</strong> {item.country}</p>
            <p><strong>Room Type:</strong> {item.room_type}</p>
            <p><strong>Adults No.:</strong> {item.no_adults}</p>
            <p><strong>Children No.:</strong> {item.no_children}</p>
            <p><strong>Nights No.:</strong> {item.no_nights}</p>
          </div>
          <div className="border border-t-2 p-4">
            <p><strong>Supplier From:</strong> {item.supplier_from_name}</p>
            <p><strong>Supplier From Email:</strong> {item.supplier_from_email || 'N/A'}</p>
            <p><strong>Supplier From Phone:</strong> {item.supplier_from_phone || 'N/A'}</p>
            <p><strong>Supplier To:</strong> {item.to_name}</p>
            <p><strong>Supplier To Email:</strong> {item.to_email || 'N/A'}</p>
            <p><strong>Supplier To Phone:</strong> {item.to_phone || 'N/A'}</p>
            <p><strong>Supplier To Role:</strong> {item.to_role}</p>
          </div>
          {/* <div className="flex justify-between items-center p-4 bg-gray-200">
            <button onClick={() => handleUpdate(item.id)} className="text-blue-500 hover:text-blue-700">
              <FaEdit />
            </button>
            <button onClick={() => handleDelete(item.id, item.supplier_from_name)} className="text-red-500 hover:text-red-700">
              <FaTrash />
            </button>
          </div> */}
        </div>
      ))}
    </div>
  );
  

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'bus':
        return renderBusCards();
      case 'flight':
        return renderFlightCards();
      case 'tour':
        return renderTourCards();
      case 'visa':
        return renderVisaCards();
      case 'hotel':
        return renderHotelCards();
      default:
        return null;
    }
  };

  return (
    <div className="w-full overflow-x-scroll scrollSection">
    {loadingBooking?  (
        <div className="w-full h-56 flex justify-center items-center">
            <StaticLoader />
        </div>
):
  (  <div>
      <div className="flex space-x-4">
        <button
          onClick={() => setActiveTab('bus')}
          className={`py-2 px-4 rounded ${activeTab === 'bus' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Bus
        </button>
        <button
          onClick={() => setActiveTab('flight')}
          className={`py-2 px-4 rounded ${activeTab === 'flight' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Flight
        </button>
        <button
          onClick={() => setActiveTab('tour')}
          className={`py-2 px-4 rounded ${activeTab === 'tour' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Tour
        </button>
        <button
          onClick={() => setActiveTab('visa')}
          className={`py-2 px-4 rounded ${activeTab === 'visa' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Visa
        </button>
        <button
          onClick={() => setActiveTab('hotel')}
          className={`py-2 px-4 rounded ${activeTab === 'hotel' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Hotel
        </button>
      </div>

     <div className="overflow-x-auto mt-5">
     {renderActiveTabContent()}
     </div>
    </div>)}
    </div>
  );
};

export default Booking;
