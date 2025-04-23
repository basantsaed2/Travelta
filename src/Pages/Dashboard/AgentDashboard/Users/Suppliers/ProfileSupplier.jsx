// import React, { useEffect, useState } from 'react';
// import { useGet } from '../../../../../Hooks/useGet';
// import StaticLoader from '../../../../../Components/StaticLoader';
// import { Link } from 'react-router-dom';
// import { FaEnvelope,FaCalendarAlt , FaUser,FaEdit, FaPhone, FaExclamationTriangle ,FaFlag ,FaUserTie ,FaWhatsapp,FaSearch ,FaUserCheck } from "react-icons/fa";

// const ProfileSupplier = ({ id }) => {
//   const { refetch: refetchSupplierProfile, loading: loadingSupplierProfile, data: SupplierProfile } = useGet({url: `https://travelta.online/agent/supplier/profile/${id}`,});
//   const [data, setData] = useState([]);
//   const [booking, serBooking] = useState([]);
//   const [paper,setPaper] = useState([])
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [showRequest,setShowRequest] = useState(false)
//   const [showInfo,setShowInfo] = useState(true)
//   const [showPaper,setShowPaper] = useState(false)
//   const [bookingShow,setBookingShow] = useState(false)
//   const [activeTab, setActiveTab] = useState("booking"); 
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);

//   const totalPages = Math.ceil(booking.length / rowsPerPage);
//   const paginatedBooking = booking.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );
    
//   useEffect(() => {
//     refetchSupplierProfile();
//   }, [refetchSupplierProfile]);

//   useEffect(() => {
//     if (SupplierProfile) {
//       setData(SupplierProfile.supplier_info); // Entire response
//       serBooking(SupplierProfile?.manuel_booking|| [])
//       setPaper(SupplierProfile?.legal_papers || [])
//     }
//   }, [SupplierProfile]);

//   if (loadingSupplierProfile) {
//     return <StaticLoader />;
//   }

//   return (
//     <div className=" p-4 space-y-6">
//       {/* User Info Card */}
//       <div className="w-full bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-lg p-8 space-y-6 border border-blue-100 transition-all hover:shadow-2xl">

//         {/* Header */}
//         <div className="text-center">
//           <h2 className="text-3xl font-extrabold text-blue-800 tracking-wide">
//             {data?.name || "Unknown Supplier"}
//           </h2>
//           <p className="text-sm text-blue-500 mt-1">Supplier ID: <span className="font-semibold">#{data?.id}</span></p>
//         </div>

//         {/* Details Grid */}
//         <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 text-sm text-gray-700">
          
//           {/* Phones */}
//           <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
//             <h4 className="font-bold text-blue-700 flex items-center gap-2 mb-2">
//               <FaPhone /> Phone Numbers
//             </h4>
//             <ul className="list-disc pl-5 space-y-1 text-gray-800">
//               {data?.phones?.length
//                 ? data.phones.map((phone, i) => <li key={i}>{phone}</li>)
//                 : <li>-</li>}
//             </ul>
//           </div>

//           {/* Emails */}
//           <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
//             <h4 className="font-bold text-blue-700 flex items-center gap-2 mb-2">
//               <FaEnvelope /> Email Addresses
//             </h4>
//             <ul className="list-disc pl-5 space-y-1 text-gray-800">
//               {data?.emails?.length
//                 ? data.emails.map((email, i) => <li key={i}>{email}</li>)
//                 : <li>-</li>}
//             </ul>
//           </div>

//           {/* Emergency Phone */}
//           <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
//             <h4 className="font-bold text-blue-700 flex items-center gap-2 mb-2">
//               <FaExclamationTriangle /> Emergency Contact
//             </h4>
//             <p className="text-gray-800">{data?.emergency_phone || "-"}</p>
//           </div>

//           {/* Admin Contact */}
//           <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 space-y-1">
//             <h4 className="font-bold text-blue-700 flex items-center gap-2 mb-2">
//               <FaUserTie /> Admin Info
//             </h4>
//             <p><span className="font-medium">Name:</span> {data?.admin_name || "-"}</p>
//             <p><span className="font-medium">Phone:</span> {data?.admin_phone || "-"}</p>
//             <p><span className="font-medium">Email:</span> {data?.admin_email || "-"}</p>
//           </div>

//           {/* Agent Info */}
//           <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
//             <h4 className="font-bold text-blue-700 flex items-center gap-2 mb-2">
//               <FaUserCheck /> Agent
//             </h4>
//             <p className="text-gray-800">{data?.agent || "-"}</p>
//           </div>

//         </div>

//         {/* Action */}
//         <div className="text-center">
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold px-6 py-2 rounded-full shadow-md hover:brightness-110 transition"
//           >
//             Upload Attachments
//           </button>
//         </div>
//       </div>

//       {/* Request ManualBooking Table */}
//       <div className="p-4">
//         {/* Tabs Navigation */}
//         <div className="flex space-x-4 border-b-2 pb-2">
//           <button
//             className={`text-xl font-semibold px-4 py-2 rounded-lg ${
//               activeTab === "booking" ? "text-white border-b-4 bg-mainColor" : "text-gray-600"
//             }`}
//             onClick={() => setActiveTab("booking")}
//           >
//             Booking
//           </button>
//           <button
//             className={`text-xl font-semibold px-4 py-2 rounded-lg ${
//               activeTab === "paper" ? "text-white border-b-4 bg-mainColor" : "text-gray-600"
//             }`}
//             onClick={() => setActiveTab("paper")}
//           >
//             Legal Paper
//           </button>
//         </div>

//         {/* Booking Section */}
//         {activeTab === "booking" && (
//           <div className="overflow-x-auto">
//           {/* Rows Per Page Dropdown */}
//           <div className="flex justify-between items-center mb-4">
//             <label className="text-mainColor font-semibold">Show:</label>
//             <select
//               className="border p-2 rounded"
//               value={rowsPerPage}
//               onChange={(e) => {
//                 setRowsPerPage(Number(e.target.value));
//                 setCurrentPage(1); // Reset to first page when changing rows
//               }}
//             >
//               <option value={10}>10</option>
//               <option value={20}>20</option>
//               <option value={50}>50</option>
//               <option value={booking.length}>All</option>
//             </select>
//           </div>
    
//           {/* Booking Table */}
//           <table className="w-full sm:min-w-0">
//             <thead>
//               <tr className="border-b-2">
//                 <th className="text-mainColor text-center font-semibold pb-3">Country</th>
//                 <th className="text-mainColor text-center font-semibold pb-3">Flight</th>
//                 <th className="text-mainColor text-center font-semibold pb-3">Hotel</th>
//                 <th className="text-mainColor text-center font-semibold pb-3">Check In</th>
//                 <th className="text-mainColor text-center font-semibold pb-3">Check Out</th>
//                 <th className="text-mainColor text-center font-semibold pb-3">View</th>
//               </tr>
//             </thead>
//             <tbody>
//               {paginatedBooking.length === 0 ? (
//                 <tr>
//                   <td colSpan={6} className="text-center text-xl text-mainColor font-medium">
//                     No requests found
//                   </td>
//                 </tr>
//               ) : (
//                 paginatedBooking.map((request) => (
//                   <tr key={request.id} className="cursor-pointer border-b-2 hover:bg-gray-100 transition">
//                     <td className="text-center text-thirdColor text-lg">{request.country || "-"}</td>
//                     <td className="text-center text-thirdColor text-lg">{request.flight?.flight || "-"}</td>
//                     <td className="text-center text-thirdColor text-lg">{request.hotel?.hotel || "-"}</td>
//                     <td className="text-center text-thirdColor text-lg">{request.hotel?.check_in || "-"}</td>
//                     <td className="text-center text-thirdColor text-lg">{request.hotel?.check_out || "-"}</td>
//                     <td
//                       onClick={() => setSelectedBooking(request)}
//                       className="text-center text-mainColor underline text-lg cursor-pointer"
//                     >
//                       View Info
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
    
//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="flex justify-center mt-4">
//               <button
//                 className="px-3 py-1 mx-1 bg-gray-300 rounded"
//                 disabled={currentPage === 1}
//                 onClick={() => setCurrentPage((prev) => prev - 1)}
//               >
//                 Prev
//               </button>
//               <span className="px-3 py-1 text-mainColor font-bold">
//                 Page {currentPage} of {totalPages}
//               </span>
//               <button
//                 className="px-3 py-1 mx-1 bg-gray-300 rounded"
//                 disabled={currentPage === totalPages}
//                 onClick={() => setCurrentPage((prev) => prev + 1)}
//               >
//                 Next
//               </button>
//             </div>
//           )}
    
//           {/* Modal */}
//           {selectedBooking && (
//     <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 animate-fadeIn">
//       <div className="bg-white p-8 rounded-2xl shadow-2xl w-11/12 max-w-2xl relative">
//         {/* Close Button */}
//         <button
//           className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition text-2xl"
//           onClick={() => setSelectedBooking(null)}
//         >
//           ✖
//         </button>

//         {/* Title */}
//         <h3 className="text-3xl font-bold text-mainColor mb-6 text-center">
//           Booking Details
//         </h3>

//         {/* Booking Information */}
//         <div className="grid grid-cols-2 gap-4 text-lg">
//           <div><span className="font-semibold">Country:</span> {selectedBooking.country || "-"}</div>
//           <div><span className="font-semibold">Flight:</span> {selectedBooking.flight?.flight || "-"}</div>
//           <div><span className="font-semibold">Hotel:</span> {selectedBooking.hotel?.hotel || "-"}</div>
//           <div><span className="font-semibold">Check In:</span> {selectedBooking.hotel?.check_in || "-"}</div>
//           <div><span className="font-semibold">Check Out:</span> {selectedBooking.hotel?.check_out || "-"}</div>
//           <div><span className="font-semibold">Adults:</span> {selectedBooking.hotel?.adults || "-"}</div>
//           <div><span className="font-semibold">Children:</span> {selectedBooking.hotel?.childreen || "-"}</div>
//           <div><span className="font-semibold">Nights:</span> {selectedBooking.hotel?.nights || "-"}</div>
//           <div><span className="font-semibold">Room Quantity:</span> {selectedBooking.hotel?.room_quantity || "-"}</div>
//           <div><span className="font-semibold">Room Type:</span> {selectedBooking.hotel?.room_type || "-"}</div>
//           <div><span className="font-semibold">Supplier Email:</span> {selectedBooking.supplier_from_email || "-"}</div>
//           <div><span className="font-semibold">Supplier Name:</span> {selectedBooking.supplier_from_name || "-"}</div>
//           <div><span className="font-semibold">Supplier Phone:</span> {selectedBooking.supplier_from_phone || "-"}</div>
//           <div><span className="font-semibold">Total Price:</span> {selectedBooking.total_price || "-"}</div>
//           <div><span className="font-semibold">Tour:</span> {selectedBooking.tour?.tour || "-"}</div>
//           <div><span className="font-semibold">Visa:</span> {selectedBooking.visa?.visa || "-"}</div>
//         </div>

//         {/* Close Button */}
//         <div className="mt-6 flex justify-center">
//           <button
//             className="bg-mainColor text-white px-6 py-3 rounded-lg text-lg font-medium shadow-md hover:bg-opacity-90 transition"
//             onClick={() => setSelectedBooking(null)}
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   )}

//         </div>
          
//         )}

//         {/* Legal Paper Section */}
//         {activeTab === "paper" && (
//           <div>
      
            
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-6">
//                 {paper.length === 0 ? (
//                   <p className="text-xl text-gray-600 text-center">No legal papers found</p>
//                 ) : (
//                   paper.map((item) => (
//                     <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
//                       <img src={item.image_link} alt={`Legal Paper ${item.id}`} className="w-full h-48 object-cover rounded-t-xl" />
//                       <div className="p-4">
//                         <h3 className="text-xl font-semibold text-gray-800 truncate">Legal Paper {item.id}</h3>
//                         <p className="text-gray-500 text-sm mt-2">Click to view more details</p>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>
            
//           </div>
//         )}
//       </div>

//     </div>
//   );
// };

// export default ProfileSupplier;


import React, { useEffect, useState } from 'react';
import { useGet } from '../../../../../Hooks/useGet';
import StaticLoader from '../../../../../Components/StaticLoader';
import { FaPhone, FaUser, FaWhatsapp, FaEnvelope,FaCopy ,FaSearch , FaFlag, FaGlobe, FaMapMarkerAlt, FaCalendarAlt, FaMoneyBillWave } from "react-icons/fa";
import { MdClose, MdAdd } from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';

const ProfileSupplier = ({ id }) => {
  const { refetch: refetchSupplierProfile, loading: loadingSupplierProfile, data: SupplierProfile } = useGet({
    url: `https://travelta.online/agent/supplier/profile/${id}`
  });
  
  const [data, setData] = useState({});
  const [bookings, setBookings] = useState([]);
  const [papers, setPapers] = useState([]);
  const [balances, setBalances] = useState([]);
  const [activeTab, setActiveTab] = useState("bookings");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedItem, setCopiedItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    refetchSupplierProfile();
  }, [refetchSupplierProfile]);

  useEffect(() => {
    if (SupplierProfile) {
      setData(SupplierProfile.supplier_info || {});
      setBookings(SupplierProfile.manuel_booking || []);
      setPapers(SupplierProfile.legal_papers || []);
      setBalances(SupplierProfile.balances || []);
    }
  }, [SupplierProfile]);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(type);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const totalPages = Math.ceil(bookings.length / rowsPerPage);
  const paginatedBookings = bookings.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  if (loadingSupplierProfile) {
    return <StaticLoader />;
  }

  return (
    <div className="p-2">
      {/* Profile Card */}
      <div className="shadow-lg w-full rounded-2xl p-4 md:p-6 border border-gray-300 transition-all hover:shadow-2xl relative bg-white flex flex-col md:flex-row gap-6 items-center">
        {/* Left: Profile Image */}
        <div className='w-full md:w-1/2 flex flex-col gap-3'>
          <div className="relative flex justify-center">
            <div className="w-36 h-36 rounded-full bg-blue-100 flex items-center justify-center">
              <FaUser className="text-blue-500 text-5xl" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-mainColor text-center">{data?.name || '_'}</h3>
        </div>

        {/* Right: Supplier Details */}
        <div className="w-full space-y-2">
          <span className="inline-block bg-green-200 text-green-700 text-sm font-medium px-3 py-1 rounded-full">Active</span>

          {/* Contact Info */}
          <div className="grid grid-cols-2 gap-2">
            {/* Phones */}
            <div>
              {data?.phones?.map((phone, i) => (
                <p key={i} className="flex items-center gap-3 text-gray-700">
                  <FaPhone className="text-mainColor" />
                  <span>
                    {phone} 
                    <button 
                      onClick={() => copyToClipboard(phone, `phone-${i}`)}
                      className="ml-2 text-gray-400 hover:text-blue-500"
                    >
                      <FaCopy size={12} />
                      {copiedItem === `phone-${i}` && <span className="text-xs text-green-500">Copied!</span>}
                    </button>
                  </span>
                </p>
              ))}
            </div>

            {/* Emails */}
            <div>
              {data?.emails?.map((email, i) => (
                <p key={i} className="flex items-center gap-3 text-gray-700">
                  <FaEnvelope className="text-mainColor" />
                  <span>
                    {email}
                    <button 
                      onClick={() => copyToClipboard(email, `email-${i}`)}
                      className="ml-2 text-gray-400 hover:text-blue-500"
                    >
                      <FaCopy size={12} />
                      {copiedItem === `email-${i}` && <span className="text-xs text-green-500">Copied!</span>}
                    </button>
                  </span>
                </p>
              ))}
            </div>

            <p className="flex items-center gap-3 text-gray-700">
              <FaFlag className="text-mainColor" />
              <span><span className="font-semibold">Admin:</span> {data?.admin_name || "-"}</span>
            </p>
            <p className="flex items-center gap-3 text-gray-700">
              <FaPhone className="text-mainColor" />
              <span><span className="font-semibold">Admin Phone:</span> {data?.admin_phone || "-"}</span>
            </p>
            <p className="flex items-center gap-3 text-gray-700">
              <FaEnvelope className="text-mainColor" />
              <span><span className="font-semibold">Admin Email:</span> {data?.admin_email || "-"}</span>
            </p>
            <p className="flex items-center gap-3 text-gray-700">
              <FaCalendarAlt className="text-mainColor" />
              <span><span className="font-semibold">Joined:</span> {new Date(data?.created_at).toLocaleDateString()}</span>
            </p>
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-mainColor text-white px-6 py-2 rounded-lg mt-4 hover:bg-blue-700 transition-colors"
          >
            Upload Documents
          </button>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="md:p-5 p-2">
        {/* Tabs Navigation */}
        <div className="flex justify-center bg-gray-100 p-2 rounded-lg shadow-md mb-6">
          {["Bookings", "Balances", "Legal Papers"].map((tab) => (
            <button
              key={tab}
              className={`md:px-6 px-2 py-3 text-md md:text-lg font-semibold transition-all duration-300 rounded-lg mx-1 ${
                activeTab === tab 
                  ? "bg-mainColor text-white shadow-lg" 
                  : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search and Pagination */}
        {(activeTab === "Bookings" || activeTab === "Balances") && (
          <div className="flex items-center gap-4 bg-white p-6 shadow-xl rounded-2xl border border-gray-200 mb-6">
            <div className="relative w-full md:w-[300px]">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={`Search ${activeTab.toLowerCase()}...`}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-mainColor focus:border-mainColor outline-none transition-all"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <label className="text-gray-700 font-medium">Rows:</label>
              <select
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                value={rowsPerPage}
                className="bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border border-gray-300 outline-none cursor-pointer"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>
        )}

        {/* Tab Content */}
        <div className="mt-5">
          {/* Bookings Tab */}
          {activeTab === "Bookings" && (
            <div className="overflow-x-auto">
              {bookings.length === 0 ? (
                <p className="text-center text-xl text-mainColor">No bookings found</p>
              ) : (
                <div className="w-full block overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                    <thead className="bg-gray-200 text-gray-700">
                      <tr className="border-t-2 border-b-2">
                        <th className="w-[50px] text-mainColor bg-mainBgColor text-center font-medium p-2 border-b-2">SL</th>
                        <th className="min-w-[120px] text-mainColor bg-mainBgColor text-center font-medium py-3 border-b-2">Supplier</th>
                        <th className="min-w-[120px] text-mainColor bg-mainBgColor text-center font-medium py-3 border-b-2">Service</th>
                        <th className="min-w-[120px] text-mainColor bg-mainBgColor text-center font-medium py-3 border-b-2">Price</th>
                        <th className="min-w-[120px] text-mainColor bg-mainBgColor text-center font-medium py-3 border-b-2">Check In</th>
                        <th className="min-w-[120px] text-mainColor bg-mainBgColor text-center font-medium py-3 border-b-2">Check Out</th>
                        <th className="min-w-[120px] text-mainColor bg-mainBgColor text-center font-medium py-3 border-b-2">Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedBookings.map((booking, index) => (
                        <tr key={index} className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-100"} hover:bg-gray-50`}>
                          <td className="text-center py-2 text-gray-600">{(currentPage - 1) * rowsPerPage + index + 1}</td>
                          <td className="text-center py-2 text-gray-600">{booking.supplier_from_name || "-"}</td>
                          <td className="text-center py-2 text-gray-600">
                            {booking.hotel ? "Hotel" : booking.flight ? "Flight" : booking.visa ? "Visa" : "Other"}
                          </td>
                          <td className="text-center py-2 text-gray-600">{booking.total_price || "-"} {booking.currency || "-"}</td>
                          <td className="text-center py-2 text-gray-600">{booking.hotel?.check_in || "-"}</td>
                          <td className="text-center py-2 text-gray-600">{booking.hotel?.check_out || "-"}</td>
                          <td className="text-center py-2">
                            <button
                              onClick={() => setSelectedBooking(booking)}
                              className="text-blue-600 hover:underline"
                            >
                              <AiOutlineEye className="inline mr-1" /> View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Balances Tab */}
          {activeTab === "Balances" && (
            <div className="overflow-x-auto">
              {balances.length === 0 ? (
                <p className="text-center text-xl text-mainColor">No balances found</p>
              ) : (
                <div className="w-full block overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                    <thead className="bg-gray-200 text-gray-700">
                      <tr className="border-t-2 border-b-2">
                        <th className="w-[50px] text-mainColor bg-mainBgColor text-center font-medium p-2 border-b-2">SL</th>
                        <th className="min-w-[120px] text-mainColor bg-mainBgColor text-center font-medium py-3 border-b-2">Balance</th>
                        <th className="min-w-[120px] text-mainColor bg-mainBgColor text-center font-medium py-3 border-b-2">Currency</th>
                        <th className="min-w-[120px] text-mainColor bg-mainBgColor text-center font-medium py-3 border-b-2">Last Updated</th>
                      </tr>
                    </thead>
                    <tbody>
                      {balances.map((balance, index) => (
                        <tr key={index} className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-100"} hover:bg-gray-50`}>
                          <td className="text-center py-2 text-gray-600">{index + 1}</td>
                          <td className="text-center py-2 text-gray-600">{balance.balance || "-"}</td>
                          <td className="text-center py-2 text-gray-600">{balance.currency?.name || "-"}</td>
                          <td className="text-center py-2 text-gray-600">{new Date(balance.updated_at).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Legal Papers Tab */}
          {activeTab === "Legal Papers" && (
            <div className="p-6">
              {papers.length === 0 ? (
                <p className="text-center text-xl text-mainColor">No legal papers found</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {papers.map((paper, index) => (
                    <div
                      key={index}
                      className="relative bg-white bg-opacity-80 shadow-xl border border-gray-200 rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105"
                    >
                      <div className="relative">
                        <img
                          src={paper.image_link}
                          alt={`Legal Paper ${paper.id}`}
                          className="w-full h-56 object-cover rounded-t-2xl cursor-pointer"
                          onClick={() => window.open(paper.image_link, '_blank')}
                        />
                        <div className="absolute top-2 left-2 bg-gradient-to-r from-mainBgColor to-mainColor text-white text-xs font-semibold px-3 py-1 rounded-lg shadow-md">
                          #{index + 1}
                        </div>
                      </div>
                      <div className="p-4 text-center">
                        <p className="text-lg font-semibold text-gray-800">{paper.type || "Document"}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {new Date(paper.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        className="absolute bottom-3 right-3 bg-mainColor text-white p-2 rounded-full shadow-lg hover:bg-opacity-90 transition"
                        onClick={() => window.open(paper.image_link, '_blank')}
                      >
                        <AiOutlineEye size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Pagination */}
        {(activeTab === "Bookings" || activeTab === "Balances") && totalPages > 1 && (
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg ${
                currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg ${
                currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <Dialog open={!!selectedBooking} onClose={() => setSelectedBooking(null)} className="relative z-50">
          <DialogBackdrop className="fixed inset-0 bg-black/50" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel className="w-full max-w-2xl bg-white rounded-2xl p-8 shadow-xl transform transition-all duration-300 scale-95 hover:scale-100 max-h-screen overflow-y-auto">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Booking Details</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <p className="text-gray-700"><strong>Supplier:</strong> {selectedBooking.supplier_from_name || "-"}</p>
                  <p className="text-gray-700"><strong>Service Type:</strong> {selectedBooking.hotel ? "Hotel" : selectedBooking.flight ? "Flight" : selectedBooking.visa ? "Visa" : "Other"}</p>
                  <p className="text-gray-700"><strong>Price:</strong> {selectedBooking.total_price || "-"} {selectedBooking.currency || "-"}</p>
                  <p className="text-gray-700"><strong>Supplier Email:</strong> {selectedBooking.supplier_from_email || "-"}</p>
                  <p className="text-gray-700"><strong>Supplier Phone:</strong> {selectedBooking.supplier_from_phone || "-"}</p>
                  {selectedBooking.hotel && (
                    <>
                      <p className="text-gray-700"><strong>Check In:</strong> {selectedBooking.hotel.check_in || "-"}</p>
                      <p className="text-gray-700"><strong>Check Out:</strong> {selectedBooking.hotel.check_out || "-"}</p>
                    </>
                  )}
                </div>

                {selectedBooking.voucher && (
                  <div className="mt-4 border-t pt-4 border-gray-200">
                    <h3 className="font-semibold text-lg text-gray-800">Voucher</h3>
                    <a 
                      href={selectedBooking.voucher} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline mt-2 inline-block"
                    >
                      View Voucher Document
                    </a>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="px-6 py-2 rounded-lg bg-mainColor text-white hover:bg-blue-700 transition-colors duration-300"
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default ProfileSupplier;