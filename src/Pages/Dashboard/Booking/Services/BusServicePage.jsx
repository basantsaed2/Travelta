import React from "react";
import { TextField, MenuItem, Autocomplete } from "@mui/material";

const BusServicePage = ({
  busFrom,
  setBusFrom,
  busTo,
  setBusTo,
  departure,
  setDeparture,
  arrival,
  setArrival,
  busAdultsNumber,
  setBusAdultsNumber,
  busChildrenNumber,
  setBusChildrenNumber,
  adultPrice,
  setAdultPrice,
  childPrice,
  setChildPrice,
  busName,
  setBusName,
  busNumber,
  setBusNumber,
  driverPhone,
  setDriverPhone,
  busAdults,
  setBusAdults,
  busChildren,
  setBusChildren,
  title, // e.g. ["Mr.", "Mrs.", "Ms.", "Dr."]
  today,
}) => {
  // Bus Adults Functions
  const handleBusAdultsNumberChange = (e) => {
    const number = parseInt(e.target.value, 10) || 0;
    setBusAdultsNumber(number);
    setBusAdults((prevAdults) => {
      const updatedAdults = [...prevAdults];
      while (updatedAdults.length < number) {
        updatedAdults.push({ selectedTitle: "", firstName: "", lastName: "" });
      }
      updatedAdults.length = number;
      return updatedAdults;
    });
  };

  const handleAdultChangeBus = (index, field, value) => {
    const updatedAdults = [...busAdults];
    updatedAdults[index][field] = value;
    setBusAdults(updatedAdults);
  };

  // Bus Children Functions
  const handleBusChildrenNumberChange = (e) => {
    const number = parseInt(e.target.value, 10) || 0;
    setBusChildrenNumber(number);
    setBusChildren((prevChildren) => {
      const updatedChildren = [...prevChildren];
      while (updatedChildren.length < number) {
        updatedChildren.push({ age: "", firstName: "", lastName: "" });
      }
      updatedChildren.length = number;
      return updatedChildren;
    });
  };

  const handleChildChangeBus = (index, field, value) => {
    const updatedChildren = [...busChildren];
    updatedChildren[index][field] = value;
    setBusChildren(updatedChildren);
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg p-2 md:p-6 bg-gradient-to-r from-blue-50 to-blue-100">
      <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">
        Bus Details
      </h2>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-6">
        {/* From */}
        <TextField
          fullWidth
          label="From"
          value={busFrom}
          onChange={(e) => setBusFrom(e.target.value)}
          variant="outlined"
          placeholder="Enter departure city"
          sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
        />
        {/* To */}
        <TextField
          fullWidth
          label="To"
          value={busTo}
          onChange={(e) => setBusTo(e.target.value)}
          variant="outlined"
          placeholder="Enter destination city"
          sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
        />
        {/* Departure Date & Time */}
        <TextField
          fullWidth
          label="Departure Date & Time"
          value={departure}
          onChange={(e) => setDeparture(e.target.value)}
          variant="outlined"
          type="datetime-local"
          InputLabelProps={{ shrink: true }}
          sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
          inputProps={{
            min: `${today}T00:00`,
            max: arrival
              ? new Date(new Date(arrival).getTime() - 86400000)
                  .toISOString()
                  .slice(0, 16)
              : undefined,
          }}
        />
        {/* Arrival Date & Time */}
        <TextField
          fullWidth
          label="Arrival Date & Time"
          value={arrival}
          onChange={(e) => setArrival(e.target.value)}
          variant="outlined"
          type="datetime-local"
          InputLabelProps={{ shrink: true }}
          sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
          inputProps={{
            min: departure
              ? new Date(new Date(departure).getTime() + 86400000)
                  .toISOString()
                  .slice(0, 16)
              : `${today}T00:00`,
          }}
        />
        {/* Adults Count */}
        <TextField
          fullWidth
          label="Adults"
          type="number"
          variant="outlined"
          value={busAdultsNumber}
          onChange={handleBusAdultsNumberChange}
          placeholder="Enter number of adults"
          inputProps={{ min: 0 }}
          sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
        />
        {/* Children Count */}
        <TextField
          fullWidth
          label="Children"
          type="number"
          variant="outlined"
          value={busChildrenNumber}
          onChange={handleBusChildrenNumberChange}
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
          value={adultPrice}
          onChange={(e) => setAdultPrice(e.target.value)}
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
          value={childPrice}
          onChange={(e) => setChildPrice(e.target.value)}
          placeholder="Enter price per child"
          inputProps={{ min: 0 }}
          sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
        />
        {/* Bus Name */}
        <TextField
          fullWidth
          label="Bus Name"
          value={busName}
          onChange={(e) => setBusName(e.target.value)}
          variant="outlined"
          placeholder="Enter bus name"
          sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
        />
        {/* Bus Number */}
        <TextField
          fullWidth
          label="Bus Number"
          value={busNumber}
          onChange={(e) => setBusNumber(e.target.value)}
          variant="outlined"
          placeholder="Enter bus number"
          sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
        />
        {/* Driver Phone */}
        <TextField
          fullWidth
          label="Driver Phone"
          value={driverPhone}
          onChange={(e) => setDriverPhone(e.target.value)}
          variant="outlined"
          placeholder="Enter driver phone number"
          sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
        />
      </div>

      {/* Bus Adults Details Section */}
      {busAdultsNumber > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Adults Details
          </h3>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {busAdults.map((adult, index) => (
              <div
                key={index}
                className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-3"
              >
                <h4 className="text-lg font-semibold mb-2">
                  Adult {index + 1}
                </h4>
                <TextField
                  select
                  label={`Title for Adult ${index + 1}`}
                  variant="outlined"
                  fullWidth
                  value={adult.selectedTitle}
                  onChange={(e) =>
                    handleAdultChangeBus(index, "selectedTitle", e.target.value)
                  }
                  sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
                >
                  {title.map((opt, idx) => (
                    <MenuItem key={idx} value={opt}>
                      {opt}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label={`First Name for Adult ${index + 1}`}
                  variant="outlined"
                  fullWidth
                  value={adult.firstName}
                  onChange={(e) =>
                    handleAdultChangeBus(index, "firstName", e.target.value)
                  }
                  sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
                />
                <TextField
                  label={`Last Name for Adult ${index + 1}`}
                  variant="outlined"
                  fullWidth
                  value={adult.lastName}
                  onChange={(e) =>
                    handleAdultChangeBus(index, "lastName", e.target.value)
                  }
                  sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bus Children Details Section */}
      {busChildrenNumber > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Children Details
          </h3>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {busChildren.map((child, index) => (
              <div
                key={index}
                className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-3"
              >
                <h4 className="text-lg font-semibold mb-2">
                  Child {index + 1}
                </h4>
                <TextField
                  label={`Age for Child ${index + 1}`}
                  type="number"
                  variant="outlined"
                  fullWidth
                  value={child.age}
                  onChange={(e) =>
                    handleChildChangeBus(index, "age", e.target.value)
                  }
                  inputProps={{ min: 0 }}
                  sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
                />
                <TextField
                  label={`First Name for Child ${index + 1}`}
                  variant="outlined"
                  fullWidth
                  value={child.firstName}
                  onChange={(e) =>
                    handleChildChangeBus(index, "firstName", e.target.value)
                  }
                  sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
                />
                <TextField
                  label={`Last Name for Child ${index + 1}`}
                  variant="outlined"
                  fullWidth
                  value={child.lastName}
                  onChange={(e) =>
                    handleChildChangeBus(index, "lastName", e.target.value)
                  }
                  sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BusServicePage;
