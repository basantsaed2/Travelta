import React, { useState } from "react";
import { useAuth } from "../../../Context/Auth";

const LocationHotel = () => {
  const [mapLink, setMapLink] = useState(""); // Store user input (Google Maps link)
  const auth = useAuth();

  // Function to handle input changes
  const handleChange = (event) => {
    setMapLink(event.target.value);
  };

  // Function to validate & open the Google Maps link
  const handleNavigateToMap = () => {
    if (!mapLink.trim()) {
      auth.toastError("Please enter a Google Maps link.");
      return;
    }

    // Validate if the input is a Google Maps link
    const isValidGoogleMapsLink = /^https:\/\/(www\.)?google\.[a-z.]+\/maps/.test(mapLink);

    if (!isValidGoogleMapsLink) {
      auth.toastError("Invalid Google Maps link. Please enter a valid URL.");
      return;
    }

    // Open the link in a new tab
    window.open(mapLink, "_blank");

    // Send location link to API
    handleSendLocation(mapLink);
  };

  // Function to send location data to API
  const handleSendLocation = async (locationUrl) => {
    const payload = { location_url: locationUrl };

    try {
      const response = await fetch("https://your-api-endpoint.com/location", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        auth.toastSuccess("Location link sent successfully!");
      } else {
        auth.toastError("Failed to send location link.");
      }
    } catch (error) {
      console.error("Error sending data:", error);
      auth.toastError("An error occurred.");
    }
  };

  return (
    <div className="p-4 space-y-4 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold">Upload & Navigate to Google Maps</h2>

      {/* Google Maps Link Input */}
      <input
        type="text"
        value={mapLink}
        onChange={handleChange}
        placeholder="Paste Google Maps link here"
        className="w-full p-2 border rounded"
      />

      {/* Navigate & Send Location Button */}
      <button
        type="button"
        onClick={handleNavigateToMap}
        className="w-full bg-mainColor text-white p-2 rounded hover:bg-green-600"
      >
        Open Google Maps
      </button>
    </div>
  );
};

export default LocationHotel;
