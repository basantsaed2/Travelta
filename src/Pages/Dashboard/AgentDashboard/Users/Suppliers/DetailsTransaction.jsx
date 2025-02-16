import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaBarcode, FaBed, FaBriefcase, FaCalendarCheck, FaCode, FaCreditCard, FaDirections, FaEnvelope, FaFlag, FaHotel, FaListOl, FaMoneyBill, FaMoon, FaPhone, FaRoute, FaShapes, FaTrafficLight, FaUserCircle } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { useGet } from '../../../../../Hooks/useGet';
import { FaCalendarAlt, FaGlobe, FaUser, FaUserFriends, FaInfoCircle, FaCheckCircle, FaTimesCircle, FaMoneyCheckAlt } from "react-icons/fa";
import { FaBus, FaMapMarkerAlt, FaPlaneDeparture,  FaTicketAlt } from "react-icons/fa";
import { FaDollarSign, FaUserTie } from 'react-icons/fa6';
const DetailsTransaction = () => {
    const { id } = useParams();
    const navigate = useNavigate();

      const { refetch: refetchDetails, loading: loadingDetails, data: DetailsData } = useGet({
        url: `https://travelta.online/agent/supplier/transaction_details/${id}`,
      });
      const [data,setData]= useState(null)

      useEffect(() => {
        refetchDetails()
      }, [refetchDetails])
    
      useEffect(() => {
        if(DetailsData){
            setData(DetailsData)
        }
        console.log("data",DetailsData)
      }, [DetailsData])

      const InfoCard = ({ icon, title, content, className = "" }) => {
        return (
          <div className={`flex items-center bg-white p-4 rounded-xl shadow border border-gray-200 hover:shadow-lg transition duration-300 ${className}`}>
            <div className="text-blue-500 text-3xl mr-3">{icon}</div>
            <div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-gray-600">{content}</p>
            </div>
          </div>
        );
      };
      

    return (
        <div className="p-6">



{DetailsData?.visa && (
  <div className="p-6 rounded-lg bg-white shadow-md border border-gray-200">
    <h3 className="text-xl font-bold text-blue-800 flex items-center gap-2">
      <FaInfoCircle className="text-blue-600" /> Visa Appointment Details
    </h3>
    
    <div className="grid grid-cols-2 gap-4 mt-4 text-gray-700">
      <p className="flex items-center gap-2">
        <FaCalendarAlt className="text-red-500" /> 
        <span className="font-semibold">Appointment Date:</span> {DetailsData?.visa?.appointment || "N/A"}
      </p>
      <p className="flex items-center gap-2">
        <FaGlobe className="text-green-500" /> 
        <span className="font-semibold">Country:</span> {DetailsData?.visa?.country_name || "N/A"}
      </p>
      <p className="flex items-center gap-2">
        <FaUser className="text-blue-500" /> 
        <span className="font-semibold">Adults:</span> {DetailsData?.visa?.no_adults || "N/A"}
      </p>
      <p className="flex items-center gap-2">
        <FaUserFriends className="text-purple-500" /> 
        <span className="font-semibold">Children:</span> {DetailsData?.visa?.no_children || "N/A"}
      </p>
      <p><span className="font-semibold">Created At:</span> {DetailsData?.visa?.created_at || "N/A"}</p>
      <p><span className="font-semibold">Visa Code:</span> {DetailsData?.visa?.code || "N/A"}</p>
      <p><span className="font-semibold">Special Request:</span> {DetailsData?.visa?.special_request || "N/A"}</p>
      
      {/* Status Badges */}
      <p className="flex items-center gap-2">
        <span className="font-semibold">Visa Status:</span>
        {DetailsData?.visa?.status === "Approved" ? (
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
            <FaCheckCircle /> Approved
          </span>
        ) : (
          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
            <FaTimesCircle /> {DetailsData?.visa?.status || "Pending"}
          </span>
        )}
      </p>
      <p className="flex items-center gap-2">
        <FaMoneyCheckAlt className="text-yellow-500" />
        <span className="font-semibold">Payment Status:</span>
        <span className={`px-3 py-1 rounded-full text-sm ${DetailsData?.visa?.payment_status === "Paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
          {DetailsData?.visa?.payment_status || "Pending"}
        </span>
      </p>
    </div>

    {/* Supplier Details */}
    <div className="mt-6 p-4 bg-gray-100 rounded-lg border border-gray-200">
      <h4 className="text-lg font-semibold text-blue-800">Supplier Details</h4>
      <div className="grid grid-cols-2 gap-4 mt-2">
        <p><span className="font-semibold">Name:</span> {DetailsData?.visa?.supplier_from_name || "N/A"}</p>
        <p><span className="font-semibold">Email:</span> {DetailsData?.visa?.supplier_from_email || "N/A"}</p>
        <p><span className="font-semibold">Phone:</span> {DetailsData?.visa?.supplier_from_phone || "N/A"}</p>
      </div>
    </div>
  </div>
)}


{DetailsData?.flight && (
      <>
        <h1 className="w-full font-bold text-3xl text-center p-6 bg-gradient-to-r from-mainColor to-blue-500 text-white rounded-lg shadow-md">
      Flight Details
    </h1>
        <div className="grid grid-cols-2 mt-7 md:grid-cols-3 xl:grid-cols-4 gap-6">
          <InfoCard icon={<FaPlaneDeparture />} title="Flight Name" content={DetailsData.flight.airline} />
          <InfoCard icon={<FaMapMarkerAlt />} title="Route" content={`${DetailsData.flight.from_to[0].from} → ${DetailsData.flight.from_to[0].to}`} />
          <InfoCard icon={<FaCalendarAlt />} title="Departure" content={DetailsData.flight.depature} />
          <InfoCard icon={<FaCalendarAlt />} title="Arrival" content={DetailsData.flight.arrival || "N/A"} />
          <InfoCard icon={<FaUser />} title="Passengers" content={`Adults: ${DetailsData.flight.adults_no}, Children: ${DetailsData.flight.children_no}, Infants: ${DetailsData.flight.infants_no}`} />
          <InfoCard icon={<FaTicketAlt />} title="Ticket Price" content={`Total: $${DetailsData.flight.total_price}`} />
          <InfoCard icon={<FaTicketAlt />} title="Payment Status" content={DetailsData.flight.payment_status} />
          {/* <InfoCard icon={<FaUser />} title="Supplier" content={`${DetailsData.flight.supplier_from_name} (${DetailsData.flight.supplier_from_email})`} /> */}
          <InfoCard icon={<FaUser />} title="Supplier" content={`Name: ${DetailsData.flight.supplier_from_name}, Email: ${DetailsData.flight.supplier_from_email}, Phone: ${DetailsData.flight.supplier_from_phone}`} />
          <InfoCard icon={<FaCode />} title="Code" content={`${DetailsData.flight.code}`} />
          <InfoCard icon={<FaDollarSign />} title="Price" content={`${DetailsData.flight.total_price}`} />
          <InfoCard icon={<FaTrafficLight />} title="Flight" content={`Class: ${DetailsData.flight.flight_class}, Direction: ${DetailsData.flight.flight_direction}, Type: ${DetailsData.flight.flight_type}`} />
          <InfoCard icon={<FaDirections />} title="Direction" content={`From: ${DetailsData.flight.from_to[0].from}, To: ${DetailsData.flight.from_to[0].to}`} />
        </div>
      </>
)}

{DetailsData?.hotel && (
  <>
    <h1 className="w-full font-bold text-3xl text-center p-6 bg-gradient-to-r from-mainColor to-blue-500 text-white rounded-lg shadow-md">
      Hotel Details
    </h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      
      {/* Hotel Name */}
      <div className="flex flex-col items-center bg-white p-4 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
        <FaHotel className="text-blue-500 text-4xl mb-3" />
        <h3 className="text-lg font-semibold">Hotel Name</h3>
        <p className="text-gray-600 text-center">{DetailsData?.hotel.hotel_name || "N/A"}</p>
      </div>

      {/* Guests */}
      <div className="flex flex-col items-center bg-white p-4 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
        <FaUser className="text-blue-500 text-4xl mb-3" />
        <h3 className="text-lg font-semibold">Guests</h3>
        <p className="text-gray-600">Adults: {DetailsData?.hotel.no_adults || "N/A"}, Children: {DetailsData?.hotel.no_children || "N/A"}</p>
      </div>

      {/* Room Type */}
      <div className="flex flex-col items-center bg-white p-4 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
        <FaBed className="text-blue-500 text-4xl mb-3" />
        <h3 className="text-lg font-semibold">Room Type</h3>
        <p className="text-gray-600">{DetailsData?.hotel.room_type || "N/A"}</p>
      </div>

      {/* Room Quantity */}
      <div className="flex flex-col items-center bg-white p-4 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
        <FaListOl className="text-blue-500 text-4xl mb-3" />
        <h3 className="text-lg font-semibold">Room Quantity</h3>
        <p className="text-gray-600">{DetailsData?.hotel.room_quantity || "N/A"}</p>
      </div>

      {/* Nights */}
      <div className="flex flex-col items-center bg-white p-4 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
        <FaMoon className="text-blue-500 text-4xl mb-3" />
        <h3 className="text-lg font-semibold">Nights</h3>
        <p className="text-gray-600">{DetailsData?.hotel.no_nights || "N/A"}</p>
      </div>

      {/* Check-in Date */}
      <div className="flex flex-col items-center bg-white p-4 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
        <FaCalendarAlt className="text-blue-500 text-4xl mb-3" />
        <h3 className="text-lg font-semibold">Check-in Date</h3>
        <p className="text-gray-600">{DetailsData?.hotel.check_in || "N/A"}</p>
      </div>

      {/* Check-out Date */}
      <div className="flex flex-col items-center bg-white p-4 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
        <FaCalendarCheck className="text-blue-500 text-4xl mb-3" />
        <h3 className="text-lg font-semibold">Check-out Date</h3>
        <p className="text-gray-600">{DetailsData?.hotel.check_out || "N/A"}</p>
      </div>

      {/* Payment Status */}
      <div className="flex flex-col items-center bg-white p-4 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
        <FaMoneyCheckAlt className="text-blue-500 text-4xl mb-3" />
        <h3 className="text-lg font-semibold">Payment Status</h3>
        <p className={`px-3 py-1 rounded-full text-sm ${DetailsData?.hotel.payment_status === "full" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
          {DetailsData?.hotel.payment_status || "Pending"}
        </p>
      </div>

   {/* Total Price Date */}
   <div className="flex flex-col items-center bg-white p-4 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
        <FaDollarSign className="text-blue-500 text-4xl mb-3" />
        <h3 className="text-lg font-semibold">Total Price</h3>
        <p className="text-gray-600">{DetailsData?.hotel.total_price|| "N/A"}</p>
      </div>

      <div className="flex flex-col items-center bg-white p-4 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
        <FaUserTie className="text-blue-500 text-4xl mb-3" />
        <h3 className="text-lg font-semibold">Supplier Name</h3>
        <p className="text-gray-600">{DetailsData?.hotel.supplier_from_name|| "N/A"}</p>
      </div>
      <div className="flex flex-col items-center bg-white p-4 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
        <FaEnvelope className="text-blue-500 text-4xl mb-3" />
        <h3 className="text-lg font-semibold">Supplier Email</h3>
        <p className="text-gray-600">{DetailsData?.hotel.supplier_from_email|| "N/A"}</p>
      </div>
      <div className="flex flex-col items-center bg-white p-4 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
        <FaPhone className="text-blue-500 text-4xl mb-3" />
        <h3 className="text-lg font-semibold">Supplier Phone</h3>
        <p className="text-gray-600">{DetailsData?.hotel.supplier_from_phone|| "N/A"}</p>
      </div>
      <div className="flex flex-col items-center bg-white p-4 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
        <FaInfoCircle className="text-blue-500 text-4xl mb-3" />
        <h3 className="text-lg font-semibold">Status</h3>
        <p className="text-gray-600">{DetailsData?.hotel.status|| "N/A"}</p>
      </div>

      <div className="flex flex-col items-center bg-white p-4 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
        <FaCode className="text-blue-500 text-4xl mb-3" />
        <h3 className="text-lg font-semibold">Booking Code</h3>
        <p className="text-gray-600">{DetailsData?.hotel.code|| "N/A"}</p>
      </div>

    </div>
  </>
)}



  {DetailsData?.bus && (
      <>
        <h1 className="w-full font-semibold text-2xl text-center p-4 bg-gradient-to-r from-blue-500 to-mainColor text-white rounded-lg shadow-md">
      Bus Details
    </h1>
        <div className="grid grid-cols-2 mt-7 md:grid-cols-3 xl:grid-cols-4 gap-6">
          <InfoCard icon={<FaBus />} title="Bus Name" content={DetailsData.bus.bus_name} />
          <InfoCard icon={<FaBarcode />} title="Bus Number" content={DetailsData.bus.bus_no} />
          <InfoCard icon={<FaMapMarkerAlt />} title="Route" content={`${DetailsData.bus.from} → ${DetailsData.bus.to}`} />
          <InfoCard icon={<FaCalendarAlt />} title="Departure" content={DetailsData.bus.depature} />
          <InfoCard icon={<FaCalendarAlt />} title="Arrival" content={DetailsData.bus.arrival} />
          <InfoCard icon={<FaUser />} title="Passengers" content={`Adults: ${DetailsData.bus.no_adults}, Children: ${DetailsData.bus.no_children}`} />
          <InfoCard icon={<FaDollarSign />} title="Total Price" content={`$${DetailsData.bus.total_price}`} />
          <InfoCard icon={<FaPhone />} title="Driver Contact" content={DetailsData.bus.driver_phone} />
          <InfoCard icon={<FaBarcode />} title="Code" content={DetailsData.bus.code} />
          <InfoCard icon={<FaUser />} title="Supplier Name" content={DetailsData.bus.supplier_from_name} />
          <InfoCard icon={<FaPhone />} title="Supplier Contact" content={DetailsData.bus.supplier_from_phone} />
          <InfoCard icon={<FaUser />} title="Customer Name" content={DetailsData.bus.to_name} />
          <InfoCard icon={<FaPhone />} title="Customer Contact" content={DetailsData.bus.to_phone} />
          <InfoCard icon={<FaUser />} title="Customer Role" content={DetailsData.bus.to_role} />
          <InfoCard icon={<FaCalendarAlt />} title="Booking Status" content={DetailsData.bus.status} />
        </div>
      </>
    )}

 {DetailsData?.tour && (
  <>
    <h1 className="w-full font-semibold text-2xl text-center p-4 bg-gradient-to-r from-blue-500 to-mainColor text-white rounded-lg shadow-md">
      Tour Details
    </h1>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      
      {/* Tour Details */}
      <InfoCard icon={<FaRoute />} title="Tour Name" content={DetailsData?.tour.tour_name || "N/A"} />
      <InfoCard icon={<FaShapes />} title="Tour Type" content={DetailsData?.tour.tour_type || "N/A"} />
      <InfoCard icon={<FaFlag />} title="Country" content={DetailsData?.tour.country || "N/A"} />
      <InfoCard icon={<FaUser />} title="Passengers" content={`Adults: ${DetailsData?.tour.adults_no || "0"}, Children: ${DetailsData?.tour.children_no || "0"}`} />
      <InfoCard icon={<FaMoneyBill />} title="Total Price" content={`$${DetailsData?.tour.total_price || "0.00"}`} />
      <InfoCard icon={<FaCode />} title="Booking Code" content={DetailsData?.tour.code || "N/A"} />
      <InfoCard icon={<FaInfoCircle />} title="Status" content={DetailsData?.tour.status || "Pending"} className="bg-red-100 text-red-700" />
      <InfoCard icon={<FaCreditCard />} title="Payment Status" 
        content={DetailsData?.tour.payment_status || "Pending"}
        className={DetailsData?.tour.payment_status === "full" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}
      />

      {/* Supplier Details */}
      <InfoCard icon={<FaEnvelope />} title="Supplier Email" content={DetailsData?.tour.supplier_from_email || "N/A"} />
      <InfoCard icon={<FaPhone />} title="Supplier Phone" content={DetailsData?.tour.supplier_from_phone || "N/A"} />
      <div className="flex flex-col items-center bg-white p-4 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
        <FaUserTie className="text-blue-500 text-4xl mb-3" />
        <h3 className="text-lg font-semibold">Supplier Name</h3>
        <p className="text-gray-600">{DetailsData?.tour.supplier_from_name || "N/A"}</p>
      </div>

      {/* To Details */}
      <InfoCard icon={<FaUserCircle />} title="To Name" content={DetailsData?.tour.to_name || "N/A"} />
      <InfoCard icon={<FaEnvelope />} title="To Email" content={DetailsData?.tour.to_email || "N/A"} />
      <InfoCard icon={<FaPhone />} title="To Phone" content={DetailsData?.tour.to_phone || "N/A"} />
      <InfoCard icon={<FaBriefcase />} title="To Role" content={DetailsData?.tour.to_role || "N/A"} />
    </div>

    {/* Tour Buses */}
    {DetailsData?.tour.tour_buses?.length > 0 && (
      <div className="mt-6">
        <h2 className="text-xl font-semibold p-4 bg-gray-100 rounded-lg shadow-md">Tour Buses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {DetailsData?.tour.tour_buses.map((bus, index) => (
            <div key={index} className="flex items-center bg-white p-4 rounded-xl shadow">
              <FaBus className="text-mainColor text-3xl mr-3" />
              <div>
                <h3 className="text-lg font-semibold">{bus.transportation}</h3>
                <p className="text-gray-600">Seats: {bus.seats}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Tour Hotels */}
    {DetailsData?.tour.tour_hotels?.length > 0 && (
      <div className="mt-6">
        <h2 className="text-xl font-semibold p-4 bg-gray-100 rounded-lg shadow-md">Tour Hotels</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {DetailsData?.tour.tour_hotels.map((hotel, index) => (
            <div key={index} className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
              <h3 className="text-lg font-semibold mb-2">{hotel.hotel_name}</h3>
              <p className="text-gray-600"><strong>Destination:</strong> {hotel.destination}</p>
              <p className="text-gray-600"><strong>Room Type:</strong> {hotel.room_type}</p>
              <p className="text-gray-600"><strong>Check-in:</strong> {hotel.check_in}</p>
              <p className="text-gray-600"><strong>Check-out:</strong> {hotel.check_out}</p>
            </div>
          ))}
        </div>
      </div>
    )}
  </>
)}

            {/* <div className="text-lg font-semibold">Transaction ID: {id}</div> */}
        </div>
    );
};

export default DetailsTransaction;
