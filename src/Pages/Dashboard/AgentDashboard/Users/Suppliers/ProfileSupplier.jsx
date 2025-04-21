import React, { useEffect, useState } from 'react';
import { useGet } from '../../../../../Hooks/useGet';
import StaticLoader from '../../../../../Components/StaticLoader';
import { Link } from 'react-router-dom';
import { FaEnvelope,FaCalendarAlt , FaUser,FaEdit, FaPhone, FaExclamationTriangle ,FaFlag ,FaUserTie ,FaWhatsapp,FaSearch ,FaUserCheck } from "react-icons/fa";

const ProfileSupplier = ({ id }) => {
  const { refetch: refetchSupplierProfile, loading: loadingSupplierProfile, data: SupplierProfile } = useGet({url: `https://travelta.online/agent/supplier/profile/${id}`,});
  const [data, setData] = useState([]);
  const [booking, serBooking] = useState([]);
  const [paper,setPaper] = useState([])
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showRequest,setShowRequest] = useState(false)
  const [showInfo,setShowInfo] = useState(true)
  const [showPaper,setShowPaper] = useState(false)
  const [bookingShow,setBookingShow] = useState(false)
  const [activeTab, setActiveTab] = useState("booking"); 
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(booking.length / rowsPerPage);
  const paginatedBooking = booking.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
    
  useEffect(() => {
    refetchSupplierProfile();
  }, [refetchSupplierProfile]);

  useEffect(() => {
    if (SupplierProfile) {
      setData(SupplierProfile.supplier_info); // Entire response
      serBooking(SupplierProfile?.manuel_booking|| [])
      setPaper(SupplierProfile?.legal_papers || [])
    }
  }, [SupplierProfile]);

  if (loadingSupplierProfile) {
    return <StaticLoader />;
  }

  return (
    <div className=" p-4 space-y-6">
      {/* User Info Card */}
      <div className="w-full bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-lg p-8 space-y-6 border border-blue-100 transition-all hover:shadow-2xl">

        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-blue-800 tracking-wide">
            {data?.name || "Unknown Supplier"}
          </h2>
          <p className="text-sm text-blue-500 mt-1">Supplier ID: <span className="font-semibold">#{data?.id}</span></p>
        </div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 text-sm text-gray-700">
          
          {/* Phones */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <h4 className="font-bold text-blue-700 flex items-center gap-2 mb-2">
              <FaPhone /> Phone Numbers
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-800">
              {data?.phones?.length
                ? data.phones.map((phone, i) => <li key={i}>{phone}</li>)
                : <li>-</li>}
            </ul>
          </div>

          {/* Emails */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <h4 className="font-bold text-blue-700 flex items-center gap-2 mb-2">
              <FaEnvelope /> Email Addresses
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-800">
              {data?.emails?.length
                ? data.emails.map((email, i) => <li key={i}>{email}</li>)
                : <li>-</li>}
            </ul>
          </div>

          {/* Emergency Phone */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <h4 className="font-bold text-blue-700 flex items-center gap-2 mb-2">
              <FaExclamationTriangle /> Emergency Contact
            </h4>
            <p className="text-gray-800">{data?.emergency_phone || "-"}</p>
          </div>

          {/* Admin Contact */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 space-y-1">
            <h4 className="font-bold text-blue-700 flex items-center gap-2 mb-2">
              <FaUserTie /> Admin Info
            </h4>
            <p><span className="font-medium">Name:</span> {data?.admin_name || "-"}</p>
            <p><span className="font-medium">Phone:</span> {data?.admin_phone || "-"}</p>
            <p><span className="font-medium">Email:</span> {data?.admin_email || "-"}</p>
          </div>

          {/* Agent Info */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <h4 className="font-bold text-blue-700 flex items-center gap-2 mb-2">
              <FaUserCheck /> Agent
            </h4>
            <p className="text-gray-800">{data?.agent || "-"}</p>
          </div>

        </div>

        {/* Action */}
        <div className="text-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold px-6 py-2 rounded-full shadow-md hover:brightness-110 transition"
          >
            Upload Attachments
          </button>
        </div>
      </div>

      {/* Request ManualBooking Table */}
      <div className="p-4">
        {/* Tabs Navigation */}
        <div className="flex space-x-4 border-b-2 pb-2">
          <button
            className={`text-xl font-semibold px-4 py-2 rounded-lg ${
              activeTab === "booking" ? "text-white border-b-4 bg-mainColor" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("booking")}
          >
            Booking
          </button>
          <button
            className={`text-xl font-semibold px-4 py-2 rounded-lg ${
              activeTab === "paper" ? "text-white border-b-4 bg-mainColor" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("paper")}
          >
            Legal Paper
          </button>
        </div>

        {/* Booking Section */}
        {activeTab === "booking" && (
          <div className="overflow-x-auto">
          {/* Rows Per Page Dropdown */}
          <div className="flex justify-between items-center mb-4">
            <label className="text-mainColor font-semibold">Show:</label>
            <select
              className="border p-2 rounded"
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1); // Reset to first page when changing rows
              }}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={booking.length}>All</option>
            </select>
          </div>
    
          {/* Booking Table */}
          <table className="w-full sm:min-w-0">
            <thead>
              <tr className="border-b-2">
                <th className="text-mainColor text-center font-semibold pb-3">Country</th>
                <th className="text-mainColor text-center font-semibold pb-3">Flight</th>
                <th className="text-mainColor text-center font-semibold pb-3">Hotel</th>
                <th className="text-mainColor text-center font-semibold pb-3">Check In</th>
                <th className="text-mainColor text-center font-semibold pb-3">Check Out</th>
                <th className="text-mainColor text-center font-semibold pb-3">View</th>
              </tr>
            </thead>
            <tbody>
              {paginatedBooking.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-xl text-mainColor font-medium">
                    No requests found
                  </td>
                </tr>
              ) : (
                paginatedBooking.map((request) => (
                  <tr key={request.id} className="cursor-pointer border-b-2 hover:bg-gray-100 transition">
                    <td className="text-center text-thirdColor text-lg">{request.country || "-"}</td>
                    <td className="text-center text-thirdColor text-lg">{request.flight?.flight || "-"}</td>
                    <td className="text-center text-thirdColor text-lg">{request.hotel?.hotel || "-"}</td>
                    <td className="text-center text-thirdColor text-lg">{request.hotel?.check_in || "-"}</td>
                    <td className="text-center text-thirdColor text-lg">{request.hotel?.check_out || "-"}</td>
                    <td
                      onClick={() => setSelectedBooking(request)}
                      className="text-center text-mainColor underline text-lg cursor-pointer"
                    >
                      View Info
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
    
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-4">
              <button
                className="px-3 py-1 mx-1 bg-gray-300 rounded"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Prev
              </button>
              <span className="px-3 py-1 text-mainColor font-bold">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="px-3 py-1 mx-1 bg-gray-300 rounded"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </button>
            </div>
          )}
    
          {/* Modal */}
          {selectedBooking && (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 animate-fadeIn">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-11/12 max-w-2xl relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition text-2xl"
          onClick={() => setSelectedBooking(null)}
        >
          ✖
        </button>

        {/* Title */}
        <h3 className="text-3xl font-bold text-mainColor mb-6 text-center">
          Booking Details
        </h3>

        {/* Booking Information */}
        <div className="grid grid-cols-2 gap-4 text-lg">
          <div><span className="font-semibold">Country:</span> {selectedBooking.country || "-"}</div>
          <div><span className="font-semibold">Flight:</span> {selectedBooking.flight?.flight || "-"}</div>
          <div><span className="font-semibold">Hotel:</span> {selectedBooking.hotel?.hotel || "-"}</div>
          <div><span className="font-semibold">Check In:</span> {selectedBooking.hotel?.check_in || "-"}</div>
          <div><span className="font-semibold">Check Out:</span> {selectedBooking.hotel?.check_out || "-"}</div>
          <div><span className="font-semibold">Adults:</span> {selectedBooking.hotel?.adults || "-"}</div>
          <div><span className="font-semibold">Children:</span> {selectedBooking.hotel?.childreen || "-"}</div>
          <div><span className="font-semibold">Nights:</span> {selectedBooking.hotel?.nights || "-"}</div>
          <div><span className="font-semibold">Room Quantity:</span> {selectedBooking.hotel?.room_quantity || "-"}</div>
          <div><span className="font-semibold">Room Type:</span> {selectedBooking.hotel?.room_type || "-"}</div>
          <div><span className="font-semibold">Supplier Email:</span> {selectedBooking.supplier_from_email || "-"}</div>
          <div><span className="font-semibold">Supplier Name:</span> {selectedBooking.supplier_from_name || "-"}</div>
          <div><span className="font-semibold">Supplier Phone:</span> {selectedBooking.supplier_from_phone || "-"}</div>
          <div><span className="font-semibold">Total Price:</span> {selectedBooking.total_price || "-"}</div>
          <div><span className="font-semibold">Tour:</span> {selectedBooking.tour?.tour || "-"}</div>
          <div><span className="font-semibold">Visa:</span> {selectedBooking.visa?.visa || "-"}</div>
        </div>

        {/* Close Button */}
        <div className="mt-6 flex justify-center">
          <button
            className="bg-mainColor text-white px-6 py-3 rounded-lg text-lg font-medium shadow-md hover:bg-opacity-90 transition"
            onClick={() => setSelectedBooking(null)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )}

        </div>
          
        )}

        {/* Legal Paper Section */}
        {activeTab === "paper" && (
          <div>
      
            
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-6">
                {paper.length === 0 ? (
                  <p className="text-xl text-gray-600 text-center">No legal papers found</p>
                ) : (
                  paper.map((item) => (
                    <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                      <img src={item.image_link} alt={`Legal Paper ${item.id}`} className="w-full h-48 object-cover rounded-t-xl" />
                      <div className="p-4">
                        <h3 className="text-xl font-semibold text-gray-800 truncate">Legal Paper {item.id}</h3>
                        <p className="text-gray-500 text-sm mt-2">Click to view more details</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            
          </div>
        )}
      </div>

    </div>
  );
};

export default ProfileSupplier;
