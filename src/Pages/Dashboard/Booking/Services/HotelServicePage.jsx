import React, { useEffect } from "react";
import { TextField, MenuItem, Autocomplete } from "@mui/material";

const HotelServicePage = ({
    today,
  hotelName,
  setHotelName,
  checkInDate,
  setCheckInDate,
  checkOutDate,
  setCheckOutDate,
  totalNights,
  setTotalNights,
  roomQuantity,
  setRoomQuantity,
  roomTypes,
  setRoomTypes,
  adultsHotelNumber,
  setAdultsHotelNumber,
  childrenHotelNumber,
  setChildrenHotelNumber,
  hotelAdults,
  setHotelAdults,
  hotelChildren,
  setHotelChildren,
  title // array of title options e.g. ["Mr.", "Mrs.", "Ms.", "Dr."]
}) => {
  // Calculate Total Nights whenever check-in or check-out date changes
  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const start = new Date(checkInDate);
      const end = new Date(checkOutDate);
      const diffTime = end - start;
      const nights = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      setTotalNights(nights > 0 ? nights : 0);
    } else {
      setTotalNights(0);
    }
  }, [checkInDate, checkOutDate, setTotalNights]);

  // Handle change in number of adults
  const handleAdultsHotelNumberChange = (e) => {
    const number = parseInt(e.target.value, 10) || 0;
    setAdultsHotelNumber(number);
    setHotelAdults((prevAdults) => {
      const updatedAdults = [...prevAdults];
      while (updatedAdults.length < number) {
        updatedAdults.push({ title: "", firstName: "", lastName: "" });
      }
      updatedAdults.length = number;
      return updatedAdults;
    });
  };

  // Handle change in number of children
  const handleChildrenHotelNumberChange = (e) => {
    const number = parseInt(e.target.value, 10) || 0;
    setChildrenHotelNumber(number);
    setHotelChildren((prevChildren) => {
      const updatedChildren = [...prevChildren];
      while (updatedChildren.length < number) {
        updatedChildren.push({ age: "", firstName: "", lastName: "" });
      }
      updatedChildren.length = number;
      return updatedChildren;
    });
  };

  // Update adult details
  const handleAdultHotelChange = (index, field, value) => {
    const updatedAdults = [...hotelAdults];
    updatedAdults[index][field] = value;
    setHotelAdults(updatedAdults);
  };

  // Update child details
  const handleChildHotelChange = (index, field, value) => {
    const updatedChildren = [...hotelChildren];
    updatedChildren[index][field] = value;
    setHotelChildren(updatedChildren);
  };

  // Handle room quantity change and adjust roomTypes array
  const handleQuantityChange = (e) => {
    const quantity = Math.max(0, Number(e.target.value));
    setRoomQuantity(quantity);
    const newRoomTypes = Array(quantity)
      .fill("")
      .map((_, idx) => roomTypes[idx] || "");
    setRoomTypes(newRoomTypes);
  };

  // Options for room type selection (Autocomplete)
  const roomTypeOptions = [
    { label: "Single", value: "single" },
    { label: "Double", value: "double" },
    { label: "Triple", value: "triple" },
    { label: "Quadruple", value: "quadruple" }
  ];  

  // Update a specific room type using Autocomplete value
  const handleRoomTypeChange = (index, value) => {
    const newRoomTypes = [...roomTypes];
    newRoomTypes[index] = value ? value.value : "";
    setRoomTypes(newRoomTypes);
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg p-4 md:p-6 bg-gradient-to-r from-blue-50 to-blue-100">
      <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">
        Hotel Details
      </h2>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Hotel Name */}
        <TextField
          fullWidth
          label="Hotel Name"
          value={hotelName}
          onChange={(e) => setHotelName(e.target.value)}
          variant="outlined"
          placeholder="Enter hotel name"
          sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
        />
        {/* Check-in Date */}
        <TextField
            fullWidth
            label="Check-in Date"
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
            inputProps={{
                // Minimum date is today (format YYYY-MM-DD)
                min: today, 
                // Maximum check-in date is one day before check-out date (if set)
                max: checkOutDate
                ? new Date(new Date(checkOutDate).getTime() - 86400000)
                    .toISOString()
                    .slice(0, 10)
                : undefined,
            }}
            />

            <TextField
            fullWidth
            label="Check-out Date"
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
            inputProps={{
                // Minimum check-out date is one day after check-in date (if set)
                min: checkInDate
                ? new Date(new Date(checkInDate).getTime() + 86400000)
                    .toISOString()
                    .slice(0, 10)
                : today,
            }}
            />

        {/* Total Nights (Calculated Automatically) */}
        {
            (checkInDate && checkOutDate) &&
            <div className="flex justify-center gap-2 items-center bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg shadow-lg">
            <div className="text-xl text-gray-600 mb-1">Total Nights : </div>
            <div className="text-xl font-bold text-blue-800">
                {totalNights}
            </div>
        </div>
        }

        {/* Room Quantity */}
        <TextField
          fullWidth
          label="Room Quantity"
          type="number"
          value={roomQuantity}
          onChange={handleQuantityChange}
          variant="outlined"
          placeholder="Enter number of rooms"
          inputProps={{ min: 0 }}
          sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
        />
        {/* Room Types using Autocomplete */}
        {roomTypes.length > 0 &&
          roomTypes.map((type, index) => {
            const selectedOption =
              roomTypeOptions.find((opt) => opt.value === type) || null;
            return (
              <Autocomplete
                key={index}
                options={roomTypeOptions}
                getOptionLabel={(option) => option.label}
                value={selectedOption}
                onChange={(e, newValue) => handleRoomTypeChange(index, newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={`Room Type for Room ${index + 1}`}
                    variant="outlined"
                    placeholder="Select Room Type"
                    sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
                  />
                )}
              />
            );
          })}
        {/* Adults Number */}
        <TextField
          fullWidth
          label="Adults"
          type="number"
          value={adultsHotelNumber}
          onChange={handleAdultsHotelNumberChange}
          variant="outlined"
          placeholder="Enter number of adults"
          inputProps={{ min: 0 }}
          sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
        />
        {/* Children Number */}
        <TextField
          fullWidth
          label="Children"
          type="number"
          value={childrenHotelNumber}
          onChange={handleChildrenHotelNumberChange}
          variant="outlined"
          placeholder="Enter number of children"
          inputProps={{ min: 0 }}
          sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
        />
      </div>

    {/* Adults Details Section */}
    {adultsHotelNumber > 0 && (
    <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Adults Details
        </h3>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {hotelAdults.map((adult, index) => (
            <div
            key={index}
            className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-3"
            >
            <h4 className="text-lg font-semibold mb-2">
                Adult {index + 1}
            </h4>
            <Autocomplete
                fullWidth
                options={title.map((t) => ({ label: t, value: t }))}
                getOptionLabel={(option) => option.label}
                value={
                title
                    .map((t) => ({ label: t, value: t }))
                    .find((opt) => opt.value === adult.title) || null
                }
                onChange={(e, newValue) =>
                handleAdultHotelChange(index, "title", newValue ? newValue.value : "")
                }
                renderInput={(params) => (
                <TextField
                    {...params}
                    label={`Title for Adult ${index + 1}`}
                    variant="outlined"
                    sx={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    }}
                />
                )}
            />
            <TextField
                fullWidth
                label={`First Name for Adult ${index + 1}`}
                variant="outlined"
                value={adult.firstName}
                onChange={(e) =>
                handleAdultHotelChange(index, "firstName", e.target.value)
                }
                sx={{
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                }}
            />
            <TextField
                fullWidth
                label={`Last Name for Adult ${index + 1}`}
                variant="outlined"
                value={adult.lastName}
                onChange={(e) =>
                handleAdultHotelChange(index, "lastName", e.target.value)
                }
                sx={{
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                }}
            />
            </div>
        ))}
        </div>
    </div>
    )}

    {/* Children Details Section */}
    {childrenHotelNumber > 0 && (
    <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Children Details
        </h3>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {hotelChildren.map((child, index) => (
            <div
            key={index}
            className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-3"
            >
            <h4 className="text-lg font-semibold mb-2">
                Child {index + 1}
            </h4>
            <TextField
                fullWidth
                label={`Age for Child ${index + 1}`}
                variant="outlined"
                type="number"
                value={child.age}
                onChange={(e) =>
                handleChildHotelChange(index, "age", e.target.value)
                }
                inputProps={{ min: 0 }}
                sx={{
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                }}
            />
            <TextField
                fullWidth
                label={`First Name for Child ${index + 1}`}
                variant="outlined"
                value={child.firstName}
                onChange={(e) =>
                handleChildHotelChange(index, "firstName", e.target.value)
                }
                sx={{
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                }}
            />
            <TextField
                fullWidth
                label={`Last Name for Child ${index + 1}`}
                variant="outlined"
                value={child.lastName}
                onChange={(e) =>
                handleChildHotelChange(index, "lastName", e.target.value)
                }
                sx={{
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                }}
            />
            </div>
        ))}
        </div>
    </div>
    )}

    </div>
  );
};

export default HotelServicePage;
