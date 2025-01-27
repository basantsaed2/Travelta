import React, { useEffect, useState } from "react";
import StaticLoader from "../../../../../../Components/StaticLoader";
import { useGet  } from "../../../../../../Hooks/useGet";
import { usePost } from "../../../../../../Hooks/usePostJson";
import { useDelete } from "../../../../../../Hooks/useDelete";
import { FaBed, FaDollarSign, FaEdit,FaCopy ,FaTrash} from "react-icons/fa";
import { FaCalendarAlt, FaCalendarCheck, FaUsers, FaUserFriends, FaClock } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Switch } from "@headlessui/react";
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { PiWarningCircle } from "react-icons/pi";
import { Link } from 'react-router-dom';
import {useChangeState} from '../../../../../../Hooks/useChangeState';
import { MdPriceChange } from "react-icons/md";
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { FaCamera } from "react-icons/fa";
const RoomPage = ({ refetch, setUpdate }) => {

  const { deleteData, loadingDelete, responseDelete } = useDelete();
  const [openDelete, setOpenDelete] = useState(null);
  const { changeState, loadingChange, responseChange } = useChangeState();

  const { postData:postHotelId, loadingPost:loadingHotelId , response:responseHotelId} = usePost({url:`https://travelta.online/agent/room/hotel_lists`});

  // const { postData:postCopy, loadingPost:loadCopy, response:resopnseCopy } = usePost({url: `https://travelta.online/agent/room/duplicate_room/${}`,});
  const { changeState:postDuplicate, loadingChange:loadDuplicate, responseChange:resopnseDuplicate } = useChangeState();

  const { refetch: refetchRoom, loading: loadingRoom, data: dataRoom } = useGet({
      url: "https://travelta.online/agent/room/room_list",
  });
  const [rooms, setRooms] = useState([]);
  const [isCopied, setIsCopied] = useState(false); // State to show feedback (optional)

  useEffect(() => {
    refetchRoom();
  }, [refetchRoom, refetch]);

  useEffect(() => {
    if (dataRoom && dataRoom.room) {
      console.log("Room Data:", dataRoom);
      setRooms(dataRoom.room);
    }
  }, [dataRoom]); // Only run this effect when `dataRoom` changes

  const [isMarkupOpen, setIsMarkupOpen] = useState(false);
  const [isFreeCancellationOpen, setIsFreeCancellationOpen ] = useState(false);

  const [status, setStatus] = useState(false); // For managing the switch status


  const [expandedIndex, setExpandedIndex] = useState(0);
  const [activeTabs, setActiveTabs] = useState(
    rooms.reduce((acc, room) => {
      acc[room.id] = 0; // Default active tab for each room is 0 (General Info)
      return acc;
    }, {})
  );

  // Handle tab click for each room
  const handleTabClick = (roomId, tabIndex) => {
    setActiveTabs((prev) => ({
      ...prev,
      [roomId]: tabIndex, // Update active tab for specific room
    }));
  };

  const roomsWithActiveTabs = rooms.map(room => ({
    ...room,
    activeTab: activeTabs[room.id] !== undefined ? activeTabs[room.id] : 0
  }));


  const [isTaxesOpen, setIsTaxesOpen] = useState(false);

  const toggleTaxes = () => {
    setIsTaxesOpen(!isTaxesOpen);
  };

    // Function to toggle the Free Cancellation section
    const toggleFreeCancellation = () => {
        setIsFreeCancellationOpen((prevState) => !prevState);
      };
    
      const [isAgenciesOpen, setIsAgenciesOpen] = useState(false);

      const toggleAgencies = () => {
        setIsAgenciesOpen(!isAgenciesOpen);
      };

const handleToggleDescription = (roomIndex) => {
    setExpandedIndex(expandedIndex === roomIndex ? null : roomIndex); // Toggle on the clicked roomIndex
  };

  const handleTogglePolicy = (roomIndex) => {
    setExpandedIndex(expandedIndex === roomIndex ? null : roomIndex); // Toggle on the clicked roomIndex
  };

  const handleToggleChildrenPolicy = (roomIndex) => {
    setExpandedIndex(expandedIndex === roomIndex ? null : roomIndex); // Toggle on the clicked roomIndex
  };


  const truncateText = (text, limit = 100) => {
    if (!text) return '';
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  };


   // Change coupon status 
  const handleChangeStaus = async (id, name, status) => {
    const response = await changeState(
            ` https://travelta.online/agent/room/status/${id}`,
            `${name} Changed Status.`,
            { status } // Pass status as an object if changeState expects an object
    );
    if (response) {
      // Update categories only if changeState succeeded
      setRooms((prevRoomType) =>
          prevRoomType.map((room) =>
              room.id === id ? { ...room, status: status } : room
          )
      );
    }
  };
  const handleChangeAcceptedStatus = async (id, name, accepted) => {
    const response = await changeState(
            ` https://travelta.online/agent/room/accepted/${id}`,
            `${name} Changed Accepted.`,
            { accepted } // Pass status as an object if changeState expects an object
    );
    if (response) {
      setRooms((prevRoomType) =>
          prevRoomType.map((room) =>
              room.id === id ? { ...room, accepted: accepted } : room
          )
      );
    }
  };
  const handleCopy = async (id, name) => {
      const response = await postDuplicate(
        ` https://travelta.online/agent/room/duplicate_room/${id}`,
        `${name} Copied to clipboard!`,
        { status } // Pass status as an object if changeState expects an object
        );
        if (response) {
          refetchRoom();
        }
  };

  useEffect(() => {
          if (!loadDuplicate) {
                  setUpdate(!refetch)  
              }
      }, [resopnseDuplicate])

  const handleOpenDelete = (item) => {
    setOpenDelete(item);
  };
  const handleCloseDelete = () => {
    setOpenDelete(null);
  };

  // Delete Customer
  const handleDelete = async (id, name) => {
    const success = await deleteData(`https://travelta.online/agent/room/delete/${id}`, `${name} Deleted Success.`);

    if (success) {
      setRooms(
        rooms.filter((room) =>
          room.id !== id
        )
      );
    }
  };

  return (
    <div className="p-4">
      <div className="w-full pb-10">
        {loadingRoom ? (
          <div className="w-full h-56 flex justify-center items-center">
            <StaticLoader />
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rooms.map((room, roomIndex) => (
            <div
            key={room.id}
            className="bg-white room-container custom-scrollbar overflow-y-auto rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="relative">
            <img
                src={room.thumbnail_link}
                alt={`Room ${room.id}`}
                className="w-full h-72 object-cover rounded-t-2xl"
            />
            
            {/* Status Badge */}
            <div
                className={`absolute top-4 left-4 px-4 py-1 rounded-full text-white font-semibold ${
                room.status === 1 ? 'bg-green-500' : 'bg-red-500'
                }`}
            >
                {room.status === 1 ? 'Active' : 'Inactive'}
            </div>
            </div>

            {/* Room Info */}
            <div className="p-4 flex items-center space-x-4 border-b border-gray-200">
              <FaBed className="text-blue-600 text-2xl" />
              <div>
                {/* <h2 className="text-2xl font-semibold text-gray-800">Room #{room.id}</h2> */}
                <h2 className="text-2xl font-semibold text-gray-800">{room.room_type?.name || 'Room'}</h2>
                <p className="text-sm text-gray-500">{room.hotel?.hotel_name || 'Hotel N/A'} Hotel</p>
                <p className="text-sm text-gray-500">{room.hotel_meal?.meal_name || 'Meal Plan: N/A'}</p>
              </div>
            </div>
            <div className="flex justify-between items-center bg-white py-2 px-3 rounded-lg shadow-md">
                    <span className="text-lg font-semibold text-gray-700">Room Gallary:</span>
                      <Link
                        to={`gallery/${room.id}`}
                        className="flex items-center gap-3 bg-blue-500 text-white py-2 px-5 rounded-xl shadow-md hover:bg-blue-600 transition-all duration-300 ease-in-out"
                      >
                        <FaCamera className="text-lg" />
                        <span className="text-base font-medium">Gallery</span>
                      </Link>
                    </div>
            {/* Tabs */}
            <div className="border-t border-gray-200">
              <div className="mt-5 flex gap-2 justify-center p-1">
                {['General Info', 'Pricing', 'Policies', 'Supplements'].map((tab, tabIndex) => (
                  <button
                    key={tabIndex}
                    className={`text-xs font-medium px-3 py-1 rounded-md transition-all duration-200 ${
                      activeTabs[room.id] === tabIndex
                        ? 'bg-mainColor text-white'
                        : 'bg-transparent text-mainColor hover:bg-mainColor hover:text-white'
                    }`}
                    onClick={() => handleTabClick(room.id, tabIndex)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
      
              {/* Tab Content */}
              <div className="p-2">
                {/* General Info */}
                { activeTabs[room.id] === 0 && (
                    <div className="space-y-4">
                        {/* Description */}
                        <div className="bg-white p-3 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Description</h3>
                        <p className={`text-sm text-gray-600 ${expandedIndex === roomIndex? '' : 'line-clamp-3'}`}>
                            {room.description}
                        </p>
                        {room.description.length > 100 && (
                            <button
                            className="text-blue-600 text-sm mt-2 font-medium hover:underline"
                            onClick={() => handleToggleDescription(roomIndex)}
                            >
                            {expandedIndex === roomIndex ? 'Show Less' : 'Read More'}
                            </button>
                        )}
                        </div>

                        {/* Room Details */}
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-3">
                        <div className="flex items-center space-x-3 bg-white p-2 rounded-lg shadow-sm hover:shadow-md transition-all">
                            <FaCalendarAlt className="text-xl text-blue-500" />
                            <div>
                            <span className="block text-sm font-medium text-gray-700">Check-in</span>
                            <span className="text-sm text-gray-500">{room.check_in || 'N/A'}</span>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3 bg-white p-2 rounded-lg shadow-sm hover:shadow-md transition-all">
                            <FaCalendarCheck className="text-xl text-green-500" />
                            <div>
                            <span className="block text-sm font-medium text-gray-700">Check-out</span>
                            <span className="text-sm text-gray-500">{room.check_out || 'N/A'}</span>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3 bg-white p-2 rounded-lg shadow-sm hover:shadow-md transition-all">
                            <FaBed className="text-xl text-yellow-500" />
                            <div>
                            <span className="block text-sm font-medium text-gray-700">Max Adults</span>
                            <span className="text-sm text-gray-500">{room.max_adults || 'N/A'}</span>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3 bg-white p-2 rounded-lg shadow-sm hover:shadow-md transition-all">
                            <FaUsers className="text-xl text-purple-500" />
                            <div>
                            <span className="block text-sm font-medium text-gray-700">Max Capacity</span>
                            <span className="text-sm text-gray-500">{room.max_capacity || 'N/A'}</span>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3 bg-white p-2 rounded-lg shadow-sm hover:shadow-md transition-all">
                            <FaUserFriends className="text-xl text-indigo-500" />
                            <div>
                            <span className="block text-sm font-medium text-gray-700">Max Children</span>
                            <span className="text-sm text-gray-500">{room.max_children || 'N/A'}</span>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3 bg-white p-2 rounded-lg shadow-sm hover:shadow-md transition-all">
                            <FaClock className="text-xl text-red-500" />
                            <div>
                            <span className="block text-sm font-medium text-gray-700">Min Stay</span>
                            <span className="text-sm text-gray-500">{room.min_stay || 'N/A'}</span>
                            </div>
                        </div>
                        </div>

                        {/* Amenities */}
                        <div className="bg-white p-4 rounded-lg shadow-lg">
                        <h4 className="text-xl font-semibold text-gray-800">Amenities</h4>
                        <div className="flex flex-wrap gap-4">
                            {room.amenity?.map((item, i) => (
                            <span
                                key={i}
                                className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm shadow-sm hover:bg-blue-200 transition-colors"
                            >
                                {item.name}
                            </span>
                            ))}
                        </div>
                        </div>
                </div>
                )}
                {/* Pricing Info */}
                { activeTabs[room.id] === 1 && (
                <div className="flex flex-col gap-3">
                    {/* Price Section */}
                    <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
                        <span className="text-lg font-semibold text-gray-700">Price:</span>
                        <div className="flex items-center space-x-2">
                        <FaDollarSign className="text-green-500" />
                        <span className="text-xl font-bold text-gray-900">{room.price}</span>
                        </div>
                    </div>

                    <div className="flex justify-between items-center bg-white py-2 px-3 rounded-lg shadow-md">
                    <span className="text-lg font-semibold text-gray-700">Room Pricing:</span>
                      <Link
                        to={`pricing/${room.id}`}
                        className="flex items-center gap-3 bg-blue-500 text-white py-2 px-5 rounded-xl shadow-md hover:bg-blue-600 transition-all duration-300 ease-in-out"
                      >
                        <MdPriceChange className="text-lg" />
                        <span className="text-base font-medium">Pricing</span>
                      </Link>
                    </div>

                    {/* Markup for B2B, B2C, B2E */}
                    {(room.b2b_markup || room.b2c_markup || room.b2e_markup) && (
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h4 className="text-lg font-semibold text-gray-700 mb-3">Markup</h4>
                            <div className="flex space-x-4">
                            {room.b2b_markup && (
                                <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-500">B2B</span>
                                <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">{room.b2b_markup}%</span>
                                </div>
                            )}
                            {room.b2c_markup && (
                                <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-500">B2C</span>
                                <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">{room.b2c_markup}%</span>
                                </div>
                            )}
                            {room.b2e_markup && (
                                <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-500">B2E</span>
                                <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs">{room.b2e_markup}%</span>
                                </div>
                            )}
                            </div>
                        </div>
                    )}

                    {/* Taxes Section */}
                    {room.taxes && room.taxes.length > 0 && (
                    <div >
                        <div
                        className="bg-white p-3 rounded-lg shadow-md cursor-pointer flex items-center justify-between"
                        onClick={toggleTaxes}
                        >
                        <h4 className="text-lg font-semibold text-gray-700">Taxes</h4>
                        <span className="text-sm text-gray-500">
                            {isTaxesOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                        </span>
                        </div>

                        {isTaxesOpen && (
                        <div className="bg-white p-4 rounded-lg shadow-md mt-2">
                            {room.taxes.map((tax, roomIndex) => (
                            <div key={roomIndex}>
                                {/* Tax Name and Amount */}
                                <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-gray-500">{tax.name}:</span>
                                <span className="text-sm text-gray-600">
                                    Amount: {tax.type === "fixed" ? tax.amount : `${tax.amount}%`}
                                </span>
                                </div>
                            </div>
                            ))}

                            <span className="text-sm text-gray-500">Tax Type: {room.tax_type}</span>

                            {/* Tax Type Handling */}
                            {room.tax_type === "include_except" && (
                            <div>
                                {/* Except Taxes */}
                                {room.except_taxes && room.except_taxes.length > 0 && (
                                <div className="mb-2">
                                    <span className="text-sm text-gray-500">Except Taxes:</span>
                                    <ul className="list-disc pl-5">
                                    {room.except_taxes.map((exceptTax, roomIndex) => (
                                        <li key={roomIndex} className="text-sm text-gray-600">
                                        {exceptTax.name} - {exceptTax.amount}
                                        </li>
                                    ))}
                                    </ul>
                                </div>
                                )}
                            </div>
                            )}
                        </div>
                        )}
                    </div>
                    )}

                    {/* Free Cancellation Policy */}
                    {room.cancelation === "free" && room.free_cancelation && room.free_cancelation.length > 0 && (
                        <div>
                        <div
                            className="bg-white p-3 rounded-lg shadow-md cursor-pointer flex items-center justify-between"
                            onClick={toggleFreeCancellation}
                        >
                            <h4 className="text-lg font-semibold text-gray-700">Free Cancellation</h4>
                            <span className="text-sm text-gray-500">
                            {isFreeCancellationOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                            </span>
                        </div>
                        {isFreeCancellationOpen && (
                            <div className="bg-white p-4 rounded-lg shadow-md mt-2">
                            {room.free_cancelation.map((policy, roomIndex) => (
                                <div key={roomIndex} className="flex justify-between mb-3">
                                <div className="text-sm text-gray-500">Amount:</div>
                                <div className="text-sm text-gray-600">
                                    {policy.type === "precentage" ? `${policy.amount}%` : policy.amount}
                                </div>
                                <div className="text-sm text-gray-500">Before (Days):</div>
                                <div className="text-sm text-gray-600">{policy.before || 'N/A'}</div>
                                </div>
                            ))}
                            </div>
                        )}
                        </div>
                    )}

                    {/* Non-Refundable Cancellation Policy */}
                    {room.cancelation === "non_refunable" && (
                    <div className="mb-4">
                        <div
                        className="bg-white p-3 rounded-lg shadow-md flex items-center justify-between cursor-pointer"
                        >
                        <h4 className="text-lg font-semibold text-gray-700">Non-Refundable Policy</h4>
                        </div>
                    </div>
                    )}
                    
                    {room.agencies && room.agencies.length > 0 && (
                        <>
                        <div
                        className="bg-white p-3 rounded-lg shadow-md cursor-pointer flex items-center justify-between"
                        onClick={toggleAgencies}
                        >
                        <h4 className="text-lg font-semibold text-gray-700">Agencies Code</h4>
                        <span className="text-sm text-gray-500">
                            {isAgenciesOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                        </span>
                        </div>
                        {isAgenciesOpen && (
                        <div className="bg-white p-4 rounded-lg shadow-md mt-2">
                            {room.agencies.map((agency, roomIndex) => (
                            <div key={roomIndex} className="flex justify-between mb-3">
                                <div className="text-sm text-gray-500 font-semibold">Code : {agency.agency_code}</div>
                                <div className="text-sm text-gray-600">Amount : {agency.percentage}%</div>
                            </div>
                            ))}
                        </div>
                        )}
                        </>
                    )}
                </div>
                )}
                {/* Policies */}
                { activeTabs[room.id] === 2 && (
                    <div>
                        {room.policy && (
                        <div className="bg-white p-3 rounded-lg shadow-lg mb-4">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Terms & Conditions</h3>
                            {room.policy.split('\r\n').map((line, lineIndex) => (
                            <p
                                key={lineIndex}
                                className={`text-sm text-gray-600 ${expandedIndex === roomIndex ? '' : 'line-clamp-3'}`}
                            >
                                {line}
                            </p>
                            ))}
                            {room.policy.length > 100 && (
                            <button
                                className="text-blue-600 text-sm mt-2 font-medium hover:underline"
                                onClick={() => handleTogglePolicy(roomIndex)}
                            >
                                {expandedIndex === roomIndex ? 'Show Less' : 'Read More'}
                            </button>
                            )}
                        </div>
                        )}

                        {room.children_policy && (
                        <div className="bg-white p-3 rounded-lg shadow-lg mb-4">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Children Policy</h3>
                            {room.children_policy.split('\r\n').map((line, lineIndex) => (
                            <p
                                key={lineIndex}
                                className={`text-sm text-gray-600 ${expandedIndex === roomIndex ? '' : 'line-clamp-3'}`}
                            >
                                {line}
                            </p>
                            ))}
                            {room.children_policy.length > 100 && (
                            <button
                                className="text-blue-600 text-sm mt-2 font-medium hover:underline"
                                onClick={() => handleToggleChildrenPolicy(roomIndex)}
                            >
                                {expandedIndex === roomIndex ? 'Show Less' : 'Read More'}
                            </button>
                            )}
                        </div>
                        )}
                    </div>
                )}
                {/* Supplements */}
                { activeTabs[room.id] === 3 && (
                  <div>
                    {room.supplement.length > 0 && (
                    <div className="mt-4">
                        <h3 className="text-sm font-semibold mb-2">Supplements:</h3>
                        <table className="table-auto w-full text-left text-sm border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                            <th className="px-4 py-2 border">Name</th>
                            <th className="px-4 py-2 border">Type</th>
                            <th className="px-4 py-2 border">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {room.supplement.map((sup) => (
                            <tr key={sup.id}>
                                <td className="px-4 py-2 border">{sup.name}</td>
                                <td className="px-4 py-2 border">{sup.type}</td>
                                <td className="px-4 py-2 border">{sup.price} {sup.currency?.name}</td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center gap-3 p-2 border-t border-gray-200">
              <div className="flex items-center gap-2">
                Status: 
                    <Switch
                        checked={room.status === 1}  // This will evaluate to true or false
                        onChange={() => {
                            handleChangeStaus(room.id, room.room_type?.name, room.status === 1 ? 0 : 1);
                        }}
                        className={`${
                            room.status === 1 ? "bg-green-500" : "bg-gray-300"
                        } relative inline-flex h-7 w-14 items-center rounded-full transition-colors`}
                    >
                        <span
                            className={`${
                                room.status === 1 ? "translate-x-7" : "translate-x-1"
                            } inline-block h-5 w-5 transform rounded-full bg-white shadow transition`}
                        />
                    </Switch>
              </div>
              <div className="flex items-center gap-2 p-1">
              {/* Accepted:  */}
                <div
                  className={`${
                      room.accepted === 1 ? "bg-green-500 text-white" : "bg-red-500 text-white"
                  } cursor-pointer p-2 rounded-full flex items-center gap-2`}
                  onClick={() => {
                      handleChangeAcceptedStatus(room.id,room.room_type?.name,room.accepted === 1 ? 0 : 1);
                  }}
                >
                  {room.accepted === 1 ? (
                      <>
                          <FaCheckCircle size={20} />
                          Available
                      </>
                  ) : (
                      <>
                          <FaTimesCircle size={20} />
                          Not Available
                      </>
                  )}
                </div>
              </div>
              </div>
      
            {/* Edit Button */}
            <div className="p-4 border-t border-gray-300 flex items-center justify-center bg-gray-50">

                {/* Buttons Section */}
                <div className="flex items-center gap-3">
                    {/* Copy Button */}
                      <button
                          className="flex items-center gap-2 bg-gray-600 text-white py-2 px-4 rounded-lg shadow hover:bg-gray-700 transition"
                          // onClick={handleCopy}
                          onClick={() => {
                            handleCopy(room.id, room.room_type?.name);
                        }}
                      >
                          <FaCopy />
                          <span className="text-sm">{isCopied ? 'Copied!' : 'Copy'}</span>
                      </button>
                    {/* Edit Button */}
                    <Link
                    to={`edit/${room.id}`}
                    className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition"
                    >
                    <FaEdit />
                    <span className="text-sm">Edit</span>
                    </Link>
                    {/* <Link to={`edit/${supplier.id}`}  ><FaEdit color='#4CAF50' size="24"/></Link> */}

                    <button
                        className="flex items-center gap-2 bg-red-600 text-white py-2 px-4 rounded-lg shadow hover:bg-red-700 transition"
                        onClick={() => handleOpenDelete(room.id)}
                        >
                        <FaTrash />
                        <span className="text-sm">Delete</span>
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
                                    You will delete room {room?.room_type?.name || "-"}
                                  </div>
                                </div>
                              </div>
                              <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto" onClick={() => handleDelete(room.id, room?.room_type?.name)}>
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

          </div>
        ))}
        </div>  

        
        )}
      </div>
    </div>
  );
};

export default RoomPage;
