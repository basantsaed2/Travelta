import React, { useEffect, useState } from 'react';
import { useGet } from '../../../../../Hooks/useGet';
import StaticLoader from '../../../../../Components/StaticLoader';

const ProfileSupplier = ({ id }) => {
  const { refetch: refetchSupplierProfile, loading: loadingSupplierProfile, data: SupplierProfile } = useGet({
    url: `https://travelta.online/agent/supplier/profile/${id}`,
  });
  const [data, setData] = useState([]);
  const [requests, setRequests] = useState([]);
  const [booking, serBooking] = useState([]);
  const [paper,setPaper] = useState([])
  
  useEffect(() => {
    refetchSupplierProfile();
  }, [refetchSupplierProfile]);

  useEffect(() => {
    if (SupplierProfile && SupplierProfile.requests) {
      setData(SupplierProfile); // Entire response
      setRequests(SupplierProfile?.requests || []); // Safely set requests array
      serBooking(SupplierProfile?.manuel_booking || [])
      setPaper(SupplierProfile?.legal_papers || [])
    }
  }, [SupplierProfile]);

  if (loadingSupplierProfile) {
    return <StaticLoader />;
  }

  return (
    <div className=" p-4 space-y-6">
      {/* User Info Card */}
      <h2 className="mt-4 mb-5  flex justify-center items-center text-mainColor text-3xl px-4 py-2 rounded-lg w-full font-semibold">User Info</h2>
      <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      
        <p><strong>Email:</strong> {data.customer_info?.email}</p>
        <p><strong>Name:</strong> {data.customer_info?.name}</p>
        <p><strong>Phone:</strong> {data.customer_info?.phone}</p>
        <p><strong>Total Booking:</strong> {data.customer_info?.total_booking}</p>
        
      </div>

      {/* Request Details Table */}
      <div className="overflow-x-auto">
      <h2 className="mt-4 mb-5  flex justify-center items-center text-mainColor text-3xl px-4 py-2 rounded-lg w-full font-semibold">Request</h2>
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
        {/* Request ManualBooking Table */}
        <div className="overflow-x-auto">
  <h2 className="mt-4 mb-5 flex justify-center items-center text-mainColor text-3xl px-4 py-2 rounded-lg w-full font-semibold">Booking</h2>
  <table className="w-full sm:min-w-0">
    <thead className="w-full">
      <tr className="w-full border-b-2">
        <th className="text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Bus</th>
        <th className="text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Adult Price</th>
        <th className="text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Child Price</th>
        <th className="text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Adults</th>
        <th className="text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Children</th>
        <th className="text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">From</th>
        <th className="text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">To</th>
        <th className="text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Departure</th>
        <th className="text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Arrival</th>
        <th className="text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Country</th>
        {/* <th className="text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Hotel</th> */}
        <th className="text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Supplier Email</th>
        <th className="text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Supplier Name</th>
        <th className="text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Supplier Phone</th>
        <th className="text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Total Price</th>
      </tr>
    </thead>
    <tbody className="w-full">
      {booking.length === 0 ? (
        <tr>
          <td colSpan={13} className="text-center text-xl text-mainColor font-TextFontMedium">No requests found</td>
        </tr>
      ) : (
        booking.map((request, index) => (
          <tr className="w-full border-b-2" key={request.id}>
            <td className="text-center ml-2 text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{request.bus ? request.bus.bus : '-'}</td>
            <td className="text-center ml-2 text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{request.bus && request.bus.adult_price ? request.bus.adult_price : '-'}</td>
            <td className="text-center ml-2 text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{request.bus && request.bus.child_price ? request.bus.child_price : '-'}</td>
            <td className="text-center ml-2 text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{request.bus && request.bus.adults ? request.bus.adults : '-'}</td>
            <td className="text-center ml-2 text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{request.bus && request.bus.childreen ? request.bus.childreen : '-'}</td>
            <td className="text-center ml-2 text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{request.bus && request.bus.from ? request.bus.from : '-'}</td>
            <td className="text-center ml-2 text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{request.bus && request.bus.to ? request.bus.to : '-'}</td>
            <td className="text-center ml-2 text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{request.bus && request.bus.departure ? request.bus.departure : '-'}</td>
            <td className="text-center ml-2 text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{request.bus && request.bus.arrival ? request.bus.arrival : '-'}</td>
            <td className="text-center ml-2 text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{request.country || '-'}</td>
            <td className="text-center ml-2 text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{request.supplier_from_email || '-'}</td>
            <td className="text-center ml-2 text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{request.supplier_from_name || '-'}</td>
            <td className="text-center ml-2 text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{request.supplier_from_phone || '-'}</td>
            <td className="text-center ml-2 text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{request.total_price || '-'}</td>
          </tr>
        ))
      )}
    </tbody>
  </table>
</div>

<div className="p-6">
      {/* Message if no papers are found */}
      {paper.length === 0 ? (
        <p className="text-xl text-gray-600 text-center">No legal papers found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-6">
          {paper.map((item) => (
            <div
              key={item.id}
              className="paper-item bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              {/* Paper Image */}
              <img
                src={item.image_link}
                alt={`Legal Paper ${item.id}`}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              {/* Paper Info */}
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 truncate">Legal Paper {item.id}</h3>
                <p className="text-gray-500 text-sm mt-2">Click to view more details</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

    </div>
  );
};

export default ProfileSupplier;
