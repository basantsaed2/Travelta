import React, { useEffect, useState } from 'react';
import { useGet } from '../../../../../Hooks/useGet';
import StaticLoader from '../../../../../Components/StaticLoader';
import { FaChevronUp, FaEnvelope, FaPhone, FaUser } from 'react-icons/fa';
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
     <div className="shadow-lg rounded-2xl p-6 border border-gray-300 transition-all hover:shadow-2xl  relative">
         {/* Header with Toggle */}
         <h2
           className="mt-4 mb-5 flex items-center justify-between text-mainColor text-3xl px-4 py-2 rounded-lg w-full font-semibold cursor-pointer  transition"
           onClick={() => setShowInfo((prev) => !prev)}
         >
           <span>User Info</span>
       
         </h2>
   
         {/* Expandable User Info Section */}
         
           <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 transition-all">
             <p className="flex items-center gap-2 text-gray-700">
               <FaEnvelope className="text-mainColor" /> 
               <strong>Email:</strong> {data?.customer_info?.email || "-"}
             </p>
             <p className="flex items-center gap-2 text-gray-700">
               <FaUser className="text-mainColor" /> 
               <strong>Name:</strong> {data?.customer_info?.name || "-"}
             </p>
             <p className="flex items-center gap-2 text-gray-700">
               <FaPhone className="text-mainColor" /> 
               <strong>Phone:</strong> {data?.customer_info?.phone || "-"}
             </p>
             <p className="flex items-center gap-2 text-gray-700">
               <strong>Total Booking:</strong> {data?.customer_info?.total_booking || "-"}
             </p>
           </div>
      
   
     
       </div>

      {/* Request Details Table */}
      <div className="overflow-x-auto">
      <h2 
        className="mt-4 mb-5 flex justify-start items-start text-mainColor text-3xl px-4 py-2 rounded-lg w-full font-semibold cursor-pointer"
        onClick={() => setShowRequest((prev) => !prev)}
      >
        Request
        {/* Conditional Arrow Icon */}
     
      </h2>
    
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
   
      </div>
    </div>
  );
};

export default Profile;
