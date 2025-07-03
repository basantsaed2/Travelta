import React, { useState, useEffect } from "react";
import { usePost } from "../../../Hooks/usePostJson";
import { useGet } from "../../../Hooks/useGet";
import { TextField, Button, MenuItem, InputAdornment, CircularProgress, Tabs, Tab, Autocomplete } from "@mui/material";
import { MdHotel } from "react-icons/md";
import { FaGlobe, FaCity, FaUser, FaChild } from "react-icons/fa";
import { FaStar, FaBed, FaMoneyBillWave, FaRegCreditCard, FaInfoCircle, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { MdLocationOn, MdNightsStay } from "react-icons/md"; // Location & Nights
import { FaRegMoneyBillAlt } from "react-icons/fa"; // Price icon
import { AiOutlineStar } from "react-icons/ai"; // Featured
import { IoIosTime } from "react-icons/io"; // Time
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css'; // Import Splide styles
// Installing modules
const BookingEngine = ({ update, setUpdate }) => {
  const { refetch: refetchHotelsList, data: hotelsData } = useGet({
    url: "https://travelta.online/agent/gethotels",
  });
  const { refetch: refetchCountryList, data: countryData } = useGet({
    url: "https://travelta.online/agent/getcountries",
  });
  const { refetch: refetchCityList, data: cityData } = useGet({
    url: "https://travelta.online/agent/getcities",
  });
  const { refetch: refetchTourList, data: tourData } = useGet({
    url: "https://travelta.online/agent/gettourtypes ",
  });
  const { postData: postRoom, loadingPost: loadingSearchRoom, response: responseSearchRoom } = usePost({
    url: "https://travelta.online/agent/agent/avalibleRooms",
  });
  const { postData: postTour, loadingPost: loadingSearchTour, response: responseSearchTour } = usePost({
    url: "https://travelta.online/agent/agent/tours",
  });
  const [tabValue, setTabValue] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const [hotels, setHotels] = useState([]);
  const [tours, setTours] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedTour, setSelectedTour] = useState(null);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [noOfPeople, setNoOfPeople] = useState(1);

  useEffect(() => {
    refetchHotelsList();
    refetchCountryList();
    refetchCityList();
    refetchTourList();
  }, [update]);

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const todayString = today.toISOString().split("T")[0];
    const tomorrowString = tomorrow.toISOString().split("T")[0];

    setCheckIn(todayString);
    setCheckOut(tomorrowString);
  }, []);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const hotels = hotelsData?.hotels?.map((h) => ({ type: "Hotel", name: h.name, id: h.id })) || [];
    const countries = countryData?.countries?.map((c) => ({ type: "Country", name: c.name, id: c.id })) || [];
    const cities = cityData?.cities?.map((ci) => ({ type: "City", name: ci.name, id: ci.id })) || [];
    const tours = tourData?.tourtype?.map((t) => ({ type: "Tour", name: t.name, t: t.id })) || [];

    const allOptions = [...hotels, ...countries, ...cities];

    if (searchInput.trim()) {
      setFilteredOptions(allOptions.filter((item) => item.name.toLowerCase().startsWith(searchInput.toLowerCase())));
      setSelectedOption(null); // Reset selected option when user types
    } else {
      setFilteredOptions(allOptions);
      setSelectedOption(null); // Reset selected option when user types
    }
  }, [searchInput, hotelsData, countryData, cityData]);

  useEffect(() => {
    if (!loadingSearchRoom && responseSearchRoom) {
      // console.log(responseSearch)
      setHotels(responseSearchRoom?.data?.hotels)
    }
  }, [responseSearchRoom, update])

  useEffect(() => {
    if (!loadingSearchTour && responseSearchTour) {
      // console.log(responseSearch)
      setTours(responseSearchTour?.data?.tours)
    }
  }, [responseSearchTour, update])

  const handleTabChange = (_, newValue) => {
    setTabValue(newValue);
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    setSearchInput(option.name);
    setShowDropdown(false);
  };

  // Example settings for Splide carousel
  const options = {
    type: 'loop',
    perPage: 1, // Show only 1 image per slide
    perMove: 1,
    pagination: false,
    arrows: false,
    autoplay: false,
    pauseOnHover: false,
    heightRatio: 0.8,
    gap: '0px',  // Ensure no gap between slides
    trimSpace: false, // Prevents extra space that might show next slide
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (tabValue === 0) {
      console.log(selectedOption)
      let finalSelectedOption = selectedOption;
      // If no option was selected, choose the first matching option automatically
      if (!finalSelectedOption && filteredOptions.length > 0) {
        finalSelectedOption = filteredOptions[0];
        setSelectedOption(finalSelectedOption);  // Update state with auto-selected option
      }
      if (finalSelectedOption?.type === "City" && finalSelectedOption.id) {
        formData.append("city_id", finalSelectedOption.id);
      }
      if (finalSelectedOption?.type === "Hotel" && finalSelectedOption.id) {
        formData.append("hotel_id", finalSelectedOption.id);
      }
      if (finalSelectedOption?.type === "Country" && finalSelectedOption.id) {
        formData.append("country_id", finalSelectedOption.id);
      }

      // Append other fields (check-in, check-out, etc.)
      formData.append("check_in", checkIn);
      formData.append("check_out", checkOut);
      formData.append("max_adults", adults);
      formData.append("max_children", children);

      postRoom(formData);
    }
    else if (tabValue === 1) {
      formData.append("destination_country", selectedCountry.id)
      formData.append("tour_type_id", selectedTour.id)
      formData.append("destination_city", selectedCity.id)
      formData.append("year", selectedYear)
      formData.append("month", new Date(`${selectedMonth} 1, 2000`).getMonth() + 1);
      formData.append("people", noOfPeople)

      postTour(formData);

    }

  };

  return (
    <>
      <div className="md:p-8 p-4 w-full bg-white shadow-xl rounded-xl border border-gray-200">

        {/* Tabs for Hotel & Tour */}
        <Tabs className="mb-10 font-semibold text-2xl" value={tabValue} onChange={handleTabChange} variant="fullWidth">
          <Tab label="Room" sx={{ fontWeight: "bold", fontSize: "1.0rem" }} />
          <Tab label="Tour" sx={{ fontWeight: "bold", fontSize: "1.0rem" }} />
        </Tabs>
        {tabValue === 0 && (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4">
            <div className="relative">
              <TextField
                fullWidth
                placeholder="Where do you want to go?"
                label="Where do you want to go?"
                variant="outlined"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MdHotel className="text-blue-500 text-lg" />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Dropdown for filtered options */}
              {showDropdown && filteredOptions.length > 0 && (
                <div className="border p-3 max-h-48 overflow-y-auto rounded-lg bg-white shadow-lg absolute w-full z-20">
                  {filteredOptions.map((option, index) => (
                    <div
                      key={index}
                      onClick={() => handleSelect(option)}
                      className="p-2 cursor-pointer flex items-center gap-3 hover:bg-gray-200 rounded-lg transition"
                    >
                      {option.type === "Hotel" && <MdHotel className="text-blue-500 text-lg" />}
                      {option.type === "Country" && <FaGlobe className="text-green-500 text-lg" />}
                      {option.type === "City" && <FaCity className="text-red-500 text-lg" />}
                      <span className="text-gray-700">{option.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <TextField
              fullWidth
              type="date"
              label="Check-in"
              InputLabelProps={{ shrink: true }}
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              InputProps={{ inputProps: { min: today } }} // Disable dates before today
            />
            <TextField
              fullWidth
              type="date"
              label="Check-out"
              InputLabelProps={{ shrink: true }}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              InputProps={{ inputProps: { min: today } }} // Disable dates before today
            />
            {/* Adults dropdown */}
            <TextField
              type="number"
              fullWidth
              label="Adults"
              inputProps={{
                min: "0",
              }}
              value={adults}
              onChange={(e) => setAdults(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaUser className="text-gray-500 text-lg" />
                  </InputAdornment>
                ),
              }}

            />

            {/* Children dropdown with a limit of 5 */}
            <TextField
              type="number"
              fullWidth
              label="Children"
              value={children}
              onChange={(e) => setChildren(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaChild className="text-gray-500 text-lg" />
                  </InputAdornment>
                ),
              }}
              inputProps={{
                min: "0", // Set the minimum value for the number input
              }}
            />
            <div className="inline-block w-full md:w-auto">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth={false} // Remove full width to respect inline-block behavior
                disabled={loadingSearchRoom}
              >
                {loadingSearchRoom ? <CircularProgress size={24} color="inherit" /> : "Search"}
              </Button>
            </div>
          </form>
        )}

        {/* Render the Tour Form if Tour Tab is Selected */}
        {tabValue === 1 && (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4">
            <Autocomplete
              options={countryData?.countries || []}
              getOptionLabel={(option) => option.name}
              value={selectedCountry} // Bind value to state
              onChange={(_, newValue) => setSelectedCountry(newValue)} // Update state
              renderInput={(params) => <TextField {...params} label="Select Country" fullWidth />}
            />
            <Autocomplete
              options={cityData?.cities || []}
              getOptionLabel={(option) => option.name}
              value={selectedCity} // Bind value to state
              onChange={(_, newValue) => setSelectedCity(newValue)} // Update state
              renderInput={(params) => <TextField {...params} label="Select City" fullWidth />}
            />
            <Autocomplete
              options={tourData?.tourtype || []}
              getOptionLabel={(option) => option.name}
              value={selectedTour} // Bind value to state
              onChange={(_, newValue) => setSelectedTour(newValue)} // Update state
              renderInput={(params) => <TextField {...params} label="Select Tour" fullWidth />}
            />
            <TextField
              fullWidth
              select
              label="Select Year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              SelectProps={{ native: true }}
            >
              <option value="">Select Year</option>
              {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </TextField>
            <TextField
              fullWidth
              select
              label="Select Month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              SelectProps={{ native: true }}
            >
              <option value="">Select Month</option>
              {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month, index) => (
                <option key={index} value={month}>{month}</option>
              ))}
            </TextField>
            <TextField
              fullWidth
              type="number"
              label="No of People"
              inputProps={{ min: "1" }}
              value={noOfPeople}
              onChange={(e) => setNoOfPeople(e.target.value)}
            />
            <div className="inline-block w-full md:w-auto">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth={false}
                disabled={loadingSearchTour}
              >
                {loadingSearchTour ? <CircularProgress size={24} color="inherit" /> : "Search"}
              </Button>
            </div>
          </form>
        )}
      </div>
      {tabValue === 0 && responseSearchRoom && hotels.length === 0 ? (
        <div className="flex justify-center items-center p-6">
          <p className="text-lg text-gray-600">Unfortunately, no hotels match your search criteria. Please try again with different filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
          {hotels.map((hotel) => {
            const minPrice = hotel.room_pricings.reduce((min, current) =>
              current.price < min ? current.price : min, hotel.room_pricings[0]?.price);
            const currency = hotel.room_pricings[0]?.currency_name || "USD";
            const stars = Array.from({ length: 5 }).map((_, i) => (
              <FaStar key={i} className={i < hotel.hotel_stars ? "text-yellow-400" : "text-gray-300"} />
            ));

            return (
              <div key={hotel.hotel_id} className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                {/* Image with location badge */}
                <div className="relative h-60 overflow-hidden">
                  <Splide
                    options={{
                      type: 'loop',
                      autoplay: true,
                      interval: 4000,
                      pauseOnHover: false,
                      arrows: false,
                      pagination: false
                    }}
                    className="h-full"
                  >
                    {hotel.images.map((image, index) => (
                      <SplideSlide key={index}>
                        <img
                          src={image}
                          alt={hotel.hotel_name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </SplideSlide>
                    ))}
                  </Splide>

                  {/* Location Badge */}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                    <div className="flex items-center gap-1 text-sm font-medium">
                      <FaMapMarkerAlt className="text-red-500" />
                      <span className="text-gray-800">{hotel.city}, {hotel.country}</span>
                    </div>
                  </div>
                </div>

                {/* Hotel Info */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{hotel.hotel_name}</h3>
                      <div className="flex items-center mt-1">
                        <div className="flex mr-2">{stars}</div>
                        <span className="text-sm text-gray-500">{hotel.hotel_stars}-star hotel</span>
                      </div>
                    </div>

                    {/* Hotel Logo */}
                    <div className="flex-shrink-0 ml-3">
                      <img
                        src={hotel.hotel_logo || '_'}
                        alt={hotel.hotel_name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Description with fade effect */}
                  <div className="relative mb-4">
                    <div className="text-gray-600 line-clamp-3 text-sm relative">
                      {hotel.description || "Luxurious accommodation with premium amenities"}
                      <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-white to-transparent"></div>
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between border-t pt-4">
                    <div>
                      <p className="text-xs text-gray-500">Starting from</p>
                      <p className="text-xl font-bold text-blue-600">
                        {minPrice} <span className="text-sm">{currency}</span>
                      </p>
                      <p className="text-xs text-gray-500">per night</p>
                    </div>

                    <Link
                      to="hotel_details"
                      state={{
                        hotel,
                        checkIn,
                        checkOut,
                        adults,
                        children,
                      }}
                      className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-5 py-2 rounded-lg shadow-sm hover:shadow-md transition-all flex items-center gap-2"
                    >
                      <FaInfoCircle />
                      <span>View Details</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      )}


      {tabValue === 1 && responseSearchTour &&
        tours.length === 0 ? (
        <div className="flex justify-center items-center p-6">
          <p className="text-lg text-gray-600">Unfortunately, no hotels match your search criteria. Please try again with different filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:p-6 p-2  pt-0">
          {tours.map((tour) => (
            <div
              key={tour.tour_id}
              className="bg-mainBgColor rounded-xl shadow-xl overflow-hidden transition-transform transform hover:scale-90"
            >
              <div className="w-full p-4">
                {/* Tour Header */}
                <div className="w-full flex gap-4">
                  <div>
                    <img
                      src={tour.image_link}
                      className="w-16 h-16 object-cover rounded-full"
                      alt={tour.name}
                    />
                  </div>
                  <div className="w-full flex flex-col">
                    <div className="flex justify-between">
                      <h2 className="text-2xl text-mainColor">{tour.name}</h2>
                      {/* <h2 className="text-xl text-mainColor underline cursor-pointer">
                        Details
                      </h2> */}
                      <Link
                        to="tour_details"
                        state={{
                         tour,noOfPeople
                        }}
                        className="flex items-center gap-1 text-xl text-mainColor underline cursor-pointer"
                      >
                        <FaInfoCircle />
                        <span>Details</span>
                      </Link>
                    </div>
                    <p className="text-sm text-gray-500">{tour.description}</p>
                  </div>
                </div>

                {/* Tour Info */}
                <div className="space-y-3 mt-3">

                  {/* Location */}
                  <div className="flex items-center text-gray-700 font-medium">
                    <MdLocationOn className="text-xl  text-gray-700 mr-2" />
                    <span>{tour.destinations[0]?.city?.name}, {tour.destinations[0]?.country?.name}</span>
                  </div>

                  {/* Destination Type */}
                  {/* <div className="flex items-center text-gray-600">
              <IoIosTime className="text-lg  text-gray-700 mr-2" />
              <span className="text-sm"><strong>Type:</strong> {tour.destination_type}</span>
            </div> */}

                  {/* Nights & Price */}
                  <div className="flex justify-between items-center text-gray-700">
                    <div className="flex items-center gap-2">
                      <MdNightsStay className="text-lg  text-gray-700" />
                      <span className="text-sm"><strong>Nights:</strong> {tour.nights}</span>
                    </div>
                    <div className="flex items-center gap-2 font-bold">
                      <FaRegMoneyBillAlt className="text-lg" />
                      <span>{tour.price} {tour.currency?.name}</span>
                    </div>
                  </div>

                  {/* Featured Badge & Period */}
                  {tour.featured === "yes" && (
                    <div className="flex items-center gap-3 bg-mainColor p-3 rounded-lg">
                      {/* <AiOutlineStar className="text-xl text-white" /> */}
                      <div className="flex flex-col text-sm">
                        <span className="font-semibold text-white">Featured Period</span>
                        <div className="flex gap-4 text-white">
                          <span className="flex items-center gap-1">
                            📅 From: {new Date(tour.featured_from).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            📅 To: {new Date(tour.featured_to).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          ))}
        </div>
      )
      }

    </>

  );
};

export default BookingEngine;
