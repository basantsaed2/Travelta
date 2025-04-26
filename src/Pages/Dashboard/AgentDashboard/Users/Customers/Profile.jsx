import React, { useEffect, useState } from 'react';
import { useGet } from '../../../../../Hooks/useGet';
import { usePost } from '../../../../../Hooks/usePostJson';
import StaticLoader from '../../../../../Components/StaticLoader';
import {
  FaPhone, FaUser, FaWhatsapp, FaEnvelope, FaFlag, 
  FaMapMarkerAlt, FaGlobe,
  FaCalendarAlt, FaEye, FaEdit,
 FaCalendarCheck, FaSearch,FaPaperPlane ,FaInfoCircle 
} from "react-icons/fa";
import { TextField } from "@mui/material";
import { MdClose, MdAdd } from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { useParams } from 'react-router-dom';
const ProfileCustomer = () => {
  const {id} = useParams();
  const { refetch: refetchCustomerProfile, loading: loadingCustomerProfile, data: CustomerProfile } = useGet({
    url: `https://travelta.online/agent/customer/profile/${id}`
  });
  const { postData, loadingPost, response } = usePost({ 
    url: 'https://travelta.online/agent/customer/upload_papers' 
  });
  const { postData:postUpdate, loadingPost:loadingUpdate, response:responseUpdate } = usePost({ url: `https://travelta.online/agent/customer/update/${id}`});

  const [data, setData] = useState([]);
  const [requests, setRequests] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [papers, setPapers] = useState([]);
  const [activeTab, setActiveTab] = useState("Requests");
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [attachments, setAttachments] = useState([{ id: Date.now(), type: "" }]);
  const [showImage, setShowImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [phone, setPhone] = useState('');
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [currentPhone, setCurrentPhone] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    refetchCustomerProfile();
  }, [refetchCustomerProfile]);

  useEffect(() => {
    if (CustomerProfile) {
      setData(CustomerProfile.customer_info || {});
      setRequests(CustomerProfile.requests || []);
      setBookings(CustomerProfile.manuel_booking || []);
      setPapers(CustomerProfile.legal_papers || []);
      setCurrentPhone(CustomerProfile.customer_info.phone)
    }
  }, [CustomerProfile]);

  useEffect(() => {
    if (!loadingPost && response){
      setIsModalOpen(false);
      refetchCustomerProfile();
    }
  }, [loadingPost,response]);

  useEffect(() => {
    if (!loadingUpdate && responseUpdate) {
      setShowPhoneModal(false);
      refetchCustomerProfile();
    }
  }, [loadingUpdate,responseUpdate]);

  // Search handler
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter data based on search query
  const filteredRequests = requests.filter(req => 
    req.to_name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    req.to_phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.service?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredBookings = bookings.filter(booking => 
    booking.supplier_from_name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    booking.type?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(
    activeTab === "Requests" ? filteredRequests.length / rowsPerPage : 
    activeTab === "Bookings" ? filteredBookings.length / rowsPerPage : 
    papers.length / rowsPerPage
  );

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const currentRequests = filteredRequests.slice(startIndex, endIndex);
  const currentBookings = filteredBookings.slice(startIndex, endIndex);
  const currentPapers = papers.slice(startIndex, endIndex);

  const handlePrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handleRowsChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Attachment handling
  const convertFileToBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => callback(reader.result);
  };

  const handleFileChange = (e, id) => {
    const file = e.target.files[0];
    if (file) {
      convertFileToBase64(file, (base64) => {
        setAttachments(prev => prev.map(item => 
          item.id === id ? { ...item, file: base64 } : item
        ));
      });
    }
  };  

  const handleTypeChange = (e, id) => {
    setAttachments(prev => prev.map(item => 
      item.id === id ? { ...item, type: e.target.value } : item
    ));
  };

  const addAttachment = () => {
    setAttachments([...attachments, { id: Date.now(), type: "" }]);
  };

  const removeAttachment = (id) => {
    if (attachments.length > 1) {
      setAttachments(attachments.filter(item => item.id !== id));
    }
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();
    const formData = new FormData();

    attachments.forEach((attachment, index) => {
      if (attachment.file) {
        formData.append(`images[${index}][image]`, attachment.file);
      }
      formData.append(`images[${index}][type]`, attachment.type);
      formData.append(`images[${index}][customer_id]`, id);
    });

    postData(formData, 'Attachments Added Success');
 
  };
  const handleSubmitUpdate = async (e) => { 
    e.preventDefault();
    const formData = new FormData();
    formData.append('phone', phone);
    postUpdate(formData, 'Phone number change request sent successfully');
  };

  // Image modal handlers
  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowImage(true);
  };

  const closeImageModal = () => {
    setShowImage(false);
    setSelectedImage(null);
  };

  // View details handler
  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  if (loadingCustomerProfile) {
    return <StaticLoader />;
  }

  return (
    <div className="p-2 space-y-6">
      {/* Profile Card */}
      <div className="bg-white shadow-xl rounded-2xl border border-gray-200 p-6 w-full hover:shadow-2xl transition-all duration-300">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex flex-col items-center w-full md:w-1/4 gap-3">
            <img 
              src={data?.image_link || ''} 
              alt="Profile" 
              className="w-36 h-36 object-cover rounded-xl border border-gray-300 shadow-md" 
            />
          </div>

          {/* Customer Info */}
          <div className="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {/* Customer Info Fields */}
              {[
                [FaUser, "Customer", data?.name],
                [FaPhone, "Phone", 
                  <div key="phone-container" className="inline-flex flex-row items-center gap-2 min-w-0 flex-shrink-0">
                    <span className="whitespace-nowrap">{currentPhone || "-"}</span>
                    <button 
                      onClick={() => {
                        setPhone(currentPhone);
                        setShowPhoneModal(true);
                      }}
                      className="text-blue-500 hover:text-blue-700 transition-colors"
                      title="Request phone number change"
                    >
                      <FaEdit size={18} />
                    </button>
                  </div>
                ],
                [FaPhone, "Alternative Phone", data?.emergency_phone],  // Added emergency phone
                [FaWhatsapp, "WhatsApp", data?.watts],
                [FaEnvelope, "Email", data?.email],
                [FaFlag, "Nationality", data?.nationality?.name],
                [FaGlobe, "Country", data?.country?.name],
                [FaMapMarkerAlt, "City", data?.city?.name],
                [FaCalendarAlt, "Date Added", data?.date_added?.split(" ")[0]],
                [FaCalendarCheck, "Total Bookings", data?.total_booking],  // Added total bookings
              ].map(([Icon, label, value], idx) => (
                <div key={idx} className="flex items-start gap-2 text-gray-700 text-sm sm:text-base break-words min-w-0">
                  <Icon className="text-mainColor mt-1" />
                  <span><span className="font-semibold">{label}:</span> {value || "-"}</span>
                </div>
              ))}
              
              {/* Upload Attachment Button - spans full width on mobile, fits grid on larger screens */}
              <div className="col-span-1 md:col-span-2 xl:col-span-1 flex items-center">
                <button 
                  onClick={() => setIsModalOpen(true)} 
                  className="w-full md:w-auto bg-mainColor text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <MdAdd size={18} />
                  <span>Upload Attachments</span>
                </button>
              </div>
            </div>
        </div>
      </div>

      {/* Phone Change Request Modal */}
      <Dialog open={showPhoneModal} onClose={() => setShowPhoneModal(false)} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/50" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md bg-white rounded-2xl p-8 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Update Phone Number</h2>
              <button 
                onClick={() => setShowPhoneModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <MdClose size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmitUpdate}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={currentPhone}
                      readOnly
                      className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter new phone number"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-mainColor focus:border-mainColor outline-none transition-all"
                      required
                      pattern="[0-9]{10,15}" // Basic phone number validation
                      title="Please enter a valid phone number (10-15 digits)"
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-mainColor text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <FaPaperPlane className="inline" />
                    Submit Change Request
                  </button>
                </div>
                
                <div className="text-xs text-gray-500 mt-2">
                  <FaInfoCircle className="inline mr-1" />
                  Your request will be reviewed by our team. You'll receive a confirmation once approved.
                </div>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Upload Attachments Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
          <div className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl p-6 overflow-y-auto max-h-[80vh]">
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            >
              <MdClose size={28} />
            </button>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Upload Attachments</h2>
            <div className="space-y-4">
              {attachments.map((attachment, index) => (
                <div 
                  key={attachment.id} 
                  className="flex flex-col md:flex-row items-start md:items-center gap-4 border p-4 rounded-lg shadow-sm"
                >
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <span className="text-lg font-semibold text-gray-700">{index + 1}.</span>
                    <TextField
                      label="Image Type"
                      variant="outlined"
                      size="small"
                      className="w-full sm:w-48"
                      value={attachment.type}
                      onChange={(e) => handleTypeChange(e, attachment.id)}
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full">
                    <input
                      type="file"
                      accept="image/*, application/pdf"
                      onChange={(e) => handleFileChange(e, attachment.id)}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                    {attachments.length > 1 && index > 0 && (
                      <button 
                        onClick={() => removeAttachment(attachment.id)} 
                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                      >
                        <MdClose size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button 
                onClick={addAttachment} 
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                <MdAdd size={20} /> Add More
              </button>
              <button 
                onClick={handleSubmit} 
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
                disabled={loadingPost}
              >
                {loadingPost ? 'Uploading...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabs Section */}
      <div className="bg-white shadow-xl rounded-2xl border border-gray-200 p-6">
        {/* Tabs Navigation */}
        <div className="flex justify-center bg-gray-100 p-2 rounded-lg shadow-md mb-6">
          {["Requests", "Bookings", "Legal Papers"].map((tab) => (
            <button
              key={tab}
              className={`md:px-6 px-2 py-3 text-md md:text-lg font-semibold transition-all duration-300 rounded-lg mx-1 ${
                activeTab === tab 
                  ? "bg-mainColor text-white shadow-lg" 
                  : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"
              }`}
              onClick={() => {
                setActiveTab(tab);
                setCurrentPage(1);
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search and Pagination Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div className="relative w-full md:w-1/2">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={`Search ${activeTab.toLowerCase()}...`}
              value={searchQuery}
              onChange={handleSearch}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-mainColor focus:border-mainColor outline-none transition-all"
            />
          </div>

          <div className="flex items-center space-x-2 w-full md:w-auto">
            <label className="text-gray-700 font-medium whitespace-nowrap">Rows per page:</label>
            <select
              onChange={handleRowsChange}
              value={rowsPerPage}
              className="bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border border-gray-300 outline-none cursor-pointer"
            >
              <option value="5">5 rows</option>
              <option value="10">10 rows</option>
              <option value="20">20 rows</option>
              <option value="30">30 rows</option>
              <option value="50">50 rows</option>
            </select>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-5">
          {/* Requests Tab */}
          {activeTab === "Requests" && (
            <div className="overflow-x-auto">
              {filteredRequests.length === 0 ? (
                <p className="text-center text-xl text-mainColor">No requests found</p>
              ) : (
                <div className="w-full block overflow-x-auto scrollSection">
                  <table className="w-full min-w-[600px]">
                    <thead className="bg-gray-200 text-gray-700">
                      <tr className="border-t-2 border-b-2">
                        <th className="w-[50px] text-mainColor bg-mainBgColor text-center font-medium p-2 border-b-2">SL</th>
                        <th className="min-w-[120px] text-mainColor bg-mainBgColor text-center font-medium py-3 border-b-2">Client Name</th>
                        <th className="min-w-[120px] text-mainColor bg-mainBgColor text-center font-medium py-3 border-b-2">Client Phone</th>
                        <th className="min-w-[120px] text-mainColor bg-mainBgColor text-center font-medium py-3 border-b-2">Agent</th>
                        <th className="min-w-[120px] text-mainColor bg-mainBgColor text-center font-medium py-3 border-b-2">Service</th>
                        <th className="min-w-[120px] text-mainColor bg-mainBgColor text-center font-medium py-3 border-b-2">Expected Revenue</th>
                        <th className="min-w-[120px] text-mainColor bg-mainBgColor text-center font-medium py-3 border-b-2">Priority</th>
                        <th className="min-w-[120px] text-mainColor bg-mainBgColor text-center font-medium py-3 border-b-2">Stage</th>
                        <th className="min-w-[120px] text-mainColor bg-mainBgColor text-center font-medium py-3 border-b-2">Details</th>
                        <th className="min-w-[120px] text-mainColor bg-mainBgColor text-center font-medium py-3 border-b-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentRequests.map((request, index) => (
                        <tr key={index} className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-100"} hover:bg-gray-50`}>
                          <td className="text-center py-2 text-gray-600">{startIndex + index + 1}</td>
                          <td className="text-center py-2 text-gray-600">{request?.to_name || "-"}</td>
                          <td className="text-center py-2 text-gray-600">{request?.to_phone || "-"}</td>
                          <td className="text-center py-2 text-gray-600">{request?.agent || "-"}</td>
                          <td className="text-center py-2 text-gray-600">{request?.service || "-"}</td>
                          <td className="text-center py-2 text-gray-600">{request?.expected_revenue || "-"} {request?.currecy || "-"}</td>
                          <td className="text-center py-2 text-gray-600">{request?.priority || "-"}</td>
                          <td className="text-center py-2 text-gray-600">{request?.stages || "-"}</td>
                          <td className="text-center py-2">
                            <button
                              onClick={() => handleViewDetails(request)}
                              className="text-blue-600 hover:underline"
                            >
                              <FaEye className="inline mr-1" /> View
                            </button>
                          </td>
                          <td className="text-center py-2">
                            <div className="flex items-center justify-center gap-1">
                              <Link to={`/dashboard_agent/requests/edit_request/${request.id}`}>
                                <FaEdit color='#4CAF50' size="20" />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Bookings Tab */}
          {activeTab === "Bookings" && (
            <div className="overflow-x-auto">
              {filteredBookings.length === 0 ? (
                <p className="text-center text-xl text-mainColor">No bookings found</p>
              ) : (
                <div className="w-full block overflow-x-auto scrollSection">
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
                        <th className="min-w-[120px] text-mainColor bg-mainBgColor text-center font-medium py-3 border-b-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentBookings.map((booking, index) => (
                        <tr key={index} className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-100"} hover:bg-gray-50`}>
                          <td className="text-center py-2 text-gray-600">{startIndex + index + 1}</td>
                          <td className="text-center py-2 text-gray-600">{booking?.supplier_from_name || "-"}</td>
                          <td className="text-center py-2 text-gray-600">{booking?.type || "-"}</td>
                          <td className="text-center py-2 text-gray-600">{booking?.total_price || "-"}</td>
                          <td className="text-center py-2 text-gray-600">{booking?.check_in || "-"}</td>
                          <td className="text-center py-2 text-gray-600">{booking?.check_out || "-"}</td>
                          <td className="text-center py-2">
                            <button
                              onClick={() => handleViewDetails(booking)}
                              className="text-blue-600 hover:underline"
                            >
                              <FaEye className="inline mr-1" /> View
                            </button>
                          </td>
                          <td className="text-center py-2">
                            <div className="flex items-center justify-center gap-1">
                              <Link to={`edit/${booking.id}`}>
                                <FaEdit color='#4CAF50' size="20" />
                              </Link>
                            </div>
                          </td>
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
            <div className="p-4">
              {papers.length === 0 ? (
                <p className="text-center text-xl text-mainColor">No legal papers found</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentPapers.map((item, index) => (
                    <div
                      key={index}
                      className="relative bg-white bg-opacity-80 shadow-xl border border-gray-200 rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105"
                    >
                      <div className="relative">
                        <img
                          src={item.image_link}
                          alt={`Legal Paper ${item.id}`}
                          className="w-full h-56 object-cover rounded-t-2xl cursor-pointer"
                          onClick={() => openImageModal(item.image_link)}
                        />
                        <div className="absolute top-2 left-2 bg-gradient-to-r from-mainBgColor to-mainColor text-white text-xs font-semibold px-3 py-1 rounded-lg shadow-md">
                          #{startIndex + index + 1}
                        </div>
                      </div>
                      <div className="p-4 text-center">
                        <p className="text-lg font-semibold text-gray-800">{item.type || "Unknown Type"}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Uploaded: {new Date(item.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        className="absolute bottom-3 right-3 bg-mainColor text-white p-2 rounded-full shadow-lg hover:bg-opacity-90 transition"
                        onClick={() => openImageModal(item.image_link)}
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

        {/* Pagination Controls */}
        {(activeTab === "Requests" || activeTab === "Bookings" || activeTab === "Legal Papers") && (
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg ${
                currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`px-4 py-2 rounded-lg ${
                currentPage === totalPages || totalPages === 0 
                  ? "bg-gray-300 cursor-not-allowed" 
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Image Preview Modal */}
      {showImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg relative max-w-4xl w-full">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={closeImageModal}
            >
              <MdClose size={24} />
            </button>
            <img 
              src={selectedImage} 
              alt="Enlarged Document" 
              className="w-full h-auto max-h-[80vh] rounded-lg" 
            />
          </div>
        </div>
      )}

      {/* Details Modal */}
      <Dialog open={showModal} onClose={() => setShowModal(false)} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/50" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-4xl bg-white rounded-2xl p-8 shadow-xl transform transition-all duration-300 scale-95 hover:scale-100 max-h-screen overflow-y-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              {activeTab === "Requests" ? "Request Details" : 
              activeTab === "Bookings" ? "Booking Details" : "Document Details"}
            </h2>
            
            {selectedItem && (
              <div className="space-y-4">
                {activeTab === "Requests" && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                      <p className="text-gray-700"><strong>Agent:</strong> {selectedItem.agent || "-"}</p>
                      <p className="text-gray-700"><strong>Service:</strong> {selectedItem.service || "-"}</p>
                      <p className="text-gray-700"><strong>Customer Name:</strong> {selectedItem.to_name || "-"}</p>
                      <p className="text-gray-700"><strong>Customer Phone:</strong> {selectedItem.to_phone || "-"}</p>
                      <p className="text-gray-700"><strong>Expected Revenue:</strong> {selectedItem.expected_revenue || "-"} {selectedItem.currecy || "-"}</p>
                      <p className="text-gray-700"><strong>Priority:</strong> {selectedItem.priority || "-"}</p>
                      <p className="text-gray-700"><strong>Stage:</strong> {selectedItem.stages || "-"}</p>
                      <p className="text-gray-700"><strong>Created At:</strong> {selectedItem.created_at || "-"}</p>
                    </div>

                    {/* Adults List */}
                    {selectedItem.adults?.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-medium text-gray-700 mb-2">Adult Passengers</h4>
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {selectedItem.adults.map((adult, index) => (
                                <tr key={index}>
                                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{adult.title || "-"}</td>
                                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{adult.first_name || "-"}</td>
                                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{adult.last_name || "-"}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Children List */}
                    {selectedItem.children?.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-medium text-gray-700 mb-2">Child Passengers</h4>
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {selectedItem.children.map((child, index) => (
                                <tr key={index}>
                                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{child.first_name || "-"}</td>
                                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{child.last_name || "-"}</td>
                                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{child.age || "-"}</td>
                                </tr>
                              ))}
                              </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Visa Details */}
                    {selectedItem.visa && (
                      <div className="mt-4 border-t pt-4 border-gray-200">
                        <h3 className="font-semibold text-lg text-gray-800">Visa Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-2">
                          <p className="text-gray-700"><strong>Country:</strong> {selectedItem.visa.country || "-"}</p>
                          <p className="text-gray-700"><strong>Appointment Date:</strong> {selectedItem.visa.appointment_date || "-"}</p>
                          <p className="text-gray-700"><strong>Travel Date:</strong> {selectedItem.visa.travel_date || "-"}</p>
                          <p className="text-gray-700"><strong>Adults:</strong> {selectedItem.visa.adults || "-"}</p>
                          <p className="text-gray-700"><strong>Children:</strong> {selectedItem.visa.childreen || "-"}</p>
                        </div>
                      </div>
                    )}

                    {/* Hotel Details */}
                    {selectedItem.hotel && (
                      <div className="mt-4 border-t pt-4 border-gray-200">
                        <h3 className="font-semibold text-lg text-gray-800">Hotel Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-2">
                          <p className="text-gray-700"><strong>Hotel Name:</strong> {selectedItem.hotel.hotel_name || "-"}</p>
                          <p className="text-gray-700"><strong>Check In:</strong> {selectedItem.hotel.check_in || "-"}</p>
                          <p className="text-gray-700"><strong>Check Out:</strong> {selectedItem.hotel.check_out || "-"}</p>
                          <p className="text-gray-700"><strong>Rooms:</strong> {selectedItem.hotel.rooms || "-"}</p>
                          <p className="text-gray-700"><strong>Guests:</strong> {selectedItem.hotel.guests || "-"}</p>
                        </div>
                      </div>
                    )}

                    {/* Flight Details */}
                    {selectedItem.flight && (
                      <div className="mt-4 border-t pt-4 border-gray-200">
                        <h3 className="font-semibold text-lg text-gray-800">Flight Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-2">
                          <p className="text-gray-700"><strong>Airline:</strong> {selectedItem.flight.airline || "-"}</p>
                          <p className="text-gray-700"><strong>Departure:</strong> {selectedItem.flight.departure || "-"}</p>
                          <p className="text-gray-700"><strong>Arrival:</strong> {selectedItem.flight.arrival || "-"}</p>
                          <p className="text-gray-700"><strong>Departure Date:</strong> {selectedItem.flight.departure_date || "-"}</p>
                          <p className="text-gray-700"><strong>Return Date:</strong> {selectedItem.flight.return_date || "-"}</p>
                        </div>
                      </div>
                    )}

                    {/* Bus Details */}
                    {selectedItem.bus && (
                      <div className="mt-4 border-t pt-4 border-gray-200">
                        <h3 className="font-semibold text-lg text-gray-800">Bus Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-2">
                          <p className="text-gray-700"><strong>Operator:</strong> {selectedItem.bus.operator || "-"}</p>
                          <p className="text-gray-700"><strong>Departure:</strong> {selectedItem.bus.departure || "-"}</p>
                          <p className="text-gray-700"><strong>Destination:</strong> {selectedItem.bus.destination || "-"}</p>
                          <p className="text-gray-700"><strong>Departure Date:</strong> {selectedItem.bus.departure_date || "-"}</p>
                          <p className="text-gray-700"><strong>Seats:</strong> {selectedItem.bus.seats || "-"}</p>
                        </div>
                      </div>
                    )}

                    {/* Tour Details */}
                    {selectedItem.tour && (
                      <div className="mt-4 border-t pt-4 border-gray-200">
                        <h3 className="font-semibold text-lg text-gray-800">Tour Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-2">
                          <p className="text-gray-700"><strong>Tour Name:</strong> {selectedItem.tour.tour_name || "-"}</p>
                          <p className="text-gray-700"><strong>Start Date:</strong> {selectedItem.tour.start_date || "-"}</p>
                          <p className="text-gray-700"><strong>End Date:</strong> {selectedItem.tour.end_date || "-"}</p>
                          <p className="text-gray-700"><strong>Participants:</strong> {selectedItem.tour.participants || "-"}</p>
                        </div>
                      </div>
                    )}

                    {/* General Notes */}
                    {selectedItem.notes && (
                      <div className="mt-4 border-t pt-4 border-gray-200">
                        <h3 className="font-semibold text-lg text-gray-800">Additional Notes</h3>
                        <p className="text-gray-600 mt-2">{selectedItem.notes}</p>
                      </div>
                    )}
                  </>
                )}

                {/* Rest of the modal content for Bookings and Legal Papers remains the same */}
                {activeTab === "Bookings" && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                      <p className="text-gray-700"><strong>Supplier:</strong> {selectedItem.supplier_from_name || "-"}</p>
                      <p className="text-gray-700"><strong>Service Type:</strong> {selectedItem.type || "-"}</p>
                      <p className="text-gray-700"><strong>Price:</strong> {selectedItem.total_price || "-"}</p>
                      <p className="text-gray-700"><strong>Check In:</strong> {selectedItem.check_in || "-"}</p>
                      <p className="text-gray-700"><strong>Check Out:</strong> {selectedItem.check_out || "-"}</p>
                      <p className="text-gray-700"><strong>Status:</strong> {selectedItem.status || "-"}</p>
                      <p className="text-gray-700"><strong>Booking Date:</strong> {selectedItem.created_at || "-"}</p>
                    </div>
                    {selectedItem.notes && (
                      <div className="mt-4 border-t pt-4 border-gray-200">
                        <h3 className="font-semibold text-lg text-gray-800">Notes</h3>
                        <p className="text-gray-600 mt-2">{selectedItem.notes}</p>
                      </div>
                    )}
                  </>
                )}

                {activeTab === "Legal Papers" && (
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <img 
                        src={selectedItem.image_link} 
                        alt="Legal Document" 
                        className="max-w-full h-auto max-h-96 rounded-lg border border-gray-200"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                      <p className="text-gray-700"><strong>Document Type:</strong> {selectedItem.type || "-"}</p>
                      <p className="text-gray-700"><strong>Uploaded On:</strong> {new Date(selectedItem.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 rounded-lg bg-mainColor text-white hover:bg-blue-700 transition-colors duration-300"
              >
                Close
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default ProfileCustomer;
