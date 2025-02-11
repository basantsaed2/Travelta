import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGet } from "../../../Hooks/useGet";
import StaticLoader from "../../../Components/StaticLoader";
import ActionCurrent from "./ActionCurrent";
import RequestCurrent from "./RequestCurrent";
import { useAuth } from "../../../Context/Auth";
import { FaArrowLeft } from "react-icons/fa";

const tabs = [
  "Booking Info",
  "Passenger",
  "Voucher",
  "Invoice",
  // "Special Request",
  "Payments",
  "Actions",
];

const DetailsCurrent = () => {
  const { current_id } = useParams();
  const {
    refetch: refetchDetails,
    loading: loadingDetails,
    data: dataDetails,
  } = useGet({
    url: `https://travelta.online/agent/booking/details/${current_id}`,
  });
  const {
    refetch: refetchCurrent,
    loading: loadingCurrent,
    data: currentData,
  } = useGet({
    url: "https://travelta.online/agent/booking",
  });
  //   const { refetch: refetchInvoice, loading: loadingInvoice, data: currentDataInvoice } = useGet({
  //     url: `https://travelta.online/agent/accounting/booking/invoice/${current_id}`,
  //   });

  const [selectedPaymentId, setSelectedPaymentId] = useState(null); // Store selected payment ID

  const {
    refetch: refetchInvoice,
    loading: loadingInvoice,
    data: currentDataInvoice,
  } = useGet({
    url: selectedPaymentId
      ? `https://travelta.online/agent/accounting/booking/invoice/${selectedPaymentId}`
      : null, // Dynamically set the API URL
  });

  const location = useLocation();
  const type = location.state?.type || "No data passed";
  const item = location.state?.data || "No data passed";
  const [activeTab, setActiveTab] = useState("Booking Info");
  const [data, setData] = useState([]);
  const [dataInvoice, setDataInvoice] = useState([]);
  const [currentList, setCurrentList] = useState([]);
  const [specialRequest, setSpecialRequest] = useState(item?.special_request || "");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate()
  const auth = useAuth();
  useEffect(() => {
    refetchDetails();
    refetchCurrent();
    refetchInvoice();
  }, []);

  useEffect(() => {
    if (dataDetails) {
      setData(dataDetails);
    }
  }, [dataDetails]);

  useEffect(() => {
    if (currentDataInvoice) {
      setDataInvoice(currentDataInvoice);
    }
    console.log("data invoice", currentDataInvoice);
  }, [currentDataInvoice]);

  useEffect(() => {
    if (currentData) {
      setCurrentList(currentData.current || []);
    }
    console.log(currentData?.current[type]);
  }, [currentData, type]);


    // Function to handle the update
    // Function to update special request via API
    const handleUpdateRequest = async () => {
      if (!item?.id) {
        alert("Invalid booking ID!");
        return;
      }
  
      try {
        const response = await fetch(`https://travelta.online/agent/booking/special_request/${current_id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${auth.user?.token || ''}`,
          },
          body: JSON.stringify({ special_request: specialRequest }),
        });
  
        if (!response.ok) {
          throw new Error("Failed to update special request");
        }
  
        console.log("Updated Special Request:", specialRequest);
        auth.toastSuccess("Special request added successful")
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error updating request:", error);
        auth.toastError("Failed to update special request. Try again.");
      } 
    };

//   if(dataDetails){
//     return(<>{<StaticLoader/>}</>)
//   }

//   if(currentDataInvoice){
//     return(<>{<StaticLoader/>}</>)
//   }

//   if(currentData){
//     return(<>{<StaticLoader/>}</>)
//   }

  return (
    <div className=" bg-gray-100 min-h-screen flex justify-center">
<div className="w-full bg-white shadow-lg rounded-lg flex flex-col p-4">
  {/* Tabs Navigation */}
  <div className="border-b border-gray-300 p-4 bg-gray-50 rounded-lg shadow-md flex flex-col md:flex-col md:items-start gap-2">
  {/* Truncated Title */}
  <div className="flex gap-2 justify-start items-center">
  <button
                                    onClick={() => navigate(-1)}
                                    className=" top-2 text-mainColor text-2xl cursor-pointer hover:text-blue-500 transition-all"
                                  >
                                    <FaArrowLeft/>
                                  </button>
  <h2 className="text-2xl font-bold text-mainColor mb-4 md:mb-0 py-3 truncate overflow-hidden whitespace-nowrap w-full">Booking Details</h2>
  </div>
  
  <div className="w-full  bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl shadow-lg p-3 overflow-x-scroll scrollSection">
  <ul className="flex flex-row md:space-x-4 space-x-2 w-max md:w-full md:justify-center ">
    {tabs.map((tab) => (
      <li
        key={tab}
        className={`flex items-center gap-3 px-5 py-3
          text-sm sm:text-base md:text-base lg:text-base font-semibold cursor-pointer
          rounded-full transition-all duration-300 whitespace-nowrap
          shadow-md transform hover:scale-105 hover:shadow-xl
          ${
            activeTab === tab
              ? "bg-gradient-to-r from-mainColor to-blue-500 text-white shadow-lg scale-105"
              : "text-gray-700 bg-white hover:bg-gray-200"
          }`}
        onClick={() => setActiveTab(tab)}
      >
        <span className="text-xl"></span> {/* Example Icon (Replace as needed) */}
        {tab}
      </li>
    ))}
  </ul>
</div>


</div>



        {/* Main Content */}
        <div className="w-3/4 pl-6 mt-6">
          {activeTab === "Booking Info" && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                Booking Info
              </h2>
              {currentList ? (
                <>
                  {/* Hotels Table */}
                  {type === "hotels" && item && (
  <>
    <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
      🏨 Hotel Information
    </h2>

    <div className="mb-6 p-5 border border-gray-200 shadow-lg rounded-lg bg-white">
      {/* Hotel Details */}
      <div className="grid grid-cols-2 gap-4 text-gray-700">
        <p>
          <span className="font-semibold">Hotel Name:</span> {item.hotel_name}
        </p>
        <p>
          <span className="font-semibold">Hotel ID:</span> {item.id}
        </p>
        <p>
          <span className="font-semibold">Room Type:</span> {item.room_type}
        </p>
        <p>
          <span className="font-semibold">Nights:</span> {item.no_nights}
        </p>
        <p>
          <span className="font-semibold">Adults:</span> {item.no_adults}
        </p>
        <p>
          <span className="font-semibold">Children:</span> {item.no_children}
        </p>
      </div>

      {/* Supplier Info */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-800 border-b pb-1">
          📞 Supplier Info
        </h3>
        <p>
          <span className="font-semibold">Supplier Name:</span>{" "}
          {item.supplier_from_name}
        </p>

        {/* Supplier Emails */}
        <p className="font-semibold mt-2">📧 Emails:</p>
        <ul className="list-disc list-inside text-gray-700">
       
            <li className="ml-4">
              {item.supplier_from_email}
            </li>
          
        </ul>

        {/* Supplier Phones */}
        <p className="font-semibold mt-2">📱 Phone Numbers:</p>
        <ul className="list-disc list-inside text-gray-700">
      
            <li className="ml-4">
              {item.supplier_from_phone}
            </li>
       
        </ul>
      </div>

           {/* Special Request Section */}
           <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-1">📝 Special Request</h3>
            {specialRequest && 
            <p 
            className="cursor-pointer text-blue-600 underline hover:text-blue-800 mt-2"
            onClick={() => setIsModalOpen(true)}
          >
            {specialRequest || "no special request"}
          </p>}
          </div>

      {/* Status Tag */}
      <div className="mt-4">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            item.status === "pending"
              ? "bg-yellow-100 text-yellow-800"
              : item.status === "confirmed"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {item.status}
        </span>
      </div>

              {/* Modal Popup */}
          {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
              <h3 className="text-lg font-semibold mb-3">Update Special Request</h3>
              <input
                type="text"
                value={specialRequest}
                onChange={(e) => setSpecialRequest(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mainColor"
                placeholder="Enter your request..."
              />
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg mr-2 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateRequest}
                  className="px-4 py-2 bg-mainColor text-white rounded-lg hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  </>
)}


               {/* Buses Info */}
{type === "buses" && item && (
  <>
    <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
      🚌 Bus Information
    </h2>

    <div className="mb-6 p-5 border border-gray-200 shadow-lg rounded-lg bg-white">
      {/* Bus Details */}
      <div className="grid grid-cols-2 gap-4 text-gray-700">
        <p>
          <span className="font-semibold">Bus Name:</span> {item.bus_name}
        </p>
        <p>
          <span className="font-semibold">Bus No:</span> {item.bus_no}
        </p>
        <p>
          <span className="font-semibold">From:</span> {item.from}
        </p>
        <p>
          <span className="font-semibold">To:</span> {item.to}
        </p>
        <p>
          <span className="font-semibold">Departure:</span> {item.depature}
        </p>
        <p>
          <span className="font-semibold">Arrival:</span> {item.arrival}
        </p>
        <p>
          <span className="font-semibold">Adults:</span> {item.no_adults}
        </p>
        <p>
          <span className="font-semibold">Children:</span> {item.no_children}
        </p>
      </div>

      {/* Supplier Info */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-800 border-b pb-1">
          📞 Supplier Info
        </h3>
        <p>
          <span className="font-semibold">Supplier Name:</span>{" "}
          {item.supplier_from_name}
        </p>

        {/* Supplier Emails */}
        <p className="font-semibold mt-2">📧 Emails:</p>
        <ul className="list-disc list-inside text-gray-700">
         
            <li  className="ml-4">{item.supplier_from_email}</li>
        
        </ul>

        {/* Supplier Phones */}
        <p className="font-semibold mt-2">📱 Phone Numbers:</p>
        <ul className="list-disc list-inside text-gray-700">
         
            <li className="ml-4">{item.supplier_from_phone}</li>
       
        </ul>
      </div>

           {/* Special Request Section */}
           <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-1">📝 Special Request</h3>
          {specialRequest && 
            <p 
            className="cursor-pointer text-blue-600 underline hover:text-blue-800 mt-2"
            onClick={() => setIsModalOpen(true)}
          >
            {specialRequest || "no special request"}
          </p>}
          </div>



      {/* Status Tag */}
      <div className="mt-4">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            item.status === "pending"
              ? "bg-yellow-100 text-yellow-800"
              : item.status === "confirmed"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {item.status}
        </span>
      </div>

              {/* Modal Popup */}
              {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
              <h3 className="text-lg font-semibold mb-3">Update Special Request</h3>
              <input
                type="text"
                value={specialRequest}
                onChange={(e) => setSpecialRequest(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mainColor"
                placeholder="Enter your request..."
              />
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg mr-2 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateRequest}
                  className="px-4 py-2 bg-mainColor text-white rounded-lg hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  </>
)}


{type === "flights" && item && (
  <>
    <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
      ✈️ Flight Information
    </h2>
    <div className="mb-6 p-5 border border-gray-200 shadow-lg rounded-lg bg-white">
      <div className="grid grid-cols-2 gap-4 text-gray-700">
        <p>
          <span className="font-semibold">Departure:</span> {item.depature}
        </p>
        <p>
          <span className="font-semibold">Flight Class:</span> {item.flight_class}
        </p>
        <p>
          <span className="font-semibold">Flight Direction:</span> {item.flight_direction}
        </p>
        <p>
          <span className="font-semibold">Flight Type:</span> {item.flight_type}
        </p>
        <p>
          <span className="font-semibold">PNR Reference:</span> {item.ref_pnr}
        </p>
        <p>
          <span className="font-semibold">Ticket No:</span> {item.ticket_no}
        </p>
        <p>
          <span className="font-semibold">Infants:</span> {item.infants_no}
        </p>
        <p>
          <span className="font-semibold">Status:</span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              item.status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : item.status === "confirmed"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {item.status}
          </span>
        </p>
      </div>

           {/* Special Request Section */}
           <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-1">📝 Special Request</h3>
            {specialRequest && 
            <p 
            className="cursor-pointer text-blue-600 underline hover:text-blue-800 mt-2"
            onClick={() => setIsModalOpen(true)}
          >
            {specialRequest || "no special request"}
          </p>}
          </div>

      {/* From-To Details */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-800 border-b pb-1">
          🌍 Route
        </h3>
        {item.from_to?.map((route, i) => (
          <p key={i}>
            <span className="font-semibold">From:</span> {route.from} →
            <span className="font-semibold"> To:</span> {route.to}
          </p>
        ))}
      </div>

      {/* Supplier Info */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-800 border-b pb-1">
          📞 Supplier Info
        </h3>
        <p>
          <span className="font-semibold">Supplier Name:</span> {item.supplier_from_name}
        </p>

        {/* Supplier Emails */}
        <p className="font-semibold mt-2">📧 Emails:</p>
        <ul className="list-disc list-inside text-gray-700">
         
            <li className="ml-4">{item.supplier_from_email}</li>
       
        </ul>

        {/* Supplier Phones */}
        <p className="font-semibold mt-2">📱 Phone Numbers:</p>
        <ul className="list-disc list-inside text-gray-700">
          
            <li className="ml-4">{item.supplier_from_phone}</li>
    
        </ul>
      </div>

              {/* Modal Popup */}
              {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
              <h3 className="text-lg font-semibold mb-3">Update Special Request</h3>
              <input
                type="text"
                value={specialRequest}
                onChange={(e) => setSpecialRequest(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mainColor"
                placeholder="Enter your request..."
              />
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg mr-2 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateRequest}
                  className="px-4 py-2 bg-mainColor text-white rounded-lg hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  </>
)}



{type === "tours" && item && (
  <>
    <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
      🎒 Tour Information
    </h2>
    <div className="mb-6 p-5 border border-gray-200 shadow-lg rounded-lg bg-white">
      {/* Tour Details */}
      <div className="grid grid-cols-2 gap-4 text-gray-700">
        <p>
          <span className="font-semibold">Tour Name:</span> {item.tour_name}
        </p>
        <p>
          <span className="font-semibold">Tour Type:</span> {item.tour_type}
        </p>
        <p>
          <span className="font-semibold">Total Price:</span> ${item.total_price}
        </p>
      </div>

      {/* Tour Hotels */}
      {item.tour_hotels?.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-1">🏨 Tour Hotels</h3>
          {item.tour_hotels.map((hotel, i) => (
            <div key={i} className="mt-2">
              <p>
                <span className="font-semibold">Hotel Name:</span> {hotel.hotel_name}
              </p>
              <p>
                <span className="font-semibold">Destination:</span> {hotel.destination}
              </p>
              <p>
                <span className="font-semibold">Room Type:</span> {hotel.room_type}
              </p>
              <p>
                <span className="font-semibold">Check-in:</span> {hotel.check_in}
              </p>
              <p>
                <span className="font-semibold">Check-out:</span> {hotel.check_out}
              </p>
              <p>
                <span className="font-semibold">Nights:</span> {hotel.nights}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Tour Buses */}
      {item.tour_buses?.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-1">🚌 Transportation</h3>
          {item.tour_buses.map((bus, i) => (
            <p key={i}>
              <span className="font-semibold">Type:</span> {bus.transportation},{" "}
              <span className="font-semibold">Seats:</span> {bus.seats}
            </p>
          ))}
        </div>
      )}

      {/* Contact Person */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-800 border-b pb-1">📞 Contact Person</h3>
        <p>
          <span className="font-semibold">Name:</span> {item.to_name}
        </p>
        <p>
          <span className="font-semibold">Role:</span> {item.to_role}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {item.to_email}
        </p>
        <p>
          <span className="font-semibold">Phone:</span> {item.to_phone}
        </p>
      </div>

           {/* Special Request Section */}
           <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-1">📝 Special Request</h3>
            {specialRequest && 
            <p 
            className="cursor-pointer text-blue-600 underline hover:text-blue-800 mt-2"
            onClick={() => setIsModalOpen(true)}
          >
            {specialRequest || "no special request"}
          </p>}
          </div>

      {/* Supplier Info */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-800 border-b pb-1">📦 Supplier Info</h3>
        <p>
          <span className="font-semibold">Supplier Name:</span> {item.supplier_from_name}
        </p>

        {/* Supplier Emails */}
        <p className="font-semibold mt-2">📧 Emails:</p>
        <ul className="list-disc list-inside text-gray-700">
         
            <li className="ml-4">{item.supplier_from_email}</li>
        
        </ul>

        {/* Supplier Phones */}
        <p className="font-semibold mt-2">📱 Phone Numbers:</p>
        <ul className="list-disc list-inside text-gray-700">
         
            <li  className="ml-4">{item.supplier_from_phone}</li>
   
        </ul>
      </div>

      {/* Payment & Status */}
      <div className="mt-4">
        <p>
          <span className="font-semibold">Payment Status:</span> {item.payment_status || "N/A"}
        </p>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            item.status === "pending"
              ? "bg-yellow-100 text-yellow-800"
              : item.status === "confirmed"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {item.status}
        </span>
      </div>
              {/* Modal Popup */}
              {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
              <h3 className="text-lg font-semibold mb-3">Update Special Request</h3>
              <input
                type="text"
                value={specialRequest}
                onChange={(e) => setSpecialRequest(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mainColor"
                placeholder="Enter your request..."
              />
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg mr-2 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateRequest}
                  className="px-4 py-2 bg-mainColor text-white rounded-lg hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  </>
)}


             {/* Visas Table */}
{type === "visas" && item && (
  <>
    <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
      🛂 Visa Information
    </h2>
    <div className="mb-6 p-5 border border-gray-200 shadow-lg rounded-lg bg-white">
      {/* Visa Details */}
      <div className="grid grid-cols-2 gap-4 text-gray-700">
        <p>
          <span className="font-semibold">Visa Code:</span> {item.code}
        </p>
        <p>
          <span className="font-semibold">Country:</span> {item.country_name || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Appointment Date:</span> {item.appointment}
        </p>
        <p>
          <span className="font-semibold">Created At:</span> {item.created_at}
        </p>
        <p>
          <span className="font-semibold">Notes:</span> {item.notes || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Adults:</span> {item.no_adults}
        </p>
        <p>
          <span className="font-semibold">Children:</span> {item.no_children}
        </p>
      </div>

      {/* Supplier Info */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-800 border-b pb-1">📦 Supplier Info</h3>
        <p>
          <span className="font-semibold">Supplier Name:</span> {item.supplier_from_name}
        </p>

        {/* Supplier Emails */}
        <p className="font-semibold mt-2">📧 Emails:</p>
        <ul className="list-disc list-inside text-gray-700">
         
            <li className="ml-4">{item.supplier_from_email}</li>
 
        </ul>

        {/* Supplier Phones */}
        <p className="font-semibold mt-2">📱 Phone Numbers:</p>
        <ul className="list-disc list-inside text-gray-700">
         
            <li className="ml-4">{item.supplier_from_phone}</li>
     
        </ul>
      </div>

           {/* Special Request Section */}
           <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-1">📝 Special Request</h3>
            {specialRequest && 
            <p 
            className="cursor-pointer text-blue-600 underline hover:text-blue-800 mt-2"
            onClick={() => setIsModalOpen(true)}
          >
            {specialRequest || "no special request"}
          </p>}
          </div>

      {/* Payment & Status */}
      <div className="mt-4">
        <p>
          <span className="font-semibold">Payment Status:</span> {item.payment_status || "N/A"}
        </p>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            item.status === "pending"
              ? "bg-yellow-100 text-yellow-800"
              : item.status === "confirmed"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {item.status}
        </span>
      </div>
              {/* Modal Popup */}
              {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
              <h3 className="text-lg font-semibold mb-3">Update Special Request</h3>
              <input
                type="text"
                value={specialRequest}
                onChange={(e) => setSpecialRequest(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mainColor"
                placeholder="Enter your request..."
              />
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg mr-2 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateRequest}
                  className="px-4 py-2 bg-mainColor text-white rounded-lg hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  </>
)}

                </>
              ) : (
                <p className="text-gray-600">No booking info available.</p>
              )}
            </div>
          )}

          {activeTab === "Passenger" && (
        <div className="flex items-center gap-6 bg-gray-100 p-4 rounded-lg shadow-md">
        {/* Adults */}
        <div className="flex items-center gap-2">
          <span className="text-blue-500 text-xl">👨‍🦳</span>
          <p className="text-gray-700 font-medium">
            <strong>Adults:</strong> {item.no_adults ?? "0"}
          </p>
        </div>
      
        {/* Children */}
        <div className="flex items-center gap-2">
          <span className="text-green-500 text-xl">🧒</span>
          <p className="text-gray-700 font-medium">
            <strong>Children:</strong> {item.no_children ?? "0"}
          </p>
        </div>
      </div>
      
          )}

          {activeTab === "Voucher" && (
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
                🎟️ Voucher Details
              </h2>

              {/* Agent Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700">
                  Agent Information
                </h3>
                <div className="mt-2 bg-gray-100 p-4 rounded-lg shadow-sm">
                  <p>
                    <strong>Name:</strong> {data.agent_data.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {data.agent_data.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {data.agent_data.phone}
                  </p>
                </div>
              </div>

              {/* Manual Booking Code
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-700">Manual Booking Code</h3>
      <div className="mt-2 bg-gray-100 p-4 rounded-lg shadow-sm">
        <p><strong>Code:</strong> <span className="text-blue-600 font-medium">{voucherData.manualBooking.code}</span></p>
      </div>
    </div> */}
            </div>
          )}

          {/* {activeTab === "Special Request" && (
            <div>
             <RequestCurrent id={current_id}/>
            </div>
          )} */}

          {activeTab === "Invoice" &&
            currentDataInvoice &&
            (selectedPaymentId ? (
              <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
                  🧾 Invoice Report
                </h2>

                {/* Client Information */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-700">
                    Client Information
                  </h3>
                  <div className="mt-2 bg-gray-100 p-4 rounded-lg shadow-sm">
                    <p>
                      <strong>Name:</strong> {currentDataInvoice.client?.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {currentDataInvoice.client?.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {currentDataInvoice.client?.phone}
                    </p>
                  </div>
                </div>

                {/* Booking Payment Details */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-700">
                    Payment Details
                  </h3>
                  <div className="mt-2 bg-gray-100 p-4 rounded-lg shadow-sm">
                    <p>
                      <strong>Amount:</strong>{" "}
                      <span className="text-green-600 font-bold">
                        ${currentDataInvoice.booking_payment?.amount}
                      </span>
                    </p>
                    <p>
                      <strong>Code:</strong>{" "}
                      <span className="text-blue-600 font-medium">
                        {currentDataInvoice.booking_payment?.code}
                      </span>
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {currentDataInvoice.booking_payment?.date}
                    </p>
                    <p>
                      <strong>Details:</strong>{" "}
                      {currentDataInvoice.booking_payment?.financial?.details}
                    </p>
                  </div>
                </div>

                {/* Financial Details */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-700">
                    Financial Institution
                  </h3>
                  <div className="mt-2 flex items-center bg-gray-100 p-4 rounded-lg shadow-sm">
                    {currentDataInvoice.booking_payment?.financial.logo_link ? (
                      <img
                        src={
                          currentDataInvoice.booking_payment?.financial
                            .logo_link
                        }
                        alt="Financial Logo"
                        className="w-16 h-16 rounded-full shadow-md mr-4"
                      />
                    ) : (
                      <span className="text-gray-500">No Logo Available</span>
                    )}
                    <div>
                      <p>
                        <strong>Name:</strong>{" "}
                        {currentDataInvoice.booking_payment?.financial.name}
                      </p>
                      <p>
                        <strong>Balance:</strong> $
                        {currentDataInvoice.booking_payment?.financial.balance}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-600 text-center text-lg">
                No data available
              </p>
            ))}

          {activeTab === "Payments" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-5 border-b-2 pb-2">
                💳 Payments
              </h2>
              {dataDetails?.payments?.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-300 shadow-lg rounded-lg bg-white">
                    {/* Table Header */}
                    <thead>
                      <tr className="bg-blue-500 text-white">
                        <th className="border border-gray-300 p-3">Amount</th>
                        <th className="border border-gray-300 p-3">Code</th>
                        <th className="border border-gray-300 p-3">Date</th>
                        <th className="border border-gray-300 p-3">
                          Financial Name
                        </th>
                        <th className="border border-gray-300 p-3">Logo</th>
                        <th className="border border-gray-300 p-3">
                          Invoice
                        </th>{" "}
                        {/* New Column */}
                      </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                      {dataDetails.payments.map((payment, index) => (
                        <tr
                          key={index}
                          className="text-center border-b hover:bg-gray-100 transition duration-200"
                        >
                          <td className="border border-gray-300 p-3 font-semibold text-green-600">
                            ${payment.amount}
                          </td>
                          <td className="border border-gray-300 p-3 text-blue-600 font-medium">
                            {payment.code}
                          </td>
                          <td className="border border-gray-300 p-3">
                            {payment.date}
                          </td>
                          <td className="border border-gray-300 p-3">
                            {payment.financial?.name || "N/A"}
                          </td>
                          <td className="border border-gray-300 p-3">
                            {payment.financial?.logo_link ? (
                              <img
                                src={payment.financial.logo_link}
                                alt="Logo"
                                className="w-12 h-12 mx-auto rounded-full shadow-md"
                              />
                            ) : (
                              <span className="text-gray-500">No Logo</span>
                            )}
                          </td>
                          {/* Invoice Icon Button */}
                          <td className="border border-gray-300 p-3">
                            <button
                              onClick={() => {
                                setSelectedPaymentId(payment.id); // Store the clicked payment ID
                                setActiveTab("Invoice"); // Switch tab
                                refetchInvoice(); // Fetch invoice data with new ID
                              }}
                              className="text-blue-500 hover:text-blue-700 transition duration-200"
                            >
                              🧾 {/* Invoice Icon */}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-600 text-center text-lg">
                  No payment data available.
                </p>
              )}
            </div>
          )}

          {activeTab === "Actions" && (
        <ActionCurrent id={current_id} item={item}  />
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsCurrent;
