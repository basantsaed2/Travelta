import React, { useEffect, useState } from 'react';
import { useGet } from '../../../../../Hooks/useGet';
import StaticLoader from '../../../../../Components/StaticLoader';
import { FaChevronUp } from 'react-icons/fa';
import { FaChevronDown } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const ProfileSupplier = ({ id }) => {
  const { refetch: refetchSupplierProfile, loading: loadingSupplierProfile, data: SupplierProfile } = useGet({
    url: `https://travelta.online/agent/supplier/profile/${id}`,
  });
  const [data, setData] = useState([]);
//   const [requests, setRequests] = useState([]);
  const [booking, serBooking] = useState([]);
  const [paper,setPaper] = useState([])
  const [selectedBooking, setSelectedBooking] = useState(null);
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
      <p className='border m-3'></p>
      <p><strong>Admin Email:</strong> {data?.supplier_info?.admin_email}</p>
      <p><strong>Admin Name:</strong> {data.supplier_info?.admin_name}</p>
      <p><strong>Admin Phone:</strong> {data?.supplier_info?.admin_phone}</p>
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
    {/* Table */}
    {bookingshow && (
        <table className="w-full sm:min-w-0">
          <thead className="w-full">
            <tr className="w-full border-b-2">
              <th className="text-mainColor text-center font-semibold pb-3">
                Country
              </th>
              <th className="text-mainColor text-center font-semibold pb-3">
                Flight
              </th>
              <th className="text-mainColor text-center font-semibold pb-3">
                Hotel
              </th>
              <th className="text-mainColor text-center font-semibold pb-3">
                Check In
              </th>
              <th className="text-mainColor text-center font-semibold pb-3">
                Check Out
              </th>
              <th className="text-mainColor text-center font-semibold pb-3">
                View
              </th>
            </tr>
          </thead>
          <tbody className="w-full">
            {booking.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center text-xl text-mainColor font-medium"
                >
                  No requests found
                </td>
              </tr>
            ) : (
              booking.map((request, index) => (
                <tr
                  key={request.id}
                  className="cursor-pointer border-b-2 hover:bg-gray-100 transition"
                  // onClick={() => setSelectedBooking(request)}
                >
                  <td className="text-center text-thirdColor text-lg">
                    {request.country || "-"}
                  </td>
                  <td className="text-center text-thirdColor text-lg">
                    {request.flight?.flight || "-"}
                  </td>
                  <td className="text-center text-thirdColor text-lg">
                    {request.hotel?.hotel || "-"}
                  </td>
                  <td className="text-center text-thirdColor text-lg">
                    {request.hotel?.check_in || "-"}
                  </td>
                  <td className="text-center text-thirdColor text-lg">
                    {request.hotel?.check_out || "-"}
                  </td>
                  <td onClick={() => setSelectedBooking(request)} className="text-center text-mainColor underline text-lg">
                    View Info
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {/* Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-4/5 lg:w-1/2">
            <h3 className="text-2xl font-bold text-mainColor mb-4">
              Booking Details
            </h3>
            <button
              className="absolute top-2 right-2 text-gray-600 text-xl"
              onClick={() => setSelectedBooking(null)}
            >
              ✖
            </button>

            <table className="w-full">
              <tbody>
                <tr>
                  <td className="font-semibold">Country:</td>
                  <td>{selectedBooking.country || "-"}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Flight:</td>
                  <td>{selectedBooking.flight?.flight || "-"}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Hotel:</td>
                  <td>{selectedBooking.hotel?.hotel || "-"}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Check In:</td>
                  <td>{selectedBooking.hotel?.check_in || "-"}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Check Out:</td>
                  <td>{selectedBooking.hotel?.check_out || "-"}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Adults:</td>
                  <td>{selectedBooking.hotel?.adults || "-"}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Children:</td>
                  <td>{selectedBooking.hotel?.childreen || "-"}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Nights:</td>
                  <td>{selectedBooking.hotel?.nights || "-"}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Room Quantity:</td>
                  <td>{selectedBooking.hotel?.room_quantity || "-"}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Room Type:</td>
                  <td>{selectedBooking.hotel?.room_type || "-"}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Supplier Email:</td>
                  <td>{selectedBooking.supplier_from_email || "-"}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Supplier Name:</td>
                  <td>{selectedBooking.supplier_from_name || "-"}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Supplier Phone:</td>
                  <td>{selectedBooking.supplier_from_phone || "-"}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Total Price:</td>
                  <td>{selectedBooking.total_price || "-"}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Tour:</td>
                  <td>{selectedBooking.tour?.tour || "-"}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Visa:</td>
                  <td>{selectedBooking.visa?.visa || "-"}</td>
                </tr>
                
              </tbody>
            </table>

            <div className="mt-4 text-right">
              <button
                className="bg-mainColor text-white px-4 py-2 rounded-lg"
                onClick={() => setSelectedBooking(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
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

    <Link to={`/dashboard_agent/users/suppliers/transaction/${id}`}>
  <button className="bg-mainColor text-main text-white font-bold py-2 px-4 rounded  transition">
    Transactions
  </button>
</Link>

    </div>
  );
};

export default ProfileSupplier;
