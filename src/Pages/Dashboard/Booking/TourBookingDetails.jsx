import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaStar, FaTags, FaBuilding, FaUser, FaPlusCircle, FaShieldAlt, FaHandshake, FaUserTie, FaUserFriends, FaBookmark, FaCalendarAlt, FaTimes, FaReceipt, FaCalendarDay, FaUsers, FaChild, FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe } from "react-icons/fa";
import { IoIosPeople, IoMdTime } from "react-icons/io";
import { GiMoneyStack } from "react-icons/gi";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Dialog, DialogTitle, DialogActions, DialogContent, Button, Chip, Divider, IconButton, TextField, MenuItem, Autocomplete, CircularProgress } from "@mui/material";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { usePost } from "../../../Hooks/usePostJson";
import { useGet } from "../../../Hooks/useGet";
import { RiHotelLine } from "react-icons/ri";
import { BsInfoCircle } from "react-icons/bs";
import { AddSupplierPage, AddLeadPage } from "../../AllPages";

const TourBookingDetails = () => {
  const location = useLocation();
  const tour = location.state?.tour;
  const { refetch: refetchSuppliers, loading: loadingSuppliers, data: suppliersData } = useGet({ url: "https://travelta.online/agent/manual_booking/supplier_customer" });
  const { postData, loading: loadingPost, response } = usePost({ url: "https://travelta.online/agent/agent/bookTour" });

  const [category, setCategory] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [update, setUpdate] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [secondMenuData, setSecondMenuData] = useState([]);
  const [selectedToSupplier, setSelectedToSupplier] = useState(null);
  const [selectedTourDate, setSelectedTourDate] = useState(tour?.availability[0]?.date || "");
  const [totalAdults, setTotalAdults] = useState(1);
  const [totalChildren, setTotalChildren] = useState(0);
  const [specialRequest, setSpecialRequest] = useState("");
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedExtras, setSelectedExtras] = useState([]);

  useEffect(() => {
    console.log("Tour", tour);
  }, [tour]);

  useEffect(() => {
    if (suppliersData) {
      setSuppliers(suppliersData.supplier_booking_engine);
      setCustomers(suppliersData.customers);
    }
  }, [suppliersData]);

  useEffect(() => {
    if (category === "B2B") {
      setSecondMenuData(suppliers);
    } else if (category === "B2C") {
      setSecondMenuData(customers);
    } else {
      setSecondMenuData([]);
    }
  }, [category, suppliers, customers]);

  if (!tour) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <p>No tour data available.</p>
      </div>
    );
  }

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setIsImageModalOpen(true);
  };

  const handleViewDetails = () => {
    setIsDetailsModalOpen(true);
  };

  const handleExtraChange = (extraId) => {
    setSelectedExtras((prev) =>
      prev.includes(extraId) ? prev.filter((id) => id !== extraId) : [...prev, extraId]
    );
  };

  const calculateTotalPrice = () => {
    const adultPrice = tour.tour_pricing_items.find(item => item.tour_pricing_id === tour.tour_pricings.find(p => p.person_type === "adult")?.id)?.price || 0;
    const childPrice = tour.tour_pricing_items.find(item => item.tour_pricing_id === tour.tour_pricings.find(p => p.person_type === "child")?.id)?.price || 0;
    const extrasTotal = selectedExtras.reduce((sum, extraId) => {
      const extra = tour.tour_extras.find(e => e.id === extraId);
      return sum + (extra ? extra.price : 0);
    }, 0);
    const basePrice = (totalAdults * adultPrice) + (totalChildren * childPrice) + extrasTotal;
    const discount = tour.tour_discounts[0] && (totalAdults + totalChildren >= tour.tour_discounts[0].from && totalAdults + totalChildren <= tour.tour_discounts[0].to)
      ? tour.tour_discounts[0].discount
      : 0;
    const tax = tour.tax_type === "fixed" ? tour.tax : (basePrice * tour.tax / 100);
    return basePrice - discount + tax;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedTourDate || !category || (category === "B2C" && !selectedToSupplier)) return;

    const bookingData = {
      tour_id: tour.id,
      no_of_people: totalAdults + totalChildren,
      special_request: specialRequest,
      currency_id: tour.tour_pricing_items[0]?.currency_id,
      total_price: calculateTotalPrice(),
      ...(category === "B2B" && selectedToSupplier && {
        from_supplier_id: selectedToSupplier.id
      }),
      ...(category === "B2C" && selectedToSupplier && {
        to_customer_id: selectedToSupplier.id
      }), agents_id: null,
      status: "confirmed"
    };

    postData(bookingData);
  };

  const renderItinerary = (itinerary) => {
    if (!itinerary || itinerary.length === 0) {
      return <p className="text-gray-500">No itinerary details available</p>;
    }
    return (
      <div className="space-y-4">
        {itinerary.map((item) => (
          <div key={item.id} className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-bold text-gray-800">{item.day_name}</h4>
            <p className="text-gray-600">{item.day_description}</p>
            {item.image && (
              <img src={item.image} alt={`Itinerary day ${item.day_name}`} className="mt-2 w-full h-32 object-cover rounded-lg" />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto pt-0 py-6">
      {/* Tour Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 mb-6 text-white shadow-lg">
        <h1 className="text-3xl font-bold">{tour.name}</h1>
        <div className="flex items-center mt-2">
          <FaMapMarkerAlt className="text-blue-200 mr-2" />
          <span className="text-blue-100">
            {tour.destinations[0]?.city?.name}, {tour.destinations[0]?.country?.name}
          </span>
        </div>
        <div className="flex items-center mt-3">
          <FaStar className="text-yellow-300 mr-1 text-lg" />
          <span className="text-blue-100 font-medium">{tour.tour_type} Tour</span>
          {tour.featured === "yes" && (
            <span className="ml-2 bg-yellow-400 text-blue-800 px-2 py-1 rounded-full text-sm">Featured</span>
          )}
        </div>
        <p className="text-blue-100 text-sm mt-2">Tour ID: {tour.id}</p>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-4 gap-3 mb-8">
        <div
          className="col-span-2 row-span-2 cursor-pointer group relative overflow-hidden rounded-xl"
          onClick={() => handleImageClick(0)}
        >
          <img
            src={tour.image_link}
            alt="Main tour"
            className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300"></div>
        </div>
        {tour.tour_images.map((image, index) => (
          <div
            key={image.id || index}
            className="cursor-pointer group relative overflow-hidden rounded-xl"
            onClick={() => handleImageClick(index + 1)}
          >
            <img
              src={image}
              alt={`Tour view ${index + 1}`}
              className="w-full h-32 md:h-40 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300"></div>
          </div>
        ))}
      </div>

      {/* Image Modal */}
      <Dialog
        open={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        maxWidth="xl"
        fullWidth
        PaperProps={{ sx: { backgroundColor: 'rgba(0,0,0,0.9)', color: 'white' } }}
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
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
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
            <SplideSlide key="main-image">
              <div className="flex items-center justify-center h-[80vh]">
                <img
                  src={tour.image_link}
                  alt="Main tour image"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </SplideSlide>
            {tour.tour_images.map((image, index) => (
              <SplideSlide key={image.id || index}>
                <div className="flex items-center justify-center h-[80vh]">
                  <img
                    src={image}
                    alt={`Tour image ${index}`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </DialogContent>
      </Dialog>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        {/* Left Column - Tour Details */}
        <div className="lg:w-2/3 space-y-6">
          {/* Description Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
              <RiHotelLine className="mr-2 text-blue-600" />
              About This Tour
            </h2>
            <p className="text-gray-700 leading-relaxed">{tour.description}</p>
            <p className="text-gray-600 text-sm mt-2">Destination Type: {tour.destination_type}</p>
          </div>

          {/* Itinerary Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
              <FaCalendarAlt className="mr-2 text-blue-600" />
              Itinerary
            </h2>
            {renderItinerary(tour.itinerary)}
          </div>

          {/* Inclusions/Exclusions */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
              <BsInfoCircle className="mr-2 text-blue-600" />
              Inclusions & Exclusions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Inclusions</h3>
                <div className="flex flex-wrap gap-2">
                  {tour.includes.map((item) => (
                    <Chip key={item.id} label={item.name} size="small" className="bg-blue-50 text-blue-600" />
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Exclusions</h3>
                <div className="flex flex-wrap gap-2">
                  {tour.excludes.map((item) => (
                    <Chip key={item.id} label={item.name} size="small" className="bg-red-50 text-red-600" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
              <FaPhone className="mr-2 text-blue-600" />
              Contact Information
            </h2>
            <p className="text-gray-700 flex items-center"><FaEnvelope className="mr-2" /> Email: <a href={`mailto:${tour.tour_email}`} className="text-blue-600">{tour.tour_email}</a></p>
            <p className="text-gray-700 flex items-center mt-2"><FaPhone className="mr-2" /> Phone: <a href={`tel:${tour.tour_phone}`} className="text-blue-600">{tour.tour_phone}</a></p>
            <p className="text-gray-700 flex items-center mt-2"><FaGlobe className="mr-2" /> Website: <a href={tour.tour_website} target="_blank" rel="noopener noreferrer" className="text-blue-600">Visit Website</a></p>
          </div>
        </div>

        {/* Right Column - Booking Widget */}
        <div className="lg:w-1/3 flex flex-col gap-5">
          {/* Booking Form Section */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 flex items-center">
                <FaUserFriends className="mr-3 text-blue-600" />
                Booking Details
              </h3>
              <p className="text-gray-600 text-sm">
                {!category ? "Select booking type to continue" : category === "B2B" ? "Choose a supplier from your network" : "Select a customer for this booking"}
              </p>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FaTags className="mr-2 text-blue-500" />
                  Booking Type
                </label>
                <TextField
                  select
                  variant="outlined"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  fullWidth
                  InputProps={{
                    sx: { "& fieldset": { borderRadius: "12px" }, "&:hover fieldset": { borderColor: "#1E88E5" }, "&.Mui-focused fieldset": { borderColor: "#1565C0" }, backgroundColor: "white" }
                  }}
                  SelectProps={{
                    displayEmpty: true,
                    renderValue: category !== "" ? undefined : () => <span className="text-gray-400">Choose booking type</span>
                  }}
                >
                  <MenuItem value="" disabled><em>Choose booking type</em></MenuItem>
                  <MenuItem value="B2B" className="flex items-center"><FaBuilding className="mr-2 text-gray-500" />Business Partner (B2B)</MenuItem>
                  <MenuItem value="B2C" className="flex items-center"><FaUser className="mr-2 text-gray-500" />Direct Customer (B2C)</MenuItem>
                </TextField>
              </div>
              {category && (
                <div className="transition-all duration-300 ease-in-out">
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    {category === "B2B" ? <FaHandshake className="mr-2 text-blue-500" /> : <FaUserTie className="mr-2 text-blue-500" />}
                    {category === "B2B" ? "Select Supplier" : "Select Customer"}
                  </label>
                  <Autocomplete
                    fullWidth
                    options={secondMenuData}
                    getOptionLabel={(option) => option?.name || ""}
                    value={selectedToSupplier}
                    onChange={(e, newValue) => setSelectedToSupplier(newValue)}
                    disabled={!category}
                    isOptionEqualToValue={(option, value) => option.id === value?.id}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        placeholder={`Search ${category === "B2B" ? "suppliers..." : "customers..."}`}
                        InputProps={{
                          ...params.InputProps,
                          sx: { "& fieldset": { borderRadius: "12px" }, "&:hover fieldset": { borderColor: "#1E88E5" }, "&.Mui-focused fieldset": { borderColor: "#1565C0" }, backgroundColor: "white" },
                          endAdornment: (
                            <>
                              {loadingSuppliers && <CircularProgress size={20} color="inherit" />}
                              {params.InputProps.endAdornment}
                            </>
                          )
                        }}
                      />
                    )}
                    renderOption={(props, option) => (
                      <li {...props} key={option.id} className="flex items-center p-3 hover:bg-blue-50">
                        <div className="bg-blue-100 p-2 rounded-full mr-3">
                          {category === "B2B" ? <FaBuilding className="text-blue-600" /> : <FaUser className="text-blue-600" />}
                        </div>
                        <div>
                          <p className="font-medium">{option.name}</p>
                          <p className="text-xs text-gray-500">{option.email}</p>
                        </div>
                      </li>
                    )}
                  />
                </div>
              )}
              <Button
                variant="contained"
                onClick={() => setShowPopup(true)}
                fullWidth
                size="large"
                disabled={!category}
                startIcon={<FaPlusCircle />}
                sx={{
                  py: 1,
                  borderRadius: '12px',
                  fontWeight: '600',
                  textTransform: 'none',
                  fontSize: '1rem',
                  background: category ? 'linear-gradient(to right, #3B82F6, #2563EB)' : '#E5E7EB',
                  color: category ? 'white' : '#9CA3AF',
                  '&:hover': { background: category ? 'linear-gradient(to right, #2563EB, #1E40AF)' : '#E5E7EB', boxShadow: category ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none' },
                  transition: 'all 0.3s ease'
                }}
              >
                {category === "B2B" ? "Add New Supplier" : "Add New Customer"}
              </Button>
            </div>
          </div>

          {/* Booking Summary Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 sticky overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 text-white">
              <h2 className="text-2xl font-bold flex items-center">
                <FaCalendarAlt className="mr-3" />
                Booking Summary
              </h2>
              <p className="text-blue-100 mt-1 text-sm">Review your reservation details</p>
            </div>
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-700 flex items-center">
                  <FaCalendarDay className="mr-2 text-blue-600" />
                  Tour Date
                </h3>
                <TextField
                  select
                  variant="outlined"
                  value={selectedTourDate}
                  onChange={(e) => setSelectedTourDate(e.target.value)}
                  fullWidth
                  InputProps={{
                    sx: { "& fieldset": { borderRadius: "12px" }, "&:hover fieldset": { borderColor: "#1E88E5" }, "&.Mui-focused fieldset": { borderColor: "#1565C0" }, backgroundColor: "white" }
                  }}
                >
                  {tour.availability.map((avail) => (
                    <MenuItem key={avail.id} value={avail.date}>
                      {new Date(avail.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                      (Available: {avail.remaining}/{avail.quantity})
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-700 flex items-center">
                  <FaUsers className="mr-2 text-blue-600" />
                  Guests
                </h3>
                <div className="bg-blue-50 p-2 rounded-lg">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-xs text-gray-500">ADULTS</p>
                      <select
                        className="border rounded-lg px-3 py-2 text-sm bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={totalAdults}
                        onChange={(e) => setTotalAdults(parseInt(e.target.value))}
                      >
                        {Array.from({ length: 10 }, (_, i) => (
                          <option key={i + 1} value={i + 1}>{i + 1}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">CHILDREN</p>
                      <select
                        className="border rounded-lg px-3 py-2 text-sm bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={totalChildren}
                        onChange={(e) => setTotalChildren(parseInt(e.target.value))}
                      >
                        {Array.from({ length: 10 }, (_, i) => (
                          <option key={i} value={i}>{i}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-700 flex items-center">
                  <BsInfoCircle className="mr-2 text-blue-600" />
                  Special Request
                </h3>
                <TextField
                  variant="outlined"
                  value={specialRequest}
                  onChange={(e) => setSpecialRequest(e.target.value)}
                  placeholder="E.g., Vegetarian meal"
                  fullWidth
                  InputProps={{
                    sx: { "& fieldset": { borderRadius: "12px" }, "&:hover fieldset": { borderColor: "#1E88E5" }, "&.Mui-focused fieldset": { borderColor: "#1565C0" }, backgroundColor: "white" }
                  }}
                />
              </div>
              {tour.tour_extras.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-700 flex items-center">
                    <FaPlusCircle className="mr-2 text-blue-600" />
                    Extras
                  </h3>
                  <div className="bg-blue-50 p-2 rounded-lg">
                    {tour.tour_extras.map((extra) => (
                      <div key={extra.id} className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          checked={selectedExtras.includes(extra.id)}
                          onChange={() => handleExtraChange(extra.id)}
                          className="mr-2"
                        />
                        <span>{extra.name} ({extra.price} {extra.currency.name})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <h3 className="font-semibold text-gray-700 flex items-center">
                  <FaReceipt className="mr-2 text-blue-600" />
                  Price Summary
                </h3>
                <div className="space-y-3">
                  {totalAdults > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">{totalAdults}x Adult</span>
                      <span className="font-medium">{(totalAdults * (tour.tour_pricing_items.find(item => item.tour_pricing_id === tour.tour_pricings.find(p => p.person_type === "adult")?.id)?.price || 0)).toFixed(2)} {tour.tour_pricing_items[0]?.currency.name}</span>
                    </div>
                  )}
                  {totalChildren > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">{totalChildren}x Child</span>
                      <span className="font-medium">{(totalChildren * (tour.tour_pricing_items.find(item => item.tour_pricing_id === tour.tour_pricings.find(p => p.person_type === "child")?.id)?.price || 0)).toFixed(2)} {tour.tour_pricing_items[0]?.currency.name}</span>
                    </div>
                  )}
                  {selectedExtras.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Extras</span>
                      <span className="font-medium">{selectedExtras.reduce((sum, extraId) => sum + (tour.tour_extras.find(e => e.id === extraId)?.price || 0), 0).toFixed(2)} {tour.tour_extras[0]?.currency.name}</span>
                    </div>
                  )}
                  {tour.tour_discounts[0] && (totalAdults + totalChildren >= tour.tour_discounts[0].from && totalAdults + totalChildren <= tour.tour_discounts[0].to) && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Discount ({tour.tour_discounts[0].from}-{tour.tour_discounts[0].to} people)</span>
                      <span className="font-medium text-green-600">-{tour.tour_discounts[0].discount} {tour.tour_pricing_items[0]?.currency.name}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Taxes</span>
                    <span>{tour.tax_type === "fixed" ? tour.tax : (calculateTotalPrice() * tour.tax / 100).toFixed(2)} {tour.tour_pricing_items[0]?.currency.name}</span>
                  </div>
                  <Divider />
                  <div className="flex justify-between text-lg font-bold text-gray-800">
                    <span>Total Amount</span>
                    <span>{calculateTotalPrice().toFixed(2)} {tour.tour_pricing_items[0]?.currency.name}</span>
                  </div>
                </div>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={!selectedTourDate || !category || (category === "B2C" && !selectedToSupplier)}
                  startIcon={<FaBookmark />}
                  onClick={handleSubmit}
                  sx={{
                    py: 1.5,
                    borderRadius: '12px',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    textTransform: 'none',
                    background: selectedTourDate && category && (category === "B2B" || selectedToSupplier) ? 'linear-gradient(to right, #3B82F6, #2563EB)' : '#E5E7EB',
                    color: selectedTourDate && category && (category === "B2B" || selectedToSupplier) ? 'white' : '#9CA3AF',
                    '&:hover': { background: selectedTourDate && category && (category === "B2B" || selectedToSupplier) ? 'linear-gradient(to right, #2563EB, #1E40AF)' : '#E5E7EB', boxShadow: selectedTourDate && category && (category === "B2B" || selectedToSupplier) ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none' },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Confirm Booking
                </Button>
                <div className="text-center text-sm text-gray-500 mt-3">
                  <p className="flex items-center justify-center">
                    <FaShieldAlt className="mr-2 text-green-500" />
                    {tour.cancelation_items[0]?.type === "fixed" ? `Free cancellation up to ${tour.cancelation_items[0].days} days before` : tour.policy}
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
                    {category === "B2B" ? "Add New Supplier" : "Add New Customer"}
                  </h2>
                  <IconButton onClick={() => setShowPopup(false)}>
                    <IoMdCloseCircleOutline className="text-2xl text-gray-500 hover:text-red-500" />
                  </IconButton>
                </div>
                <div className="p-6">
                  {category === "B2B" ? <AddSupplierPage update={update} setUpdate={setUpdate} /> : <AddLeadPage update={update} setUpdate={setUpdate} />}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tour Details Modal */}
      <Dialog
        open={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: '16px', overflow: 'hidden' } }}
      >
        <DialogTitle className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold flex items-center">
              <RiHotelLine className="mr-3" />
              {tour.name} Details
            </h2>
            <IconButton onClick={() => setIsDetailsModalOpen(false)} sx={{ color: 'white' }}>
              <IoMdCloseCircleOutline className="text-2xl" />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent className="p-6">
          <div className="mb-6">
            <Splide options={{ type: 'loop', perPage: 1, pagination: false, arrows: true }}>
              <SplideSlide key="main-image">
                <img src={tour.image_link} alt="Main tour" className="w-full h-64 object-cover rounded-lg" />
              </SplideSlide>
              {tour.tour_images.map((img, index) => (
                <SplideSlide key={img.id || index}>
                  <img src={img} alt={`Tour view ${index}`} className="w-full h-64 object-cover rounded-lg" />
                </SplideSlide>
              ))}
            </Splide>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
            <div key="max-guests" className="bg-blue-50 p-3 rounded-lg flex items-center">
              <IoIosPeople className="text-blue-600 mr-2 text-xl" />
              <div>
                <p className="text-xs text-gray-500">Max Guests</p>
                <p className="font-medium">{tour.tour_pricings[0]?.max_age ? `Adults (up to ${tour.tour_pricings[0].max_age} years)` : "Varies"}</p>
              </div>
            </div>
            <div key="duration" className="bg-blue-50 p-3 rounded-lg flex items-center">
              <IoMdTime className="text-blue-600 mr-2 text-xl" />
              <div>
                <p className="text-xs text-gray-500">Duration</p>
                <p className="font-medium">{tour.days} days, {tour.nights} nights</p>
              </div>
            </div>
            <div key="price" className="bg-blue-50 p-3 rounded-lg flex items-center">
              <GiMoneyStack className="text-blue-600 mr-2 text-xl" />
              <div>
                <p className="text-xs text-gray-500">Price</p>
                <p className="font-medium text-blue-600">{tour.tour_pricing_items[0]?.price} {tour.tour_pricing_items[0]?.currency.name} / adult</p>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Description</h3>
            <p className="text-gray-700 leading-relaxed">{tour.description}</p>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Itinerary</h3>
            {renderItinerary(tour.itinerary)}
          </div>
          <div className="bg-blue-50 rounded-xl p-4">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Policies</h3>
            <div className="space-y-3">
              <div key="cancellation-policy">
                <p className="font-medium text-gray-700">Cancellation Policy</p>
                <p className="text-gray-600">{tour.cancelation_items[0]?.type === "fixed" ? `Free cancellation up to ${tour.cancelation_items[0].days} days before` : tour.policy}</p>
              </div>
              <div key="pickup-location">
                <p className="font-medium text-gray-700">Pick-up Location</p>
                <p className="text-gray-600">{tour.tour_address} (<a href={tour.pick_up_map} target="_blank" rel="noopener noreferrer" className="text-blue-600">View Map</a>)</p>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions className="bg-gray-50 p-4 border-t">
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<FaBookmark />}
            onClick={() => setIsDetailsModalOpen(false)}
            sx={{ borderRadius: '10px', fontWeight: '600', textTransform: 'none', padding: '8px 20px' }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TourBookingDetails;