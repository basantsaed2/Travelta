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
  FaEye,
  FaChevronDown,
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
            to="/dashboard_agent/requests/new_request"
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
                {['SL', 'Name', 'Phone', 'Service', 'Stage', 'Agent', 'Priority', 'Action'].map((header, i) => (
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
        <DialogBackdrop className="fixed inset-0 bg-black/50" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-2xl bg-white rounded-2xl p-8 shadow-xl transform transition-all duration-300 scale-95 hover:scale-100 max-h-screen overflow-y-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Request Details</h2>
            {selectedRequest && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <p className="text-gray-700"><strong>Name:</strong> {selectedRequest.to_name}</p>
                  <p className="text-gray-700"><strong>Phone:</strong> {selectedRequest.to_phone}</p>
                  <p className="text-gray-700"><strong>Service:</strong> {selectedRequest.service}</p>
                  <p className="text-gray-700"><strong>Stage:</strong> {selectedRequest.stages}</p>
                  <p className="text-gray-700"><strong>Priority:</strong> {selectedRequest.priority}</p>
                  <p className="text-gray-700"><strong>Agent:</strong> {selectedRequest.agent}</p>
                  <p className="text-gray-700"><strong>Expected Revenue:</strong> {selectedRequest.expected_revenue} {selectedRequest.currecy}</p>
                </div>

                {/* Conditionally Render Service Type */}
                {selectedRequest.visa && (
                  <div className="mt-4 border-t pt-4 border-gray-200">
                    <h3 className="font-semibold text-lg text-gray-800">Visa Information</h3>
                    <div className="space-y-2 mt-3">
                      <p className="text-gray-600"><strong>Country:</strong> {selectedRequest.visa.country}</p>
                      <p className="text-gray-600"><strong>Appointment Date:</strong> {selectedRequest.visa.appointment_date}</p>
                      <p className="text-gray-600"><strong>Travel Date:</strong> {selectedRequest.visa.travel_date}</p>
                      <p className="text-gray-600"><strong>Notes:</strong> {selectedRequest.visa.notes}</p>
                      <p className="text-gray-600"><strong>Adults:</strong> {selectedRequest.visa.adults}</p>
                      <p className="text-gray-600"><strong>Children:</strong> {selectedRequest.visa.childreen}</p>
                    </div>
                  </div>
                )}

                {/* Additional sections like Tour, Hotel, and Bus can be added below as needed */}

              </div>
            )}

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 rounded-lg bg-mainColor text-white hover:bg-blue-700 transition-colors duration-300"
              >
                Close
              </button>
              {/* You can add a "Save Changes" or "Edit" button here if needed */}
            </div>
          </DialogPanel>
        </div>
      </Dialog>


    </div>
  );
};

export default Profile;
