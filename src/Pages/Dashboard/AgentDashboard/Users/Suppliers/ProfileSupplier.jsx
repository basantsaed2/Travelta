import React, { useEffect, useState } from 'react';
import { useGet } from '../../../../../Hooks/useGet';
import StaticLoader from '../../../../../Components/StaticLoader';
import { FaChevronUp } from 'react-icons/fa';
import { FaChevronDown } from 'react-icons/fa6';

const ProfileSupplier = ({ id }) => {
  const { refetch: refetchSupplierProfile, loading: loadingSupplierProfile, data: SupplierProfile } = useGet({
    url: `https://travelta.online/agent/supplier/profile/${id}`,
  });
  const [data, setData] = useState([]);
//   const [requests, setRequests] = useState([]);
  const [booking, serBooking] = useState([]);
  const [paper,setPaper] = useState([])
      const [showRequest,setShowRequest] = useState(false)
      const [showInfo,setShowInfo] = useState(true)
      const [showPaper,setShowPaper] = useState(false)
      const [bookingshow,setBookingShow] = useState(false)
  
  useEffect(() => {
    refetchSupplierProfile();
  }, [refetchSupplierProfile]);

  useEffect(() => {
    if (SupplierProfile) {
      setData(SupplierProfile); // Entire response
    //   setRequests(SupplierProfile?.requests || []); // Safely set requests array
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
        <h2 className="mt-4 mb-5  flex  items-center text-mainColor text-3xl px-4 py-2 rounded-lg w-full font-semibold cursor-pointer" onClick={()=>setShowInfo(pre=>!pre)}>
              User Info
                {/* Conditional Arrow Icon */}
                      {showInfo ? (
                        <FaChevronUp className="ml-2 text-xl text-mainColor" /> // Arrow up
                      ) : (
                        <FaChevronDown className="ml-2 text-xl text-mainColor" /> // Arrow down
                      )}
              </h2>
  {showInfo &&
      <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      
      <p><strong>Email:</strong> {data?.supplier_info?.emails[0]},{data?.supplier_info?.emails[1]}</p>
      <p><strong>Name:</strong> {data.supplier_info?.name}</p>
      <p><strong>Phone:</strong> {data?.supplier_info?.phones[0]},{data?.supplier_info?.phones[1]}</p>
      {/* <p><strong>Total Booking:</strong> {data.supplier_info?.total_booking}</p> */}
      
    </div>
  }


        {/* Request ManualBooking Table */}
  <div className="overflow-x-auto">
    <h2 className="mt-4 mb-5 flex  items-center text-mainColor text-3xl px-4 py-2 rounded-lg w-full font-semibold cursor-pointer" onClick={()=>{setBookingShow(pre=>!pre)}}>Booking
    {bookingshow ? (
                    <FaChevronUp className="ml-2 text-xl text-mainColor" /> // Arrow up
                  ) : (
                    <FaChevronDown className="ml-2 text-xl text-mainColor" /> // Arrow down
                  )}
  
    </h2>
 {bookingshow && 
  <table className="w-full sm:min-w-0">
  <thead className="w-full">
  <tr className="w-full border-b-2">
  <th className="text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Bus</th>
  <th className="text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Country</th>
  <th className="text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Flight</th>
  <th className="text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Hotel</th>
  <th className="text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Adults</th>
  <th className="text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Check In</th>
  <th className="text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Check Out</th>
  <th className="text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Children</th>
  <th className="text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Hotel Name</th>
  
  
  <th className="text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Nights</th>
  <th className="text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Room Quantity</th>
  <th className="text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Room Type</th>
  <th className="text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Supplier Email</th>
  <th className="text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Supplier Name</th>
  <th className="text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Supplier Phone</th>
  <th className="text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Total Price</th>
  <th className="text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Tour</th>
  <th className="text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Visa</th>
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

          <td className="text-center ml-2 text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{request.country ? request.country : '-'}</td>
          <td className="text-center ml-2 text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{request.flight ? request.flight.flight : '-'}</td>
          <td className="text-center ml-2 text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{request.hotel ? request.hotel.hotel : '-'}</td>
          <td className="text-center ml-2 text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{request.hotel && request.hotel.adults ? request.hotel.adults : '-'}</td>
          <td className="text-center ml-2 text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{request.hotel && request.hotel.check_in ? request.hotel.check_in : '-'}</td>
          <td className="text-center ml-2 text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{request.hotel && request.hotel.check_out ? request.hotel.check_out : '-'}</td>
          <td className="text-center ml-2 text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{request.hotel && request.hotel.childreen ? request.hotel.childreen : '-'}</td>
          <td className="text-center ml-2 text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{request.hotel && request.hotel.hotel_name ? request.hotel.hotel_name : '-'}</td>
          <td className="text-center ml-2 text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{request.hotel && request.hotel.nights ? request.hotel.nights : '-'}</td>
          <td className="text-center ml-2 text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{request.hotel && request.hotel.room_quantity ? request.hotel.room_quantity : '-'}</td>
          <td className="text-center ml-2 text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{request.hotel && request.hotel.room_type ? request.hotel.room_type : '-'}</td>
          

          <td className="text-center ml-2 text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{request.supplier_from_email || '-'}</td>
          <td className="text-center ml-2 text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{request.supplier_from_name || '-'}</td>
          <td className="text-center ml-2 text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{request.supplier_from_phone || '-'}</td>
          <td className="text-center ml-2 text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{request.total_price || '-'}</td>
          <td className="text-center ml-2 text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{request.tour ? request.tour.tour : '-'}</td>
          <td className="text-center ml-2 text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">{request.visa ? request.visa.visa : '-'}</td>
        </tr>
      ))
    )}
  </tbody>
</table>}
</div>

<div className="">
      {/* Message if no papers are found */}
      {paper.length === 0 ? (
        <p className="text-xl text-gray-600 text-center">No legal papers found</p>
      ) : (
     <div className="">
         <h2 className="mt-4 mb-5 flex  items-center text-mainColor text-3xl px-4 py-2 rounded-lg w-full font-semibold cursor-pointer" onClick={()=>{setShowPaper(pre=>!pre)}}>Paper legel

{showPaper ? (
          <FaChevronUp className="ml-2 text-xl text-mainColor" /> // Arrow up
        ) : (
          <FaChevronDown className="ml-2 text-xl text-mainColor" /> // Arrow down
        )}
</h2>
      {showPaper && 
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
      
      }
     </div>
      )}
    </div>

    </div>
  );
};

export default ProfileSupplier;
