import React, { useEffect, useState } from 'react';
import { useGet } from '../../../../../Hooks/useGet';
import StaticLoader from '../../../../../Components/StaticLoader';
import { FaChevronUp } from 'react-icons/fa';
import { FaChevronDown } from 'react-icons/fa6';

const Profile = ({ id }) => {
  const { refetch: refetchLeadProfile, loading: loadingLeadProfile, data: LeadProfile } = useGet({
    url: `https://travelta.online/agent/leads/profile/${id}`,
  });
  const [data, setData] = useState([]);
  const [requests, setRequests] = useState([]);
  const [showRequest,setShowRequest] = useState(false)
  const [showInfo,setShowInfo] = useState(true)

  useEffect(() => {
    refetchLeadProfile();
  }, [refetchLeadProfile]);

  useEffect(() => {
    if (LeadProfile && LeadProfile.requests) {
      setData(LeadProfile); // Entire response
      setRequests(LeadProfile?.requests || []); // Safely set requests array
    }
  }, [LeadProfile]);

  if (loadingLeadProfile) {
    return <StaticLoader />;
  }

  return (
    <div className=" p-4 space-y-6">
      {/* User Info Card */}
      <h2 
        className="mt-4 mb-5 flex justify-start items-start text-mainColor text-3xl px-4 py-2 rounded-lg w-full font-semibold cursor-pointer"
        onClick={() => setShowInfo((prev) => !prev)}
      >
        User Info
        {/* Conditional Arrow Icon */}
        {showInfo ? (
          <FaChevronDown className="ml-2 text-xl text-mainColor" /> // Arrow up
        ) : (
          <FaChevronUp className="ml-2 text-xl text-mainColor" /> // Arrow down
        )}
      </h2>
    {showInfo && 
      <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      
      <p><strong>Email:</strong> {data.customer_info?.email}</p>
      <p><strong>Name:</strong> {data.customer_info?.name}</p>
      <p><strong>Phone:</strong> {data.customer_info?.phone}</p>
      <p><strong>Total Booking:</strong> {data.customer_info?.total_booking}</p>
      
    </div>
    }

      {/* Request Details Table */}
      <div className="overflow-x-auto">
      <h2 
        className="mt-4 mb-5 flex justify-start items-start text-mainColor text-3xl px-4 py-2 rounded-lg w-full font-semibold cursor-pointer"
        onClick={() => setShowRequest((prev) => !prev)}
      >
        Request
        {/* Conditional Arrow Icon */}
        {showRequest ? (
          <FaChevronDown className="ml-2 text-xl text-mainColor" /> // Arrow up
        ) : (
          <FaChevronUp className="ml-2 text-xl text-mainColor" /> // Arrow down
        )}
      </h2>
     {showRequest && 
        <table className="w-full sm:min-w-0">
        <thead className="w-full">
          <tr className="w-full border-b-2">
            <th className="text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">ID</th>
            <th className="text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Agent</th>
            <th className="text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Currency</th>
            <th className="text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">To Name</th>
            <th className="text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">To Phone</th>
            <th className="text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Priority</th>
            <th className="text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Service</th>
            <th className="text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Stages</th>
            {/* <th className="text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Visa</th>
            <th className="text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Tour</th>
            <th className="text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Hotel</th>
            <th className="text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Bus</th> */}
            <th className="text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Expected Revenue</th>
          </tr>
        </thead>
        <tbody className="w-full">
          {requests.length === 0 ? (
            <tr>
              <td colSpan={13} className="text-center text-xl text-mainColor font-TextFontMedium">No requests found</td>
            </tr>
          ) : (
            requests.map((request, index) => (
              <tr className="w-full border-b-2" key={request.id}>
                <td className="text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{request.id}</td>
                <td className="text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{request.agent || '-'}</td>
                <td className="text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{request.currecy || '-'}</td>
                <td className="text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{request.to_name || '-'}</td>
                <td className="text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{request.to_phone || '-'}</td>
                <td className="text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{request.priority || '-'}</td>
                <td className="text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{request.service || '-'}</td>
                <td className="text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{request.stages || '-'}</td>
                {/* <td className="text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{request.visa || '-'}</td>
                <td className="text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{request.tour || '-'}</td>
                <td className="text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{request.hotel || '-'}</td>
                <td className="text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{request.bus || '-'}</td> */}
                <td className="text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{request.expected_revenue || '-'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
     }
      </div>
    </div>
  );
};

export default Profile;
