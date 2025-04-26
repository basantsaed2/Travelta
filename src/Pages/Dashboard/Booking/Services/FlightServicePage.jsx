// FlightServicePage.jsx
import React, { useState } from "react";
import { TextField, MenuItem, Autocomplete } from "@mui/material";
import { MdDelete } from "react-icons/md";

const FlightServicePage = (
  {
    flightType,
    flightDirection,
    today,
    title,
    auth,
    selectedFlightType,
    setSelectedFlightType,
    selectedFlightDirection,
    setSelectedFlightDirection,
    flightDeparture,
    setFlightDeparture,
    flightArrival,
    setFlightArrival,
    multiCityFlights,
    setMultiCityFlights,
    singleFlight,
    setSingleFlight,
    flightChildrenNumber,
    setFlightChildrenNumber,
    flightAdultsNumber,
    setFlightAdultsNumber,
    flightAdults,
    setFlightAdults,
    flightChildren,
    setFlightChildren,
    flightInfants,
    setFlightInfants,
    flightAdultPrice,
    setFlightAdultPrice,
    flightChildPrice,
    setFlightChildPrice,
    flightClass,
    setFlightClass,
    flightAirline,
    setFlightAirline,
    flightTicketNumber,
    setFlightTicketNumber,
    flightRefPNR,
    setFlightRefPNR,
  }) => {

  // Multi-city flights handler
  const handleMultiCityChange = (index, field, value) => {
    setMultiCityFlights((prev) =>
      prev.map((flight, i) =>
        i === index ? { ...flight, [field]: value } : flight
      )
    );
  };

  const addNewMultiCityFlight = () => {
    setMultiCityFlights((prev) => [...prev, { from: "", to: "" }]);
  };

  // Handle number of adults change
  const handleFlightAdultsNumberChange = (e) => {
    const number = parseInt(e.target.value, 10) || 0;
    setFlightAdultsNumber(number);
    setFlightAdults((prev) => {
      const updated = [...prev];
      while (updated.length < number) {
        updated.push({ selectedTitle: "", firstName: "", lastName: "" });
      }
      updated.length = number;
      return updated;
    });
  };

  // Handle adult details change
  const handleAdultChange = (index, field, value) => {
    const updated = [...flightAdults];
    updated[index][field] = value;
    setFlightAdults(updated);
  };

  // Handle number of children change
  const handleFlightChildrenNumberChange = (e) => {
    const number = parseInt(e.target.value, 10) || 0;
    setFlightChildrenNumber(number);
    setFlightChildren((prev) => {
      const updated = [...prev];
      while (updated.length < number) {
        updated.push({ age: "", firstName: "", lastName: "" });
      }
      updated.length = number;
      return updated;
    });
  };

  // Handle children details change
  const handleChildChange = (index, field, value) => {
    const updated = [...flightChildren];
    updated[index][field] = value;
    setFlightChildren(updated);
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg p-2 md:p-6 bg-gradient-to-r from-blue-50 to-blue-100">
      <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">
        Flight Details
      </h2>

      <div className="p-2 rounded-lg mb-4">

        {/* Basic Flight Information */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Flight Type (Autocomplete) */}
          <Autocomplete
            fullWidth
            options={flightType}
            getOptionLabel={(option) => option.label}
            value={flightType.find(opt => opt.value === selectedFlightType) || null}
            onChange={(e, newValue) =>
              setSelectedFlightType(newValue ? newValue.value : "")
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Flight Type"
                variant="outlined"
                placeholder="Search Flight Type..."
                InputProps={{
                  ...params.InputProps,
                  sx: { backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }
                }}
              />
            )}
          />

          {/* Flight Direction (Autocomplete) */}
          <Autocomplete
            fullWidth
            options={flightDirection}
            getOptionLabel={(option) => option.label}
            value={flightDirection.find(opt => opt.value === selectedFlightDirection) || null}
            onChange={(e, newValue) =>
              setSelectedFlightDirection(newValue ? newValue.value : "")
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Flight Direction"
                variant="outlined"
                placeholder="Search Flight Direction..."
                InputProps={{
                  ...params.InputProps,
                  sx: { backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }
                }}
              />
            )}
          />

          {/* ====== Departure Date (always) ====== */}
          <TextField
            type="datetime-local"
            label="Departure Date & Time"
            fullWidth
            variant="outlined"
            value={flightDeparture}
            onChange={(e) => setFlightDeparture(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
            inputProps={{
              min: `${today}T00:00`,
              max: flightArrival ? new Date(new Date(flightArrival).getTime() - 86400000).toISOString().slice(0, 16) : undefined,
            }}
          />

          {/* ====== Arrival Date (only for Round Trip & Multi City) ====== */}
          {(selectedFlightDirection === "round_trip" || selectedFlightDirection === "multi_city") && (
            <TextField
              type="datetime-local"
              label="Arrival Date & Time"
              fullWidth
              variant="outlined"
              value={flightArrival}
              onChange={(e) => setFlightArrival(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
              inputProps={{
                min: flightDeparture ? new Date(new Date(flightDeparture).getTime() + 86400000).toISOString().slice(0, 16) : `${today}T00:00`,
              }}
            />
          )}

        </div>

        {/* ====== From and To Fields (for One Way and Round Trip) ====== */}
        {(selectedFlightDirection === "one_way" || selectedFlightDirection === "round_trip") && (
            <div className="p-4 bg-gray-100 rounded-xl shadow-lg  flex flex-col gap-4 mb-6">
              <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-blue-700">
                    Trip Details
                  </span>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
             <TextField
                label="From"
                variant="outlined"
                fullWidth
                value={singleFlight?.from || ""}
                onChange={(e) =>
                  setSingleFlight((prev) => ({ ...prev, from: e.target.value }))
                }
                placeholder="Enter departure city"
                sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
              />
              <TextField
                label="To"
                variant="outlined"
                fullWidth
                value={singleFlight?.to || ""}
                onChange={(e) =>
                  setSingleFlight((prev) => ({ ...prev, to: e.target.value }))
                }
                placeholder="Enter arrival city"
                sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
              />
            </div>
            </div>
          )}

        {/* ====== Multi City Flights (ONLY if Multi City) ====== */}
        {selectedFlightDirection === "multi_city" && (
          <div className="mb-6 space-y-4">
            {multiCityFlights.map((flight, index) => (
              <div
                key={index}
                className="p-4 bg-gray-100 rounded-xl shadow-lg flex flex-col gap-3"
              >
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-blue-700">
                    Trip {index + 1} Details
                  </span>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() =>
                        setMultiCityFlights((prev) =>
                          prev.filter((_, i) => i !== index)
                        )
                      }
                      className="p-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full shadow-md transition-all duration-300"
                    >
                      <MdDelete size="24" />
                    </button>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <TextField
                    label={`From (${index + 1})`}
                    variant="outlined"
                    fullWidth
                    value={flight.from}
                    onChange={(e) =>
                      handleMultiCityChange(index, "from", e.target.value)
                    }
                    placeholder={`Enter departure city for trip ${index + 1}`}
                    sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
                  />
                  <TextField
                    label={`To (${index + 1})`}
                    variant="outlined"
                    fullWidth
                    value={flight.to}
                    onChange={(e) =>
                      handleMultiCityChange(index, "to", e.target.value)
                    }
                    placeholder={`Enter arrival city for trip ${index + 1}`}
                    sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
                  />
                </div>
              </div>
            ))}
            <div className="w-full flex justify-end">
              <button
                type="button"
                onClick={addNewMultiCityFlight}
                className="py-3 px-6 bg-mainColor text-white hover:bg-white hover:text-mainColor font-semibold rounded-lg shadow-md transition-all duration-300"
              >
                + Add Another Trip
              </button>
            </div>
          </div>
        )}

        {/* Passenger & Price Details */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TextField
            label="Adults Number"
            type="number"
            variant="outlined"
            fullWidth
            value={flightAdultsNumber}
            onChange={handleFlightAdultsNumberChange}
            placeholder="Enter number of Adults"
            inputProps={{ min: 0 }}
            sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
          />
          <TextField
            label="Children Number"
            type="number"
            variant="outlined"
            fullWidth
            value={flightChildrenNumber}
            onChange={handleFlightChildrenNumberChange}
            placeholder="Enter number of Children"
            inputProps={{ min: 0 }}
            sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
          />
          <TextField
            label="Infants Number"
            type="number"
            variant="outlined"
            fullWidth
            value={flightInfants}
            onChange={(e) => setFlightInfants(e.target.value)}
            placeholder="Enter number of Infants"
            inputProps={{ min: 0 }}
            sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
          />
          <TextField
            label="Adult Price"
            type="number"
            variant="outlined"
            fullWidth
            value={flightAdultPrice}
            onChange={(e) => setFlightAdultPrice(e.target.value)}
            placeholder="Enter Adult Price"
            inputProps={{ min: 0 }}
            sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
          />
          <TextField
            label="Child Price"
            type="number"
            variant="outlined"
            fullWidth
            value={flightChildPrice}
            onChange={(e) => setFlightChildPrice(e.target.value)}
            placeholder="Enter Child Price"
            inputProps={{ min: 0 }}
            sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
          />
          <Autocomplete
            fullWidth
            options={[
              { value: "first", label: "First" },
              { value: "economy", label: "Economy" },
              { value: "business", label: "Business" },
            ]}
            getOptionLabel={(option) => option.label}
            value={
              [{ value: "first", label: "First" },
              { value: "economy", label: "Economy" },
              { value: "business", label: "Business" }].find(
                (opt) => opt.value === flightClass
              ) || null
            }
            onChange={(e, newValue) =>
              setFlightClass(newValue ? newValue.value : "")
            }
            renderInput={(params) => (
              <TextField {...params} label="Select Flight Class" variant="outlined" />
            )}
            sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
          />
          <TextField
            label="Airline"
            variant="outlined"
            fullWidth
            value={flightAirline}
            onChange={(e) => setFlightAirline(e.target.value)}
            placeholder="Enter Airline"
            sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
          />
          <TextField
            label="Ticket Number"
            variant="outlined"
            fullWidth
            value={flightTicketNumber}
            onChange={(e) => setFlightTicketNumber(e.target.value)}
            placeholder="Enter Ticket Number"
            sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
          />
          <TextField
            label="Ref PNR"
            variant="outlined"
            fullWidth
            value={flightRefPNR}
            onChange={(e) => setFlightRefPNR(e.target.value)}
            placeholder="Enter Ref PNR"
            sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
          />
        </div>

      </div>

      {/* Flight Adults Details Section */}
      {flightAdultsNumber > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Adults Details
          </h3>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flightAdults.map((adult, index) => (
              <div
                key={index}
                className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-3"
              >
                <h4 className="text-lg font-semibold mb-2">
                  Adult {index + 1}
                </h4>
                <Autocomplete
                  fullWidth
                  options={title}
                  getOptionLabel={(option) => option || ""}
                  value={adult.selectedTitle || null}
                  onChange={(e, newValue) =>
                    handleAdultChange(index, "selectedTitle", newValue)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={`Title for Adult ${index + 1}`}
                      variant="outlined"
                      className="mb-2"
                      InputProps={{
                        ...params.InputProps,
                        sx: { backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }
                      }}
                    />
                  )}
                />
                <TextField
                  label={`First Name for Adult ${index + 1}`}
                  variant="outlined"
                  fullWidth
                  value={adult.firstName}
                  onChange={(e) =>
                    handleAdultChange(index, "firstName", e.target.value)
                  }
                  className="mb-2"
                  sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
                />
                <TextField
                  label={`Last Name for Adult ${index + 1}`}
                  variant="outlined"
                  fullWidth
                  value={adult.lastName}
                  onChange={(e) =>
                    handleAdultChange(index, "lastName", e.target.value)
                  }
                  className="mb-2"
                  sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Flight Children Details Section */}
      {flightChildrenNumber > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Children Details
          </h3>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flightChildren.map((child, index) => (
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
                  onChange={(e) => handleChildChange(index, "age", e.target.value)}
                  inputProps={{ min: 0 }}
                  className="mb-2"
                  sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
                />
                <TextField
                  label={`First Name for Child ${index + 1}`}
                  variant="outlined"
                  fullWidth
                  value={child.firstName}
                  onChange={(e) =>
                    handleChildChange(index, "firstName", e.target.value)
                  }
                  className="mb-2"
                  sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
                />
                <TextField
                  label={`Last Name for Child ${index + 1}`}
                  variant="outlined"
                  fullWidth
                  value={child.lastName}
                  onChange={(e) =>
                    handleChildChange(index, "lastName", e.target.value)
                  }
                  className="mb-2"
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

export default FlightServicePage;
