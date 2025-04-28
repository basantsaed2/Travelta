import React, { useEffect, useState } from 'react';
import { useGet } from '../../../../../Hooks/useGet';
import StaticLoader from '../../../../../Components/StaticLoader';
import {
  FaPhone,
  FaUser,
  FaWhatsapp,
  FaEnvelope,
  FaFlag,
  FaMapMarkerAlt,
  FaGlobe,
  FaUserTag,
  FaUserFriends,
  FaCalendarAlt,
  FaCheckCircle,
  FaEye, FaEdit
} from "react-icons/fa";
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { Link } from 'react-router-dom';

const Profile = ({ id }) => {
  const { refetch: refetchLeadProfile, loading: loadingLeadProfile, data: LeadProfile } = useGet({
    url: `https://travelta.online/agent/leads/profile/${id}`,
  });
  const [data, setData] = useState([]);
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Default to 10 rows per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages based on rowsPerPage
  const totalPages = Math.ceil(filteredRequests.length / rowsPerPage);

  useEffect(() => {
    refetchLeadProfile();
  }, [refetchLeadProfile]);

  useEffect(() => {
    if (LeadProfile && LeadProfile.requests) {
      setData(LeadProfile.customer_info);
      setRequests(LeadProfile.requests || []);
      setFilteredRequests(LeadProfile.requests || []);
    }
  }, [LeadProfile]);

  // Search handler
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const filtered = requests.filter(
      (req) =>
        req.to_name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        req.to_phone.toLowerCase().includes(e.target.value.toLowerCase()) ||
        req.service.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredRequests(filtered);
    setCurrentPage(1); // Reset to first page when search changes
  };

  // Clear search handler
  const handleSearchClear = () => {
    setSearchQuery('');
    setFilteredRequests(requests);
  };

  // Handle View Details Modal
  const handleViewDetails = (req) => {
    console.log(req);
    setSelectedRequest(req);
    setShowModal(true);
  };

  // Handle rows per page change
  const handleRowsChange = (e) => {
    setRowsPerPage(Number(e.target.value)); // Set rows per page based on selection
    setCurrentPage(1); // Reset to first page when rows per page changes
  };

  // Handle previous page
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Calculate the rows to display based on the current page and rowsPerPage
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRows = filteredRequests.slice(startIndex, endIndex);

  if (loadingLeadProfile) return <StaticLoader />;

  return (
    <div className="p-2 space-y-6">
      {/* Profile Card */}
      <div className="bg-white shadow-xl rounded-2xl border border-gray-200 p-6 w-full hover:shadow-2xl transition-all duration-300">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex flex-col items-center w-full md:w-1/4 gap-3">
            <img src={data?.image_link || "https://via.placeholder.com/150"} alt="Profile" className="w-36 h-36 object-cover rounded-xl border border-gray-300 shadow-md" />
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${data?.status === "active" ? "bg-green-100 text-green-700" : data?.status === "inactive" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
              <FaCheckCircle className="inline mr-1" />
              {data?.status || "Unknown"}
            </span>
          </div>

          {/* Customer Info */}
          <div className="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {/* Fields */}
            {[
              [FaUser, "Lead", data?.name],
              [FaPhone, "Phone", data?.phone],
              [FaWhatsapp, "WhatsApp", data?.watts],
              [FaEnvelope, "Email", data?.email],
              [FaFlag, "Nationality", data?.nationality?.name],
              [FaGlobe, "Country", data?.country?.name],
              [FaMapMarkerAlt, "City", data?.city?.name],
              [FaUserTag, "Service", data?.service?.service_name],
              [FaUserFriends, "Source", data?.source?.source],
              [FaCalendarAlt, "Date Added", data?.date_added?.split(" ")[0]],
              [FaUserFriends, "Agent", data?.agent_sales?.name],
            ].map(([Icon, label, value], idx) => (
              <p key={idx} className="flex items-start gap-2 text-gray-700 text-sm sm:text-base break-words min-w-0">
                <Icon className="text-mainColor mt-1" />
                <span><span className="font-semibold">{label}:</span> {value || "-"}</span>
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Requests Tab */}
      <div className="bg-white shadow-xl rounded-2xl border border-gray-200 p-6">
        <h1 className="text-xl font-semibold text-gray-800 mb-2">Requests</h1>

        <div className="w-full flex-col md:flex-row gap-4 mb-4 flex justify-between items-center">
          <div className='w-full md:w-1/2'>
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg"
            />
          </div>

          {/* New Request Button */}
          <div className="w-full flex justify-end md:w-1/2"> {/* Hidden on smaller screens, visible on large screens */}
            <Link
              to="/dashboard_agent/requests/add_request"
              className="px-6 py-2 bg-mainColor text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Add New Request
            </Link>
          </div>
        </div>


        {/* Rows per Page */}
        <div className="flex items-center space-x-2 mb-5">
          <label className="text-gray-700 font-medium">Rows per page:</label>
          <div className="w-full md:w-[120px]">
            <select
              onChange={handleRowsChange}
              value={rowsPerPage}
              className="w-full bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border border-gray-300 outline-none cursor-pointer"
            >
              <option value="5">5 rows</option>
              <option value="10">10 rows</option>
              <option value="20">20 rows</option>
              <option value="30">30 rows</option>
              <option value="50">50 rows</option>
            </select>
          </div>
        </div>

        <div className="w-full block overflow-x-scroll">
          <table className="w-full min-w-[600px]">
            <thead className="bg-gray-200 text-gray-700">
              <tr className="border-t-2 border-b-2">
                {['SL', 'Name', 'Phone', 'Service', 'Stage', 'Agent', 'Priority', 'Details', 'Action'].map((header, i) => (
                  <th key={i} className="text-center font-medium text-mainColor bg-mainBgColor py-2 border-b-2">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRequests.length === 0 ? (
                <tr><td colSpan="8" className="text-center py-4 text-gray-500">No requests found</td></tr>
              ) : (
                filteredRequests.map((req, i) => (
                  <tr key={req.id} className="border-b hover:bg-gray-100">
                    <td className="text-center py-2">{i + 1}</td>
                    <td className="text-center py-2">{req.to_name || '-'}</td>
                    <td className="text-center py-2">{req.to_phone || '-'}</td>
                    <td className="text-center py-2">{req.service || '-'}</td>
                    <td className="text-center py-2">{req.stages || '-'}</td>
                    <td className="text-center py-2">{req.agent || '-'}</td>
                    <td className="text-center py-2">{req.priority || '-'}</td>
                    <td className="text-center py-2">
                      <button
                        onClick={() => handleViewDetails(req)}
                        className="text-blue-600 hover:underline"
                      >
                        <FaEye className="inline mr-1" /> View Details
                      </button>
                    </td>
                    <td className="text-center py-2">
                      <div className="flex items-center justify-center gap-1">
                        <Link to={`/dashboard_agent/requests/edit_request/${req.id}`}  ><FaEdit color='#4CAF50' size="24" /></Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"}`}
          >
            Previous
          </button>
          <span className="text-gray-700">Page {currentPage} of {totalPages || 1}</span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 text-white"}`}
          >
            Next
          </button>
        </div>
      </div>

    {/* Modal */}
<Dialog open={showModal} onClose={() => setShowModal(false)} className="relative z-50">
  <DialogBackdrop className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300" />
  <div className="fixed inset-0 flex items-center justify-center">
    <DialogPanel className="w-full max-w-2xl bg-white rounded-xl shadow-2xl transform transition-all duration-300 ease-out scale-95 data-[enter]:scale-100 data-[enter]:opacity-100 max-h-[90vh] overflow-y-auto">
      <div className="sticky top-0 bg-white p-4 z-10 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Request Details</h2>
          <button 
            onClick={() => setShowModal(false)}
            className="text-gray-400 hover:text-gray-500 transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      
      </div>

      {selectedRequest && (
        <div className="space-y-6 p-4">
         
          {/* Travelers */}
          {(selectedRequest.adults && selectedRequest.adults.length > 0) && (
            <div className="border border-gray-100 rounded-lg overflow-hidden">
              <h3 className="bg-gray-50 px-4 py-3 text-lg font-semibold text-gray-800 flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Adult Travelers ({selectedRequest.adults.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                {selectedRequest.adults.map((adult) => (
                  <div key={adult.id} className="border border-gray-100 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <p className="font-medium text-gray-800">{adult.title} {adult.first_name} {adult.last_name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(selectedRequest.children && selectedRequest.children.length > 0) && (
            <div className="border border-gray-100 rounded-lg overflow-hidden">
              <h3 className="bg-gray-50 px-4 py-3 text-lg font-semibold text-gray-800 flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Child Travelers ({selectedRequest.children.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                {selectedRequest.children.map((child) => (
                  <div key={child.id} className="border border-gray-100 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <p className="font-medium text-gray-800">{child.first_name} {child.last_name}</p>
                    <p className="text-sm text-gray-500">{child.age} years old</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Service Specific Sections */}
          { (selectedRequest.visa && selectedRequest.service === "Visa") && (
            <div className="border border-gray-100 rounded-lg overflow-hidden">
              <h3 className="bg-gray-50 px-4 py-3 text-lg font-semibold text-gray-800 flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Visa Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                <div>
                  <p className="text-sm text-gray-500">Country</p>
                  <p className="font-medium text-gray-800">{selectedRequest.visa.country}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Appointment Date</p>
                  <p className="font-medium text-gray-800">{selectedRequest.visa.appointment_date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Travel Date</p>
                  <p className="font-medium text-gray-800">{selectedRequest.visa.travel_date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Adults/Children</p>
                  <p className="font-medium text-gray-800">{selectedRequest.visa.adults} adults, {selectedRequest.visa.childreen} children</p>
                </div>
                {selectedRequest.visa.notes && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-500">Notes</p>
                    <p className="font-medium text-gray-800 whitespace-pre-line">{selectedRequest.visa.notes}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {(selectedRequest.hotel && selectedRequest.service === "Hotel") && (
            <div className="border border-gray-100 rounded-lg overflow-hidden">
              <h3 className="bg-gray-50 px-4 py-3 text-lg font-semibold text-gray-800 flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Hotel Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                <div>
                  <p className="text-sm text-gray-500">Hotel Name</p>
                  <p className="font-medium text-gray-800">{selectedRequest.hotel.hotel_name || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Check In/Out</p>
                  <p className="font-medium text-gray-800">
                    {selectedRequest.hotel.check_in || '-'} → {selectedRequest.hotel.check_out || '-'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Nights</p>
                  <p className="font-medium text-gray-800">{selectedRequest.hotel.nights || 0}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Room Type</p>
                  <p className="font-medium text-gray-800">{selectedRequest.hotel.room_type || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Room Quantity</p>
                  <p className="font-medium text-gray-800">{selectedRequest.hotel.room_quantity || 0}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Guests</p>
                  <p className="font-medium text-gray-800">
                    {selectedRequest.hotel.adults || 0} adults, {selectedRequest.hotel.childreen || 0} children
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      </DialogPanel>
  </div>
</Dialog>


    </div>
  );
};

export default Profile;
