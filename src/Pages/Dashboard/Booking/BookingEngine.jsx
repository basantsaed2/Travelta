import React, { useState, useEffect } from "react";
import { usePost } from "../../../Hooks/usePostJson";
import { useGet } from "../../../Hooks/useGet";
import { TextField, Button, MenuItem, InputAdornment,CircularProgress,Tabs, Tab ,Autocomplete } from "@mui/material";
import { MdHotel } from "react-icons/md";
import { FaGlobe, FaCity, FaUser, FaChild } from "react-icons/fa";
import { FaStar ,FaBed, FaMoneyBillWave, FaRegCreditCard, FaInfoCircle } from 'react-icons/fa';
import { Link } from "react-router-dom";
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
  const { postData:postRoom, loadingPost:loadingSearchRoom, response:responseSearchRoom} = usePost({
    url: "https://travelta.online/agent/agent/avalibleRooms",
  });
  const { postData:postTour, loadingPost:loadingSearchTour, response:responseSearchTour} = usePost({
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

  useEffect(()=>{
    if(!loadingSearchRoom && responseSearchRoom){
      // console.log(responseSearch)
      setHotels(responseSearchRoom?.data?.hotels)
    }
  },[responseSearchRoom,update])

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
    autoplay: true,
    pauseOnHover: true,
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
    <div className="p-8 w-full bg-white shadow-xl rounded-xl border border-gray-200">

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

    {responseSearchRoom && hotels.length === 0 ? (
        <div className="flex justify-center items-center p-6">
          <p className="text-lg text-gray-600">Unfortunately, no hotels match your search criteria. Please try again with different filters.</p>
        </div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
      {hotels.map((hotel) => (
      <div key={hotel.hotel_id} className="bg-white rounded-xl shadow-xl overflow-hidden transition-transform transform hover:scale-90">
      {/* Hotel Image Carousel */}
      <Splide options={options} className="w-full">
    {hotel.images.map((image, index) => (
      <SplideSlide key={index} className="w-full flex justify-center">
        <img
          src={image}
          alt={hotel.hotel_name}
          className="w-full h-full object-fit"
        />
      </SplideSlide>
    ))}
  </Splide>
    
      {/* Hotel Info */}
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Hotel Logo */}
            <img
              src={hotel.hotel_logo || 'https://via.placeholder.com/50'}
              alt={hotel.hotel_name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <h2 className="text-2xl font-semibold text-gray-800">{hotel.hotel_name}</h2>
          </div>
    
          {/* Stars Rating */}
          <div className="flex items-center text-yellow-400">
            {Array.from({ length: hotel.hotel_stars }).map((_, index) => (
              <FaStar key={index} className="text-xl" />
            ))}
          </div>
        </div>
    
        <p className="text-gray-600">{hotel.description}</p>
    
        {/* Facilities and Room Details */}
        <div className="space-y-3">
          {hotel.hotel_facilities.map((facility) => (
            <div key={facility.id} className="flex items-center text-gray-700 space-x-2">
              <FaBed className="text-mainColor" />
              <span>{facility.name}</span>
            </div>
          ))}
          {/* <div className="flex items-center text-gray-700 space-x-2">
            <FaMoneyBillWave className="text-green-500" />
            <span className="font-semibold">Price: ${hotel.available_rooms[0]?.price}</span>
          </div> */}
        </div>
    
        {/* Policies */}
        {/* <div className="space-y-2">
          {hotel.hotel_policies.map((policy) => (
            <div key={policy.id} className="flex items-center text-gray-600">
              <FaRegCreditCard className="mr-2 text-blue-500" />
              <span>{policy.title}: {policy.description}</span>
            </div>
          ))}
        </div> */}
    
        {/* Button to Get More Details */}
        <Link to={"details"} state={{hotel:hotel}} className="inline-block w-full mt-4">
          <button className="bg-blue-600 text-white py-2 px-6 rounded-md w-full hover:bg-blue-700 transition duration-300 ease-in-out">
            <FaInfoCircle className="inline-block mr-2" />
            View More Details
          </button>
        </Link>
      </div>
    </div>
    
      ))}
      </div>
    )}
   
    </>

  );
};

export default BookingEngine;
