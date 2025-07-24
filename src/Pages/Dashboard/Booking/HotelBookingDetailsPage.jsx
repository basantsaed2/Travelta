import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaStar, FaTags, FaMinus, FaPlus, FaTrashAlt, FaBuilding, FaUser, FaPlusCircle, FaShieldAlt, FaHandshake, FaUserTie, FaUserFriends, FaBed, FaBookmark, FaCheck, FaCalendarAlt, FaTimes, FaReceipt, FaCalendarDay, FaUsers, FaChild, FaMapMarkerAlt, FaWifi, FaParking, FaSwimmingPool, FaUtensils, FaSnowflake, FaDog, FaSmokingBan, FaRegSnowflake, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoIosPeople, IoMdTime } from "react-icons/io";
import { MdMeetingRoom, MdSquareFoot, MdBathtub, MdBedroomParent, MdAirlineSeatReclineExtra, MdRoomService } from "react-icons/md";
import { GiMoneyStack, GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Dialog, DialogTitle, DialogActions, DialogContent, Button, Chip, Divider, Paper, IconButton, TextField, MenuItem, Autocomplete, CircularProgress, Typography, Grid } from "@mui/material";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { usePost } from "../../../Hooks/usePostJson";
import { useGet } from "../../../Hooks/useGet";
import { RiHotelLine } from "react-icons/ri";
import { MdOutlineSpa } from "react-icons/md";
import { MdKingBed } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import { AddLeadPage } from "../../AllPages";
import GuestInformationForm from "../../../Components/Agent Components/GuestInformationForm";

const HotelBookingDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hotel = location.state?.hotel;
  const { refetch: refetchSuppliers, loading: loadingSuppliers, data: suppliersData, } = useGet({ url: "https://travelta.online/agent/manual_booking/supplier_customer", });
  const { postData, loadingPost, response } = usePost({ url: "https://travelta.online/agent/agent/bookingEngine", });
  const { checkIn, checkOut, adults, children, selectedCountry, selectedCity } = location.state || {};
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [checkInDate, setCheckInDate] = useState(checkIn ? new Date(checkIn) : null);
  const [checkOutDate, setCheckOutDate] = useState(checkOut ? new Date(checkOut) : null);
  const [totalAdults, setTotalAdults] = useState(adults || 2);
  const [totalChildren, setTotalChildren] = useState(children || 0);
  const [isRoomDetailsModalOpen, setIsRoomDetailsModalOpen] = useState(false);
  const [selectedRoomDetails, setSelectedRoomDetails] = useState(null);
  const [guestInfoCompleted, setGuestInfoCompleted] = useState(false);

  const [category, setCategory] = useState(""); // To track B2B or B2C
  const [showPopup, setShowPopup] = useState(false);
  const [update, setUpdate] = useState(false);
  const [guestInfo, setGuestInfo] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [secondMenuData, setSecondMenuData] = useState([]); // Data for the second dropdown
  const [selectedToSupplier, setSelectedToSupplier] = useState(null); // To track the selected supplier or customer

  useEffect(() => {
    console.log("Hotel", hotel);
  }, [hotel]);

  useEffect(() => {
    if (suppliersData) {
      setSuppliers(suppliersData.supplier_booking_engine);
      setCustomers(suppliersData.customers);
    }
  }, [suppliersData]);

  // Update the second dropdown based on the selected category
  useEffect(() => {
    if (customers) {
      setSecondMenuData(customers);
    }
  }, [customers]);

  if (!hotel) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <p>No hotel data available.</p>
      </div>
    );
  }

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setIsImageModalOpen(true);
  };

  const handleViewRoomDetails = (room) => {
    setSelectedRoomDetails(room);
    setIsRoomDetailsModalOpen(true);
  };

  const handleSelectRoom = (room) => {
    if (selectedRoom && selectedRoom.room_id === room.room_id) {
      setSelectedRoom(null);
    } else {
      setSelectedRoom({
        ...room,
        quantity: 1,
        totalPrice: room.room_details.price
      });
    }
  };

  const handleQuantityChange = (newQuantity) => {
    if (!selectedRoom) return;

    const availableQty = selectedRoom.available_quantity;
    const validatedQty = Math.min(Math.max(1, newQuantity), availableQty);

    setSelectedRoom({
      ...selectedRoom,
      quantity: validatedQty,
      totalPrice: validatedQty * selectedRoom.room_details.price
    });
  };

  const calculateTotalPrice = () => {
    return selectedRoom ? selectedRoom.totalPrice : 0;
  };

  const renderAmenities = (amenities) => {
    if (!amenities || amenities.length === 0) {
      return <p className="text-gray-500">No amenities listed</p>;
    }
    return (
      <div className="flex flex-wrap gap-2">
        {amenities.map((amenity, index) => (
          <Chip key={index} label={amenity} size="small" className="bg-blue-50 text-blue-600" />
        ))}
      </div>
    );
  };

  // useEffect(() => {
  //   if (!loadingPost) {
  //     if (response) {
  //       navigate(-1); // Navigate back only when the response is successful
  //     }
  //   }
  // }, [loadingPost, response, navigate]);

  useEffect(() => {
    if (!loadingPost && response && response.data) {
      console.log('Response Submit:', response);
      navigate('/dashboard_agent/checkOut_process', { state: { cartData: response.data } });
    }
  }, [response, loadingPost, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedRoom) return;

    console.log("Booking data:", selectedRoom);
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

    const bookingData = {
      room_id: selectedRoom.room_id,
      check_in: checkInDate.toISOString().split('T')[0],
      check_out: checkOutDate.toISOString().split('T')[0],
      quantity: selectedRoom.quantity,
      hotel_id: selectedRoom.room_details.hotel_id,
      to_agent_id: selectedRoom.room_details.agent_id,
      room_type: selectedRoom.room_type,
      no_of_adults: totalAdults,
      no_of_children: totalChildren,
      no_of_nights: nights,
      amount: calculateTotalPrice(),
      // Conditionally include supplier or customer ID
      ...(selectedToSupplier && {
        to_customer_id: selectedToSupplier.id
      }),
      currency_id: selectedRoom.room_details.currency_id, // Assuming USD
      city_id: selectedRoom.room_details.city_id || '',
      country_id: selectedRoom.room_details.country_id || '',


    };

    postData(bookingData, "Room booked successful!");
  };

  return (
    <div className="max-w-7xl mx-auto pt-0 py-6">
      {/* Hotel Header with Gradient Background */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 mb-6 text-white shadow-lg">
        <h1 className="text-3xl font-bold">{hotel.hotel_name}</h1>
        <div className="flex items-center mt-2">
          <FaMapMarkerAlt className="text-blue-200 mr-2" />
          <span className="text-blue-100">
            {hotel.city}, {hotel.country}
          </span>
        </div>
        <div className="flex items-center mt-3">
          {Array.from({ length: hotel.hotel_stars }).map((_, i) => (
            <FaStar key={i} className="text-yellow-300 mr-1 text-lg" />
          ))}
          <span className="ml-2 text-blue-100 font-medium">
            {hotel.hotel_stars}-star luxury hotel
          </span>
        </div>
      </div>

      {/* Enhanced Image Gallery with Hover Effects */}
      <div className="grid grid-cols-4 gap-3 mb-8">
        <div
          className="col-span-2 row-span-2 cursor-pointer group relative overflow-hidden rounded-xl"
          onClick={() => handleImageClick(0)}
        >
          <img
            src={hotel.images[0]}
            alt="Main hotel"
            className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300"></div>
        </div>
        {hotel.images.slice(1, 5).map((image, index) => (
          <div
            key={index}
            className="cursor-pointer group relative overflow-hidden rounded-xl"
            onClick={() => handleImageClick(index + 1)}
          >
            <img
              src={image}
              alt={`Hotel view ${index + 1}`}
              className="w-full h-32 md:h-40 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300"></div>
            {index === 3 && hotel.images.length > 5 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white font-bold text-lg">
                +{hotel.images.length - 5} more
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Image Modal */}
      <Dialog
        open={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        maxWidth="xl"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: 'rgba(0,0,0,0.9)',
            color: 'white'
          }
        }}
      >
        <DialogContent className="p-0">
          <IconButton
            onClick={() => setIsImageModalOpen(false)}
            sx={{
              position: 'absolute',
              right: 16,
              top: 16,
              color: 'white',
              backgroundColor: 'rgba(0,0,0,0.5)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.2)'
              }
            }}
          >
            <IoMdCloseCircleOutline className="text-2xl" />
          </IconButton>
          <Splide
            options={{
              start: selectedImageIndex,
              rewind: true,
              gap: '1rem',
              arrows: true,
              pagination: false
            }}
          >
            {hotel.images.map((image, index) => (
              <SplideSlide key={index}>
                <div className="flex items-center justify-center h-[80vh]">
                  <img
                    src={image}
                    alt={`Hotel image ${index}`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </DialogContent>
      </Dialog>

      {/* Main Content with Improved Layout */}
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        {/* Left Column - Hotel Details */}
        <div className="lg:w-2/3 space-y-6">
          {/* Description Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
              <RiHotelLine className="mr-2 text-blue-600" />
              About This Hotel
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {hotel.hotel_description ||
                "Experience unparalleled comfort at our luxurious hotel. Our property combines modern elegance with exceptional service to ensure a memorable stay. Enjoy premium amenities, exquisite dining options, and thoughtfully designed accommodations."}
            </p>
          </div>

          {/* Facilities with Icons */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
              <MdOutlineSpa className="mr-2 text-blue-600" />
              Hotel Facilities
            </h2>
            {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {renderAmenities(hotel.hotel_facilities).map((amenity, index) => (
            <div key={index} className="flex items-center p-2 bg-blue-50 rounded-lg">
              <span className="text-blue-600 mr-2">{amenity.icon}</span>
              <span className="text-gray-700">{amenity.label}</span>
            </div>
          ))}
        </div> */}
          </div>

          {/* Room Cards with Enhanced Design */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
              <MdKingBed className="mr-2 text-blue-600" />
              Available Rooms
            </h2>
            <div className="space-y-6">
              {hotel.available_rooms.map((room, index) => (
                <div
                  key={index}
                  className={`border rounded-xl overflow-hidden transition-all duration-300 ${selectedRoom?.room_id === room.room_id
                    ? "border-blue-500 ring-2 ring-blue-200 shadow-md"
                    : "border-gray-200 hover:border-blue-300 hover:shadow-md"
                    }`}
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-2/5 relative group">
                      <img
                        src={room.room_details.thumbnail_link}
                        alt={room.room_type}
                        className="w-full h-48 md:h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <button
                        onClick={() => handleViewRoomDetails(room)}
                        className="absolute bottom-3 right-3 bg-white bg-opacity-90 text-blue-600 px-3 py-1 rounded-full text-sm font-medium shadow-sm hover:bg-opacity-100 transition-all"
                      >
                        View Photos
                      </button>
                    </div>
                    <div className="md:w-3/5 p-5">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-gray-800">{room.room_type}</h3>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">
                            ${room.room_details.price}
                          </div>
                          <span className="text-gray-500 text-sm">per night</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 my-3">
                        <span className="flex items-center text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded">
                          <IoIosPeople className="mr-1" />
                          {room.room_details.max_adults} adults
                        </span>
                        <span className="flex items-center text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded">
                          <FaChild className="mr-1" />
                          {room.room_details.max_children} children
                        </span>
                        <span className="flex items-center text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded">
                          <MdMeetingRoom className="mr-1" />
                          {room.available_quantity} available
                        </span>
                      </div>

                      <div className="mt-4 flex justify-between items-center">
                        <button
                          onClick={() => handleViewRoomDetails(room)}
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
                        >
                          <BsInfoCircle className="mr-1" />
                          View details
                        </button>

                        <Button
                          variant={selectedRoom?.room_id === room.room_id ? "outlined" : "contained"}
                          color="primary"
                          size="medium"
                          startIcon={selectedRoom?.room_id === room.room_id ? <FaCheck /> : <FaBed />}
                          onClick={() => handleSelectRoom(room)}
                          sx={{
                            borderRadius: '10px',
                            textTransform: 'none',
                            fontWeight: '600',
                            ...(selectedRoom?.room_id === room.room_id && {
                              borderColor: '#1E88E5',
                              color: '#1E88E5'
                            })
                          }}
                        >
                          {selectedRoom?.room_id === room.room_id ? 'Selected' : 'Select Room'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Booking Widget */}
        <div className="lg:w-1/3 flex flex-col gap-5">
          {/* Booking Form Section */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 flex items-center">
                <FaUserFriends className="mr-3 text-blue-600" />
                Booking Details
              </h3>
            </div>

            {/* Form Content */}
            <div className="p-2 space-y-3">

              {/* Partner Selection */}
              <div className="transition-all duration-300 ease-in-out">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FaUserTie className="mr-2 text-blue-500" />
                  Select Customer
                </label>
                <Autocomplete
                  fullWidth
                  options={secondMenuData}
                  getOptionLabel={(option) => option?.name || ""}
                  value={selectedToSupplier}
                  onChange={(e, newValue) => setSelectedToSupplier(newValue)}
                  isOptionEqualToValue={(option, value) => option.id === value?.id}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      placeholder={`Search customers...`}
                      InputProps={{
                        ...params.InputProps,
                        sx: {
                          "& fieldset": { borderRadius: "12px" },
                          "&:hover fieldset": { borderColor: "#1E88E5" },
                          "&.Mui-focused fieldset": { borderColor: "#1565C0" },
                          backgroundColor: "white"
                        },
                        endAdornment: (
                          <>
                            {loadingSuppliers && <CircularProgress size={20} color="inherit" />}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                  renderOption={(props, option) => (
                    <li {...props} className="flex items-center p-3 hover:bg-blue-50">
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <FaUser className="text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{option.name}</p>
                        <p className="text-xs text-gray-500">{option.email}</p>
                      </div>
                    </li>
                  )}
                />
              </div>

              {/* Add Button */}
              <Button
                variant="contained"
                onClick={() => setShowPopup(true)}
                fullWidth
                size="large"
                startIcon={<FaPlusCircle />}
                sx={{
                  py: 1,
                  borderRadius: '12px',
                  fontWeight: '600',
                  textTransform: 'none',
                  fontSize: '1rem',
                  background: 'linear-gradient(to right, #3B82F6, #2563EB)',
                  color: 'white',
                  '&:hover': {
                    background: 'linear-gradient(to right, #2563EB, #1E40AF)',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                {"Add New Customer"}
              </Button>
            </div>
          </div>

          <GuestInformationForm
            maxAdults={totalAdults}
            maxChildren={totalChildren}
            onGuestInfoSubmit={(data) => {
              setGuestInfo(data);
            }}
            initialData={guestInfo}
          />

          {/* Booking Summary Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 sticky overflow-hidden">
            {/* Summary Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 text-white">
              <h2 className="text-2xl font-bold flex items-center">
                <FaCalendarAlt className="mr-3" />
                Booking Summary
              </h2>
              <p className="text-blue-100 mt-1 text-sm">
                Review your reservation details
              </p>
            </div>

            {/* Summary Content */}
            <div className="p-4 space-y-3">
              {/* Dates Section */}
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-700 flex items-center">
                  <FaCalendarDay className="mr-2 text-blue-600" />
                  Stay Dates
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-1 xl:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <p className="text-xs text-gray-500 font-medium">CHECK-IN</p>
                    <p className="font-bold text-gray-800 mt-1">
                      {checkInDate?.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) || 'Not selected'}
                    </p>
                  </div>
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <p className="text-xs text-gray-500 font-medium">CHECK-OUT</p>
                    <p className="font-bold text-gray-800 mt-1">
                      {checkOutDate?.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) || 'Not selected'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Guests Section */}
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-700 flex items-center">
                  <FaUsers className="mr-2 text-blue-600" />
                  Guests
                </h3>
                <div className="bg-blue-50 p-2 rounded-lg">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-xs text-gray-500">ADULTS</p>
                      <p className="font-medium text-gray-800">
                        {totalAdults} {totalAdults === 1 ? 'Adult' : 'Adults'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">CHILDREN</p>
                      <p className="font-medium text-gray-800">
                        {totalChildren} {totalChildren === 1 ? 'Child' : 'Children'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Selected Room Section */}
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-700 flex items-center">
                  <MdRoomService className="mr-2 text-blue-600" />
                  Selected Room
                </h3>
                {!selectedRoom ? (
                  <div className="bg-yellow-50 border border-yellow-200 p-2 rounded-lg text-center">
                    <FaBed className="mx-auto text-yellow-500 text-3xl mb-3" />
                    <p className="text-gray-700 font-medium">No room selected</p>
                    <p className="text-gray-500 text-sm">
                      Please select a room from the options
                    </p>
                  </div>
                ) : (
                  <div className="border border-blue-200 bg-blue-50 rounded-lg overflow-hidden">
                    <div className="p-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-gray-800">{selectedRoom.room_type}</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {selectedRoom.room_details.bed_type || 'Standard bed'}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-blue-600 font-bold text-xl">
                            ${selectedRoom.room_details.price}
                          </p>
                          <p className="text-gray-500 text-xs">per night</p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 font-medium">Quantity</p>
                        </div>
                        <select
                          className="border rounded-lg px-3 py-2 text-sm bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={selectedRoom.quantity}
                          onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                        >
                          {Array.from({ length: selectedRoom.available_quantity }, (_, i) => (
                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="bg-white px-2 py-3 border-t border-blue-200 flex justify-end">
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        startIcon={<FaTrashAlt />}
                        onClick={() => setSelectedRoom(null)}
                        sx={{
                          borderRadius: '8px',
                          fontWeight: '500',
                          textTransform: 'none'
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Price Summary */}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <h3 className="font-semibold text-gray-700 flex items-center">
                  <FaReceipt className="mr-2 text-blue-600" />
                  Price Summary
                </h3>
                <div className="space-y-3">
                  {selectedRoom && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {selectedRoom.quantity}x {selectedRoom.room_type}
                      </span>
                      <span className="font-medium">${selectedRoom.totalPrice}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Taxes & Fees</span>
                    <span>${(selectedRoom?.totalPrice ? selectedRoom.totalPrice * 0.12 : 0).toFixed(2)}</span>
                  </div>
                  <Divider />
                  <div className="flex justify-between text-lg font-bold text-gray-800">
                    <span>Total Amount</span>
                    <span>${calculateTotalPrice()}</span>
                  </div>
                </div>

                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={!selectedRoom}
                  startIcon={<FaBookmark />}
                  onClick={handleSubmit}
                  sx={{
                    py: 1.5,
                    borderRadius: '12px',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    textTransform: 'none',
                    background: selectedRoom
                      ? 'linear-gradient(to right, #3B82F6, #2563EB)'
                      : '#E5E7EB',
                    color: selectedRoom ? 'white' : '#9CA3AF',
                    '&:hover': {
                      background: selectedRoom
                        ? 'linear-gradient(to right, #2563EB, #1E40AF)'
                        : '#E5E7EB',
                      boxShadow: selectedRoom ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  {selectedRoom ? 'Confirm Booking' : 'Select a Room'}
                </Button>

                <div className="text-center text-sm text-gray-500 mt-3">
                  <p className="flex items-center justify-center">
                    <FaShieldAlt className="mr-2 text-green-500" />
                    Free cancellation until 24 hours before check-in
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Popup Modal */}
          {showPopup && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {"Add New Customer"}
                  </h2>
                  <IconButton onClick={() => setShowPopup(false)}>
                    <IoMdCloseCircleOutline className="text-2xl text-gray-500 hover:text-red-500" />
                  </IconButton>
                </div>
                <div className="p-6">
                  <AddLeadPage update={update} setUpdate={setUpdate} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Room Details Modal */}
      <Dialog
        open={isRoomDetailsModalOpen}
        onClose={() => setIsRoomDetailsModalOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            overflow: 'hidden'
          }
        }}
      >
        {selectedRoomDetails && (
          <>
            <DialogTitle className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold flex items-center">
                  <MdKingBed className="mr-3" />
                  {selectedRoomDetails.room_type} Room
                </h2>
                <IconButton
                  onClick={() => setIsRoomDetailsModalOpen(false)}
                  sx={{ color: 'white' }}
                >
                  <IoMdCloseCircleOutline className="text-2xl" />
                </IconButton>
              </div>
              <div className="mt-2 flex items-center text-blue-100">
                <FaStar className="mr-1" />
                <span>Premium Room Category</span>
              </div>
            </DialogTitle>

            <DialogContent className="p-0">
              <div className="p-6">
                {/* Image Gallery */}
                <div className="mb-6">
                  <Splide
                    options={{
                      type: 'loop',
                      perPage: 1,
                      pagination: false,
                      arrows: true
                    }}
                  >
                    {selectedRoomDetails.room_details.images?.map((img, idx) => (
                      <SplideSlide key={idx}>
                        <img
                          src={img}
                          alt={`Room view ${idx}`}
                          className="w-full h-64 object-cover rounded-lg"
                        />
                      </SplideSlide>
                    ))}
                  </Splide>
                </div>

                {/* Room Highlights */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                  <div className="bg-blue-50 p-3 rounded-lg flex items-center">
                    <IoIosPeople className="text-blue-600 mr-2 text-xl" />
                    <div>
                      <p className="text-xs text-gray-500">Max Occupancy</p>
                      <p className="font-medium">
                        {selectedRoomDetails.room_details.max_adults} adults, {selectedRoomDetails.room_details.max_children} children
                      </p>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg flex items-center">
                    <MdSquareFoot className="text-blue-600 mr-2 text-xl" />
                    <div>
                      <p className="text-xs text-gray-500">Room Size</p>
                      <p className="font-medium">
                        {selectedRoomDetails.room_details.size || 'N/A'} sq.ft
                      </p>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg flex items-center">
                    <GiMoneyStack className="text-blue-600 mr-2 text-xl" />
                    <div>
                      <p className="text-xs text-gray-500">Price</p>
                      <p className="font-medium text-blue-600">
                        ${selectedRoomDetails.room_details.price} / night
                      </p>
                    </div>
                  </div>
                </div>

                {/* Detailed Description */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">Description</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedRoomDetails.room_details.description ||
                      "This beautifully appointed room offers a perfect blend of comfort and style. Featuring premium bedding, modern furnishings, and thoughtful amenities, it's designed to provide a relaxing retreat during your travels."}
                  </p>
                </div>

                {/* Amenities Section */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">Room Amenities</h3>
                  {/* <div className="grid grid-cols-2 gap-3">
                {renderAmenities(selectedRoomDetails.room_details.amenity).map((item, idx) => (
                  <div key={idx} className="flex items-center">
                    <span className="text-blue-600 mr-2">{item.icon}</span>
                    <span className="text-gray-700">{item.label}</span>
                  </div>
                ))}
              </div> */}
                </div>

                {/* Policies */}
                <div className="bg-blue-50 rounded-xl p-4 mb-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">Policies</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-gray-700">Cancellation Policy</p>
                      <p className="text-gray-600">
                        {selectedRoomDetails.room_details.cancelation ||
                          "Free cancellation available up to 24 hours before check-in. After that, the first night will be charged."}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Check-in/out Times</p>
                      <p className="text-gray-600">
                        Check-in: {selectedRoomDetails.room_details.check_in || "2:00 PM"},
                        Check-out: {selectedRoomDetails.room_details.check_out || "12:00 PM"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>

            <DialogActions className="bg-gray-50 p-4 border-t">
              <div className="flex justify-between w-full items-center">
                <div>
                  <p className="text-gray-500 text-sm">Total for your stay</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {/* ${calculateRoomTotal(selectedRoomDetails)} */}
                  </p>
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<FaBookmark />}
                  onClick={() => {
                    handleSelectRoom(selectedRoomDetails);
                    setIsRoomDetailsModalOpen(false);
                  }}
                  sx={{
                    borderRadius: '10px',
                    fontWeight: '600',
                    textTransform: 'none',
                    padding: '8px 20px'
                  }}
                >
                  {selectedRoom?.room_id === selectedRoomDetails.room_id ? 'Room Selected' : 'Select This Room'}
                </Button>
              </div>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default HotelBookingDetailsPage;