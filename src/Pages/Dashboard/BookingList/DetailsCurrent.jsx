import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGet } from "../../../Hooks/useGet";
import StaticLoader from "../../../Components/StaticLoader";
import ActionCurrent from "./ActionCurrent";
import RequestCurrent from "./RequestCurrent";
import { useAuth } from "../../../Context/Auth";
import { FaArrowLeft } from "react-icons/fa";

const tabs = [
  "Details",
  "Traveler",

  "Voucher",
  "Invoice",
  "Special Request",
  "Payments",

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
  const [activeTab, setActiveTab] = useState("Details");
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
{/* Sidebar (Vertical Tabs) */}
<div className="border-b p-4 bg-gray-50 rounded-lg shadow-md flex flex-col gap-2">
  {/* Header with Back Button */}
  <div className="flex gap-2 items-center">
    <button
      onClick={() => navigate(-1)}
      className="text-mainColor text-2xl cursor-pointer hover:text-blue-500 transition-all"
    >
      <FaArrowLeft />
    </button>
    <h2 className="text-2xl font-bold text-mainColor truncate w-full">Booking Details</h2>
  </div>

  <ActionCurrent id={current_id} item={item}  />

  {/* Simple Tabs */}
  <div className="w-full overflow-x-auto">
    <ul className="flex gap-3">
      {tabs.map((tab) => (
        <li
          key={tab}
          className={`px-4 py-2 text-sm font-semibold cursor-pointer rounded transition-all ${
            activeTab === tab
              ? "bg-mainColor text-white"
              : "text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </li>
      ))}
    </ul>
  </div>
</div>



        {/* Main Content */}
        <div className=" pl-6 mt-6">
        {activeTab === "Details" && (
            <div>
         
              {currentList ? (
                <>
                 {/* Hotels Table */}
{type === "hotels" && item && (
  <>
    <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
      🏨 Hotel Services
    </h2>
    <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">

{/* Hotel Services Card */}
<div className="p-5 border border-gray-200 shadow-lg rounded-lg bg-gray-200">
  <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">🏨 Hotel Services</h3>
  <p className="text-gray-700 mt-3">
    <span className="font-semibold">Hotel Name:</span> {item.hotel_name}
  </p>
  <p className="text-gray-700">
    <span className="font-semibold">Hotel Type:</span> {item.hotel_type}
  </p>
</div>

{/* Supplier Details Card */}
<div className="p-5 border border-gray-200 shadow-lg rounded-lg bg-gray-200">
  <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">📞 Supplier Info</h3>
  <p className="text-gray-700 mt-3">
    <span className="font-semibold">Supplier Name:</span> {item.supplier_from_name}
  </p>
  <p className="font-semibold mt-2">📧 Emails:</p>
  <ul className="list-disc list-inside text-gray-700">
    <li className="ml-4">{item.supplier_from_email}</li>
  </ul>
  <p className="font-semibold mt-2">📱 Phone Numbers:</p>
  <ul className="list-disc list-inside text-gray-700">
    <li className="ml-4">{item.supplier_from_phone}</li>
  </ul>
</div>

{/* Check-in & Check-out Card */}
<div className="p-5 border border-gray-200 shadow-lg rounded-lg bg-gray-200">
  <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">📅 Check-in & Check-out</h3>
  <p className="text-gray-700 mt-3">
    <span className="font-semibold">Check-in Date:</span> {item.check_in}
  </p>
  <p className="text-gray-700">
    <span className="font-semibold">Check-out Date:</span> {item.check_out}
  </p>
  <p className="text-gray-700">
    <span className="font-semibold">Nights:</span> {item.no_nights}
  </p>
</div>

{/* Guests Information Card */}
<div className="p-5 border border-gray-200 shadow-lg rounded-lg bg-gray-200">
  <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">👥 Guests Information</h3>
  <p className="text-gray-700 mt-3">
    <span className="font-semibold">Room Type:</span> {item.room_type}
  </p>
  <p className="text-gray-700">
    <span className="font-semibold">Adults:</span> {item.no_adults}
  </p>
  <p className="text-gray-700">
    <span className="font-semibold">Children:</span> {item.no_children}
  </p>
</div>



</div>

{/* Modal Popup for Special Request */}

  </>
)}


                  {/* Buses Info */}
                {/* Buses Table */}
              {/* Buses Table */}
              {type === "buses" && item && (
                  <div className="p-5 flex justify-center items-center">
  <div className="flex flex-wrap gap-6 justify-center w-full">
    {/* 🚌 Bus Information Card */}
    <div className="p-6 bg-gray-200 shadow-lg rounded-lg border border-gray-300 w-[350px]">
      <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
        🚌 Bus Information
      </h2>
      <div className="grid grid-cols-2 gap-4 text-gray-700">
        <p><span className="font-semibold">Bus Name:</span> {item.bus_name}</p>
        <p><span className="font-semibold">Bus No:</span> {item.bus_no}</p>
        <p><span className="font-semibold">From:</span> {item.from}</p>
        <p><span className="font-semibold">To:</span> {item.to}</p>
        <p><span className="font-semibold">Departure:</span> {item.depature}</p>
        <p><span className="font-semibold">Arrival:</span> {item.arrival}</p>
      </div>
      {/* Status Tag */}
    
    </div>

    {/* 👨‍👩‍👧‍👦 Guests Information Card */}
    <div className="p-6 bg-gray-200 shadow-lg rounded-lg border border-gray-300 w-[350px]">
      <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
        👨‍👩‍👧‍👦 Guests Info
      </h2>
      <p><span className="font-semibold">Adults:</span> {item.no_adults}</p>
      <p><span className="font-semibold">Children:</span> {item.no_children}</p>
    </div>

    {/* 📞 Supplier Information Card */}
    <div className="p-6 bg-gray-200 shadow-lg rounded-lg border border-gray-300 w-[350px]">
      <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
        📞 Supplier Info
      </h2>
      <p><span className="font-semibold">Supplier Name:</span> {item.supplier_from_name}</p>
      <p className="font-semibold mt-2">📧 Email:</p>
      <p className="text-gray-700">{item.supplier_from_email}</p>
      <p className="font-semibold mt-2">📱 Phone:</p>
      <p className="text-gray-700">{item.supplier_from_phone}</p>
    </div>
  </div>
</div>

 
      )}


                  {/* Flights Table */}
                  {type === "flights" && item && (
  <>
    {/* Title & Subtitle */}
    <div className="mb-6 text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">✈️ Flight Services</h2>
      <p className="text-lg text-gray-600">
        {item.flight_name} - {item.flight_type}
      </p>
    </div>

    {/* Grid Layout for Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      
      {/* Flight Details Card */}
      <div className="bg-gray-200 p-6 rounded-lg shadow-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">🛫 Flight Details</h3>
        <div className="space-y-2 text-gray-700 mt-3">
          <p><span className="font-semibold">Departure:</span> {item.depature}</p>
          <p><span className="font-semibold">Class:</span> {item.flight_class}</p>
          <p><span className="font-semibold">Direction:</span> {item.flight_direction}</p>
          <p><span className="font-semibold">PNR Ref:</span> {item.ref_pnr}</p>
          <p><span className="font-semibold">Ticket No:</span> {item.ticket_no}</p>
          <p><span className="font-semibold">Infants:</span> {item.infants_no}</p>
          <p className="flex items-center gap-2">
            <span className="font-semibold">Status:</span>
     
          </p>
        </div>
      </div>

      {/* Supplier Details Card */}
      <div className="bg-gray-200 p-6 rounded-lg shadow-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">📞 Supplier Info</h3>
        <p className="mt-3 text-gray-700"><span className="font-semibold">Supplier:</span> {item.supplier_from_name}</p>
        
        {item.supplier_from_email && (
          <p className="mt-2 text-gray-700"><span className="font-semibold">📧 Email:</span> {item.supplier_from_email}</p>
        )}

        {item.supplier_from_phone && (
          <p className="mt-2 text-gray-700"><span className="font-semibold">📱 Phone:</span> {item.supplier_from_phone}</p>
        )}
      </div>

      {/* Check-in & Check-out Card */}
      <div className="bg-gray-200 p-6 rounded-lg shadow-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">🏨 Check-in & Check-out</h3>
        <p className="mt-3 text-gray-700"><span className="font-semibold">Check-in:</span> {item.check_in || "N/A"}</p>
        <p className="mt-2 text-gray-700"><span className="font-semibold">Check-out:</span> {item.check_out || "N/A"}</p>
      </div>

      {/* Guests & Special Requests Card */}
      <div className="bg-gray-200 p-6 rounded-lg shadow-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">👨‍👩‍👦 Guests Info</h3>
        <p className="mt-3 text-gray-700"><span className="font-semibold">Infants:</span> {item.infants_no}</p>

      </div>

    </div>
  </>
)}


                  {/* Tours Table */}
                  {type === "tours" && item && (
  <>
    <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
      🎒 Tour Information
    </h2>

    {/* Grid Layout for Three Cards in a Row */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Tour Details Card */}
      <div className="p-5 border border-gray-200 shadow-lg rounded-lg bg-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">🏷️ Tour Details</h3>
        <div className="grid grid-cols-2 gap-4 text-gray-700 mt-2">
          <p><span className="font-semibold">Tour Name:</span> {item.tour_name}</p>
          <p><span className="font-semibold">Tour Type:</span> {item.tour_type}</p>
          <p><span className="font-semibold">Total Price:</span> ${item.total_price}</p>
        </div>
      </div>

      {/* Contact Person Card */}
      <div className="p-5 border border-gray-200 shadow-lg rounded-lg bg-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">📞 Contact Person</h3>
        <p><span className="font-semibold">Name:</span> {item.to_name}</p>
        <p><span className="font-semibold">Role:</span> {item.to_role}</p>
        <p><span className="font-semibold">Email:</span> {item.to_email}</p>
        <p><span className="font-semibold">Phone:</span> {item.to_phone}</p>
      </div>

      {/* Supplier Info Card */}
      <div className="p-5 border border-gray-200 shadow-lg rounded-lg bg-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">📦 Supplier Info</h3>
        <p><span className="font-semibold">Supplier Name:</span> {item.supplier_from_name}</p>
        <p className="font-semibold mt-2">📧 Emails:</p>
        <ul className="list-disc list-inside text-gray-700 ml-4">
          <li>{item.supplier_from_email}</li>
        </ul>
        <p className="font-semibold mt-2">📱 Phone Numbers:</p>
        <ul className="list-disc list-inside text-gray-700 ml-4">
          <li>{item.supplier_from_phone}</li>
        </ul>
      </div>

      {/* Tour Hotels Card */}
      {item.tour_hotels?.length > 0 && (
        <div className="p-5 border border-gray-200 shadow-lg rounded-lg bg-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">🏨 Tour Hotels</h3>
          {item.tour_hotels.map((hotel, i) => (
            <div key={i} className="mt-2 text-gray-700">
              <p><span className="font-semibold">Hotel Name:</span> {hotel.hotel_name}</p>
              <p><span className="font-semibold">Destination:</span> {hotel.destination}</p>
              <p><span className="font-semibold">Room Type:</span> {hotel.room_type}</p>
              <p><span className="font-semibold">Check-in:</span> {hotel.check_in}</p>
              <p><span className="font-semibold">Check-out:</span> {hotel.check_out}</p>
              <p><span className="font-semibold">Nights:</span> {hotel.nights}</p>
            </div>
          ))}
        </div>
      )}

      {/* Transportation Card */}
      {item.tour_buses?.length > 0 && (
        <div className="p-5 border border-gray-200 shadow-lg rounded-lg bg-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">🚌 Transportation</h3>
          {item.tour_buses.map((bus, i) => (
            <p key={i} className="text-gray-700 mt-2">
              <span className="font-semibold">Type:</span> {bus.transportation}, 
              <span className="font-semibold"> Seats:</span> {bus.seats}
            </p>
          ))}
        </div>
      )}

      {/* Payment & Status Card */}
      <div className="p-5 border border-gray-200 shadow-lg rounded-lg bg-gray-200">
        <p><span className="font-semibold">Payment Status:</span> {item.payment_status || "N/A"}</p>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          item.status === "pending" ? "bg-yellow-100 text-yellow-800" :
          item.status === "confirmed" ? "bg-green-100 text-green-800" :
          "bg-red-100 text-red-800"}`
        }>
          {item.status}
        </span>
      </div>
    </div>
  </>
)}



{/* Visas Table */}
{type === "visas" && item && (
  <>
    <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
      🛂 Visa Information
    </h2>

    {/* Grid Layout for Three Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      {/* Visa Details Card */}
      <div className="p-5 border border-gray-200 shadow-lg rounded-lg bg-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">📌 Visa Details</h3>
        <div className="text-gray-700">
          <p><span className="font-semibold">Visa Code:</span> {item.code}</p>
          <p><span className="font-semibold">Country:</span> {item.country_name || "N/A"}</p>
          <p><span className="font-semibold">Appointment Date:</span> {item.appointment}</p>
          <p><span className="font-semibold">Created At:</span> {item.created_at}</p>
          <p><span className="font-semibold">Notes:</span> {item.notes || "N/A"}</p>
        </div>
      </div>

      {/* Travelers Info (Adults & Children) */}
      <div className="p-5 border border-gray-200 shadow-lg rounded-lg bg-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">👨‍👩‍👧‍👦 Travelers Info</h3>
        <p><span className="font-semibold">Adults:</span> {item.no_adults}</p>
        <p><span className="font-semibold">Children:</span> {item.no_children}</p>
        <p><span className="font-semibold">Special Request:</span> {item.special_request || "None"}</p>
        <p><span className="font-semibold">Total Price:</span> ${item.total_price}</p>
        <p><span className="font-semibold">Travel Date:</span> {item.travel_date}</p>
      </div>

      {/* Supplier Information (From & To) */}
      <div className="p-5 border border-gray-200 shadow-lg rounded-lg bg-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">📦 Supplier Info</h3>
        
        {/* Supplier From */}
        <p className="font-semibold">Supplier From:</p>
        <ul className="list-disc list-inside text-gray-700">
          <li><span className="font-semibold">Name:</span> {item.supplier_from_name}</li>
          <li><span className="font-semibold">Email:</span> {item.supplier_from_email}</li>
          <li><span className="font-semibold">Phone:</span> {item.supplier_from_phone}</li>
        </ul>

        {/* Supplier To */}
        <p className="font-semibold mt-3">Supplier To:</p>
        <ul className="list-disc list-inside text-gray-700">
          <li><span className="font-semibold">Name:</span> {item.to_name}</li>
          <li><span className="font-semibold">Email:</span> {item.to_email}</li>
          <li><span className="font-semibold">Phone:</span> {item.to_phone}</li>
          <li><span className="font-semibold">Role:</span> {item.to_role}</li>
        </ul>
      </div>

  
   

    </div>
  </>
)}




                </>
              ) : (
                <p className="text-gray-600">No booking info available.</p>
              )}
            </div>
          )}

{activeTab === "Special Request" && (
  <div className=" flex flex-col">
    {/* Card Container */}
    <div className="w-full max-w-xl bg-gray-200 p-6 rounded-lg shadow-lg border border-gray-200">
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2 flex items-center gap-2">
        <span className="text-blue-600 text-3xl">🎯</span> Special Request
      </h2>
      
      {/* Special Request Text */}
      {specialRequest ? (
        <p
          className="cursor-pointer text-blue-600 underline hover:text-blue-800 mt-2 text-lg"
          onClick={() => setIsModalOpen(true)}
        >
          {specialRequest}
        </p>
      ) : (
        <p className="text-gray-500 italic">No special request added.</p>
      )}
    </div>

    {/* Modal Popup */}
    {isModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative">
          <h3 className="text-lg font-semibold mb-3 text-gray-900">✍️ Update Special Request</h3>
          <textarea
            value={specialRequest}
            onChange={(e) => setSpecialRequest(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
            placeholder="Enter your request..."
            rows="4"
          />
          <div className="flex justify-end mt-4 gap-3">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdateRequest}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
)
}

{activeTab === "Traveler" && (
  <div className="flex flex-col items-center">
    {/* Traveler Details Card */}
    <div className="w-full  bg-gray-200 p-6 rounded-lg shadow-lg border border-gray-200">
      {/* Header */}
      <h2 className="text-2xl font-bold mb-4 border-b pb-2 flex items-center gap-2">
        <span className="text-mainColor text-3xl">🌍</span> Traveler Details
      </h2>

      {/* Traveler Information */}
      <div className="space-y-3">
        <p className="text-gray-700 flex items-center gap-2">
          <span className="font-semibold text-mainColor">📛 Name:</span> {data?.traveler.name}
        </p>
        <p className="text-gray-700 flex items-center gap-2">
          <span className="font-semibold text-mainColor">📌 Position:</span> {data?.traveler.position}
        </p>
        <p className="text-gray-700 flex items-center gap-2">
          <span className="font-semibold text-mainColor">📧 Email:</span> {data?.traveler.email}
        </p>
        <p className="text-gray-700 flex items-center gap-2">
          <span className="font-semibold text-mainColor">📞 Phone:</span> {data?.traveler.phone}
        </p>
        <p className="text-gray-700 flex items-center gap-2">
          <span className="font-semibold text-mainColor">🆔 ID:</span> {data?.traveler.id}
        </p>
      </div>
    </div>
  </div>
)}

{activeTab === "Voucher" && (
            <div className=" bg-gray-200 shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
                🎟️ Voucher Details
              </h2>

              {/* Agent Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700">
                  Agent Information
                </h3>
                <div className="mt-2 bg-gray-200 p-4 rounded-lg shadow-sm">
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

     
        </div>
      </div>
    </div>
  );
};

export default DetailsCurrent;
