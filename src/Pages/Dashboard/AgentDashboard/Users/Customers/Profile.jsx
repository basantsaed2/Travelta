import React, { useEffect, useState } from 'react';
import { useGet } from '../../../../../Hooks/useGet';
import { usePost } from '../../../../../Hooks/usePostJson';
import StaticLoader from '../../../../../Components/StaticLoader';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import { FaEnvelope, FaUser,FaEdit, FaPhone, FaCalendarCheck,FaFlag ,FaMapMarkerAlt ,FaWhatsapp,FaSearch } from "react-icons/fa";
import { TextField} from "@mui/material";
import { MdClose, MdAdd } from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";
import { Link} from 'react-router-dom';

const ProfileCustomer = ({ id }) => {
  const { refetch: refetchLeadProfile, loading: loadingLeadProfile, data: LeadProfile } = useGet({url: `https://travelta.online/agent/customer/profile/${id}`});
  const { postData, loadingPost, response} = usePost({ url:'https://travelta.online/agent/customer/upload_papers' });
 
  const [data, setData] = useState([]);
  const [requests, setRequests] = useState([]);
  const [booking, serBooking] = useState([]);
  const [paper,setPaper] = useState([])
  const [showRequest,setShowRequest] = useState(false)
  const [showInfo,setShowInfo] = useState(true)
  const [showPaper,setShowPaper] = useState(false)
  const [bookingshow,setBookingShow] = useState(false)
  const [activeTab, setActiveTab] = useState("Request");

  const [attachments, setAttachments] = useState([{ id: Date.now(), type: "" }]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchText, setSearchText] = useState("");

const [showImage, setShowImage] = useState(false);
const [selectedImage, setSelectedImage] = useState(null);

const openImageModal = (imageUrl) => {
  setSelectedImage(imageUrl);
  setShowImage(true);
};

const closeImageModal = () => {
  setShowImage(false);
  setSelectedImage(null);
};


  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    refetchLeadProfile();
  }, [refetchLeadProfile]);

  useEffect(() => {
    if (LeadProfile && LeadProfile.requests && LeadProfile.customer_info) {
      setData(LeadProfile.customer_info); // Entire response
      setRequests(LeadProfile?.requests || []); // Safely set requests array
      serBooking(LeadProfile?.manuel_booking || [])
      setPaper(LeadProfile?.legal_papers || [])
    }
  }, [LeadProfile]);

  const convertFileToBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      callback(reader.result);
    };
  };

  const handleFileChange = (e, id) => {
    const file = e.target.files[0];
    if (file) {
      convertFileToBase64(file, (base64) => {
        setAttachments((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, file: base64 } : item
          )
        );
      });
    }
  };  

  const handleTypeChange = (e, id) => {
    setAttachments((prev) =>
      prev.map((item) => (item.id === id ? { ...item, type: e.target.value } : item))
    );
  };

  const addAttachment = () => {
    setAttachments([...attachments, { id: Date.now(), type: "" }]);
  };

  const removeAttachment = (id) => {
    if (attachments.length > 1) {
      setAttachments(attachments.filter((item) => item.id !== id));
    }
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();
  
    const formData = new FormData();
    // formData.append('customer_id', id); // Ensure customer_id is sent at the root level

    attachments.forEach((attachment, index) => {
        if (attachment.file) {
            formData.append(`images[${index}][image]`, attachment.file); // Image file
        }
        formData.append(`images[${index}][type]`, attachment.type); // Image type
        formData.append(`images[${index}][customer_id]`, id); // Add customer_id for each image
    });

    // Send data to API
    postData(formData, 'Attachments Added Success');
  };

  if (loadingLeadProfile) {
    return <StaticLoader />;
  }

  const headersRequest = ['Agent','Service','Expected_Revenue',"Priority","Stage","Action"];
  const headersBooking = ['Supplier','Service','Price',"Check_In","Check_Out","Action"];

  return (
    <div className="p-2">

    <div className="shadow-lg w-full lg:w-[70%] rounded-2xl p-4 md:p-6  border border-gray-300 transition-all hover:shadow-2xl relative bg-white flex flex-col md:flex-row gap-6 items-center">
      {/* Left: Profile Image */}
      <div className='w-full md:w-1/2 flex flex-col gap-3'>
      <div className="relative flex justify-center ">
        <img
          src={data?.image_link || "https://via.placeholder.com/150"}
          alt="User Profile"
          className="md:w-36 md:h-36 w-full h-64 object-fit rounded-lg border border-gray-300 shadow-md"
        />
      </div>
      <h3 className="text-xl font-semibold text-mainColor text-center">{data?.name || '_'}</h3>
      </div>

      {/* Right: User Details */}
      <div className="w-full space-y-2">
        <span className="inline-block bg-green-200 text-green-700 text-sm font-medium px-3 py-1 rounded-full">Active</span>

        {/* Contact Info */}
        <div className=" grid grid-cols-2">
          <p className="flex items-center gap-3 text-gray-700">
            <FaPhone className="text-mainColor" />
            {data?.phone || "-"}
          </p>
          <p className="flex items-center gap-3 text-gray-700">
            <FaWhatsapp className="text-mainColor" />
            {data?.watts || "-"}
          </p>
          <p className="flex items-center gap-3 text-gray-700">
            <FaEnvelope className="text-mainColor" />
            {data?.email || "-"}
          </p>
          <p className="flex items-center gap-3 text-gray-700">
            <FaFlag className="text-mainColor" />
            {data?.nationality?.name || "-"}
          </p>
          <p className="flex items-center gap-3 text-gray-700">
            <FaFlag className="text-mainColor" />
            {data?.country?.name || "-"}
          </p>
          <p className="flex items-center gap-3 text-gray-700">
            <FaMapMarkerAlt className="text-mainColor" />
            {data?.city?.name || "-"}
          </p>
        </div>

        {/* Button */}
        <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-5 py-2 rounded-lg mt-4 hover:bg-blue-700">
          Upload Attachments
        </button>
      </div>
    </div>

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
            <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg">
              Submit
            </button>
          </div>
        </div>
      </div>
    )}

    <div className="md:p-5 p-2">
      {/* Tabs */}
      <div className="flex justify-center bg-gray-100 p-2 rounded-lg shadow-md mb-6">
        {["Request", "Booking", "Legal Paper"].map((tab) => (
          <button
            key={tab}
            className={`md:px-6 px-2 py-3 text-md md:text-lg font-semibold transition-all duration-300 rounded-lg mx-1
              ${activeTab === tab 
                ? "bg-mainColor text-white shadow-lg" 
                : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"}`
            }
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {(activeTab === "Request" || activeTab === "Booking") && (
        <div className="flex items-center gap-4 bg-white p-6 shadow-xl rounded-2xl border border-gray-200 mb-6">
          <div className="relative w-full md:w-[300px]">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or phone..."
              value={searchText}
              onChange={handleSearch}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-mainColor focus:border-mainColor outline-none transition-all"
            />
          </div>
        </div>
      )}

      {/* Tab Content */}
      <div className="mt-5">
        {activeTab === "Request" && (
          <div className="overflow-x-auto">
            {requests.length === 0 ? (
              <p className="text-center text-xl text-mainColor">No requests found</p>
            ) : (
              <div className="w-full sm:min-w-0">
                <div className="w-full sm:min-w-0 block overflow-x-scroll scrollSection border-collapse">
                <table className="w-full min-w-[600px]">
                      {/* Table Header */}
                      <thead className="bg-gray-200 text-gray-700">
                        <tr className="border-t-2 border-b-2">
                          <th className="w-[50px] text-mainColor bg-mainBgColor text-center font-medium sm:text-sm lg:text-base xl:text-lg p-2 border-b-2">
                            SL
                          </th>
                          {headersRequest.map((name, index) => (
                            <th
                              key={index}
                              className="min-w-[120px] text-mainColor bg-mainBgColor text-center font-medium sm:text-sm lg:text-base xl:text-lg py-3 border-b-2"
                            >
                              {name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      {/* Table Body */}
                      <tbody>
                        {requests.length === 0 ? (
                          <tr>
                            <td colSpan={headers.length} className="text-center text-xl text-gray-500 py-4">
                              No Requests Found
                            </td>
                          </tr>
                        ) : (
                          requests.map((request, index) => (
                            <tr
                              key={index}
                              className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-100"} transition hover:bg-gray-100`}
                            >
                              <td className="text-center py-2 text-gray-600">{index + 1}</td>
                              <td className="text-center py-2 text-gray-600">{request?.agent || "-"}</td>
                              <td className="text-center py-2 text-gray-600">{request?.service || "-"}</td>
                              <td className="text-center py-2 text-gray-600">{request?.expected_revenue || "-"} {request?.currecy || "-"}</td>
                              <td className="text-center py-2 text-gray-600">{request?.priority || "-"}</td>
                              <td className="text-center py-2 text-gray-600">{request?.stages || "-"}</td>
                              <td className="text-center py-2">
                                <div className="flex items-center justify-center gap-1">
                                <Link to={`edit/${request.id}`}  ><FaEdit color='#4CAF50' size="24"/></Link>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                </table>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "Booking" && (
          <div className="overflow-x-auto">
            {booking.length === 0 ? (
              <p className="text-center text-xl text-mainColor">No Booking found</p>
            ) : (
              <div className="w-full sm:min-w-0">
                <div className="w-full sm:min-w-0 block overflow-x-scroll scrollSection border-collapse">
                <table className="w-full min-w-[600px]">
                      {/* Table Header */}
                      <thead className="bg-gray-200 text-gray-700">
                        <tr className="border-t-2 border-b-2">
                          <th className="w-[50px] text-mainColor bg-mainBgColor text-center font-medium sm:text-sm lg:text-base xl:text-lg p-2 border-b-2">
                            SL
                          </th>
                          {headersBooking.map((name, index) => (
                            <th
                              key={index}
                              className="min-w-[120px] text-mainColor bg-mainBgColor text-center font-medium sm:text-sm lg:text-base xl:text-lg py-3 border-b-2"
                            >
                              {name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      {/* Table Body */}
                      <tbody>
                        {booking.length === 0 ? (
                          <tr>
                            <td colSpan={headers.length} className="text-center text-xl text-gray-500 py-4">
                              No Booking Found
                            </td>
                          </tr>
                        ) : (
                          booking.map((book, index) => (
                            <tr
                              key={index}
                              className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-100"} transition hover:bg-gray-100`}
                            >
                              <td className="text-center py-2 text-gray-600">{index + 1}</td>
                              <td className="text-center py-2 text-gray-600">{book?.supplier_from_name || "-"}</td>
                              <td className="text-center py-2 text-gray-600">{book?.type || "-"}</td>
                              <td className="text-center py-2 text-gray-600">{book?.total_price || "-"} </td>
                              <td className="text-center py-2 text-gray-600">{book?.check_in || "-"}</td>
                              <td className="text-center py-2 text-gray-600">{book?.check_out || "-"}</td>
                              <td className="text-center py-2">
                                <div className="flex items-center justify-center gap-1">
                                <Link to={`edit/${book.id}`}  ><FaEdit color='#4CAF50' size="24"/></Link>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                </table>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "Legal Paper" && (
                <div className="p-6">

                {paper.length === 0 ? (
                  <p className="text-center text-xl text-mainColor">No Legal Paper found</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 gap-6">
                    {paper.map((item, index) => (
                      <div
                        key={index}
                        className="relative bg-white bg-opacity-80 shadow-xl border border-gray-200 rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105"
                      >
                        <div className="relative">
                          <img
                            src={item.image_link}
                            alt={`Legal Paper ${item.id}`}
                            className="w-full h-56 object-fit rounded-t-2xl cursor-pointer"
                            onClick={() => openImageModal(item.image_link)}
                          />
                          <div className="absolute top-2 left-2 bg-gradient-to-r from-mainBgColor to-mainColor text-white text-xs font-semibold px-3 py-1 rounded-lg shadow-md">
                            #{index + 1}
                          </div>
                        </div>
                        <div className="p-4 text-center">
                          <p className="text-lg font-semibold text-gray-800">{item.type || "Unknown Type"}</p>
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

              {showImage && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-4 rounded-lg shadow-lg relative max-w-lg">
                  <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                    onClick={closeImageModal}
                  >
                    ✖
                  </button>
                  <img src={selectedImage} alt="Enlarged Legal Paper" className="w-full h-auto rounded-lg" />
                </div>
              </div>
            )}

              </div>
        )}

      </div>
    </div>

    </div>
  );
};

export default ProfileCustomer;
