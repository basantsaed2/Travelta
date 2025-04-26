import React, { useEffect } from "react";
import { TextField, MenuItem, Autocomplete, Button } from "@mui/material";

const TourServicePage = ({
  tour,
  setTour,
  tourType,
  selectedTourType,
  setSelectedTourType,
  tourAdultsNumber,
  setTourAdultsNumber,
  tourChildrenNumber,
  setTourChildrenNumber,
  tourAdultPrice,
  setTourAdultPrice,
  tourChildPrice,
  setTourChildPrice,
  tourAdults,
  setTourAdults,
  tourChildren,
  setTourChildren,
  title, // e.g. ["Mr.", "Mrs.", "Ms.", "Dr."]
  hotels,
  setHotels,
  buses,
  setBuses,
  today,
  setNotesTour,
  notesTour
}) => {
  // Tour Adults Functions
  const handleTourAdultsNumberChange = (e) => {
    const number = parseInt(e.target.value, 10) || 0;
    setTourAdultsNumber(number);
    setTourAdults((prevAdults) => {
      const updatedAdults = [...prevAdults];
      while (updatedAdults.length < number) {
        updatedAdults.push({ selectedTitle: "", firstName: "", lastName: "" });
      }
      updatedAdults.length = number;
      return updatedAdults;
    });
  };

  const handleAdulTourChange = (index, field, value) => {
    const updatedAdults = [...tourAdults];
    updatedAdults[index][field] = value;
    setTourAdults(updatedAdults);
  };

  // Tour Children Functions
  const handleTourChildrenNumberChange = (e) => {
    const number = parseInt(e.target.value, 10) || 0;
    setTourChildrenNumber(number);
    setTourChildren((prevChildren) => {
      const updatedChildren = [...prevChildren];
      while (updatedChildren.length < number) {
        updatedChildren.push({ age: "", firstName: "", lastName: "" });
      }
      updatedChildren.length = number;
      return updatedChildren;
    });
  };

  const handleChildTourChange = (index, field, value) => {
    const updatedChildren = [...tourChildren];
    updatedChildren[index][field] = value;
    setTourChildren(updatedChildren);
  };

  // Hotel functions
  const handleHotelChange = (index, field, value) => {
    setHotels((prevHotels) =>
      prevHotels.map((hotel, i) => {
        if (i === index) {
          const updatedHotel = { ...hotel, [field]: value };
          // If check_in or check_out is changed, recalculate nights.
          if (field === "check_in" || field === "check_out") {
            if (updatedHotel.check_in && updatedHotel.check_out) {
              const start = new Date(updatedHotel.check_in);
              const end = new Date(updatedHotel.check_out);
              const diffTime = end - start;
              const nights = Math.floor(diffTime / (1000 * 60 * 60 * 24));
              updatedHotel.nights = nights > 0 ? nights : 0;
            } else {
              updatedHotel.nights = 0;
            }
          }
          return updatedHotel;
        }
        return hotel;
      })
    );
  };  

  const addNewHotel = () => {
    setHotels((prev) => [
      ...prev,
      {
        destination: "",
        hotel_name: "",
        room_type: "",
        check_in: "",
        check_out: "",
        nights: "",
      },
    ]);
  };

  const removeHotel = (index) => {
    if (index !== 0) {
      setHotels((prev) => prev.filter((hotel, i) => i !== index));
    }
  };

  // Bus (Transportation) functions
  const handleBusChange = (index, field, value) => {
    setBuses((prev) =>
      prev.map((bus, i) => (i === index ? { ...bus, [field]: value } : bus))
    );
  };

  const addNewBus = () => {
    setBuses((prev) => [...prev, { transportation: "", seats: "" }]);
  };

  const removeBus = (index) => {
    if (index !== 0) {
      setBuses((prev) => prev.filter((bus, i) => i !== index));
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg p-2 md:p-6 bg-gradient-to-r from-blue-50 to-blue-100">
        <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">
            Tour Details
        </h2>

      {/* Basic Tour Details */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-6">
        {/* Tour Name */}
        <TextField
          fullWidth
          label="Tour Name"
          variant="outlined"
          value={tour}
          onChange={(e) => setTour(e.target.value)}
          placeholder="Enter Tour Name"
          sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
        />
        {/* Tour Type (Select) */}
        <TextField
          select
          fullWidth
          variant="outlined"
          label="Tour Type"
          value={selectedTourType}
          onChange={(e) => setSelectedTourType(e.target.value)}
          placeholder="Select Tour Type"
          sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
        >
          {tourType.map((type) => (
            <MenuItem key={type.value} value={type.value}>
              {type.label}
            </MenuItem>
          ))}
        </TextField>
        {/* Number of Adults */}
        <TextField
          fullWidth
          label="Adults"
          type="number"
          variant="outlined"
          value={tourAdultsNumber}
          onChange={handleTourAdultsNumberChange}
          placeholder="Enter number of adults"
          inputProps={{ min: 0 }}
          sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
        />
        {/* Number of Children */}
        <TextField
          fullWidth
          label="Children"
          type="number"
          variant="outlined"
          value={tourChildrenNumber}
          onChange={handleTourChildrenNumberChange}
          placeholder="Enter number of children"
          inputProps={{ min: 0 }}
          sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
        />
        {/* Adult Price */}
        <TextField
          fullWidth
          label="Adult Price"
          type="number"
          variant="outlined"
          value={tourAdultPrice}
          onChange={(e) => setTourAdultPrice(e.target.value)}
          placeholder="Enter price per adult"
          inputProps={{ min: 0 }}
          sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
        />
        {/* Child Price */}
        <TextField
          fullWidth
          label="Child Price"
          type="number"
          variant="outlined"
          value={tourChildPrice}
          onChange={(e) => setTourChildPrice(e.target.value)}
          placeholder="Enter price per child"
          inputProps={{ min: 0 }}
          sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
        />
        <TextField
          fullWidth
          label="Notes"
          type="text"
          variant="outlined"
          value={notesTour}
          onChange={(e) => setNotesTour(e.target.value)}
          placeholder="Enter Any Notes"
          sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
        />
      </div>

        {/* Tour Adults Details Section */}
        {tourAdultsNumber > 0 && (
        <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Adults Details
            </h3>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tourAdults.map((adult, index) => (
                <div
                key={index}
                className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-3"
                >
                <h4 className="text-lg font-semibold mb-2">
                    Adult {index + 1}
                </h4>      
                    {/* Title as Autocomplete */}
                    <Autocomplete
                    fullWidth
                    options={title}
                    getOptionLabel={(option) => option || ""}
                    value={adult.selectedTitle || null}
                    onChange={(e, newValue) =>
                        handleAdulTourChange(index, "selectedTitle", newValue)
                    }
                    renderInput={(params) => (
                        <TextField
                        {...params}
                        label={`Title for Adult ${index + 1}`}
                        variant="outlined"
                        className="mb-2"
                        InputProps={{
                            ...params.InputProps,
                            sx: {
                            backgroundColor: "white",
                            borderRadius: "8px",
                            boxShadow: 1,
                            },
                        }}
                        />
                    )}
                    />
                    {/* First Name */}
                    <TextField
                    label={`First Name for Adult ${index + 1}`}
                    variant="outlined"
                    fullWidth
                    value={adult.firstName}
                    onChange={(e) =>
                        handleAdulTourChange(index, "firstName", e.target.value)
                    }
                    className="mb-2"
                    sx={{
                        backgroundColor: "white",
                        borderRadius: "8px",
                        boxShadow: 1,
                    }}
                    />
                    {/* Last Name */}
                    <TextField
                    label={`Last Name for Adult ${index + 1}`}
                    variant="outlined"
                    fullWidth
                    value={adult.lastName}
                    onChange={(e) =>
                        handleAdulTourChange(index, "lastName", e.target.value)
                    }
                    className="mb-2"
                    sx={{
                        backgroundColor: "white",
                        borderRadius: "8px",
                        boxShadow: 1,
                    }}
                    />
                
                </div>
            ))}
            </div>
        </div>
        )}

        {/* Tour Children Details Section */}
        {tourChildrenNumber > 0 && (
        <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Children Details
            </h3>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tourChildren.map((child, index) => (
                <div
                key={index}
                className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-3"
                >
                <h4 className="text-lg font-semibold mb-2">
                    Child {index + 1}
                </h4>            
                    {/* Age */}
                    <TextField
                    label="Age"
                    type="number"
                    variant="outlined"
                    fullWidth
                    value={child.age}
                    onChange={(e) =>
                        handleChildTourChange(index, "age", e.target.value)
                    }
                    inputProps={{ min: 0 }}
                    sx={{
                        backgroundColor: "white",
                        borderRadius: "8px",
                        boxShadow: 1,
                    }}
                    />
                    {/* First Name */}
                    <TextField
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    value={child.firstName}
                    onChange={(e) =>
                        handleChildTourChange(index, "firstName", e.target.value)
                    }
                    sx={{
                        backgroundColor: "white",
                        borderRadius: "8px",
                        boxShadow: 1,
                    }}
                    />
                    {/* Last Name */}
                    <TextField
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    value={child.lastName}
                    onChange={(e) =>
                        handleChildTourChange(index, "lastName", e.target.value)
                    }
                    sx={{
                        backgroundColor: "white",
                        borderRadius: "8px",
                        boxShadow: 1,
                    }}
                    />
                </div>
            ))}
            </div>
        </div>
        )}

     {/* Optional: Additional Sections for Hotels and Transportation */}
        {/* Hotels Section */}
        {hotels.map((hotel, index) => (
        <div key={index} className="p-4 md:p-6 mb-6 bg-white rounded-xl shadow-lg border border-gray-200 transition-all hover:shadow-2xl">
            <h3 className="p-2 font-semibold text-mainColor text-center text-2xl border-b border-mainColor mb-4">
            Hotel Details {index + 1}
            </h3>
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <TextField
                label="Destination"
                fullWidth
                value={hotel.destination}
                onChange={(e) => handleHotelChange(index, "destination", e.target.value)}
                variant="outlined"
                sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
            />
            <TextField
                label="Hotel Name"
                fullWidth
                value={hotel.hotel_name}
                onChange={(e) => handleHotelChange(index, "hotel_name", e.target.value)}
                variant="outlined"
                sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
            />
            <TextField
                select
                label="Room Type"
                fullWidth
                value={hotel.room_type}
                onChange={(e) => handleHotelChange(index, "room_type", e.target.value)}
                variant="outlined"
                sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
            >
                <MenuItem value="single">Single</MenuItem>
                <MenuItem value="double">Double</MenuItem>
                <MenuItem value="triple">Triple</MenuItem>
                <MenuItem value="quadruple">Quadruple</MenuItem>
            </TextField>
            <TextField
                label="Check-In Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={hotel.check_in}
                onChange={(e) => handleHotelChange(index, "check_in", e.target.value)}
                variant="outlined"
                sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
                inputProps={{
                    // Minimum date is today (format YYYY-MM-DD)
                    min: today, 
                    // Maximum check-in date is one day before check-out date (if set)
                    max: hotel.check_out
                    ? new Date(new Date(hotel.check_out).getTime() - 86400000)
                        .toISOString()
                        .slice(0, 10)
                    : undefined,
                }}
            />
            <TextField
                label="Check-Out Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={hotel.check_out}
                onChange={(e) => handleHotelChange(index, "check_out", e.target.value)}
                variant="outlined"
                sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
                inputProps={{
                    // Minimum check-out date is one day after check-in date (if set)
                    min: hotel.check_in
                    ? new Date(new Date(hotel.check_in).getTime() + 86400000)
                        .toISOString()
                        .slice(0, 10)
                    : today,
                }}
            />
            {
                (hotel.check_out && hotel.check_in) &&
                <div className="flex justify-center gap-2 items-center bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg shadow-lg">
                    <div className="text-xl text-gray-600 mb-1">Total Nights : </div>
                    <div className="text-xl font-bold text-blue-800">
                        {hotel.nights}
                    </div>
                </div>
            }
            </div>
            <div className="flex flex-col md:flex-row gap-3 justify-between mt-4">
            {index !== 0 && hotels.length > 1 && (
                <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg transition-colors hover:bg-red-600"
                onClick={() => removeHotel(index)}
                >
                Remove Hotel
                </button>
            )}
            {index === hotels.length - 1 && (
                <Button variant="contained" color="primary" onClick={addNewHotel}>
                + Add Another Hotel
                </Button>
            )}
            </div>
        </div>
        ))}

        {/* Transportation (Buses) Section */}
        {buses.map((bus, index) => (
        <div key={index} className="p-4 md:p-6 mb-6 bg-white rounded-xl shadow-lg border border-gray-200 transition-all hover:shadow-2xl">
            <h3 className="p-2 font-semibold text-mainColor text-center text-2xl border-b border-mainColor mb-4">
                Transportation {index + 1}
            </h3>
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <TextField
                select
                label="Transportation"
                fullWidth
                value={bus.transportation}
                onChange={(e) => handleBusChange(index, "transportation", e.target.value)}
                variant="outlined"
                sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
            >
                <MenuItem value="bus">Bus</MenuItem>
                <MenuItem value="flight">Flight</MenuItem>
            </TextField>
            {bus.transportation === "flight" && (
                <TextField
                fullWidth
                type="datetime-local"
                label="Departure Date & Time"
                value={bus.departure || ""}
                onChange={(e) => handleBusChange(index, "departure", e.target.value)}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
                />
            )}
            <TextField
                label="Seats"
                type="number"
                fullWidth
                value={bus.seats}
                onChange={(e) => handleBusChange(index, "seats", e.target.value)}
                variant="outlined"
                inputProps={{ min: "0" }}
                sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
            />
            </div>
            <div className="flex flex-col md:flex-row gap-3 justify-between mt-4">
            {index !== 0 && buses.length > 1 && (
                <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg transition-colors hover:bg-red-600"
                onClick={() => removeBus(index)}
                >
                Remove Transportation
                </button>
            )}
            {index === buses.length - 1 && (
                <Button  sx={{ fontSize: '0.8rem' }} variant="contained" className="text-sm" color="primary" onClick={addNewBus}>
                + Add Another Transportation
                </Button>
            )}
            </div>
        </div>
        ))}

    </div>
  );
};

export default TourServicePage;
