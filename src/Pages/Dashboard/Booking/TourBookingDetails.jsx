import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { FaStar, FaTags, FaBuilding, FaUser, FaPlusCircle, FaShieldAlt, FaHandshake, FaUserTie, FaBookmark, FaCalendarAlt, FaTimes, FaReceipt, FaCalendarDay, FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe, FaMap } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Dialog, DialogTitle, DialogActions, DialogContent, Button, Chip, Divider, IconButton, TextField, MenuItem, Autocomplete, CircularProgress } from "@mui/material";
import { usePost } from "../../../Hooks/usePostJson";
import { useGet } from "../../../Hooks/useGet";
import { RiHotelLine } from "react-icons/ri";
import { BsInfoCircle } from "react-icons/bs";
import { AddSupplierPage, AddLeadPage } from "../../AllPages";
import { useNavigate } from "react-router-dom";
import GuestInformationForm from "../../../Components/Agent Components/GuestInformationForm";

const TourBookingDetails = () => {
  const location = useLocation();
  const tour = location.state?.tour;
  const noOfPeople = location.state?.noOfPeople || 0;

  const { refetch: refetchSuppliers, loading: loadingSuppliers, data: suppliersData } = useGet({ url: "https://travelta.online/agent/manual_booking/supplier_customer" });
  const { postData, loading: loadingPost, response } = usePost({ url: "https://travelta.online/agent/agent/bookTour" });
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);
  const [update, setUpdate] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [secondMenuData, setSecondMenuData] = useState([]);
  const [selectedToSupplier, setSelectedToSupplier] = useState(null);
  const [selectedTourDate, setSelectedTourDate] = useState(tour?.availability?.[0]?.date || "");
  const [specialRequest, setSpecialRequest] = useState("");
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [selectedPricingTypes, setSelectedPricingTypes] = useState({});
  const [guestInfo, setGuestInfo] = useState(null);

  const firstValidPricingItem = useMemo(() => {
    return tour?.tour_pricings?.flatMap(pricing => pricing.tour_pricing_items || []).find(item => item.currency?.name) || null;
  }, [tour?.tour_pricings]);

  useEffect(() => {
    if (suppliersData) {
      setSuppliers(suppliersData.supplier_booking_engine);
      setCustomers(suppliersData.customers);
    }
  }, [suppliersData]);

  useEffect(() => {
    if (customers) {
      setSecondMenuData(customers);
    }
  }, [customers]);

  const calculateTotalPrice = () => {
    console.log("Calculating Total Price...");
    if (!tour || !tour.tour_pricings || !tour.tour_pricings.length || noOfPeople === 0) {
      console.log("Missing pricing data or no people:", { tour_pricings: tour?.tour_pricings, noOfPeople });
      return { total: 0, currency: null };
    }

    // Apply noOfPeople to adult pricing (assuming adult pricing is the only available type)
    const adultPricing = tour.tour_pricings.find(pricing => pricing.person_type === "adult");
    if (!adultPricing || !adultPricing.tour_pricing_items || !adultPricing.tour_pricing_items.length) {
      console.log("No adult pricing items available");
      return { total: 0, currency: null };
    }

    const selectedType = selectedPricingTypes[adultPricing.id] || adultPricing.tour_pricing_items[0]?.type;
    const pricingItem = adultPricing.tour_pricing_items.find(item => item.type === selectedType);

    if (!pricingItem || !pricingItem.price_after_tax || !pricingItem.currency?.name) {
      console.log("Skipping invalid pricing item for adult:", pricingItem);
      return { total: 0, currency: null };
    }

    const basePrice = noOfPeople * pricingItem.price_after_tax;
    console.log(`Adding ${noOfPeople} people at ${pricingItem.price_after_tax} ${pricingItem.currency.name} (type: ${selectedType}) = ${basePrice}`);

    const currency = pricingItem.currency.name;

    const extrasTotal = tour.tour_extras && tour.tour_extras.length
      ? selectedExtras.reduce((sum, extraId) => {
        const extra = tour.tour_extras.find(e => e.id === extraId);
        const extraPrice = extra?.price || 0;
        console.log(`Adding extra ${extra?.name}: ${extraPrice}`);
        return sum + extraPrice;
      }, 0)
      : 0;

    const discount = tour.tour_discounts?.[0] && noOfPeople >= tour.tour_discounts[0].from
      ? tour.tour_discounts[0].type === "percentage"
        ? (basePrice + extrasTotal) * tour.tour_discounts[0].discount / 100
        : tour.tour_discounts[0].discount
      : 0;
    console.log(`Discount applied: ${discount}`);

    const tax = tour.tax_type === "fixed"
      ? tour.tax || 0
      : (basePrice + extrasTotal - discount) * (tour.tax || 0) / 100;
    console.log(`Tax applied: ${tax}`);

    const total = basePrice + extrasTotal - discount + tax;
    console.log(`Total Price: ${total} ${currency || 'N/A'}`);

    return { total, currency };
  };

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setIsImageModalOpen(true);
  };

  const handleExtraChange = (extraId) => {
    setSelectedExtras((prev) =>
      prev.includes(extraId) ? prev.filter((id) => id !== extraId) : [...prev, extraId]
    );
  };

  const handlePricingTypeChange = (pricingId, type) => {
    setSelectedPricingTypes((prev) => ({
      ...prev,
      [pricingId]: type
    }));
  };

  useEffect(() => {
    if (!loadingPost && response) {
      navigate(-1);
    }
  }, [response]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedTourDate || noOfPeople === 0 || !guestInfo || !selectedToSupplier) {
      alert('Please complete all required fields, including guest information.');
      return;
    }

    const formData = new FormData();
    formData.append('tour_id', tour.id);
    formData.append('no_of_people', noOfPeople);
    formData.append('special_request', specialRequest);
    formData.append('currency_id', firstValidPricingItem?.currency_id || '');
    formData.append('total_price', calculateTotalPrice().total);
    formData.append('customer_id', selectedToSupplier.id);
    formData.append('agents_id', tour.agent_id);
    formData.append('tour_date', selectedTourDate);

    // Append adults
    guestInfo.adults.forEach((adult, index) => {
      formData.append(`adults[${index}][title]`, adult.title);
      formData.append(`adults[${index}][first_name]`, adult.first_name);
      formData.append(`adults[${index}][last_name]`, adult.last_name);
      formData.append(`adults[${index}][phone]`, adult.phone);
    });

    // Append children (if any)
    if (guestInfo.children.length > 0) {
      guestInfo.children.forEach((child, index) => {
        formData.append(`children[${index}][age]`, child.age);
        formData.append(`children[${index}][first_name]`, child.first_name);
        formData.append(`children[${index}][last_name]`, child.last_name);
      });
    }

    postData(formData, 'Tour booked successfully');
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

  if (!tour) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <p>No tour data available.</p>
      </div>
    );
  }

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
            <span className="ml-2 bg-yellow-400 text-blue-800 px-2 py-1 rounded-full text-sm">
              Featured {tour.featured_from} to {tour.featured_to}
            </span>
          )}
        </div>
        <p className="text-blue-100 text-sm mt-2">Tour ID: {tour.id}</p>
        {tour.video_link && (
          <div className="mt-3">
            <a href={tour.video_link} target="_blank" rel="noopener noreferrer" className="text-blue-200 underline flex items-center">
              <FaGlobe className="mr-2" /> Watch Tour Video
            </a>
          </div>
        )}
        <p className="text-blue-100 text-sm mt-2">Duration: {tour.days} Day{tour.days > 1 ? 's' : ''}, {tour.nights} Night{tour.nights > 1 ? 's' : ''}</p>
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
            onError={(e) => { e.target.src = 'https://via.placeholder.com/400'; }}
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
              src={image.image_link}
              alt={`Tour view ${index + 1}`}
              className="w-full h-32 md:h-40 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
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
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/400'; }}
                />
              </div>
            </SplideSlide>
            {tour.tour_images.map((image, index) => (
              <SplideSlide key={image.id || index}>
                <div className="flex items-center justify-center h-[80vh]">
                  <img
                    src={image.image_link}
                    alt={`Tour image ${index}`}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/400'; }}
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

          {/* Cancellation Policy */}
          {tour.cancelation_items && tour.cancelation_items.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
                <FaShieldAlt className="mr-2 text-blue-600" />
                Cancellation Policy
              </h2>
              {tour.cancelation_items.map((item) => (
                <p key={item.id} className="text-gray-600">
                  {item.days} days before: {item.type === "fixed" ? `${item.amount} ${firstValidPricingItem?.currency?.name || 'N/A'}` : `${item.amount}% refund`}
                </p>
              ))}
            </div>
          )}

          {/* Pickup Details */}
          {(tour.pick_up_map || tour.tour_address) && (
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-blue-600" />
                Pickup Details
              </h2>
              {tour.tour_address && (
                <p className="text-gray-700 flex items-center">
                  <FaMapMarkerAlt className="mr-2" /> Address: {tour.tour_address}
                </p>
              )}
              {tour.pick_up_map && (
                <p className="text-gray-700 flex items-center mt-2">
                  <FaMap className="mr-2" /> Map: <a href={tour.pick_up_map} target="_blank" rel="noopener noreferrer" className="text-blue-600">View Pickup Location</a>
                </p>
              )}
            </div>
          )}

          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
              <FaPhone className="mr-2 text-blue-600" />
              Contact Information
            </h2>
            <p className="text-gray-700 flex items-center">
              <FaEnvelope className="mr-2" /> Email: <a href={`mailto:${tour.tour_email}`} className="text-blue-600">{tour.tour_email}</a>
            </p>
            <p className="text-gray-700 flex items-center mt-2">
              <FaPhone className="mr-2" /> Phone: <a href={`tel:${tour.tour_phone}`} className="text-blue-600">{tour.tour_phone}</a>
            </p>
            <p className="text-gray-700 flex items-center mt-2">
              <FaGlobe className="mr-2" /> Website: <a href={tour.tour_website} target="_blank" rel="noopener noreferrer" className="text-blue-600">Visit Website</a>
            </p>
          </div>
        </div>

        {/* Right Column - Booking Widget */}
        <div className="lg:w-1/3 flex flex-col gap-5">
          {/* Booking Form Section */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 flex items-center">
                <FaUserTie className="mr-3 text-blue-600" />
                Booking Details
              </h3>
              <p className="text-gray-600 text-sm">
                Select a customer for this booking
              </p>
            </div>
            <div className="p-4 space-y-4">
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
                  '&:hover': { background: 'linear-gradient(to right, #2563EB, #1E40AF)', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' },
                  transition: 'all 0.3s ease'
                }}
              >
                Add New Customer
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
              {/* Tour Date Section */}
              {tour?.availability && tour.availability.length > 0 ? (
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
              ) : (
                <p className="text-red-600 text-sm">No tour dates available</p>
              )}

              {/* Number of People */}
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-700 flex items-center">
                  <FaUserTie className="mr-2 text-blue-600" />
                  Guests
                </h3>
                <div className="bg-blue-50 p-4 rounded-lg">
                  {noOfPeople > 0 ? (
                    <p className="text-sm text-gray-700">Total Guests: {noOfPeople}</p>
                  ) : (
                    <p className="text-red-600 text-sm">No guests specified</p>
                  )}
                </div>
              </div>

              {/* Pricing Type Selection */}
              {tour?.tour_pricings?.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-700 flex items-center">
                    <FaTags className="mr-2 text-blue-600" />
                    Pricing Options
                  </h3>
                  {tour.tour_pricings
                    .filter(pricing => pricing.person_type === "adult")
                    .map((pricing) => (
                      <div key={pricing.id} className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-gray-700">Pricing</p>
                        <TextField
                          select
                          variant="outlined"
                          value={selectedPricingTypes[pricing.id] || pricing.tour_pricing_items?.[0]?.type || ''}
                          onChange={(e) => handlePricingTypeChange(pricing.id, e.target.value)}
                          fullWidth
                          InputProps={{
                            sx: { "& fieldset": { borderRadius: "8px" }, "&:hover fieldset": { borderColor: "#1E88E5" }, "&.Mui-focused fieldset": { borderColor: "#1565C0" }, backgroundColor: "white" }
                          }}
                          SelectProps={{
                            displayEmpty: true,
                            renderValue: (value) => value ? value.charAt(0).toUpperCase() + value.slice(1) : "Select pricing type"
                          }}
                        >
                          {pricing.tour_pricing_items?.map((item) => (
                            <MenuItem key={item.id} value={item.type}>
                              {item.type.charAt(0).toUpperCase() + item.type.slice(1)} (Price: {item.price} {item.currency?.name}, After Tax: {item.price_after_tax} {item.currency?.name})
                            </MenuItem>
                          ))}
                        </TextField>
                      </div>
                    ))}
                </div>
              )}

              <GuestInformationForm
                maxAdults={noOfPeople} // For tours, use noOfPeople as maxAdults
                maxChildren={0} // Tours typically don't distinguish children separately
                onGuestInfoSubmit={(data) => {
                  setGuestInfo(data);
                }}
                initialData={guestInfo}
              />

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
              {tour.tour_extras && tour.tour_extras.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-700 flex items-center">
                    <FaPlusCircle className="mr-2 text-blue-600" />
                    Extras
                  </h3>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    {tour.tour_extras.map((extra) => (
                      <div key={extra.id} className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          checked={selectedExtras.includes(extra.id)}
                          onChange={() => handleExtraChange(extra.id)}
                          className="mr-2 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm">
                          {extra.name} ({extra.price} {extra.currency?.name || firstValidPricingItem?.currency?.name || 'N/A'})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Breakdown Section */}
              <h3 className="font-semibold text-gray-700 flex items-center mb-3">
                <FaReceipt className="mr-2 text-blue-600" />
                Price Breakdown
              </h3>
              <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                {tour?.tour_pricings?.length > 0 && noOfPeople > 0 ? (
                  tour.tour_pricings
                    .filter(pricing => pricing.person_type === "adult")
                    .map((pricing) => {
                      const selectedType = selectedPricingTypes[pricing.id] || pricing.tour_pricing_items[0]?.type;
                      const pricingItem = pricing.tour_pricing_items.find(item => item.type === selectedType);

                      if (!pricingItem) return null;

                      return (
                        <div key={pricing.id} className="space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <div>
                              <span className="text-gray-700 font-medium">
                                {noOfPeople} Guest{noOfPeople > 1 ? 's' : ''} ({selectedType})
                              </span>
                              <p className="text-xs text-gray-500">
                                ({pricing.min_age}-{pricing.max_age} years)
                              </p>
                            </div>
                            <div className="text-right">
                              <span className="font-semibold text-gray-800">
                                Price: {(noOfPeople * pricingItem.price).toFixed(2)} {pricingItem.currency?.name || 'N/A'}
                              </span>
                              <p className="text-xs text-gray-500">
                                After Tax: {(noOfPeople * pricingItem.price_after_tax).toFixed(2)} {pricingItem.currency?.name || 'N/A'}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    }).filter(Boolean)
                ) : (
                  <p className="text-red-600 text-sm">
                    {noOfPeople === 0 ? "No guests specified" : "No pricing information available"}
                    {console.log("Pricing check failed:", {
                      tour_pricings: tour?.tour_pricings,
                      tour_pricing_items: tour?.tour_pricings?.flatMap(p => p.tour_pricing_items || []),
                      noOfPeople
                    })}
                  </p>
                )}

                {/* Extras Total */}
                {selectedExtras.length > 0 && tour.tour_extras && tour.tour_extras.length > 0 && (
                  <>
                    <Divider className="my-2" />
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-700 font-medium">Extras Total</span>
                      <span className="font-semibold text-gray-800">
                        {selectedExtras.reduce((sum, extraId) => {
                          const extra = tour.tour_extras.find(e => e.id === extraId);
                          return sum + (extra?.price || 0);
                        }, 0).toFixed(2)} {firstValidPricingItem?.currency?.name || tour.tour_extras[0]?.currency?.name || 'N/A'}
                      </span>
                    </div>
                  </>
                )}

                {/* Group Discount */}
                {tour.tour_discounts?.[0] && noOfPeople >= tour.tour_discounts[0].from && (
                  <div className="flex justify-between items-center bg-green-100 p-2 rounded-lg text-sm">
                    <span className="text-green-800 font-medium">
                      Group Discount ({tour.tour_discounts[0].from}+ people)
                    </span>
                    <span className="font-semibold text-green-800">
                      -{tour.tour_discounts[0].type === "percentage" ?
                        `${tour.tour_discounts[0].discount}%` :
                        `${tour.tour_discounts[0].discount.toFixed(2)} ${firstValidPricingItem?.currency?.name || 'N/A'}`
                      }
                    </span>
                  </div>
                )}

                {/* Taxes & Fees */}
                {(tour.tax || tour.tax === 0) && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-700 font-medium">Taxes & Fees</span>
                    <span className="font-semibold text-gray-800">
                      {tour.tax_type === "fixed" ?
                        `${tour.tax.toFixed(2)} ${firstValidPricingItem?.currency?.name || 'N/A'}` :
                        `${tour.tax}%`}
                    </span>
                  </div>
                )}

                {/* Total Amount */}
                {calculateTotalPrice().total > 0 && (
                  <div className="flex justify-between items-center pt-3 border-t border-gray-200 mt-2">
                    <span className="text-lg font-bold text-gray-800">Total Amount</span>
                    <span className="text-xl font-bold text-blue-600">
                      {calculateTotalPrice().total.toFixed(2)} {calculateTotalPrice().currency || 'N/A'}
                    </span>
                  </div>
                )}

                {/* Deposit Required */}
                {tour.deposit > 0 && (
                  <p className="text-xs text-gray-500 mt-2 text-center bg-blue-50 p-2 rounded-lg">
                    <span className="font-semibold">Deposit Required:</span>{" "}
                    {tour.deposit_type === "fixed" ?
                      `Pay ${tour.deposit.toFixed(2)} ${firstValidPricingItem?.currency?.name || 'N/A'} now, remaining before travel` :
                      `Pay ${tour.deposit}% of total now, remaining before travel`}
                  </p>
                )}
              </div>

              <Button
                variant="contained"
                onClick={handleSubmit}
                fullWidth
                size="large"
                startIcon={<FaBookmark />}
                sx={{
                  mt: 3,
                  py: 1.5,
                  borderRadius: '12px',
                  fontWeight: '700',
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  background: 'linear-gradient(to right, #2563EB, #1E40AF)',
                  '&:hover': { background: 'linear-gradient(to right, #2563EB, #1E40AF)', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)' },
                  transition: 'all 0.3s ease'
                }}
                disabled={loadingPost || !selectedToSupplier || !selectedTourDate || noOfPeople === 0}
              >
                {loadingPost ? <CircularProgress size={24} color="inherit" /> : "Confirm Booking"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Popups (AddSupplierPage, AddLeadPage) */}
      <Dialog
        open={showPopup}
        onClose={() => setShowPopup(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: '12px' }
        }}
      >
        <DialogTitle className="flex justify-between items-center bg-blue-600 text-white p-4 rounded-t-xl">
          <span className="text-xl font-semibold">Add New Customer</span>
          <IconButton onClick={() => setShowPopup(false)} sx={{ color: 'white' }}>
            <FaTimes />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers className="p-6">
          <AddLeadPage setUpdate={setUpdate} setShowAddLead={setShowPopup} />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setShowPopup(false)} variant="outlined" sx={{ borderRadius: '8px', textTransform: 'none' }}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TourBookingDetails;