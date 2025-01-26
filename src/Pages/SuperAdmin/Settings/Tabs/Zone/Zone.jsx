import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGet } from '../../../../../Hooks/useGet';
import { useDelete } from '../../../../../Hooks/useDelete';
import { useAuth } from '../../../../../Context/Auth';
import { MenuItem, TextField } from '@mui/material';
import StaticLoader from '../../../../../Components/StaticLoader';

const Zone = () => {
  const navigate = useNavigate();
  const { refetch: refetchCity, loading:loadingCity, data: DataCity } = useGet({
    url: "https://www.travelta.online/api/super/cities",
  });
  const { refetch: refetchCountry,loading:loadingCountry, data: DataCountry } = useGet({
    url: "https://www.travelta.online/api/super/countries",
  });
  const { refetch: refetchZone, data: DataZone } = useGet({
    url: "https://www.travelta.online/api/super/zones",
  });
  const { deleteData } = useDelete();
  const auth = useAuth();

  const [dataCountry, setDataCountry] = useState([]);
  const [dataCity, setDataCity] = useState([]);
  const [dataZone, setDataZone] = useState([]);

  const [showPopup, setShowPopup] = useState(false);
  const [selectedZone, setSelectedZone] = useState({ id: null, name: "" });
  const [newName, setNewName] = useState("");
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [cityId, setCityId] = useState(null);
  const [countryId, setCountryId] = useState(null);

  // Fetch data on mount
  useEffect(() => {
    refetchCountry();
    refetchCity();
    refetchZone();
  }, [refetchCity, refetchCountry, refetchZone]);

  useEffect(() => {
    if (DataCity) setDataCity(DataCity.city || []);
  }, [DataCity]);

  useEffect(() => {
    if (DataCountry) setDataCountry(DataCountry.country || []);
  }, [DataCountry]);

  useEffect(() => {
    if (DataZone) setDataZone(DataZone.zone || []);
  }, [DataZone]);

  // Handle update initiation
  const handleUpdate = (zone) => {
    setSelectedZone(zone);
    setNewName(zone.name);
    setCityId(zone.city_id);
    setCountryId(zone.country_id);
    setShowPopup(true);
  };

  // Close update popup
  const handlePopupClose = () => {
    setShowPopup(false);
    setSelectedZone({ id: null, name: "" });
    setNewName("");
    setCityId(null);
    setCountryId(null);
  };

// Handle update submission
const handleUpdateSubmit = async () => {
  setLoadingUpdate(true); // Indicate loading state
  try {
    const response = await fetch(
      `https://www.travelta.online/api/super/zone/update/${selectedZone.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${auth.user?.token || ''}`, // Include authorization token
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newName, 
          country_id: countryId, 
          city_id: cityId,
        }),
      }
    );

    if (response.ok) {
      // Parse the updated zone data from the response
      const updatedZone = await response.json();

      // Update the zone in the state
      setDataZone((prev) =>
        prev.map((zone) =>
          zone.id === selectedZone.id
            ? { ...zone,name: newName, country_id: countryId, city_id:cityId, updated_at: new Date().toISOString()}
            : zone
        )
      );

      handlePopupClose(); // Close the popup
    } else {
      const errorData = await response.json();
      console.error("Failed to update zone:", errorData.message || "Unknown error");
    }
  } catch (error) {
    console.error("Error updating zone:", error);
  } finally {
    setLoadingUpdate(false); // Reset loading state
  }
};


  // Handle delete
  const handleDelete = async (id, name) => {
    const success = await deleteData(`https://www.travelta.online/api/super/zone/delete/${id}`, `${name} Deleted Success.`);
    if (success) setDataZone(dataZone.filter((zone) => zone.id !== id));
  };

  // Get country and city names
  const getCountryName = (id) => dataCountry.find((c) => c.id === id)?.name || "Unknown Country";
  const getCityName = (id) => dataCity.find((c) => c.id === id)?.name || "Unknown City";

  return (
    <div className="w-full overflow-x-scroll scrollSection">
    {loadingCountry || loadingCity ?  (
        <div className="w-full h-56 flex justify-center items-center">
            <StaticLoader />
        </div>
) :
( 
<div className="mx-auto p-8 min-h-screen">
<div className="flex flex-col flex-wrap lg:flex-row gap-6">
    {dataZone.map((zone) => (
      <div
        key={zone.id}
         className="relative bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
      >
 
           {/* Country Header */}
           <div className="h-32 bg-gradient-to-r from-mainColor to-gray-600 flex items-center justify-center">
          <h3 className="text-2xl font-bold text-white uppercase tracking-wider">
            {zone.name}
          </h3>
        </div>
        <div className="p-6">
          <p>
            <strong>Created At:</strong> {zone.created_at || "Not Available"}
          </p>
          <p>
            <strong>Updated At:</strong> {zone.updated_at || "Not Available"}
          </p>
          <p>
            <strong>Country:</strong> {getCountryName(zone.country_id)}
          </p>
          <p>
            <strong>City:</strong> {getCityName(zone.city_id)}
          </p>
        </div>
        <div className="flex justify-between px-6 py-4 bg-gray-50">
        <button
            onClick={() => handleUpdate(zone)}
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Update
          </button>
          <button
            onClick={() => handleDelete(zone.id, zone.name)}
            className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200 ml-4"
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>

  {showPopup && (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h3 className="text-xl font-semibold mb-6 text-gray-800">Update Zone</h3>
        <div className="mb-4">
          <TextField
            fullWidth
            variant="outlined"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            label="Zone Name"
          />
        </div>
        <div className="mb-4">
          <TextField
            select
            fullWidth
            variant="outlined"
            value={countryId}
            onChange={(e) => setCountryId(e.target.value)}
            label="Select Country"
          >
            {dataCountry.map((country) => (
              <MenuItem key={country.id} value={country.id}>
                {country.name}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="mb-4">
          <TextField
            select
            fullWidth
            variant="outlined"
            value={cityId}
            onChange={(e) => setCityId(e.target.value)}
            label="Select City"
          >
            {dataCity.map((city) => (
              <MenuItem key={city.id} value={city.id}>
                {city.name}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={handlePopupClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdateSubmit}
            disabled={loadingUpdate}
            className={`px-4 py-2 text-white rounded-lg ${
              loadingUpdate ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loadingUpdate ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  )}
</div>


    
  )
     } 
    </div>
  );
};

export default Zone;
