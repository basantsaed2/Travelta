import React, { useEffect,useState } from 'react';
import StaticLoader from '../../../../../../Components/StaticLoader';
import { useGet } from '../../../../../../Hooks/useGet';
import { useDelete } from '../../../../../../Hooks/useDelete';
import {useChangeState} from '../../../../../../Hooks/useChangeState';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { MdDelete } from "react-icons/md";
import { PiWarningCircle } from "react-icons/pi";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FaBed, FaDollarSign, FaCalendarAlt, FaUser, FaUtensils, FaDoorOpen, FaFlag, FaUsers, FaCopy, FaEdit, FaTrash } from "react-icons/fa";
const RoomPricingPage = ({ refetch}) => {
    const { roomId } = useParams();
    const { refetch: refetchPricing, loading: loadingPricing, data: dataPricing } = useGet({url:`https://travelta.online/agent/room/pricing/${roomId}`});
    const [pricingRooms, setPricingRooms] = useState([])
    const { changeState:postDuplicate, loadingChange:loadDuplicate, responseChange:resopnseDuplicate } = useChangeState();
    const [isCopied, setIsCopied] = useState(false); // State to show feedback (optional)
    
    const { deleteData, loadingDelete, responseDelete } = useDelete();
    const [openDelete, setOpenDelete] = useState(null);

    useEffect(() => {
        refetchPricing();
    }, [refetchPricing, refetch]);

    useEffect(() => {
        if (dataPricing && dataPricing.pricing) {
                console.log("Pricing Data:", dataPricing.pricing);
                setPricingRooms(dataPricing.pricing);
        }
    }, [dataPricing]); // Only run this effect when `data` changes

    const handleCopy = async (id, name) => {
        const response = await postDuplicate(
          ` https://travelta.online/agent/room/pricing/duplicate/${id}`,
          `${name} Copied to clipboard!`,
          );
          if (response) {
            refetchPricing();
          }
    };

    const handleOpenDelete = (item) => {
        setOpenDelete(item);
      };
      const handleCloseDelete = () => {
        setOpenDelete(null);
      };
    
      // Delete Customer
      const handleDelete = async (id, name) => {
        const success = await deleteData(`https://travelta.online/agent/room/pricing/delete/${id}`, `${name} Deleted Success.`);
    
        if (success) {
            setPricingRooms(
            pricingRooms.filter((room) =>
              room.id !== id
            )
          );
        }
      };


  return (
    // <div className="w-full pb-28 flex flex-wrap gap-6 justify-start items-start">
    //   {loadingPricing ? (
    //     <div className="w-full h-56 flex justify-center items-center">
    //       <StaticLoader />
    //     </div>
    //   ) : (
    //     pricingRooms.length === 0 ? (
    //       <div className="w-full text-center text-xl text-mainColor font-TextFontMedium">
    //         Not find Rooms Pricing
    //       </div>
    //     ) : (
    //       pricingRooms.map((room, index) => (
    //         <div
    //           key={index}
    //           className="min-w-[320px] max-w-sm p-6 border border-gray-200 rounded-2xl shadow-lg flex flex-col gap-6 bg-white transition-transform transform hover:scale-105"
    //         >
    //           <div className="flex items-center gap-3">
    //             <FaBed className="text-mainColor text-xl" />
    //             <h3 className="text-lg font-bold text-mainColor">
    //               {room?.name || "Room"} (#{index + 1})
    //             </h3>
    //           </div>
    //           <div className="flex flex-col gap-3">
    //             <div className="flex items-center gap-2 text-gray-700">
    //               <FaDollarSign className="text-green-600" />
    //               <p className="text-sm">
    //                 <strong>Price:</strong> {room?.price || 0} {room?.currency?.name || "_"}
    //               </p>
    //             </div>
    //             <div className="flex items-center gap-2 text-gray-700">
    //               <FaCalendarAlt className="text-blue-600" />
    //               <p className="text-sm">
    //                 <strong>From:</strong> {room?.from || "_"} <strong>To:</strong> {room?.to || "_"}
    //               </p>
    //             </div>
    //             <div className="flex items-center gap-2 text-gray-700">
    //               <FaUser className="text-yellow-600" />
    //               <p className="text-sm">
    //                 <strong>Adults:</strong> {room?.pricing_data?.adults || "_"} | <strong>Children:</strong> {room?.pricing_data?.children || "_"}
    //               </p>
    //             </div>
    //             <div className="flex items-center gap-2 text-gray-700">
    //               <FaUtensils className="text-purple-600" />
    //               <p className="text-sm">
    //                 <strong>Meal Plan:</strong> {room?.pricing_data?.meal_plan || "_"}
    //               </p>
    //             </div>
    //             <div className="flex items-center gap-2 text-gray-700">
    //               <FaDoorOpen className="text-red-500" />
    //               <p className="text-sm">
    //                 <strong>Room Type:</strong> {room?.pricing_data?.room_type || "Not specified"}
    //               </p>
    //             </div>
    //           </div>
    
    //           {/* Nationalities Section */}
    //           <div className="flex flex-col gap-2 text-gray-700">
    //             <div className="flex items-center gap-2">
    //               <FaFlag className="text-red-600" />
    //               <p className="text-sm font-semibold">Nationalities:</p>
    //             </div>
    //             <ul className="list-disc ml-8 text-sm">
    //               {room?.nationality?.length > 0
    //                 ? room.nationality.map((n, i) => (
    //                     <li key={i} className="text-gray-600">{n.name}</li>
    //                   ))
    //                 : <li className="text-gray-400">No nationalities listed</li>}
    //             </ul>
    //           </div>
    
    //           {/* Groups Section */}
    //           <div className="flex flex-col gap-2 text-gray-700">
    //             <div className="flex items-center gap-2">
    //               <FaUsers className="text-indigo-600" />
    //               <p className="text-sm font-semibold">Groups:</p>
    //             </div>
    //             <ul className="list-disc ml-8 text-sm">
    //               {room?.groups?.length > 0
    //                 ? room.groups.map((g, i) => (
    //                     <li key={i} className="text-gray-600">{g.name}</li>
    //                   ))
    //                 : <li className="text-gray-400">No groups listed</li>}
    //             </ul>
    //           </div>
    //         </div>
    //       ))
    //     )
    //   )}
    // </div>

      <div className="w-full p-4 flex flex-wrap gap-6 justify-start items-start">
        {loadingPricing ? (
          <div className="w-full h-56 flex justify-center items-center">
            <StaticLoader />
          </div>
        ) : pricingRooms.length === 0 ? (
          <div className="w-full text-center text-xl text-mainColor font-semibold">
            No Rooms Pricing Found
          </div>
        ) : (
          pricingRooms.map((room, index) => (
            <div
              key={index}
              className="min-w-[320px] max-w-sm p-6 border border-gray-200 rounded-2xl shadow-md bg-gradient-to-r from-white to-gray-50 hover:shadow-lg transition-transform transform hover:scale-105"
            >
              {/* Room Name */}
              <div className="flex items-center gap-3 border-b pb-2 mb-4">
                <FaBed className="text-mainColor text-2xl" />
                <h3 className="text-lg font-bold text-mainColor">
                  {room?.name || "Room"} (#{index + 1})
                </h3>
              </div>
      
              {/* Room Details */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-gray-700">
                  <FaDollarSign className="text-green-600" />
                  <p className="text-sm font-medium">
                    <span className="text-gray-900">Price:</span> {room?.price || 0}{" "}
                    {room?.currency?.name || "_"}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <FaCalendarAlt className="text-blue-600" />
                  <p className="text-sm font-medium">
                    <span className="text-gray-900">From:</span> {room?.from || "_"}{" "}
                    <span className="text-gray-900">To:</span> {room?.to || "_"}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <FaUser className="text-yellow-600" />
                  <p className="text-sm font-medium">
                    <span className="text-gray-900">Adults:</span>{" "}
                    {room?.pricing_data?.adults || "_"} |{" "}
                    <span className="text-gray-900">Children:</span>{" "}
                    {room?.pricing_data?.children || "_"}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <FaUtensils className="text-purple-600" />
                  <p className="text-sm font-medium">
                    <span className="text-gray-900">Meal Plan:</span>{" "}
                    {room?.pricing_data?.meal_plan || "_"}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <FaDoorOpen className="text-red-500" />
                  <p className="text-sm font-medium">
                    <span className="text-gray-900">Room Type:</span>{" "}
                    {room?.pricing_data?.room_type || "Not specified"}
                  </p>
                </div>
              </div>
      
              {/* Nationalities Section */}
              <div className="mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <FaFlag className="text-red-600" />
                  <p className="text-sm font-semibold text-gray-800">Nationalities:</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {room?.nationality?.length > 0 ? (
                    room.nationality.map((n, i) => (
                      <span
                        key={i}
                        className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded-md shadow-sm"
                      >
                        {n.name}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400">No nationalities listed</span>
                  )}
                </div>
              </div>
      
              {/* Groups Section */}
              <div className="mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <FaUsers className="text-indigo-600" />
                  <p className="text-sm font-semibold text-gray-800">Groups:</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {room?.groups?.length > 0 ? (
                    room.groups.map((g, i) => (
                      <span
                        key={i}
                        className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded-md shadow-sm"
                      >
                        {g.name}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400">No groups listed</span>
                  )}
                </div>
              </div>

               {/* Footer Section */}
                <div className="mt-4 flex justify-between items-center pt-4 border-t border-gray-200">
                <button
                    className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors"
                    onClick={() => {
                        handleCopy(room.id, room.name);
                    }}                >
                    <FaCopy />
                    <span className="text-sm font-medium">{isCopied ? 'Copied!' : 'Copy'}</span>
                </button>
                <button
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                    onClick={() => handleEdit(room)}
                >
                    <FaEdit />
                    <span className="text-sm font-medium">Edit</span>
                </button>
                <button
                    className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
                    onClick={() => handleOpenDelete(room.id)}
                    >
                    <FaTrash />
                    <span className="text-sm font-medium">Delete</span>
                </button>
                {openDelete === room.id && (
                    <Dialog
                    open={true}
                    onClose={handleCloseDelete}
                    className="relative z-10"
                    >
                    <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="flex  flex-col items-center justify-center bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <PiWarningCircle color='#0D47A1'
                            size="60"
                            />
                            <div className="flex items-center">
                                <div className="mt-2 text-center">
                                You will delete room {room?.name || "-"}
                                </div>
                            </div>
                            </div>
                            <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto" onClick={() => handleDelete(room.id, room?.name)}>
                                Delete
                            </button>

                            <button
                                type="button"
                                data-autofocus
                                onClick={handleCloseDelete}
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-6 py-3 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto"
                            >
                                Cancel
                            </button>
                            </div>
                        </DialogPanel>
                        </div>
                    </div>
                    </Dialog>
                )}
                </div>
            </div>
          ))
        )}
      </div>
      
    
  );
}

export default RoomPricingPage;