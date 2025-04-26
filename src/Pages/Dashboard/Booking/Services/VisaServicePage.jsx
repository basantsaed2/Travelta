// VisaServicePage.jsx
import React, { useState } from "react";
import { TextField, MenuItem, Autocomplete } from "@mui/material";

const VisaServicePage = ({ countries, today, title,
    visaCountry, setVisaCountry,
    visaTravelDate, setVisaTravelDate,
    visaAppointmentDate, setVisaAppointmentDate,
    visaAdultsNumber, setVisaAdultsNumber,
    visaChildrenNumber, setVisaChildrenNumber,
    visaAdults, setVisaAdults,
    visaChildren, setVisaChildren,
    visaNotes, setVisaNotes
}) => {

    // Function to handle number of adults change
    const handleVisaAdultsNumberChange = (e) => {
        const number = parseInt(e.target.value, 10) || 0;
        setVisaAdultsNumber(number);
        setVisaAdults((prevAdults) => {
            const updatedAdults = [...prevAdults];
            // Add empty objects if more adults are needed
            while (updatedAdults.length < number) {
                updatedAdults.push({ selectedTitle: "", firstName: "", lastName: "" });
            }
            // Trim if fewer are needed
            updatedAdults.length = number;
            return updatedAdults;
        });
    };

    // Function to handle adult details change
    const handleAdulVisaChange = (index, field, value) => {
        const updatedAdults = [...visaAdults];
        updatedAdults[index][field] = value;
        setVisaAdults(updatedAdults);
    };

    // Function to handle number of children change
    const handleVisaChildrenNumberChange = (e) => {
        const number = parseInt(e.target.value, 10) || 0;
        setVisaChildrenNumber(number);
        setVisaChildren((prevChildren) => {
            const updatedChildren = [...prevChildren];
            while (updatedChildren.length < number) {
                updatedChildren.push({ age: "", firstName: "", lastName: "" });
            }
            updatedChildren.length = number;
            return updatedChildren;
        });
    };

    // Function to handle children details change
    const handleChildVisaChange = (index, field, value) => {
        const updatedChildren = [...visaChildren];
        updatedChildren[index][field] = value;
        setVisaChildren(updatedChildren);
    };

    return (
        // <div className="p-2 md:p-6 bg-white rounded-xl shadow-lg">
        <div className="border rounded-lg overflow-hidden shadow-lg p-2 md:p-6 bg-gradient-to-r from-blue-50 to-blue-100">
            <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">
                Visa Details
            </h2>

            {/* Basic Visa Details in a responsive grid */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 ">
                {/* Country using Autocomplete */}
                <Autocomplete
                    fullWidth
                    options={countries}
                    getOptionLabel={(option) => option?.name || ""}
                    value={countries.find((c) => c.name === visaCountry) || null}
                    onChange={(e, newValue) =>
                        setVisaCountry(newValue ? newValue.name : "")
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Select Country"
                            placeholder="Type to search..."
                            variant="outlined"
                            InputProps={{
                                ...params.InputProps,
                                sx: { backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }
                            }}
                        />
                    )}
                />

                  {/* Appointment Date */}
                  <TextField
                    label="Appointment Date"
                    variant="outlined"
                    fullWidth
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={visaAppointmentDate}
                    onChange={(e) => setVisaAppointmentDate(e.target.value)}
                    inputProps={{
                        min: today, // Appointment can't be before today
                        max: visaTravelDate || undefined, // Appointment must be <= Travel Date
                    }}
                    sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
                />

                {/* Travel Date */}
                <TextField
                    label="Travel Date"
                    variant="outlined"
                    fullWidth
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={visaTravelDate}
                    onChange={(e) => setVisaTravelDate(e.target.value)}
                    inputProps={{
                        min: today, // Travel can't be before today
                    }}
                    sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
                />

                {/* Number of Adults */}
                <TextField
                    label="Number of Adults"
                    type="number"
                    variant="outlined"
                    fullWidth
                    value={visaAdultsNumber}
                    onChange={handleVisaAdultsNumberChange}
                    inputProps={{ min: 0 }}
                    sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
                />

                {/* Number of Children */}
                <TextField
                    label="Number of Children"
                    type="number"
                    variant="outlined"
                    fullWidth
                    value={visaChildrenNumber}
                    onChange={handleVisaChildrenNumberChange}
                    inputProps={{ min: 0 }}
                    sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
                />

                {/* Notes */}
                <TextField
                    label="Notes"
                    multiline
                    variant="outlined"
                    fullWidth
                    value={visaNotes}
                    onChange={(e) => setVisaNotes(e.target.value)}
                    sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
                />
            </div>

            {/* Adults Details Section */}
            {visaAdultsNumber > 0 && (
                <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Adults Details
                    </h3>
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {visaAdults.map((adult, index) => (
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
                                        handleAdulVisaChange(index, "selectedTitle", newValue)
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
                                        handleAdulVisaChange(index, "firstName", e.target.value)
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
                                        handleAdulVisaChange(index, "lastName", e.target.value)
                                    }
                                    className="mb-2"
                                    sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Children Details Section */}
            {visaChildrenNumber > 0 && (
                <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Children Details
                    </h3>
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {visaChildren.map((child, index) => (
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
                                        handleChildVisaChange(index, "age", e.target.value)
                                    }
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
                                        handleChildVisaChange(index, "firstName", e.target.value)
                                    }
                                    className="mb-2"
                                    sx={{ backgroundColor: "white", borderRadius: "8px", boxShadow: 1 }}
                                />
                                <TextField
                                    label={`First Name for Child ${index + 1}`}
                                    variant="outlined"
                                    fullWidth
                                    value={child.lastName}
                                    onChange={(e) =>
                                        handleChildVisaChange(index, "lastName", e.target.value)
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

export default VisaServicePage;
