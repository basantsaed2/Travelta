import React, { useEffect, useState } from 'react';
import { useGet } from '../../../../../Hooks/useGet';
import StaticLoader from '../../../../../Components/StaticLoader';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import { FaEnvelope, FaUser, FaPhone, FaCalendarCheck,FaFlag ,FaMapMarkerAlt ,FaWhatsapp } from "react-icons/fa";

const ProfileCustomer = ({ id }) => {
  const { refetch: refetchLeadProfile, loading: loadingLeadProfile, data: LeadProfile } = useGet({
    url: `https://travelta.online/agent/customer/profile/${id}`,
  });
  const [data, setData] = useState([]);
  const [requests, setRequests] = useState([]);
  const [booking, serBooking] = useState([]);
  const [paper,setPaper] = useState([])
    const [showRequest,setShowRequest] = useState(false)
    const [showInfo,setShowInfo] = useState(true)
    const [showPaper,setShowPaper] = useState(false)
    const [bookingshow,setBookingShow] = useState(false)
    const [activeTab, setActiveTab] = useState("Request");

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

  if (loadingLeadProfile) {
    return <StaticLoader />;
  }

  return (
    <div className="p-2">

<div className="shadow-lg w-full lg:w-[70%] rounded-2xl p-4 md:p-6  border border-gray-300 transition-all hover:shadow-2xl relative bg-white flex flex-col md:flex-row gap-6 items-center">
  {/* Left: Profile Image */}
  <div className='w-full md:w-1/2 flex flex-col gap-3'>
  <div className="relative flex justify-center ">
    <img
      src={data?.image_link || "https://via.placeholder.com/150"}
      alt="User Profile"
      className="w-36 h-36  object-fit rounded-lg border border-gray-300 shadow-md"
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
    <button className="bg-blue-600 text-white px-5 py-2 rounded-lg mt-4 hover:bg-blue-700">
      View Attachments
    </button>
  </div>
</div>

    <div className="p-5">
      {/* Tabs */}
      <div className="flex border-b-2">
        {["Request", "Booking", "Legal Paper"].map((tab) => (
          <button
            key={tab}
            className={`px-6 py-3 text-lg font-semibold ${
              activeTab === tab ? "text-white border-b-4 bg-mainColor rounded-md" : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-5">
        {activeTab === "Request" && (
          <div className="overflow-x-auto">
            <h2 className="mb-5 text-mainColor text-3xl font-semibold">Request</h2>
            {requests.length === 0 ? (
              <p className="text-center text-xl text-mainColor">No requests found</p>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b-2">
                    <th className="text-mainColor text-center pb-3">ID</th>
                    <th className="text-mainColor text-center pb-3">Agent</th>
                    <th className="text-mainColor text-center pb-3">Currency</th>
                    <th className="text-mainColor text-center pb-3">To Name</th>
                    <th className="text-mainColor text-center pb-3">To Phone</th>
                    <th className="text-mainColor text-center pb-3">Priority</th>
                    <th className="text-mainColor text-center pb-3">Service</th>
                    <th className="text-mainColor text-center pb-3">Stages</th>
                    <th className="text-mainColor text-center pb-3">Expected Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request) => (
                    <tr className="border-b-2" key={request.id}>
                      <td className="text-center">{request.id}</td>
                      <td className="text-center">{request.agent || "-"}</td>
                      <td className="text-center">{request.currency || "-"}</td>
                      <td className="text-center">{request.to_name || "-"}</td>
                      <td className="text-center">{request.to_phone || "-"}</td>
                      <td className="text-center">{request.priority || "-"}</td>
                      <td className="text-center">{request.service || "-"}</td>
                      <td className="text-center">{request.stages || "-"}</td>
                      <td className="text-center">{request.expected_revenue || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === "Booking" && (
          <div className="overflow-x-auto">
            <h2 className="mb-5 text-mainColor text-3xl font-semibold">Booking</h2>
            {booking.length === 0 ? (
              <p className="text-center text-xl text-mainColor">No bookings found</p>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b-2">
                    <th className="text-mainColor text-center pb-3">Bus</th>
                    <th className="text-mainColor text-center pb-3">Adult Price</th>
                    <th className="text-mainColor text-center pb-3">Child Price</th>
                    <th className="text-mainColor text-center pb-3">Adults</th>
                    <th className="text-mainColor text-center pb-3">Children</th>
                    <th className="text-mainColor text-center pb-3">From</th>
                    <th className="text-mainColor text-center pb-3">To</th>
                    <th className="text-mainColor text-center pb-3">Departure</th>
                    <th className="text-mainColor text-center pb-3">Arrival</th>
                    <th className="text-mainColor text-center pb-3">Country</th>
                    <th className="text-mainColor text-center pb-3">Supplier Email</th>
                    <th className="text-mainColor text-center pb-3">Supplier Name</th>
                    <th className="text-mainColor text-center pb-3">Supplier Phone</th>
                    <th className="text-mainColor text-center pb-3">Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {booking.map((request) => (
                    <tr className="border-b-2" key={request.id}>
                      <td className="text-center">{request.bus?.bus || "-"}</td>
                      <td className="text-center">{request.bus?.adult_price || "-"}</td>
                      <td className="text-center">{request.bus?.child_price || "-"}</td>
                      <td className="text-center">{request.bus?.adults || "-"}</td>
                      <td className="text-center">{request.bus?.children || "-"}</td>
                      <td className="text-center">{request.bus?.from || "-"}</td>
                      <td className="text-center">{request.bus?.to || "-"}</td>
                      <td className="text-center">{request.bus?.departure || "-"}</td>
                      <td className="text-center">{request.bus?.arrival || "-"}</td>
                      <td className="text-center">{request.bus?.country || "-"}</td>
                      <td className="text-center">{request.bus?.supplier_email || "-"}</td>
                      <td className="text-center">{request.bus?.supplier_name || "-"}</td>
                      <td className="text-center">{request.bus?.supplier_phone || "-"}</td>
                      <td className="text-center">{request.bus?.total_price || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

{activeTab === "Legal Paper" && (
  <div className="overflow-x-auto">
    {paper.length === 0 ? (
      <p className="text-xl text-gray-600 text-center">No legal papers found</p>
    ) : (
      <div className="">
        <h2
          className="mt-4 mb-5 flex items-center text-mainColor text-3xl px-4 py-2 rounded-lg w-full font-semibold cursor-pointer"
          onClick={() => setShowPaper((prev) => !prev)}
        >
          Legal Paper
          {showPaper ? (
            <FaChevronUp className="ml-2 text-xl text-mainColor" />
          ) : (
            <FaChevronDown className="ml-2 text-xl text-mainColor" />
          )}
        </h2>

        {showPaper ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-6">
            {paper.map((item) => (
              <div
                key={item.id}
                className="paper-item bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <img
                  src={item.image_link}
                  alt={`Legal Paper ${item.id}`}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800 truncate">Legal Paper {item.id}</h3>
                  <p className="text-gray-500 text-sm mt-2">Click to view more details</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <table className="w-full mt-5">
            <thead>
              <tr className="border-b-2">
                <th className="text-mainColor text-center pb-3">ID</th>
                <th className="text-mainColor text-center pb-3">Document Name</th>
                <th className="text-mainColor text-center pb-3">Status</th>
                <th className="text-mainColor text-center pb-3">Date Issued</th>
                <th className="text-mainColor text-center pb-3">Expiration Date</th>
              </tr>
            </thead>
            <tbody>
              {paper.map((item) => (
                <tr className="border-b-2" key={item.id}>
                  <td className="text-center">{item.id}</td>
                  <td className="text-center">{item.document_name}</td>
                  <td className="text-center">{item.status}</td>
                  <td className="text-center">{item.date_issued}</td>
                  <td className="text-center">{item.expiration_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
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
