import React, { useState, useEffect } from "react";
import { usePost } from "../../../Hooks/usePostJson";
import { useGet } from "../../../Hooks/useGet";
import { TextField, Button, MenuItem, InputAdornment,CircularProgress } from "@mui/material";
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
  const { postData, loadingPost:loadingSearch, response:responseSearch} = usePost({
    url: "https://travelta.online/agent/agent/avalibleRooms",
  });

  const [searchInput, setSearchInput] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    refetchHotelsList();
    refetchCountryList();
    refetchCityList();
  }, [update]);

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // Set tomorrow's date

    const todayString = today.toISOString().split("T")[0];
    const tomorrowString = tomorrow.toISOString().split("T")[0];

    setCheckIn(todayString);
    setCheckOut(tomorrowString); // Set default check-out date to tomorrow
  }, []);

  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

  useEffect(() => {
    const hotels = hotelsData?.hotels?.map((h) => ({ type: "Hotel", name: h.name, id: h.id })) || [];
    const countries = countryData?.countries?.map((c) => ({ type: "Country", name: c.name, id: c.id })) || [];
    const cities = cityData?.cities?.map((ci) => ({ type: "City", name: ci.name, id: ci.id })) || [];
    
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
    if(!loadingSearch && responseSearch){
      // console.log(responseSearch)
      setHotels(responseSearch?.data?.hotels)
    }
  },[responseSearch,update])

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
    console.log(selectedOption)
    let finalSelectedOption = selectedOption;

    // If no option was selected, choose the first matching option automatically
    if (!finalSelectedOption && filteredOptions.length > 0) {
        finalSelectedOption = filteredOptions[0];
        setSelectedOption(finalSelectedOption);  // Update state with auto-selected option
    }

    const formData = new FormData();
    
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
  
    postData(formData);
  };
  
  return (
    <>
    <div className="p-8 w-full bg-white shadow-xl rounded-xl border border-gray-200">
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

    <Button
      type="submit"
      variant="contained"
      color="primary"
      fullWidth
      disabled={loadingSearch} // Disable the button when loading
    >
      {loadingSearch ? ( // Conditionally render the loading spinner or text
        <CircularProgress size={24} color="inherit" />
      ) : (
        "Search"
      )}
    </Button>
      </form>
    </div>

    {responseSearch && hotels.length === 0 ? (
        <div className="flex justify-center items-center p-6">
          <p className="text-lg text-gray-600">Unfortunately, no hotels match your search criteria. Please try again with different filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
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
